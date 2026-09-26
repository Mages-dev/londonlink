import css from '@eslint/css';
import { defineConfig } from 'eslint/config';
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import { createRequire } from 'node:module';
import { tailwind4 } from 'tailwind-csstree';

// eslint-plugin-react's version 'detect' (the Next preset's setting) calls
// context.getFilename(), which ESLint 10 removed; pass the installed React
// version instead.
const reactVersion = createRequire(import.meta.url)('react/package.json').version;

const eslintConfig = defineConfig([
  ...coreWebVitals,
  ...typescript,
  // Stylesheets: real CSS errors (typos, invalid values) with Tailwind 4
  // syntax (@theme, @apply, @custom-variant) understood. Only .css files;
  // inline style props are not covered.
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    languageOptions: { customSyntax: tailwind4 },
    extends: ['css/recommended'],
    rules: {
      'css/use-baseline': [
        'error',
        {
          // Both degrade safely where unsupported: backdrop-filter only drops
          // the blur behind an already translucent background; background-clip
          // text ships with its -webkit- fallback next to it.
          allowProperties: ['backdrop-filter'],
          allowPropertyValues: { 'background-clip': ['text'] },
        },
      ],
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'dist/**',
      'scripts/**',
      'next-env.d.ts',
    ],
  },
  {
    settings: { react: { version: reactVersion } },
  },
  {
    rules: {
      // Mount-guard + localStorage init on hydration is the idiomatic
      // React pattern (`useEffect(() => setMounted(true), [])`). The
      // react-hooks v6 rule flags it but it is intentional here.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  // Must stay last: turns off ESLint stylistic rules that conflict with
  // Prettier so formatting is owned solely by Prettier.
  prettier,
]);

export default eslintConfig;
