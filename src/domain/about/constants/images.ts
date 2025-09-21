// About section - Image constants

export const ABOUT_IMAGES = {
  about1: "/assets/images/about/about-1.jpg",
  about2: "/assets/images/about/about-2.jpg",
  about3: "/assets/images/about/about-3.jpg",
} as const;

export const ABOUT_IMAGE_ALTS = {
  about1: {
    en: "LondonLink English learning platform overview with UK flag collage",
    pt: "Visão geral da plataforma de aprendizado de inglês LondonLink com colagem da bandeira do Reino Unido",
  },
  about2: {
    en: "LondonLink mission and teaching approach",
    pt: "Missão e abordagem de ensino do LondonLink",
  },
  about3: {
    en: "LondonLink community and learning results",
    pt: "Comunidade e resultados de aprendizado do LondonLink",
  },
} as const;

export type AboutImageKey = keyof typeof ABOUT_IMAGES;
