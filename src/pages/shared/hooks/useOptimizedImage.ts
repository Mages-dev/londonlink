import { useState, useEffect } from 'react';

interface UseOptimizedImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  sizes?: string;
  priority?: boolean;
}

interface UseOptimizedImageReturn {
  src: string;
  alt: string;
  isLoaded: boolean;
  isError: boolean;
  placeholder: string;
  sizes: string;
  priority: boolean;
}

export function useOptimizedImage({
  src,
  alt,
  placeholder = '/assets/images/shared/placeholder.jpg',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false
}: UseOptimizedImageProps): UseOptimizedImageReturn {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setIsLoaded(true);
      setIsError(false);
    };
    
    img.onerror = () => {
      setIsError(true);
      setIsLoaded(false);
    };
    
    img.src = src;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return {
    src: isError ? placeholder : src,
    alt,
    isLoaded,
    isError,
    placeholder,
    sizes,
    priority
  };
}
