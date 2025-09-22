// Feedbacks section styles
// Import the CSS file to ensure styles are loaded
import './feedbacks.css';

// Export any style-related utilities or constants if needed in the future
export const FEEDBACKS_STYLE_CLASSES = {
  testimonialCard: 'testimonial-card',
  starRating: 'star-rating',
  starIcon: 'star-icon',
  quoteIcon: 'quote-icon',
  testimonialText: 'testimonial-text',
  statNumber: 'stat-number',
  verifiedBadge: 'verified-badge',
  carouselNav: 'carousel-nav',
  carouselPrev: 'carousel-nav prev',
  carouselNext: 'carousel-nav next',
} as const;

export type FeedbacksStyleClass = keyof typeof FEEDBACKS_STYLE_CLASSES;
