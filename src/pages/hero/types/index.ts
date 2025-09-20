export interface HeroFeature {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
  features: HeroFeature[];
}
