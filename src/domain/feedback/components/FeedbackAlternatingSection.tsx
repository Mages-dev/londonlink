'use client';

import { Language } from '@/types';
import { OptimizedImage } from '@/domain/shared';
import { FEEDBACK_IMAGES, FEEDBACK_IMAGE_ALTS } from '../constants/images';
import { feedbackTranslations } from '../translations';

interface FeedbackAlternatingSectionProps {
  currentLanguage: Language;
}

export function FeedbackAlternatingSection({ currentLanguage }: FeedbackAlternatingSectionProps) {
  const t = feedbackTranslations[currentLanguage];

  const renderStars = (rating: number) => {
    const label = currentLanguage === 'pt' ? `${rating} de 5 estrelas` : `${rating} out of 5 stars`;
    return (
      <span role="img" aria-label={label}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`star-icon text-2xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  return (
    <section
      id="feedback"
      aria-labelledby="feedback-heading"
      className="section-bg-hero relative py-16"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2
            id="feedback-heading"
            className="mb-4 text-3xl leading-tight font-bold text-white md:text-4xl lg:mb-6 lg:text-5xl xl:text-6xl"
          >
            {t.title}
          </h2>
          <p className="mb-4 text-lg font-light text-white md:text-xl lg:text-2xl">{t.subtitle}</p>
          <p className="mx-auto max-w-3xl text-base text-white md:text-lg">{t.description}</p>
        </div>

        {/* Alternating Testimonials */}
        <div className="space-y-16">
          {t.testimonials.map((testimonial, index) => {
            const imageKey = testimonial.id as keyof typeof FEEDBACK_IMAGES.testimonials;
            const currentImage = FEEDBACK_IMAGES.testimonials[imageKey];
            const currentAlt = FEEDBACK_IMAGE_ALTS.testimonials[imageKey];
            const isEven = index % 2 === 0;

            return (
              <div
                key={testimonial.id}
                className={`flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } hover:shadow-3xl items-center gap-8 rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:bg-white/15 md:gap-12`}
              >
                {/* Student Photo */}
                <div className="flex w-full justify-center md:w-auto md:min-w-[300px]">
                  {currentImage ? (
                    <OptimizedImage
                      src={currentImage}
                      alt={currentAlt}
                      width={300}
                      height={400}
                      className="h-[300px] w-full max-w-[225px] rounded-lg border-4 border-red-500 object-cover shadow-lg transition-all duration-500 ease-in-out sm:h-[400px] sm:max-w-[300px] md:h-[340px] md:max-w-[255px]"
                    />
                  ) : (
                    <div className="flex h-[300px] w-full max-w-[203px] items-center justify-center rounded-lg border-4 border-white bg-gray-500 shadow-lg transition-all duration-500 ease-in-out sm:h-[400px] sm:max-w-[270px] md:h-[340px] md:max-w-[230px]">
                      <svg
                        aria-hidden="true"
                        className="h-24 w-24 text-white sm:h-32 sm:w-32 md:h-28 md:w-28"
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
                <div className="w-full flex-1 text-center md:text-left">
                  {/* Name and Stars */}
                  <div className="mb-4">
                    <h3 className="mb-2 text-2xl font-bold text-white md:text-3xl">
                      {testimonial.name}
                    </h3>
                    <div className="star-rating flex justify-center md:justify-start">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-base leading-relaxed text-white italic md:text-lg lg:text-xl">
                    <span className="text-4xl leading-none text-white">&ldquo;</span>
                    {testimonial.text}
                    <span className="text-4xl leading-none text-white">&rdquo;</span>
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
