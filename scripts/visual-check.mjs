// Visual safety net: what `text:diff` cannot see — the English copy (swapped in
// on the client), both color modes, and layout/CSS. For every language × mode ×
// width it captures a full-page screenshot and the visible text
// (`document.body.innerText`) of the running production server, through the
// Chrome DevTools Protocol (no Playwright; Node >= 22 has fetch + WebSocket).
//
//   pnpm build && pnpm start          # in another shell (port 3302)
//   pnpm visual:save                  # baseline, before the change
//   # … change, rebuild, restart …
//   pnpm visual:diff                  # exits 1 when any shot or text differs
//
// Screenshots are compared byte for byte; open the saved before/after PNGs to
// see what moved. Run `visual:diff` twice without changes first if in doubt:
// both runs must say "unchanged". Chrome runs with reduced motion, and the
// language and mode are preset in localStorage before the page loads (the same
// keys the app persists), with the commemorative theme pinned to `default`.
import { spawn } from 'node:child_process';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const baseDir = path.join(root, 'node_modules/.cache/visual-check');
const URL_TO_CHECK = process.env.VISUAL_URL ?? 'http://localhost:3302/';
const CHROME = process.env.CHROME ?? 'google-chrome';
const PORT = 9334;
const VIEWPORT_HEIGHT = 900;
const LANGUAGES = ['pt', 'en'];
const MODES = ['light', 'dark'];
const WIDTHS = [1280, 390];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const startChrome = async () => {
  const chrome = spawn(
    CHROME,
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-prefers-reduced-motion',
      `--remote-debugging-port=${PORT}`,
      'about:blank',
    ],
    { stdio: 'ignore' },
  );
  for (let i = 0; i < 40; i++) {
    await sleep(250);
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const page = list.find((target) => target.type === 'page');
      if (page) return { chrome, page };
    } catch {
      // Chrome is not listening yet.
    }
  }
  chrome.kill();
  throw new Error(`Chrome did not start (${CHROME}). Set CHROME=<binary>.`);
};

const connect = async (webSocketUrl) => {
  const ws = new WebSocket(webSocketUrl);
  await new Promise((resolve) => (ws.onopen = resolve));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message.result);
      pending.delete(message.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const current = ++id;
      pending.set(current, resolve);
      ws.send(JSON.stringify({ id: current, method, params }));
    });
  const evaluate = async (expression) =>
    (await send('Runtime.evaluate', { expression, returnByValue: true })).result
      .value;
  return { ws, send, evaluate };
};

const capture = async ({ send, evaluate }, { language, mode, width }) => {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height: VIEWPORT_HEIGHT,
    deviceScaleFactor: 1,
    mobile: width < 600,
  });
  const preset = await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `try {
      localStorage.setItem('londonlink-language', '${language}');
      localStorage.setItem('londonlink-theme-mode', '${mode}');
      localStorage.setItem('londonlink-commemorative-theme', 'default');
      localStorage.setItem('londonlink-manual-override', 'true');
    } catch {}`,
  });
  await send('Page.navigate', { url: URL_TO_CHECK });
  await sleep(2500);

  // Scroll through the page so IntersectionObserver reveals fire.
  const total = await evaluate('document.documentElement.scrollHeight');
  for (let y = 0; y < total; y += 600) {
    await evaluate(`window.scrollTo(0, ${y})`);
    await sleep(120);
  }
  await evaluate('window.scrollTo(0, 0)');
  await sleep(800);

  const height = await evaluate('document.documentElement.scrollHeight');
  const shot = await send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height, scale: 1 },
  });
  const text = await evaluate('document.body.innerText');
  const lang = await evaluate('document.documentElement.lang');
  await send('Page.removeScriptToEvaluateOnNewDocument', {
    identifier: preset.identifier,
  });
  return { png: Buffer.from(shot.data, 'base64'), text: `${text}\n`, lang };
};

const combinations = LANGUAGES.flatMap((language) =>
  MODES.flatMap((mode) => WIDTHS.map((width) => ({ language, mode, width }))),
);
const nameOf = ({ language, mode, width }) => `${language}-${mode}-${width}`;

const run = async (outDir) => {
  try {
    await fetch(URL_TO_CHECK);
  } catch {
    console.error(
      `Nothing answers at ${URL_TO_CHECK}. Run \`pnpm build && pnpm start\` first.`,
    );
    process.exit(2);
  }
  const { chrome, page } = await startChrome();
  const client = await connect(page.webSocketDebuggerUrl);
  try {
    await client.send('Page.enable');
    await mkdir(outDir, { recursive: true });
    for (const combination of combinations) {
      const { png, text, lang } = await capture(client, combination);
      if (lang !== combination.language) {
        throw new Error(
          `${nameOf(combination)}: <html lang> is "${lang}", preset did not apply`,
        );
      }
      await writeFile(path.join(outDir, `${nameOf(combination)}.png`), png);
      await writeFile(path.join(outDir, `${nameOf(combination)}.txt`), text);
    }
  } finally {
    client.ws.close();
    chrome.kill();
  }
};

const save = async () => {
  const dir = path.join(baseDir, 'baseline');
  await run(dir);
  console.log(
    `Baseline saved: ${combinations.length} shots → ${path.relative(root, dir)}`,
  );
};

const diff = async () => {
  const before = path.join(baseDir, 'baseline');
  if ((await readdir(before).catch(() => [])).length === 0) {
    console.error('No baseline. Run `pnpm visual:save` before the change.');
    process.exit(2);
  }
  const after = path.join(baseDir, 'current');
  await run(after);
  const changed = [];
  for (const combination of combinations) {
    for (const extension of ['png', 'txt']) {
      const file = `${nameOf(combination)}.${extension}`;
      const [a, b] = await Promise.all([
        readFile(path.join(before, file)),
        readFile(path.join(after, file)),
      ]);
      if (!a.equals(b)) changed.push(file);
    }
  }
  if (changed.length === 0) {
    console.log(`Visual check unchanged across ${combinations.length} shots.`);
    return;
  }
  for (const file of changed) console.log(`  ~ ${file}`);
  console.log(
    `\n${changed.length} file(s) differ. Compare ${path.relative(root, before)} with ${path.relative(root, after)}.`,
  );
  process.exit(1);
};

const commands = { save, diff };
const command = commands[process.argv[2]];
if (!command) {
  console.error('Usage: node scripts/visual-check.mjs <save|diff>');
  process.exit(2);
}
await command();
