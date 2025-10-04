"use client";

import Image from "next/image";
import { useState } from "react";
import { Language } from "@/types";
import { galleryTranslations } from "../translations";
import { GALLERY_IMAGES } from "../constants/images";
import { GalleryModal } from "./GalleryModal";
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
    <section id="gallery" className="section-bg-contact py-16 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Community Header - Showcasing student success stories and transformations */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* L-Shape Gallery */}
        <div className="relative max-w-4xl mx-auto p-4">
          {/* L-Shape Container */}
          <div className="gallery-grid">
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

              const getBorderClass = () => {
                switch (index) {
                  case 0: // Imagem 1: topo + esquerda
                    return "l-border-top-left";
                  case 1: // Imagem 2: topo + direita
                    return "l-border-top-right";
                  case 2: // Imagem 3: esquerda
                    return "l-border-left";
                  case 3: // Imagem 4: direita
                    return "l-border-right";
                  case 4: // Imagem 5: esquerda
                    return "l-border-left";
                  case 5: // Imagem 6: direita
                    return "l-border-right";
                  case 6: // Imagem 7: esquerda
                    return "l-border-left";
                  case 7: // Imagem 8: direita
                    return "l-border-right";
                  default:
                    return "";
                }
              };

              return (
                <div
                  key={image.id}
                  className={`${getGridPosition()} ${getBorderClass()} relative cursor-pointer group animate-fade-in-up`}
                  onMouseEnter={() => setHoveredImage(image.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={`object-cover transition-transform duration-300 ${
                        hoveredImage === image.id ? "scale-110" : "scale-100"
                      }`}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>

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

              const getBorderClass = () => {
                switch (index) {
                  case 0: // Imagem 9: esquerda + fundo
                    return "l-border-left-bottom";
                  case 1: // Imagem 10: fundo
                    return "l-border-bottom";
                  case 2: // Imagem 11: topo + fundo
                    return "l-border-top-bottom";
                  case 3: // Imagem 12: topo + direita + fundo
                    return "l-border-top-right-bottom";
                  default:
                    return "";
                }
              };

              return (
                <div
                  key={image.id}
                  className={`${getGridPosition()} ${getBorderClass()} relative cursor-pointer group animate-fade-in-up`}
                  onMouseEnter={() => setHoveredImage(image.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                  onClick={() => setSelectedImage(image.id)}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className={`object-cover transition-transform duration-300 ${
                        hoveredImage === image.id ? "scale-110" : "scale-100"
                      }`}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>

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
        {selectedImage &&
          (() => {
            const currentImage = GALLERY_IMAGES.find(
              (img) => img.id === selectedImage
            );
            const currentIndex = GALLERY_IMAGES.findIndex(
              (img) => img.id === selectedImage
            );

            if (!currentImage) return null;

            return (
              <GalleryModal
                image={currentImage}
                currentIndex={currentIndex}
                totalImages={GALLERY_IMAGES.length}
                onClose={() => setSelectedImage(null)}
                onPrevious={() => {
                  const prevIndex =
                    currentIndex > 0
                      ? currentIndex - 1
                      : GALLERY_IMAGES.length - 1;
                  setSelectedImage(GALLERY_IMAGES[prevIndex].id);
                }}
                onNext={() => {
                  const nextIndex =
                    currentIndex < GALLERY_IMAGES.length - 1
                      ? currentIndex + 1
                      : 0;
                  setSelectedImage(GALLERY_IMAGES[nextIndex].id);
                }}
                canGoPrevious={true}
                canGoNext={true}
                currentLanguage={currentLanguage}
              />
            );
          })()}
      </div>
    </section>
  );
}
