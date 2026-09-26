// Locale dictionary gate — the check TypeScript does not do. Each domain keeps
// `translations/en.ts` and `translations/pt.ts` as independent objects read
// through `xTranslations[currentLanguage]`; the type checker only flags a key
// that code reads and one locale lacks. This script also catches:
//   1. parity: en and pt have the same key paths and the same array lengths,
//      including keys nobody reads yet;
//   2. orphans: every dictionary key is read somewhere in src/ outside the
//      translations folders — as `.key`, `['key']` or a quoted `'key'`
//      (indexed access through a registry).
//
//   pnpm copy:check
//
// Imports the locale files directly through Node's built-in TypeScript type
// stripping (they contain only `export const … = { … } as const`).
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(import.meta.url), '../..');
const SOURCE_DIR = path.join(root, 'src');
const DOMAIN_DIR = path.join(SOURCE_DIR, 'domain');
const LOCALES = ['en', 'pt'];

const isObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const loadLocale = async (file) => {
  const module = await import(pathToFileURL(file).href);
  const dictionaries = Object.values(module).filter(isObject);
  if (dictionaries.length !== 1) {
    throw new Error(`${file}: expected one exported dictionary object`);
  }
  return dictionaries[0];
};

// Key paths, with array lengths recorded so a missing list item shows up.
const shape = (value, prefix = '') => {
  if (Array.isArray(value)) {
    return [
      `${prefix}[length=${value.length}]`,
      ...value.flatMap((item, index) => shape(item, `${prefix}[${index}]`)),
    ];
  }
  if (isObject(value)) {
    return Object.entries(value).flatMap(([key, child]) =>
      shape(child, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
};

// Every object key with its dotted path (array items are not keys).
const keyPaths = (value, prefix = '') =>
  isObject(value)
    ? Object.entries(value).flatMap(([key, child]) => {
        const here = prefix ? `${prefix}.${key}` : key;
        return [{ key, path: here }, ...keyPaths(child, here)];
      })
    : [];

const listDomains = async () => {
  const entries = await readdir(DOMAIN_DIR, { withFileTypes: true });
  const domains = [];
  for (const entry of entries.filter((e) => e.isDirectory())) {
    const dir = path.join(DOMAIN_DIR, entry.name, 'translations');
    const files = await readdir(dir).catch(() => []);
    if (LOCALES.every((locale) => files.includes(`${locale}.ts`))) {
      domains.push({ name: entry.name, dir });
    }
  }
  return domains;
};

const listSources = async () => {
  const entries = await readdir(SOURCE_DIR, {
    withFileTypes: true,
    recursive: true,
  });
  return entries
    .filter((entry) => entry.isFile() && /\.(tsx?|mjs)$/.test(entry.name))
    .map((entry) => path.join(entry.parentPath, entry.name))
    .filter((file) => !file.split(path.sep).includes('translations'));
};

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const isRead = (key, sources) => {
  const k = escape(key);
  return new RegExp(
    `\\.${k}\\b|\\[\\s*['"\`]${k}['"\`]\\s*\\]|['"\`]${k}['"\`]`,
  ).test(sources);
};

const parityProblems = (domain, en, pt) => {
  const enPaths = new Set(shape(en));
  const ptPaths = new Set(shape(pt));
  return [
    ...[...enPaths]
      .filter((p) => !ptPaths.has(p))
      .map((p) => `${domain}: only in en: ${p}`),
    ...[...ptPaths]
      .filter((p) => !enPaths.has(p))
      .map((p) => `${domain}: only in pt: ${p}`),
  ];
};

const orphanProblems = (domain, en, sources) =>
  keyPaths(en)
    .filter(({ key }) => !isRead(key, sources))
    .map(({ path: keyPath }) => `${domain}: unused key: ${keyPath}`);

const domains = await listDomains();
const files = await listSources();
const sources = (
  await Promise.all(files.map((file) => readFile(file, 'utf8')))
).join('\n');

const problems = [];
for (const { name, dir } of domains) {
  const [en, pt] = await Promise.all(
    LOCALES.map((locale) => loadLocale(path.join(dir, `${locale}.ts`))),
  );
  problems.push(
    ...parityProblems(name, en, pt),
    ...orphanProblems(name, en, sources),
  );
}

if (problems.length === 0) {
  console.log(
    `Locales in parity across ${domains.length} domains; every dictionary key is read.`,
  );
} else {
  for (const problem of problems) console.log(`  ✗ ${problem}`);
  console.log(`\n${problems.length} problem(s).`);
  process.exit(1);
}
