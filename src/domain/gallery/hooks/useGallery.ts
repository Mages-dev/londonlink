// Gallery hook for managing state and interactions

import { useState, useCallback, useEffect } from "react";
import { GALLERY_IMAGES } from "../constants/images";

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
}

export function useGallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<Record<number, boolean>>({});
  const [loadErrors, setLoadErrors] = useState<Record<number, boolean>>({});

  // Open image in modal
  const openImage = useCallback((image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentIndex(GALLERY_IMAGES.findIndex(img => img.id === image.id));
    setIsModalOpen(true);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
  }, []);

  // Navigate to previous image
  const previousImage = useCallback(() => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedImage(GALLERY_IMAGES[newIndex]);
    }
  }, [currentIndex]);

  // Navigate to next image
  const nextImage = useCallback(() => {
    if (currentIndex < GALLERY_IMAGES.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedImage(GALLERY_IMAGES[newIndex]);
    }
  }, [currentIndex]);

  // Handle image loading state
  const handleImageLoad = useCallback((imageId: number) => {
    setIsLoading(prev => ({ ...prev, [imageId]: false }));
    setLoadErrors(prev => ({ ...prev, [imageId]: false }));
  }, []);

  // Handle image loading start
  const handleImageLoadStart = useCallback((imageId: number) => {
    setIsLoading(prev => ({ ...prev, [imageId]: true }));
  }, []);

  // Handle image error
  const handleImageError = useCallback((imageId: number) => {
    setIsLoading(prev => ({ ...prev, [imageId]: false }));
    setLoadErrors(prev => ({ ...prev, [imageId]: true }));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isModalOpen) return;

      switch (event.key) {
        case "Escape":
          closeModal();
          break;
        case "ArrowLeft":
          previousImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal, previousImage, nextImage]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return {
    // State
    selectedImage,
    isModalOpen,
    currentIndex,
    isLoading,
    loadErrors,
    
    // Actions
    openImage,
    closeModal,
    previousImage,
    nextImage,
    
    // Image handlers
    handleImageLoad,
    handleImageLoadStart,
    handleImageError,
    
    // Data
    images: GALLERY_IMAGES,
    totalImages: GALLERY_IMAGES.length,
    
    // Navigation state
    canGoPrevious: currentIndex > 0,
    canGoNext: currentIndex < GALLERY_IMAGES.length - 1,
  };
}
