/**
 * Prettier config. The goal is code that people and coding agents read the
 * same way every time: one canonical layout, so a diff shows only what changed
 * and the shape of the code carries no noise.
 *
 * - Prettier's defaults are kept everywhere else (semicolons, trailing commas,
 *   2-space indent, LF, parenthesized arrow params), so the layout is stock
 *   Prettier, not a local variant. Only the differences are listed below.
 * - printWidth 100: room for typed signatures and JSX props without folding
 *   every call over several lines. It is a target, not a limit — long strings
 *   such as Tailwind class lists are never broken.
 * - singleQuote: the convention the codebase already had (JSX attributes keep
 *   double quotes).
 * - prettier-plugin-tailwindcss sorts `className` classes into Tailwind's
 *   canonical order and drops duplicates and stray whitespace, so the same set
 *   of classes always reads the same. `tailwindStylesheet` points at the CSS
 *   entry (Tailwind 4 has no JS config) so the theme's custom utilities sort
 *   correctly. Class order does not change the generated CSS.
 * - Markdown is not formatted (.prettierignore): Prettier pads table columns,
 *   inflating CLAUDE.md and the skills that agents read every session.
 *
 * @type {import('prettier').Config}
 */
const config = {
  printWidth: 100,
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/app/globals.css',
};

export default config;
