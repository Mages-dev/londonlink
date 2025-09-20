// Goals section - Image constants

export const GOALS_ICONS = {
  travel: "/assets/images/goals/icons/travel.svg",
  business: "/assets/images/goals/icons/business.svg",
  exam: "/assets/images/goals/icons/exam.svg",
  conversation: "/assets/images/goals/icons/conversation.svg",
  career: "/assets/images/goals/icons/career.svg",
  deadline: "/assets/images/goals/icons/deadline.svg",
} as const;

export const GOALS_IMAGES = {
  goal1: "/assets/images/goals/previews/goal-1.jpg",
} as const;

export const GOALS_ICON_ALTS = {
  travel: {
    en: "Travel icon - English for tourism and travel",
    pt: "Ícone de viagem - Inglês para turismo e viagens",
  },
  business: {
    en: "Business icon - Professional English for business trips",
    pt: "Ícone de negócios - Inglês profissional para viagens de negócios",
  },
  exam: {
    en: "Exam icon - English exam preparation",
    pt: "Ícone de exame - Preparação para exames de inglês",
  },
  conversation: {
    en: "Conversation icon - English conversation practice",
    pt: "Ícone de conversação - Prática de conversação em inglês",
  },
  career: {
    en: "Career icon - Business English for career development",
    pt: "Ícone de carreira - Inglês para negócios e desenvolvimento profissional",
  },
  deadline: {
    en: "Deadline icon - Intensive English courses",
    pt: "Ícone de prazo - Cursos intensivos de inglês",
  },
} as const;

export const GOALS_IMAGE_ALTS = {
  goal1: {
    en: "Student achieving English language goals in London street",
    pt: "Estudante alcançando objetivos de inglês em rua de Londres",
  },
} as const;

export type GoalsIconKey = keyof typeof GOALS_ICONS;
export type GoalsImageKey = keyof typeof GOALS_IMAGES;
