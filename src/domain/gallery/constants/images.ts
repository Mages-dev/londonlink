// Gallery section images configuration

// Generate image paths dynamically
const generateImagePaths = () => {
  const images = [];
  for (let i = 1; i <= 12; i++) {
    const paddedNumber = i.toString().padStart(6, '0');
    images.push({
      id: i,
      src: `/assets/images/gallery/screenshots/${paddedNumber}.jpg`,
      alt: `LondonLink platform screenshot ${i}`,
      title: `Platform Feature ${i}`,
    });
  }
  return images;
};

export const GALLERY_IMAGES = generateImagePaths();

// L-shape layout configuration
export const L_SHAPE_LAYOUT = {
  // Horizontal part of the L (top row)
  horizontal: {
    count: 7, // Number of images in horizontal part
    sizes: {
      large: 2, // Number of large images
      medium: 3, // Number of medium images  
      small: 2, // Number of small images
    }
  },
  // Vertical part of the L (right column)
  vertical: {
    count: 5, // Number of images in vertical part
    sizes: {
      large: 1,
      medium: 2,
      small: 2,
    }
  }
} as const;

// Image size classes for responsive design
export const IMAGE_SIZE_CLASSES = {
  large: {
    container: "col-span-2 row-span-2",
    image: "h-64 md:h-80 lg:h-96"
  },
  medium: {
    container: "col-span-1 row-span-2", 
    image: "h-48 md:h-64 lg:h-80"
  },
  small: {
    container: "col-span-1 row-span-1",
    image: "h-24 md:h-32 lg:h-40"
  }
} as const;

// Animation delays for staggered entrance
export const ANIMATION_DELAYS = [
  "delay-0", "delay-75", "delay-150", "delay-225", "delay-300",
  "delay-375", "delay-450", "delay-525", "delay-600", "delay-675",
  "delay-750", "delay-825"
] as const;
