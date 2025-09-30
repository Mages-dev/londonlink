"use client";

import { Language } from "@/types";
import { OptimizedImage } from "@/domain/shared";
import { FEEDBACK_IMAGES, FEEDBACK_IMAGE_ALTS } from "../constants/images";
import { feedbackTranslations } from "../translations";

interface FeedbackAlternatingSectionProps {
  currentLanguage: Language;
}

export function FeedbackAlternatingSection({
  currentLanguage,
}: FeedbackAlternatingSectionProps) {
  const t = feedbackTranslations[currentLanguage];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`star-icon text-2xl ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section id="feedback" className="relative py-16 section-bg-hero">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white font-light mb-4">
            {t.subtitle}
          </p>
          <p className="text-base md:text-lg text-white max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Alternating Testimonials */}
        <div className="space-y-16">
          {t.testimonials.map((testimonial, index) => {
            const imageKey =
              testimonial.id as keyof typeof FEEDBACK_IMAGES.testimonials;
            const currentImage = FEEDBACK_IMAGES.testimonials[imageKey];
            const currentAlt = FEEDBACK_IMAGE_ALTS.testimonials[imageKey];
            const isEven = index % 2 === 0;

            return (
              <div
                key={testimonial.id}
                className={`flex flex-col ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-8 md:gap-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl transition-all duration-300 hover:bg-white/15 hover:shadow-3xl`}
              >
                {/* Student Photo */}
                <div className="w-full md:w-auto flex justify-center md:min-w-[300px]">
                  {currentImage ? (
                    <OptimizedImage
                      src={currentImage}
                      alt={currentAlt}
                      width={300}
                      height={400}
                      className="w-full max-w-[225px] sm:max-w-[300px] md:max-w-[255px] h-[300px] sm:h-[400px] md:h-[340px] object-cover rounded-lg shadow-lg border-4 border-red-500 transition-all duration-500 ease-in-out"
                    />
                  ) : (
                    <div className="w-full max-w-[203px] sm:max-w-[270px] md:max-w-[230px] h-[300px] sm:h-[400px] md:h-[340px] bg-gray-500 rounded-lg shadow-lg border-4 border-white transition-all duration-500 ease-in-out flex items-center justify-center">
                      <svg
                        className="w-24 sm:w-32 md:w-28 h-24 sm:h-32 md:h-28 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 w-full text-center md:text-left">
                  {/* Name and Stars */}
                  <div className="mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {testimonial.name}
                    </h3>
                    <div className="star-rating flex justify-center md:justify-start">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-base md:text-lg lg:text-xl text-white italic leading-relaxed">
                    <span className="text-4xl text-white leading-none">
                      &ldquo;
                    </span>
                    {testimonial.text}
                    <span className="text-4xl text-white leading-none">
                      &rdquo;
                    </span>
                  </blockquote>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
