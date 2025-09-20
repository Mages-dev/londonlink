// Hero section images
export const HERO_IMAGES = {
  backgrounds: {
    main: "/assets/images/hero/backgrounds/hero.png",
    mobile: "/assets/images/hero/backgrounds/hero.png",
    gradient: "/assets/images/hero/backgrounds/hero.png",
  },
  features: {
    books: "/assets/images/hero/features/interactive-books.svg",
    learning: "/assets/images/hero/features/personalized-learning.svg",
    progress: "/assets/images/hero/features/progress-tracking.svg",
  },
  illustrations: {
    mainIllustration: "/assets/images/hero/illustrations/hero-main.svg",
    floatingElements: "/assets/images/hero/illustrations/floating-elements.svg",
  },
} as const;

// Image alt texts for accessibility
export const HERO_IMAGE_ALTS = {
  backgrounds: {
    main: 'LondonLink hero background with English learning theme',
    mobile: 'Mobile optimized hero background',
    gradient: 'Gradient overlay for better text readability'
  },
  features: {
    books: 'Interactive books icon representing digital learning materials',
    learning: 'Personalized learning icon showing adaptive education',
    progress: 'Progress tracking icon displaying learning analytics'
  },
  illustrations: {
    mainIllustration: 'Main hero illustration showing English learning journey',
    floatingElements: 'Decorative floating elements for visual appeal'
  }
} as const;
