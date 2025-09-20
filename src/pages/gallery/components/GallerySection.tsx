"use client";

import Image from "next/image";
import { useState } from "react";
import { Language } from "@/types";
import { galleryTranslations } from "../translations";
import { GALLERY_IMAGES } from "../constants/images";
// Import gallery styles
import "../styles";

interface GallerySectionProps {
  currentLanguage: Language;
}

export function GallerySection({ currentLanguage }: GallerySectionProps) {
  const t = galleryTranslations[currentLanguage];
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // L-Shape layout configuration (L em pé mais longilíneo)
  const verticalImages = GALLERY_IMAGES.slice(0, 8); // Left vertical part of L (haste) - mais longo
  const horizontalImages = GALLERY_IMAGES.slice(8, 12); // Bottom horizontal part of L (base)

  return (
    <section
      id="gallery"
      className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
        </div>

        {/* L-Shape Gallery */}
        <div className="relative max-w-5xl mx-auto">
          {/* L-Shape Container */}
          <div className="grid grid-cols-4 grid-rows-5 gap-2 md:gap-4 h-[600px] md:h-[780px] lg:h-[900px]">
            {/* VERTICAL PART OF L - Left Columns (Haste do L - 2 colunas) */}
            {verticalImages.map((image, index) => {
              const getGridPosition = () => {
                switch (index) {
                  case 0:
                    return "col-span-1 row-span-1 col-start-1 row-start-1";
                  case 1:
                    return "col-span-1 row-span-1 col-start-2 row-start-1";
                  case 2:
                    return "col-span-1 row-span-1 col-start-1 row-start-2";
                  case 3:
                    return "col-span-1 row-span-1 col-start-2 row-start-2";
                  case 4:
                    return "col-span-1 row-span-1 col-start-1 row-start-3";
                  case 5:
                    return "col-span-1 row-span-1 col-start-2 row-start-3";
                  case 6:
                    return "col-span-1 row-span-1 col-start-1 row-start-4";
                  case 7:
                    return "col-span-1 row-span-1 col-start-2 row-start-4";
                  default:
                    return "";
                }
              };

              return (
                <div
                  key={image.id}
                  className={`${getGridPosition()} relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in-up`}
                  onMouseEnter={() => setHoveredImage(image.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                  onClick={() => setSelectedImage(image.id)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover transition-transform duration-300 ${
                      hoveredImage === image.id ? "scale-110" : "scale-100"
                    }`}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                      hoveredImage === image.id ? "opacity-20" : "opacity-0"
                    }`}
                  />
                </div>
              );
            })}

            {/* HORIZONTAL PART OF L - Bottom Row (Base do L) */}
            {horizontalImages.map((image, index) => {
              const getGridPosition = () => {
                switch (index) {
                  case 0:
                    return "col-span-1 row-span-1 col-start-1 row-start-5";
                  case 1:
                    return "col-span-1 row-span-1 col-start-2 row-start-5";
                  case 2:
                    return "col-span-1 row-span-1 col-start-3 row-start-5";
                  case 3:
                    return "col-span-1 row-span-1 col-start-4 row-start-5";
                  default:
                    return "";
                }
              };

              return (
                <div
                  key={image.id}
                  className={`${getGridPosition()} relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in-up`}
                  onMouseEnter={() => setHoveredImage(image.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                  onClick={() => setSelectedImage(image.id)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover transition-transform duration-300 ${
                      hoveredImage === image.id ? "scale-110" : "scale-100"
                    }`}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                      hoveredImage === image.id ? "opacity-20" : "opacity-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal/Popup para visualizar imagem completa */}
        {selectedImage && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-4 border-gray-200 dark:border-gray-600 p-4 max-w-7xl max-h-full">
              <button
                className="absolute -top-3 -right-3 text-gray-700 dark:text-gray-300 text-2xl font-bold bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all z-10 shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                ×
              </button>
              <Image
                src={
                  GALLERY_IMAGES.find((img) => img.id === selectedImage)?.src ||
                  ""
                }
                alt={
                  GALLERY_IMAGES.find((img) => img.id === selectedImage)?.alt ||
                  ""
                }
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
