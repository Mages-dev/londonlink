"use client";

import { Language } from "@/types";
import { OptimizedImage } from "@/pages/shared";
import { BOOKS_IMAGES, BOOKS_IMAGE_ALTS } from "../constants/images";

interface BooksSectionProps {
  currentLanguage: Language;
}

export function BooksSection({ currentLanguage }: BooksSectionProps) {
  return (
    <section id="books" className="relative py-20 overflow-hidden">
      {/* Background with gradient similar to the original */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700"></div>

      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="lg:col-span-2 text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 lg:mb-6 leading-tight">
              {currentLanguage === "en"
                ? "Three Lions English"
                : "Three Lions English"}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 font-light">
              {currentLanguage === "en"
                ? "The trilogy is complete"
                : "A trilogia está completa"}
            </p>
          </div>

          {/* Right side - Books image (larger space) */}
          <div className="lg:col-span-3 relative flex justify-center">
            <div className="relative w-full max-w-2xl">
              {/* Main books image with frame effect */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl">
                <OptimizedImage
                  src={BOOKS_IMAGES.previews.threeLionsTrilogy}
                  alt={BOOKS_IMAGE_ALTS.previews.threeLionsTrilogy}
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
