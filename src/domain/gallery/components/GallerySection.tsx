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
      className="min-h-screen pt-30 pb-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900"
    >
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
        <div className="relative max-w-4xl mx-auto overflow-hidden">
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
                  className={`${getGridPosition()} ${getBorderClass()} relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in-up`}
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
                  className={`${getGridPosition()} ${getBorderClass()} relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in-up`}
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
            className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-80 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-4 border-gray-200 dark:border-gray-600 p-4 max-w-4xl max-h-[90vh] overflow-hidden">
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
                width={1000}
                height={600}
                className="max-w-full max-h-[75vh] object-contain rounded"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
