// Goals section styles
// Import the CSS file to ensure styles are loaded
import './goals.css';

// Export any style-related utilities or constants if needed in the future
export const GOALS_STYLE_CLASSES = {
  iconFrame: 'goals-icon-frame',
  card: 'goals-card',
  grid: 'goals-grid',
} as const;

export type GoalsStyleClass = keyof typeof GOALS_STYLE_CLASSES;
