# Image Organization Guide

## 📁 Structure

```
src/assets/images/
├── shared/                 # Global/shared images
│   ├── logos/             # Brand logos and favicons
│   ├── icons/             # UI icons and symbols
│   └── backgrounds/       # Global background patterns
├── hero/                  # Hero section specific
│   ├── backgrounds/       # Hero background images
│   ├── features/          # Feature icons and illustrations
│   └── illustrations/     # Hero-specific illustrations
├── about/                 # About section specific
├── books/                 # Books section specific
│   ├── covers/           # Book cover images
│   ├── previews/         # Book preview screenshots
│   └── thumbnails/       # Small book thumbnails
├── gallery/              # Gallery section specific
│   ├── screenshots/      # App/platform screenshots
│   ├── demos/           # Demo images and GIFs
│   └── portfolio/       # Portfolio pieces
└── contact/              # Contact section specific
```

## 🎯 Best Practices

### 1. **Naming Convention**
- Use kebab-case: `hero-main-bg.jpg`
- Be descriptive: `beginner-book-cover.jpg`
- Include size when relevant: `logo-small.svg`

### 2. **File Formats**
- **SVG**: Icons, logos, simple illustrations
- **WebP**: Modern browsers, best compression
- **JPG**: Photos, complex images
- **PNG**: Images with transparency

### 3. **Size Guidelines**
- **Hero backgrounds**: 1920x1080px (16:9)
- **Book covers**: 400x600px (2:3)
- **Thumbnails**: 150x150px (1:1)
- **Icons**: 24x24px, 32x32px, 48x48px

### 4. **Optimization**
- Compress images before adding
- Use appropriate quality settings
- Consider multiple sizes for responsive design

## 🔧 Usage Examples

### Import from constants:
```typescript
import { HERO_IMAGES, HERO_IMAGE_ALTS } from '@/pages/hero/constants/images';
import { SHARED_IMAGES } from '@/pages/shared/constants/images';
```

### Use with OptimizedImage component:
```tsx
import { OptimizedImage } from '@/pages/shared';

<OptimizedImage
  src={HERO_IMAGES.backgrounds.main}
  alt={HERO_IMAGE_ALTS.backgrounds.main}
  width={800}
  height={600}
  priority
/>
```

### Responsive images:
```tsx
<OptimizedImage
  src={BOOKS_IMAGES.covers.beginnerBook}
  alt={BOOKS_IMAGE_ALTS.covers.beginnerBook}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  width={400}
  height={600}
/>
```

## 📱 Responsive Strategy

Each domain can have multiple versions:
- `image-mobile.jpg` (< 768px)
- `image-tablet.jpg` (768px - 1024px)  
- `image-desktop.jpg` (> 1024px)

## 🚀 Performance Tips

1. **Use Next.js Image component** (via OptimizedImage)
2. **Set priority=true** for above-the-fold images
3. **Use appropriate sizes** prop for responsive images
4. **Lazy load** non-critical images
5. **Provide alt text** for accessibility
