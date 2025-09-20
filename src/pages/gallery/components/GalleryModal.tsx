"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Language } from "@/types";
import { galleryTranslations } from "../translations";
import type { GalleryImage } from "../hooks/useGallery";

interface GalleryModalProps {
  image: GalleryImage;
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  currentLanguage: Language;
}

export function GalleryModal({
  image,
  currentIndex,
  totalImages,
  onClose,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
  currentLanguage,
}: GalleryModalProps) {
  const t = galleryTranslations[currentLanguage];

  // Format counter text
  const counterText = t.imageCounter
    .replace("{current}", (currentIndex + 1).toString())
    .replace("{total}", totalImages.toString());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-label={t.closeGallery}
      />

      {/* Modal Content */}
      <div className="relative max-w-7xl max-h-full mx-4 animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
          aria-label={t.closeGallery}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation Buttons */}
        {canGoPrevious && (
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
            aria-label={t.previousImage}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {canGoNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
            aria-label={t.nextImage}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Image Container */}
        <div className="relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="relative w-full h-[70vh] md:h-[80vh]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
          </div>

          {/* Image Info */}
          <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {image.alt}
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {counterText}
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard Hints */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-white text-sm opacity-70">
            <span className="inline-block mx-2">ESC: {t.closeGallery}</span>
            {canGoPrevious && <span className="inline-block mx-2">←: {t.previousImage}</span>}
            {canGoNext && <span className="inline-block mx-2">→: {t.nextImage}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
