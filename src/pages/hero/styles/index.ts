// Hero section styles
// Import the CSS file to ensure styles are loaded
import './hero.css';

// Export any style-related utilities or constants if needed in the future
export const HERO_STYLE_CLASSES = {
  iconFrame: 'hero-icon-frame',
  card: 'hero-card',
  advantagesGrid: 'hero-advantages-grid',
} as const;

export type HeroStyleClass = keyof typeof HERO_STYLE_CLASSES;
