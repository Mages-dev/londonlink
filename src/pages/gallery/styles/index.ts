// Gallery section styles
// Import the CSS file to ensure styles are loaded
import "./gallery.css";

// Export style-related utilities and constants
export const GALLERY_STYLE_CLASSES = {
  // Grid layout
  grid: "gallery-grid",

  // Image container and effects
  imageContainer: "gallery-image-container",
  image: "gallery-image",
  overlay: "gallery-overlay",

  // Animations
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  scaleIn: "animate-scale-in",

  // Modal
  modalBackdrop: "gallery-modal-backdrop",
  modalContent: "gallery-modal-content",
  modalClose: "gallery-modal-close",
  modalImage: "gallery-modal-image",
} as const;

export type GalleryStyleClass = keyof typeof GALLERY_STYLE_CLASSES;

// Animation duration constants
export const GALLERY_ANIMATIONS = {
  fadeIn: "0.3s",
  fadeInUp: "0.6s",
  scaleIn: "0.3s",
  hover: "0.3s",
} as const;

// Grid configuration constants
export const GALLERY_GRID_CONFIG = {
  columns: 4,
  rows: 5,
  gapMobile: "0.5rem",
  gapDesktop: "1rem",
} as const;
