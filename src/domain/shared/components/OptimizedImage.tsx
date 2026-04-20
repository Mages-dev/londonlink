import { useOptimizedImage } from "../hooks/useOptimizedImage";

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
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  placeholder,
  sizes,
  priority = false,
  fill = false,
  objectFit = "cover",
}: OptimizedImageProps) {
  const {
    src: optimizedSrc,
    alt: optimizedAlt,
    isLoaded,
    isError,
    sizes: optimizedSizes,
  } = useOptimizedImage({
    src,
    alt,
    placeholder,
    sizes,
    priority,
  });

  const imgClassName = `${className} ${
    isLoaded ? "opacity-100" : "opacity-0"
  } transition-opacity duration-300`;

  if (fill) {
    return (
      <div className="relative overflow-hidden w-full h-full">
        <img
          src={optimizedSrc}
          alt={optimizedAlt}
          sizes={optimizedSizes}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className={`absolute inset-0 w-full h-full ${imgClassName}`}
          style={{ objectFit }}
        />
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <img
        src={optimizedSrc}
        alt={optimizedAlt}
        width={width}
        height={height}
        sizes={optimizedSizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={imgClassName}
        style={{ objectFit }}
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
