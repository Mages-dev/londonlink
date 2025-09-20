"use client";

import Image from "next/image";
import { Language } from "@/types";
import { HERO_IMAGES, HERO_IMAGE_ALTS } from "../constants/images";
import { heroTranslations } from "../translations";
import { CONTACT_INFO } from "@/pages/shared/constants/contacts";
import { contactTranslations } from "@/pages/contact/translations";

interface HeroSectionProps {
  currentLanguage: Language;
}

export function HeroSection({ currentLanguage }: HeroSectionProps) {
  const t = heroTranslations[currentLanguage];
  const contactT = contactTranslations[currentLanguage];

  // WhatsApp configuration using shared constants
  const whatsappUrl = `${
    CONTACT_INFO.phone.whatsappUrl
  }?text=${encodeURIComponent(contactT.whatsappMessage)}`;

  return (
    <main id="home" className="flex-1 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Stack vertically */}
        <div className="lg:hidden">
          {/* Text content for mobile */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6 leading-relaxed max-w-2xl mx-auto">
              {t.subtitle}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-gray-100 text-blue-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {t.ctaButton}
            </a>
          </div>

          {/* Image for mobile */}
          <div className="flex justify-center">
            <Image
              src={HERO_IMAGES.backgrounds.main}
              alt={HERO_IMAGE_ALTS.backgrounds.main}
              width={600}
              height={450}
              className="h-auto object-contain"
              style={{ width: "auto", maxWidth: "90%" }}
              priority
            />
          </div>
        </div>

        {/* Desktop: Side by side layout - Equal prominence */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:min-h-[500px]">
          {/* Text content - 50% */}
          <div className="text-left">
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-xl xl:text-2xl text-blue-100 mb-8 leading-relaxed">
              {t.subtitle}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white hover:bg-gray-100 text-blue-700 font-semibold py-4 px-10 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
            >
              {t.ctaButton}
            </a>
          </div>

          {/* Image - 50% (Equal prominence) */}
          <div className="flex justify-center lg:justify-end items-center">
            <Image
              src={HERO_IMAGES.backgrounds.main}
              alt={HERO_IMAGE_ALTS.backgrounds.main}
              width={800}
              height={600}
              className="h-auto object-contain"
              style={{ width: "auto", maxWidth: "100%" }}
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
