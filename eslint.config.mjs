import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
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
];

export default eslintConfig;
