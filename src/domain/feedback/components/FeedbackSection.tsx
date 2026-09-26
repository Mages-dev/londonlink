'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/types';
import { OptimizedImage } from '@/domain/shared';
import { CONTACT_INFO } from '@/domain/shared/constants/contacts';
import { FEEDBACK_IMAGES, FEEDBACK_IMAGE_ALTS } from '../constants/images';
import { feedbackTranslations } from '../translations';

interface FeedbackSectionProps {
  currentLanguage: Language;
}

export function FeedbackSection({ currentLanguage }: FeedbackSectionProps) {
  const t = feedbackTranslations[currentLanguage];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate testimonials every 8s. Pause on user request and honor
  // prefers-reduced-motion (WCAG 2.2.2 Pause, Stop, Hide).
  useEffect(() => {
    if (isPaused) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [t.testimonials.length, isPaused]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + t.testimonials.length) % t.testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating: number) => {
    const label = currentLanguage === 'pt' ? `${rating} de 5 estrelas` : `${rating} out of 5 stars`;
    return (
      <span role="img" aria-label={label}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={`star-icon text-4xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  const pauseLabel =
    currentLanguage === 'pt'
      ? isPaused
        ? 'Retomar rotação automática'
        : 'Pausar rotação automática'
      : isPaused
        ? 'Resume auto-rotation'
        : 'Pause auto-rotation';
  const navLabels =
    currentLanguage === 'pt'
      ? { prev: 'Depoimento anterior', next: 'Próximo depoimento' }
      : { prev: 'Previous testimonial', next: 'Next testimonial' };

  return (
    <section
      id="feedback"
      aria-labelledby="feedback-heading"
      className="section-bg-hero relative overflow-hidden py-16"
    >
      {/* Uses parent background - no additional gradient needed */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2
            id="feedback-heading"
            className="mb-4 text-3xl leading-tight font-bold text-white md:text-4xl lg:mb-6 lg:text-5xl xl:text-6xl"
          >
            {t.title}
          </h2>
          <p className="mb-4 text-lg font-light text-teal-100 md:text-xl lg:text-2xl">
            {t.subtitle}
          </p>
          <p className="mx-auto max-w-3xl text-base text-teal-200 md:text-lg">{t.description}</p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-20">
          <div className="relative mx-auto flex min-h-[450px] max-w-6xl flex-col rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-sm">
            {/* Quote Icon */}
            <div className="quote-icon">&ldquo;</div>

            {/* Current Testimonial */}
            <div
              aria-live="polite"
              aria-atomic="true"
              className="testimonial-text flex flex-1 items-center py-4"
            >
              <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-center">
                {/* Student Photo - Left Side on desktop, centered on mobile */}
                <div className="flex w-full justify-center md:w-auto md:min-w-[162px]">
                  {(() => {
                    const testimonial = t.testimonials[currentTestimonial];
                    const imageKey = testimonial.id as keyof typeof FEEDBACK_IMAGES.testimonials;
                    const currentImage = FEEDBACK_IMAGES.testimonials[imageKey];
                    const currentAlt = FEEDBACK_IMAGE_ALTS.testimonials[imageKey];

                    if (currentImage) {
                      return (
                        <OptimizedImage
                          src={currentImage}
                          alt={currentAlt}
                          width={200}
                          height={250}
                          className="h-60 w-[162px] rounded-lg border-4 border-red-600 object-cover shadow-lg transition-all duration-500 ease-in-out"
                        />
                      );
                    } else {
                      // Placeholder for students without photos
                      return (
                        <div className="flex h-60 w-[162px] items-center justify-center rounded-lg border-4 border-white bg-gray-500 shadow-lg transition-all duration-500 ease-in-out">
                          <svg
                            aria-hidden="true"
                            className="h-32 w-32 text-white"
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
                      );
                    }
                  })()}
                </div>

                {/* Testimonial Content - Right Side on desktop, centered on mobile */}
                <div className="flex w-full flex-1 flex-col justify-center text-center md:text-left">
                  {/* Name and Stars on same line */}
                  <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h4 className="text-3xl font-semibold text-white transition-all duration-500 ease-in-out">
                      {t.testimonials[currentTestimonial].name}
                    </h4>
                    <div className="star-rating justify-center transition-all duration-500 ease-in-out md:justify-end">
                      {renderStars(t.testimonials[currentTestimonial].rating)}
                    </div>
                  </div>

                  <blockquote className="flex min-h-[160px] items-center text-lg leading-relaxed text-white italic transition-all duration-500 ease-in-out md:text-xl">
                    <span className="transition-all duration-500 ease-in-out">
                      &ldquo;{t.testimonials[currentTestimonial].text}&rdquo;
                    </span>
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            {t.testimonials.length > 1 && (
              <div className="mt-auto mb-4 flex items-center justify-center gap-4">
                {/* Previous Button */}
                <button
                  onClick={prevTestimonial}
                  className="cursor-pointer rounded-full bg-white/20 p-2 transition-colors duration-200 hover:bg-white/30"
                  aria-label={navLabels.prev}
                >
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Dots Indicators */}
                <div className="flex gap-2">
                  {t.testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`h-3 w-3 cursor-pointer rounded-full transition-colors duration-200 ${
                        index === currentTestimonial
                          ? 'bg-yellow-400'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextTestimonial}
                  className="cursor-pointer rounded-full bg-white/20 p-2 transition-colors duration-200 hover:bg-white/30"
                  aria-label={navLabels.next}
                >
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* Pause / Resume auto-rotation */}
                <button
                  onClick={() => setIsPaused((prev) => !prev)}
                  className="cursor-pointer rounded-full bg-white/20 p-2 transition-colors duration-200 hover:bg-white/30"
                  aria-label={pauseLabel}
                  aria-pressed={isPaused}
                >
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {isPaused ? (
                      <path d="M8 5v14l11-7z" />
                    ) : (
                      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                    )}
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {t.stats.items.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="stat-number mb-2 text-3xl md:text-4xl lg:text-5xl">{stat.number}</div>
              <h4 className="mb-1 text-lg font-semibold text-white">{stat.label}</h4>
              <p className="text-sm text-gray-200">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">{t.cta.title}</h3>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-teal-100">{t.cta.description}</p>
          <a
            href={CONTACT_INFO.phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transform rounded-lg bg-yellow-400 px-8 py-4 text-lg font-bold text-blue-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:shadow-xl"
          >
            {t.cta.button}
          </a>
        </div>
      </div>
    </section>
  );
}
