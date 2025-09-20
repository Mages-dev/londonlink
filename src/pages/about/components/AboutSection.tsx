"use client";

import Image from "next/image";
import { Language } from "@/types";
import { aboutTranslations } from "../translations";
import { ABOUT_IMAGES, ABOUT_IMAGE_ALTS } from "../constants/images";

interface AboutSectionProps {
  currentLanguage: Language;
}

export function AboutSection({ currentLanguage }: AboutSectionProps) {
  const t = aboutTranslations[currentLanguage];

  return (
    <section
      id="about"
      className="relative py-20 bg-white dark:bg-slate-800 overflow-hidden"
    >
      {/* Section 1 - Main Introduction */}
      <div className="relative py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {t.section1.title}
              </h2>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
                {t.section1.description}
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <Image
                  src={ABOUT_IMAGES.about1}
                  alt={ABOUT_IMAGE_ALTS.about1[currentLanguage]}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 - Philosophy */}
      <div className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Image - Left side on desktop */}
            <div className="order-2 lg:order-1 lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 sticky top-8">
                <Image
                  src={ABOUT_IMAGES.about2}
                  alt={ABOUT_IMAGE_ALTS.about2[currentLanguage]}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Text Content - Right side on desktop */}
            <div className="order-1 lg:order-2 lg:col-span-3">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {t.section2.title}
              </h3>
              <div className="space-y-6">
                {t.section2.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
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
      <div className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Text Content */}
            <div className="lg:col-span-3">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                {t.section3.title}
              </h3>
              <div className="space-y-6">
                {t.section3.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300 sticky top-8">
                <Image
                  src={ABOUT_IMAGES.about3}
                  alt={ABOUT_IMAGE_ALTS.about3[currentLanguage]}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
