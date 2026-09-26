'use client';

import Image from 'next/image';
import { Language } from '@/types';
import { aboutTranslations } from '../translations';
import { ABOUT_IMAGES, ABOUT_IMAGE_ALTS } from '../constants/images';

interface AboutSectionProps {
  currentLanguage: Language;
}

export function AboutSection({ currentLanguage }: AboutSectionProps) {
  const t = aboutTranslations[currentLanguage];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-bg-contact overflow-hidden"
    >
      {/* Section 1 - Main Introduction */}
      <div className="relative py-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Text Content */}
            <div>
              <h2
                id="about-heading"
                className="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:text-5xl dark:text-white"
              >
                {t.section1.title}
              </h2>
              <p className="text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300">
                {t.section1.description}
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative transform rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                <div className="relative overflow-hidden rounded-xl border-4 border-red-500">
                  <Image
                    src={ABOUT_IMAGES.about1}
                    alt={ABOUT_IMAGE_ALTS.about1[currentLanguage]}
                    width={600}
                    height={400}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 - Philosophy */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-5">
            {/* Image - Left side on desktop */}
            <div className="order-2 lg:order-1 lg:col-span-2">
              <div className="relative sticky top-8 transform rounded-2xl bg-white/10 p-2 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                <div className="relative overflow-hidden rounded-xl border-4 border-red-500">
                  <Image
                    src={ABOUT_IMAGES.about2}
                    alt={ABOUT_IMAGE_ALTS.about2[currentLanguage]}
                    width={600}
                    height={400}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Text Content - Right side on desktop */}
            <div className="order-1 lg:order-2 lg:col-span-3">
              <h2 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                {t.section2.title}
              </h2>
              <div className="space-y-6">
                {t.section2.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 - History */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-5">
            {/* Text Content */}
            <div className="lg:col-span-3">
              <h2 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                {t.section3.title}
              </h2>
              <div className="space-y-6">
                {t.section3.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative lg:col-span-2">
              <div className="relative sticky top-8 transform rounded-2xl bg-white/10 p-2 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                <div className="relative overflow-hidden rounded-xl border-4 border-red-500">
                  <Image
                    src={ABOUT_IMAGES.about3}
                    alt={ABOUT_IMAGE_ALTS.about3[currentLanguage]}
                    width={600}
                    height={400}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
