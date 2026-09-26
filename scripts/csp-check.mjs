// CSP gate for the running production server: loads the page in headless
// Chrome (DevTools Protocol, no Playwright), scrolls to the end so lazy
// content (the Maps iframe) loads, and fails on any Content Security Policy
// violation. Also lists the third-party responses seen, so a missing GA or
// Maps load is visible even when nothing is reported.
//
//   pnpm build && pnpm start          # in another shell (port 3302)
//   pnpm csp:check
//
// The CSP lives in next.config.js and is baked in at build time: rebuild and
// restart after editing it.
import { spawn } from 'node:child_process';

const URL_TO_CHECK = process.env.CSP_URL ?? 'http://localhost:3302/';
const CHROME = process.env.CHROME ?? 'google-chrome';
const PORT = 9335;
const THIRD_PARTY = /google|gstatic|googletagmanager/;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  await fetch(URL_TO_CHECK);
} catch {
  console.error(
    `Nothing answers at ${URL_TO_CHECK}. Run \`pnpm build && pnpm start\` first.`,
  );
  process.exit(2);
}

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);

let target;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250);
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
    target = list.find((entry) => entry.type === 'page');
  } catch {
    // Chrome is not listening yet.
  }
}
if (!target) {
  chrome.kill();
  console.error(`Chrome did not start (${CHROME}). Set CHROME=<binary>.`);
  process.exit(2);
}

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve) => (ws.onopen = resolve));
let id = 0;
const pending = new Map();
const events = [];
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message.result);
    pending.delete(message.id);
  } else if (message.method) {
    events.push(message);
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

try {
  await send('Log.enable');
  await send('Runtime.enable');
  await send('Network.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Page.navigate', { url: URL_TO_CHECK });
  await sleep(3000);
  const total = await evaluate('document.documentElement.scrollHeight');
  for (let y = 0; y < total; y += 500) {
    await evaluate(`window.scrollTo(0, ${y})`);
    await sleep(150);
  }
  await sleep(4000);
} finally {
  ws.close();
  chrome.kill();
}

const messages = events
  .filter((event) =>
    ['Log.entryAdded', 'Runtime.consoleAPICalled'].includes(event.method),
  )
  .map(
    (event) =>
      event.params.entry?.text ??
      event.params.args?.map((arg) => arg.value).join(' ') ??
      '',
  );
const violations = messages.filter((text) =>
  /Content Security Policy/i.test(text),
);
const thirdParty = [
  ...new Set(
    events
      .filter(
        (event) =>
          event.method === 'Network.responseReceived' &&
          THIRD_PARTY.test(new URL(event.params.response.url).hostname),
      )
      .map(
        (event) =>
          `${event.params.response.status} ${new URL(event.params.response.url).origin}${new URL(event.params.response.url).pathname}`,
      ),
  ),
];

console.log('Third-party responses:');
for (const line of thirdParty) console.log(`  ${line}`);
if (violations.length === 0) {
  console.log('No CSP violations.');
} else {
  for (const text of violations) console.log(`  ✗ ${text}`);
  console.log(`\n${violations.length} CSP violation(s).`);
  process.exit(1);
}
