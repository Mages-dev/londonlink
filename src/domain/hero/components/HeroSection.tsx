"use client";

import Image from "next/image";
import { Language } from "@/types";
import { HERO_IMAGES, HERO_IMAGE_ALTS } from "../constants/images";
import { heroTranslations } from "../translations";
import "../styles";
import { CONTACT_INFO } from "@/domain/shared/constants/contacts";
import { contactTranslations } from "@/domain/contact/translations";
import { useTheme } from "@/contexts";

interface HeroSectionProps {
  currentLanguage: Language;
}

export function HeroSection({ currentLanguage }: HeroSectionProps) {
  const t = heroTranslations[currentLanguage];
  const contactT = contactTranslations[currentLanguage];
  const { commemorativeTheme } = useTheme();

  // Check if seasonal themes are active
  const isHalloweenTheme = commemorativeTheme === "halloween";
  const isChristmasTheme = commemorativeTheme === "christmas";
  const isNewYearTheme = commemorativeTheme === "new-year";

  // WhatsApp configuration using shared constants
  const whatsappUrl = `${
    CONTACT_INFO.phone.whatsappUrl
  }?text=${encodeURIComponent(contactT.whatsappMessage)}`;

  return (
    <main id="home" className="flex-1 pt-28 pb-20 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: Stack vertically */}
        <div className="lg:hidden">
          {/* Text content for mobile */}
          <div className="text-center mb-12">
            <h1
              className={`text-3xl md:text-4xl font-bold text-white mb-4 ${
                isHalloweenTheme ? "halloween-text-glow" : ""
              } ${isChristmasTheme ? "christmas-text-glow" : ""} ${
                isNewYearTheme ? "newyear-text-glow" : ""
              }`}
            >
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              {t.subtitle}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block bg-white hover:bg-gray-100 text-blue-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl ${
                isHalloweenTheme ? "halloween-button halloween-glow" : ""
              } ${isChristmasTheme ? "christmas-button christmas-glow" : ""} ${
                isNewYearTheme ? "newyear-button newyear-glow" : ""
              }`}
            >
              {t.ctaButton}
            </a>
          </div>

          {/* Image for mobile - Larger */}
          <div className="flex justify-center -mx-4">
            <Image
              src={HERO_IMAGES.backgrounds.main}
              alt={HERO_IMAGE_ALTS.backgrounds.main}
              width={800}
              height={600}
              className="h-auto object-contain"
              style={{ width: "auto", maxWidth: "110%" }}
              priority
            />
          </div>
        </div>

        {/* Desktop: 2 containers layout - Image fills and overflows */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:items-center lg:min-h-[600px] lg:gap-0">
          {/* Text content container */}
          <div className="text-left pr-8 z-10">
            <h1
              className={`text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight ${
                isHalloweenTheme ? "halloween-text-glow" : ""
              } ${isChristmasTheme ? "christmas-text-glow" : ""} ${
                isNewYearTheme ? "newyear-text-glow" : ""
              }`}
            >
              {t.title}
            </h1>
            <p className="text-xl xl:text-2xl text-blue-100 mb-8 leading-relaxed">
              {t.subtitle}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block bg-white hover:bg-gray-100 text-blue-700 font-semibold py-4 px-10 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg ${
                isHalloweenTheme ? "halloween-button halloween-glow" : ""
              } ${isChristmasTheme ? "christmas-button christmas-glow" : ""} ${
                isNewYearTheme ? "newyear-button newyear-glow" : ""
              }`}
            >
              {t.ctaButton}
            </a>
          </div>

          {/* Image container - Fills completely and overflows */}
          <div className="relative overflow-hidden h-full flex items-center justify-center">
            <Image
              src={HERO_IMAGES.backgrounds.main}
              alt={HERO_IMAGE_ALTS.backgrounds.main}
              width={833}
              height={625}
              className="h-auto object-cover min-h-[357px]"
              style={{
                width: "89%",
                height: "auto",
                minHeight: "357px",
                objectFit: "cover",
              }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Advantages Section */}
      <div className="relative py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              {t.advantages.title}
            </h2>
          </div>

          {/* Advantages Cards Grid */}
          <div className="hero-advantages-grid">
            {t.advantages.cards.map((advantage, index) => (
              <div
                key={index}
                className={`hero-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 ${
                  isHalloweenTheme ? "halloween-card halloween-float" : ""
                }`}
              >
                {/* Mobile Layout: Icon and text side by side, Desktop: stacked */}
                <div className="flex gap-4 md:block">
                  {/* Icon */}
                  <div className="hero-icon-frame flex-shrink-0">
                    <Image
                      src={
                        HERO_IMAGES.advantages[
                          advantage.icon as keyof typeof HERO_IMAGES.advantages
                        ]
                      }
                      alt={
                        HERO_IMAGE_ALTS.advantages[
                          advantage.icon as keyof typeof HERO_IMAGE_ALTS.advantages
                        ]
                      }
                      width={29}
                      height={29}
                      className="w-7 h-7"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-white mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-blue-100">{advantage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Objectives Section */}
      <div className="relative py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              <span className="block">{t.courseObjectives.title}</span>
              <span className="block text-yellow-300">
                {t.courseObjectives.subtitle}
              </span>
            </h2>
            <p className="text-lg text-blue-100 mt-6 max-w-3xl mx-auto">
              {t.courseObjectives.description}
            </p>
          </div>

          {/* Course Objectives Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 justify-items-center">
            {t.courseObjectives.cards.map((objective, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col w-full max-w-[280px] sm:max-w-none h-60 sm:h-52"
              >
                {/* Image - Taller for mobile */}
                <div className="relative h-44 sm:h-36">
                  <Image
                    src={
                      HERO_IMAGES.courseObjectives[
                        objective.image as keyof typeof HERO_IMAGES.courseObjectives
                      ]
                    }
                    alt={
                      HERO_IMAGE_ALTS.courseObjectives[
                        objective.image as keyof typeof HERO_IMAGE_ALTS.courseObjectives
                      ]
                    }
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title - Increased spacing and centered */}
                <div className="flex-1 flex items-center justify-center px-4 py-3">
                  <h3 className="font-bold text-gray-800 text-center text-sm leading-relaxed">
                    {objective.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enroll Now Section */}
      <div className="relative py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Background Image Container - Simplified approach */}
          <div
            className="relative rounded-3xl aspect-square bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${HERO_IMAGES.backgrounds.enrollNow})`,
            }}
          >
            {/* Blue overlay */}
            <div className="absolute inset-0 bg-blue-600/60 rounded-3xl"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 py-8">
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                {t.enrollNow.title}
              </h2>

              {/* CTA Button */}
              <div className="mb-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-base md:text-lg"
                >
                  {t.enrollNow.buttonText}
                </a>
              </div>

              {/* Description */}
              <div className="max-w-xl lg:max-w-2xl mx-auto">
                <p className="text-sm sm:text-base lg:text-lg text-white mb-1">
                  {t.enrollNow.description}
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-white">
                  {t.enrollNow.subDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
