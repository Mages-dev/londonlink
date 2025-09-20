import Image from 'next/image';
import { useOptimizedImage } from '../hooks/useOptimizedImage';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  sizes,
  priority = false,
  fill = false,
  objectFit = 'cover'
}: OptimizedImageProps) {
  const {
    src: optimizedSrc,
    alt: optimizedAlt,
    isLoaded,
    isError,
    placeholder: fallbackPlaceholder,
    sizes: optimizedSizes,
    priority: optimizedPriority
  } = useOptimizedImage({
    src,
    alt,
    placeholder,
    sizes,
    priority
  });

  const imageProps = {
    src: optimizedSrc,
    alt: optimizedAlt,
    className: `${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`,
    sizes: optimizedSizes,
    priority: optimizedPriority,
    style: { objectFit }
  };

  if (fill) {
    return (
      <div className="relative overflow-hidden">
        <Image
          {...imageProps}
          fill
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <Image
        {...imageProps}
        width={width}
        height={height}
      />
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ width, height }}
        />
      )}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="text-gray-500 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}
