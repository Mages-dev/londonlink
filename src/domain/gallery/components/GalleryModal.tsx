'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Language } from '@/types';
import { galleryTranslations } from '../translations';
import type { GalleryImage } from '../hooks/useGallery';
import '../styles/gallery.css';

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
  const dialogRef = useRef<HTMLDivElement>(null);

  // Format counter text
  const counterText = t.imageCounter
    .replace('{current}', (currentIndex + 1).toString())
    .replace('{total}', totalImages.toString());

  // Dialog behaviour: scroll lock, focus management, keyboard, focus trap.
  // Self-contained so any caller gets an accessible modal (WCAG 2.1.2 / 4.1.2).
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const dialog = dialogRef.current;
    const getFocusable = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => !el.hasAttribute('disabled'));

    // Move focus into the dialog on open.
    getFocusable()[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === 'ArrowLeft' && canGoPrevious) {
        onPrevious();
        return;
      }
      if (event.key === 'ArrowRight' && canGoNext) {
        onNext();
        return;
      }
      if (event.key === 'Tab') {
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [onClose, onPrevious, onNext, canGoPrevious, canGoNext]);

  return (
    <div className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/90">
      {/* Backdrop (click to close; keyboard users use Esc / close button) */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal Content */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-modal-title"
        className="relative mx-2 max-h-full w-full max-w-[95vw] min-w-[320px] animate-scale-in sm:mx-4 lg:max-w-[85vw] xl:max-w-7xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 rounded-full border-2 border-gray-200 bg-white p-3 text-gray-700 shadow-xl transition-all duration-200 hover:scale-110 hover:bg-gray-100 focus:ring-2 focus:ring-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label={t.closeGallery}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Navigation Buttons */}
        {canGoPrevious && (
          <button
            onClick={onPrevious}
            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-all duration-200 hover:scale-110 hover:bg-black/70"
            aria-label={t.previousImage}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {canGoNext && (
          <button
            onClick={onNext}
            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white transition-all duration-200 hover:scale-110 hover:bg-black/70"
            aria-label={t.nextImage}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-gray-900">
          <div className="relative h-[60vh] w-full sm:h-[70vh] lg:h-[75vh] xl:h-[80vh]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, (max-width: 1280px) 80vw, 75vw"
            />
          </div>

          {/* Image Info */}
          <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <h3
                  id="gallery-modal-title"
                  className="text-lg font-semibold text-gray-900 dark:text-white"
                >
                  {image.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{image.alt}</p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{counterText}</div>
            </div>
          </div>
        </div>

        {/* Keyboard Hints */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
          <div className="text-sm text-white opacity-70">
            <span className="mx-2 inline-block">ESC: {t.closeGallery}</span>
            {canGoPrevious && <span className="mx-2 inline-block">←: {t.previousImage}</span>}
            {canGoNext && <span className="mx-2 inline-block">→: {t.nextImage}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
