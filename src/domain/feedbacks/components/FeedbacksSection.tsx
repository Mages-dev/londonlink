"use client";

import { useState, useEffect } from "react";
import { Language } from "@/types";
import { OptimizedImage } from "@/domain/shared";
import { CONTACT_INFO } from "@/domain/shared/constants/contacts";
import { FEEDBACKS_IMAGES, FEEDBACKS_IMAGE_ALTS } from "../constants/images";
import { feedbacksTranslations } from "../translations";

interface FeedbacksSectionProps {
  currentLanguage: Language;
}

export function FeedbacksSection({ currentLanguage }: FeedbacksSectionProps) {
  const t = feedbacksTranslations[currentLanguage];
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-rotate testimonials every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [t.testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % t.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + t.testimonials.length) % t.testimonials.length
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

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
    <section id="feedbacks" className="relative overflow-hidden pt-30 pb-16">
      {/* Uses parent background - no additional gradient needed */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100 font-light mb-4">
            {t.subtitle}
          </p>
          <p className="text-base md:text-lg text-blue-200 max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-20">
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-6xl mx-auto min-h-[450px] flex flex-col">
            {/* Quote Icon */}
            <div className="quote-icon">&ldquo;</div>

            {/* Current Testimonial */}
            <div className="testimonial-text flex-1 flex items-center py-4">
              <div className="flex flex-col md:flex-row items-center md:items-center gap-8 w-full">
                {/* Student Photo - Left Side on desktop, centered on mobile */}
                <div className="w-full md:w-auto flex justify-center md:min-w-[162px]">
                  {(() => {
                    const testimonial = t.testimonials[currentTestimonial];
                    const imageKey =
                      testimonial.id as keyof typeof FEEDBACKS_IMAGES.testimonials;
                    const currentImage =
                      FEEDBACKS_IMAGES.testimonials[imageKey];
                    const currentAlt =
                      FEEDBACKS_IMAGE_ALTS.testimonials[imageKey];

                    if (currentImage) {
                      return (
                        <OptimizedImage
                          src={currentImage}
                          alt={currentAlt}
                          width={200}
                          height={250}
                          className="w-[162px] h-60 object-cover rounded-lg shadow-lg border-4 border-red-600 transition-all duration-500 ease-in-out"
                        />
                      );
                    } else {
                      // Placeholder for students without photos
                      return (
                        <div className="w-[162px] h-60 bg-gray-500 rounded-lg shadow-lg border-4 border-white transition-all duration-500 ease-in-out flex items-center justify-center">
                          <svg
                            className="w-32 h-32 text-white"
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
                <div className="flex-1 w-full text-center md:text-left flex flex-col justify-center">
                  {/* Name and Stars on same line */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                    <h4 className="text-xl font-semibold text-white transition-all duration-500 ease-in-out">
                      {t.testimonials[currentTestimonial].name}
                    </h4>
                    <div className="star-rating justify-center md:justify-end transition-all duration-500 ease-in-out">
                      {renderStars(t.testimonials[currentTestimonial].rating)}
                    </div>
                  </div>

                  <blockquote className="text-lg md:text-xl text-white italic leading-relaxed min-h-[160px] flex items-center transition-all duration-500 ease-in-out">
                    <span className="transition-all duration-500 ease-in-out">
                      &ldquo;{t.testimonials[currentTestimonial].text}&rdquo;
                    </span>
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            {t.testimonials.length > 1 && (
              <div className="flex items-center justify-center mt-auto mb-4 gap-4">
                {/* Previous Button */}
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <svg
                    className="w-5 h-5 text-white"
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
                      className={`w-3 h-3 rounded-full transition-colors duration-200 cursor-pointer ${
                        index === currentTestimonial
                          ? "bg-red-600"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <svg
                    className="w-5 h-5 text-white"
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
              </div>
            )}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {t.stats.items.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="stat-number text-3xl md:text-4xl lg:text-5xl mb-2">
                {stat.number}
              </div>
              <h4 className="text-lg font-semibold text-white mb-1">
                {stat.label}
              </h4>
              <p className="text-sm text-blue-200">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t.cta.title}
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <a
            href={CONTACT_INFO.phone.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t.cta.button}
          </a>
        </div>
      </div>
    </section>
  );
}
