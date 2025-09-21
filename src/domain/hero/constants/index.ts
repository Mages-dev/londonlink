import { HeroFeature } from '../types';

export const HERO_FEATURES: HeroFeature[] = [
  {
    icon: "📚",
    title: "Interactive Books",
    description: "Livros interativos para aprendizado prático",
    bgColor: "bg-primary-100 dark:bg-primary-900",
    iconColor: "text-primary-600 dark:text-primary-400"
  },
  {
    icon: "🎯", 
    title: "Personalized Learning",
    description: "Aprendizado personalizado para seu nível",
    bgColor: "bg-secondary-100 dark:bg-secondary-900",
    iconColor: "text-secondary-600 dark:text-secondary-400"
  },
  {
    icon: "🌟",
    title: "Progress Tracking", 
    description: "Acompanhe seu progresso em tempo real",
    bgColor: "bg-accent-100 dark:bg-accent-900",
    iconColor: "text-accent-600 dark:text-accent-400"
  }
];

export const HERO_ANIMATION_DURATION = 200;
export const HERO_GRID_BREAKPOINT = 'md:grid-cols-3';
