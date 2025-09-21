// Books section styles
// Import the CSS file to ensure styles are loaded
import './books.css';

// Export any style-related utilities or constants if needed in the future
export const BOOKS_STYLE_CLASSES = {
  perspective1000: 'perspective-1000',
  rotateY12: 'rotate-y-12',
  rotateYNeg12: 'rotate-y-\\[-12deg\\]',
  transformGpu: 'transform-gpu',
  shadow3xl: 'shadow-3xl',
} as const;

export type BooksStyleClass = keyof typeof BOOKS_STYLE_CLASSES;
