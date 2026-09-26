'use client';

import Image from 'next/image';
import { Language } from '@/types';
import { HERO_IMAGES, HERO_IMAGE_ALTS } from '../constants/images';
import { heroTranslations } from '../translations';
import '../styles';
import { CONTACT_INFO } from '@/domain/shared/constants/contacts';
import { contactTranslations } from '@/domain/contact/translations';
import { useTheme } from '@/contexts';

interface HeroSectionProps {
  currentLanguage: Language;
}

export function HeroSection({ currentLanguage }: HeroSectionProps) {
  const t = heroTranslations[currentLanguage];
  const contactT = contactTranslations[currentLanguage];
  const { commemorativeTheme } = useTheme();

  // Check if seasonal themes are active
  const isCarnivalTheme = commemorativeTheme === 'carnival';
  const isValentineTheme = commemorativeTheme === 'valentine';
  const isEasterTheme = commemorativeTheme === 'easter';
  const isHalloweenTheme = commemorativeTheme === 'halloween';
  const isChristmasTheme = commemorativeTheme === 'christmas';
  const isNewYearTheme = commemorativeTheme === 'new-year';

  // WhatsApp configuration using shared constants
  const whatsappUrl = `${
    CONTACT_INFO.phone.whatsappUrl
  }?text=${encodeURIComponent(contactT.whatsappMessage)}`;

  return (
    <section id="home" aria-label={t.title} className="flex-1 pt-32 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile: Stack vertically */}
        <div className="lg:hidden">
          {/* Text content for mobile */}
          <div className="mb-12 text-center">
            <h1
              className={`mb-4 text-3xl font-bold text-white md:text-4xl ${
                isCarnivalTheme ? 'carnival-text-glow' : ''
              } ${isValentineTheme ? 'valentine-text-glow' : ''} ${
                isEasterTheme ? 'easter-text-glow' : ''
              } ${isHalloweenTheme ? 'halloween-text-glow' : ''} ${
                isChristmasTheme ? 'christmas-text-glow' : ''
              } ${isNewYearTheme ? 'newyear-text-glow' : ''}`}
            >
              {t.title}
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-blue-100 md:text-xl">
              {t.subtitle}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block rounded-lg bg-yellow-400 px-8 py-3 font-semibold tracking-wide text-blue-900 shadow-lg transition-colors duration-200 hover:bg-yellow-500 hover:shadow-xl ${
                isCarnivalTheme ? 'carnival-button carnival-glow' : ''
              } ${isValentineTheme ? 'valentine-button valentine-glow' : ''} ${
                isEasterTheme ? 'easter-button easter-glow' : ''
              } ${isHalloweenTheme ? 'halloween-button halloween-glow' : ''} ${
                isChristmasTheme ? 'christmas-button christmas-glow' : ''
              } ${isNewYearTheme ? 'newyear-button newyear-glow' : ''}`}
            >
              {t.ctaButton}
            </a>
          </div>

          {/* Image for mobile - Larger */}
          <div className="-mx-4 flex justify-center">
            <Image
              src={HERO_IMAGES.backgrounds.main}
              alt={HERO_IMAGE_ALTS.backgrounds.main}
              width={800}
              height={600}
              className="h-auto object-contain"
              style={{ width: 'auto', maxWidth: '110%' }}
              priority
            />
          </div>
        </div>

        {/* Desktop: 2 containers layout - Image fills and overflows */}
        <div className="hidden lg:grid lg:min-h-[600px] lg:grid-cols-2 lg:items-center lg:gap-0">
          {/* Text content container */}
          <div className="z-10 pr-8 text-left">
            <h1
              className={`mb-6 text-4xl leading-tight font-bold text-white xl:text-5xl ${
                isCarnivalTheme ? 'carnival-text-glow' : ''
              } ${isValentineTheme ? 'valentine-text-glow' : ''} ${
                isEasterTheme ? 'easter-text-glow' : ''
              } ${isHalloweenTheme ? 'halloween-text-glow' : ''} ${
                isChristmasTheme ? 'christmas-text-glow' : ''
              } ${isNewYearTheme ? 'newyear-text-glow' : ''}`}
            >
              {t.title}
            </h1>
            <p className="mb-8 text-xl leading-relaxed text-blue-100 xl:text-2xl">{t.subtitle}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block rounded-lg bg-yellow-400 px-10 py-4 text-lg font-semibold tracking-wide text-blue-900 shadow-lg transition-colors duration-200 hover:bg-yellow-500 hover:shadow-xl ${
                isCarnivalTheme ? 'carnival-button carnival-glow' : ''
              } ${isValentineTheme ? 'valentine-button valentine-glow' : ''} ${
                isEasterTheme ? 'easter-button easter-glow' : ''
              } ${isHalloweenTheme ? 'halloween-button halloween-glow' : ''} ${
                isChristmasTheme ? 'christmas-button christmas-glow' : ''
              } ${isNewYearTheme ? 'newyear-button newyear-glow' : ''}`}
            >
              {t.ctaButton}
            </a>
          </div>

          {/* Image container - Fills completely and overflows */}
          <div className="relative flex h-full items-center justify-center overflow-hidden">
            <Image
              src={HERO_IMAGES.backgrounds.main}
              alt={HERO_IMAGE_ALTS.backgrounds.main}
              width={700}
              height={625}
              className="h-auto min-h-[357px] object-cover"
              style={{
                width: '89%',
                height: 'auto',
                minHeight: '357px',
                objectFit: 'cover',
              }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Advantages Section */}
      <div className="relative py-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              {t.advantages.title}
            </h2>
          </div>

          {/* Advantages Cards Grid */}
          <div className="hero-advantages-grid">
            {t.advantages.cards.map((advantage, index) => (
              <div
                key={index}
                className={`hero-card rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                  isHalloweenTheme ? 'halloween-card halloween-float' : ''
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
                      className="h-7 w-7"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="mb-2 font-bold text-yellow-400">{advantage.title}</h3>
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
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              <span className="block">{t.courseObjectives.title}</span>
              <span className="block text-yellow-300">{t.courseObjectives.subtitle}</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">
              {t.courseObjectives.description}
            </p>
          </div>

          {/* Course Objectives Cards Grid */}
          <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {t.courseObjectives.cards.map((objective, index) => (
              <div
                key={index}
                className="flex h-60 w-full max-w-[280px] flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:h-52 sm:max-w-none"
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
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Title - Increased spacing and centered */}
                <div className="flex flex-1 items-center justify-center px-4 py-3">
                  <h3 className="text-center text-sm leading-relaxed font-bold text-gray-800">
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
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Background Image Container - Simplified approach */}
          <div
            className="relative aspect-square rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${HERO_IMAGES.backgrounds.enrollNow})`,
            }}
          >
            {/* Teal overlay */}
            <div className="absolute inset-0 rounded-3xl bg-teal-600/60"></div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 py-10 text-center sm:px-10">
              {/* Title */}
              <h2 className="mb-7 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {t.enrollNow.title}
              </h2>

              {/* CTA Button */}
              <div className="mb-7">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg bg-yellow-400 px-7 py-4 text-lg font-semibold text-blue-900 shadow-lg transition-colors duration-200 hover:bg-yellow-500 hover:shadow-xl md:px-10 md:py-5 md:text-xl"
                >
                  {t.enrollNow.buttonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
