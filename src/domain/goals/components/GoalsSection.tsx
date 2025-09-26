"use client";

import Image from "next/image";
import { Language } from "@/types";
import { goalsTranslations } from "../translations";
import {
  GOALS_ICONS,
  GOALS_ICON_ALTS,
  GOALS_IMAGES,
  GOALS_IMAGE_ALTS,
} from "../constants/images";
import { CONTACT_INFO } from "@/domain/shared/constants/contacts";
import "../styles";

interface GoalsSectionProps {
  currentLanguage: Language;
}

export function GoalsSection({ currentLanguage }: GoalsSectionProps) {
  const t = goalsTranslations[currentLanguage];

  return (
    <section id="goals" className="section-bg-hero relative overflow-hidden">
      {/* Main Goals Section - Uses parent background */}
      <div className="relative py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
              {t.title}
            </h2>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
              {t.description}
            </p>
          </div>

          {/* Goals Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {t.goals.map((goal, index) => (
              <div
                key={index}
                className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 hover:bg-gray-800/90 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700/50"
              >
                {/* Mobile Layout: Icon and text side by side */}
                <div className="flex gap-6 md:block">
                  {/* Icon */}
                  <div className="goals-icon-frame flex-shrink-0 mb-4">
                    <Image
                      src={GOALS_ICONS[goal.icon as keyof typeof GOALS_ICONS]}
                      alt={
                        GOALS_ICON_ALTS[
                          goal.icon as keyof typeof GOALS_ICON_ALTS
                        ][currentLanguage]
                      }
                      width={29}
                      height={29}
                      className="w-7 h-7"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-yellow-400 mb-3 leading-tight">
                      {goal.title}
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {goal.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2 - Achievement Promise */}
      <div className="relative py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image - Left side */}
            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 shadow-2xl transform hover:scale-105 transition-transform duration-300 max-lg:w-[50%] max-md:w-[65%] max-lg:mx-auto">
                <div className="relative border-4 border-red-500 rounded-xl overflow-hidden">
                  <Image
                    src={GOALS_IMAGES.goal1}
                    alt={GOALS_IMAGE_ALTS.goal1[currentLanguage]}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Text Content - Right side */}
            <div className="text-white max-lg:text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {t.section2.title}
              </h2>
              <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
                {t.section2.description}
              </p>

              {/* CTA Button */}
              <div className="max-lg:text-center">
                <a
                  href={CONTACT_INFO.phone.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800/80 hover:bg-gray-800/90 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-700/50"
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
