/** @type {import("prettier").Config} */
export default {
  // Adiciona ponto-e-vírgula no final das instruções.
  semi: true,

  // Usa aspas simples em strings (JSX mantém aspas duplas por padrão).
  singleQuote: true,

  // Vírgula final em listas/objetos multilinha, inclusive em parâmetros de função.
  trailingComma: 'all',

  // Largura máxima da linha antes do Prettier tentar quebrar.
  printWidth: 80,

  // Número de espaços por nível de indentação.
  tabWidth: 2,

  // Sempre envolve parâmetros de arrow function em parênteses: (x) => x.
  arrowParens: 'always',

  // Quebra de linha LF (Unix), evita divergências entre SOs.
  endOfLine: 'lf',
};
