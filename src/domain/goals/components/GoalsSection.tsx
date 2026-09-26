'use client';

import Image from 'next/image';
import { Language } from '@/types';
import { goalsTranslations } from '../translations';
import { GOALS_ICONS, GOALS_ICON_ALTS, GOALS_IMAGES, GOALS_IMAGE_ALTS } from '../constants/images';
import { CONTACT_INFO } from '@/domain/shared/constants/contacts';
import '../styles';

interface GoalsSectionProps {
  currentLanguage: Language;
}

export function GoalsSection({ currentLanguage }: GoalsSectionProps) {
  const t = goalsTranslations[currentLanguage];

  return (
    <section
      id="goals"
      aria-labelledby="goals-heading"
      className="section-bg-hero relative overflow-hidden"
    >
      {/* Main Goals Section - Uses parent background */}
      <div className="relative py-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="mb-12 text-center">
            <h2
              id="goals-heading"
              className="mx-auto mb-6 max-w-4xl text-3xl leading-tight font-bold text-white md:text-4xl lg:text-5xl"
            >
              {t.title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-blue-100 md:text-xl">
              {t.description}
            </p>
          </div>

          {/* Goals Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {t.goals.map((goal, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-700/50 bg-gray-800/80 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-gray-800/90 hover:shadow-xl"
              >
                {/* Mobile Layout: Icon and text side by side */}
                <div className="flex gap-6 md:block">
                  {/* Icon */}
                  <div className="goals-icon-frame mb-4 flex-shrink-0">
                    <Image
                      src={GOALS_ICONS[goal.icon as keyof typeof GOALS_ICONS]}
                      alt={
                        GOALS_ICON_ALTS[goal.icon as keyof typeof GOALS_ICON_ALTS][currentLanguage]
                      }
                      width={29}
                      height={29}
                      className="h-7 w-7"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="mb-3 text-xl leading-tight font-semibold text-yellow-400">
                      {goal.title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-300">{goal.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2 - Achievement Promise */}
      <div className="relative py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* Image - Left side */}
            <div className="relative">
              <div className="relative transform rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm transition-transform duration-300 hover:scale-105 max-lg:mx-auto max-lg:w-[50%] max-md:w-[65%]">
                <div className="relative overflow-hidden rounded-xl border-4 border-red-500">
                  <Image
                    src={GOALS_IMAGES.goal1}
                    alt={GOALS_IMAGE_ALTS.goal1[currentLanguage]}
                    width={600}
                    height={400}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Text Content - Right side */}
            <div className="text-white max-lg:text-center">
              <h2 className="mb-6 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
                {t.section2.title}
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-blue-100 md:text-xl">
                {t.section2.description}
              </p>

              {/* CTA Button */}
              <div className="max-lg:text-center">
                <a
                  href={CONTACT_INFO.phone.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-gray-700/50 bg-gray-800/80 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800/90 hover:shadow-xl"
                >
                  {t.section2.ctaButton}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
