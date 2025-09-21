import { OptimizedImage } from "@/domain/shared";
import { HERO_IMAGES, HERO_IMAGE_ALTS } from "../constants/images";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main background image */}
      <OptimizedImage
        src={HERO_IMAGES.backgrounds.main}
        alt={HERO_IMAGE_ALTS.backgrounds.main}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-blue-700/80 to-blue-800/80" />

      {/* Floating illustration elements */}
      <div className="absolute top-10 right-10 hidden lg:block">
        <OptimizedImage
          src={HERO_IMAGES.illustrations.floatingElements}
          alt={HERO_IMAGE_ALTS.illustrations.floatingElements}
          width={200}
          height={200}
          className="opacity-20 animate-pulse"
        />
      </div>
    </div>
  );
}
