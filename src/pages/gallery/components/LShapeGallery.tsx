"use client";

import Image from "next/image";
import { useState } from "react";
import { Language } from "@/types";
import { galleryTranslations } from "../translations";
import type { GalleryImage } from "../hooks/useGallery";
import { ANIMATION_DELAYS } from "../constants/images";

interface LShapeGalleryProps {
  images: GalleryImage[];
  onImageClick: (image: GalleryImage) => void;
  onImageLoad: (imageId: number) => void;
  onImageLoadStart: (imageId: number) => void;
  onImageError: (imageId: number) => void;
  isLoading: Record<number, boolean>;
  loadErrors: Record<number, boolean>;
  currentLanguage: Language;
}

export function LShapeGallery({
  images,
  onImageClick,
  onImageLoad,
  onImageLoadStart,
  onImageError,
  isLoading,
  loadErrors,
  currentLanguage,
}: LShapeGalleryProps) {
  const t = galleryTranslations[currentLanguage];
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  // L-Shape layout configuration
  const horizontalImages = images.slice(0, 7); // Top horizontal part of L
  const verticalImages = images.slice(7, 12); // Right vertical part of L

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* L-Shape Container */}
      <div className="grid grid-cols-8 grid-rows-6 gap-2 md:gap-4 h-[600px] md:h-[800px] lg:h-[900px]">
        
        {/* HORIZONTAL PART OF L - Top Row */}
        {horizontalImages.map((image, index) => {
          const isLarge = index === 0 || index === 3; // First and fourth images are large
          const isMedium = index === 1 || index === 4; // Second and fifth are medium
          
          let gridClasses = "";
          let heightClasses = "";
          
          if (isLarge) {
            gridClasses = "col-span-2 row-span-2";
            heightClasses = "h-full";
          } else if (isMedium) {
            gridClasses = "col-span-1 row-span-2";
            heightClasses = "h-full";
          } else {
            gridClasses = "col-span-1 row-span-1";
            heightClasses = "h-full";
          }

          return (
            <div
              key={image.id}
              className={`${gridClasses} relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in-up ${ANIMATION_DELAYS[index]}`}
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => onImageClick(image)}
            >
              {/* Loading State */}
              {isLoading[image.id] && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    {t.loading}
                  </div>
                </div>
              )}

              {/* Error State */}
              {loadErrors[image.id] && (
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400 text-sm text-center p-2">
                    {t.loadError}
                  </div>
                </div>
              )}

              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition-transform duration-300 ${
                  hoveredImage === image.id ? "scale-110" : "scale-100"
                }`}
                onLoadStart={() => onImageLoadStart(image.id)}
                onLoad={() => onImageLoad(image.id)}
                onError={() => onImageError(image.id)}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />

              {/* Overlay */}
              <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                hoveredImage === image.id ? "opacity-20" : "opacity-0"
              }`} />

              {/* Hover Content */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                hoveredImage === image.id ? "opacity-100" : "opacity-0"
              }`}>
                <div className="text-white text-center p-2">
                  <div className="text-sm font-medium">{image.title}</div>
                  <div className="text-xs mt-1 opacity-80">{t.viewMore}</div>
                </div>
              </div>
            </div>
          );
        })}

        {/* VERTICAL PART OF L - Right Column */}
        {verticalImages.map((image, index) => {
          const actualIndex = index + 7; // Offset for animation delay
          const isLarge = index === 2; // Third image in vertical is large
          const isMedium = index === 0 || index === 4; // First and last are medium
          
          let gridClasses = "";
          let rowStart = "";
          
          if (index === 0) {
            // First vertical image - starts at row 3
            gridClasses = isMedium ? "col-span-1 row-span-2" : "col-span-1 row-span-1";
            rowStart = "row-start-3";
          } else if (index === 1) {
            // Second vertical image
            gridClasses = "col-span-1 row-span-1";
            rowStart = "row-start-5";
          } else if (index === 2) {
            // Third vertical image - large
            gridClasses = "col-span-1 row-span-2";
            rowStart = "row-start-6";
          } else if (index === 3) {
            // Fourth vertical image
            gridClasses = "col-span-1 row-span-1";
            rowStart = "row-start-4";
          } else {
            // Fifth vertical image
            gridClasses = "col-span-1 row-span-1";
            rowStart = "row-start-6";
          }

          return (
            <div
              key={image.id}
              className={`${gridClasses} ${rowStart} col-start-8 relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in-up ${ANIMATION_DELAYS[actualIndex]}`}
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => onImageClick(image)}
            >
              {/* Loading State */}
              {isLoading[image.id] && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400 text-sm">
                    {t.loading}
                  </div>
                </div>
              )}

              {/* Error State */}
              {loadErrors[image.id] && (
                <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400 text-sm text-center p-2">
                    {t.loadError}
                  </div>
                </div>
              )}

              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition-transform duration-300 ${
                  hoveredImage === image.id ? "scale-110" : "scale-100"
                }`}
                onLoadStart={() => onImageLoadStart(image.id)}
                onLoad={() => onImageLoad(image.id)}
                onError={() => onImageError(image.id)}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />

              {/* Overlay */}
              <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                hoveredImage === image.id ? "opacity-20" : "opacity-0"
              }`} />

              {/* Hover Content */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                hoveredImage === image.id ? "opacity-100" : "opacity-0"
              }`}>
                <div className="text-white text-center p-2">
                  <div className="text-sm font-medium">{image.title}</div>
                  <div className="text-xs mt-1 opacity-80">{t.viewMore}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* L-Shape Indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 tracking-wider">
          LONDON<span className="text-gray-400">LINK</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {currentLanguage === "en" ? "L-Shape Gallery" : "Galeria em Formato L"}
        </div>
      </div>
    </div>
  );
}
