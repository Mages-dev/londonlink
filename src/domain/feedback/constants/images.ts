// Feedback section images
export const FEEDBACK_IMAGES = {
  testimonials: {
    michelleMedeiros: "/assets/images/feedback/students/MichelleMedeiros.jpg",
    rodolphoNiceto: "/assets/images/feedback/students/RodolphoNiceto.jpg",
    henriqueMenezes: "/assets/images/feedback/students/HenriqueMenezes.jpg",
    aylaReis: "/assets/images/feedback/students/AylaReis.jpg",
    karlaNaves: null, // No photo available
    ceilaLopes: null, // No photo available
  },
  backgrounds: {
    feedbackHero: "/assets/images/feedback/backgrounds/feedback-hero.jpg",
    testimonialsBg: "/assets/images/feedback/backgrounds/testimonials-bg.jpg",
  },
  icons: {
    star: "/assets/images/feedback/icons/star.svg",
    quote: "/assets/images/feedback/icons/quote.svg",
    verified: "/assets/images/feedback/icons/verified.svg",
  },
} as const;

export const FEEDBACK_IMAGE_ALTS = {
  testimonials: {
    michelleMedeiros: "Student testimonial - Michelle Medeiros",
    rodolphoNiceto: "Student testimonial - Rodolpho Niceto",
    henriqueMenezes: "Student testimonial - Henrique Menezes",
    aylaReis: "Student testimonial - Ayla Reis",
    karlaNaves: "Student testimonial - Karla Naves",
    ceilaLopes: "Student testimonial - Ceila Lopes",
  },
  backgrounds: {
    feedbackHero: "Feedback section hero background",
    testimonialsBg: "Testimonials background image",
  },
  icons: {
    star: "Rating star icon",
    quote: "Quote icon for testimonials",
    verified: "Verified student icon",
  },
} as const;
