# LondonLink 🇬🇧🇧🇷

**English Learning Platform with Brazilian Portuguese Focus**

LondonLink is a comprehensive English learning platform designed specifically for Brazilian Portuguese speakers. Built with modern web technologies, it provides an interactive and engaging learning experience.

## 🚀 Technologies

- **Next.js 16.2.9** - React framework with App Router (Turbopack builds)
- **React 19.2.7** - Latest React features with performance improvements
- **TypeScript 5** - Type safety and better development experience
- **Tailwind CSS 4** - Utility-first CSS framework with modern features
- **Lucide React 1.21** - Modern icon library
- **ESLint 9** - Code linting (flat config, `eslint-config-next`)
- **Prettier 3** - Opinionated code formatting
- **pnpm 11** - Package manager (pinned via `packageManager`)
- **Node.js 24** - Runtime environment (`engines: node >=24`, see `.nvmrc`)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── layout/                # Layout & Structural Components
│   ├── Header.tsx         # Main navigation header
│   ├── HeaderWithTheme.tsx # Header with theme switching
│   ├── Footer.tsx         # Application footer
│   └── index.ts           # Layout exports
├── components/            # Global React Components
│   ├── WhatsAppFloat/     # WhatsApp floating button
│   │   ├── WhatsAppFloat.tsx
│   │   ├── WhatsAppFloat.css
│   │   └── index.ts
│   ├── LanguageSync/     # Syncs language state to <html lang>
│   ├── ui/               # Reusable UI + seasonal theme effects
│   ├── debug/            # Dev-only debug helpers
│   └── index.ts          # Component exports
├── domain/                # Domain-Driven Architecture
│   ├── hero/              # Hero section domain
│   ├── about/             # About section domain
│   ├── goals/             # Goals section domain
│   ├── books/             # Books section domain
│   ├── feedback/          # Feedback section domain
│   ├── gallery/           # Gallery section domain
│   ├── contact/           # Contact section domain
│   ├── shared/            # Shared utilities across domains
│   └── sections.ts        # Domain exports
├── translations/          # Internationalization system
│   ├── config.ts         # Language configuration
│   ├── utils.ts          # Translation utilities
│   └── index.ts          # Translation exports
├── contexts/             # React contexts (Theme, Language)
├── hooks/                # Global custom hooks
├── lib/                  # Utility functions & theme CSS/configs
├── styles/               # Shared global styles
└── types/                # TypeScript definitions
```

### Static Assets Structure

```
public/                   # Static assets (same level as src/)
├── assets/images/        # Images organized by domain
│   ├── hero/            # Hero section images
│   │   ├── backgrounds/ # Hero background images
│   │   ├── features/    # Feature icons and illustrations
│   │   └── illustrations/ # Hero-specific illustrations
│   ├── about/           # About section images
│   ├── books/           # Book covers and previews
│   │   ├── covers/      # Book cover images
│   │   ├── previews/    # Book preview screenshots
│   │   └── thumbnails/  # Small book thumbnails
│   ├── gallery/         # Gallery images
│   │   ├── screenshots/ # App/platform screenshots
│   │   ├── demos/       # Demo images and GIFs
│   │   └── portfolio/   # Portfolio pieces
│   ├── goals/           # Goals section images
│   ├── contact/         # Contact section images
│   ├── feedback/        # Student feedback images
│   └── shared/          # Global/shared images
│       ├── logos/       # Brand logos and favicons
│       ├── icons/       # UI icons and symbols
│       └── backgrounds/ # Global background patterns
└── icons/               # SVG icons (flags, social, etc.)
    ├── whatsApp.svg     # WhatsApp icon
    ├── uk.svg           # UK flag
    └── br.svg           # Brazil flag
```

### Architecture Overview

The project follows a **layered architecture** with clear separation of concerns:

#### 🏗️ Layout Layer (`/layout`)

Structural components that define the application's skeleton:

- **Header/Footer**: Navigation and branding
- **Global Layout**: Page structure and routing
- **Theme Integration**: Commemorative themes and dark mode

#### 🧩 Components Layer (`/components`)

Global, reusable components with domain-like organization:

- **WhatsAppFloat**: Self-contained floating contact button
- **UI Components**: Reusable interface elements
- **Form Components**: Input and validation components

#### 🎯 Domain Layer (`/domain`)

Business logic organized by functional areas:

```
domain/[section]/
├── components/           # React components specific to this domain
├── hooks/               # Custom hooks for this domain
├── constants/           # Domain-specific constants
├── translations/        # Bilingual content (en/pt)
├── styles/             # Domain-specific styles
├── types/              # TypeScript definitions
└── index.ts            # Domain exports
```

#### 🔧 Infrastructure Layer

Supporting systems and utilities:

- **Translations**: Internationalization system
- **Contexts**: Global state management
- **Hooks**: Shared custom hooks
- **Types**: TypeScript definitions

## 🎯 Features

### Core Sections

- **Hero Section**: Interactive landing with call-to-action
- **About Section**: Information about LondonLink methodology
- **Goals Section**: Student learning objectives and outcomes
- **Books Section**: Three Lions English book series showcase
- **Gallery Section**: Interactive L-shaped image gallery with modal
- **Contact Section**: Course registration and contact forms

### Technical Features

- **Domain-Driven Architecture**: Organized by business domains
- **Bilingual Support**: Complete Portuguese/English internationalization
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: ARIA compliant components and semantic HTML
- **Performance**: Optimized images, lazy loading, and code splitting
- **Type Safety**: Full TypeScript implementation
- **Modern React**: React 19.2.7 with Next.js 16.2.9 App Router

## 🛠️ Development

### Prerequisites

- Node.js >= 24 (see `.nvmrc`; run `nvm use`)
- pnpm 11 (`corepack enable` activates the pinned version automatically)

> This project uses **pnpm** exclusively. The `packageManager` field pins the
> version and `pnpm-lock.yaml` is the single source of truth. Do not use npm or
> yarn — they would create a conflicting lockfile.

### Getting Started

1. Clone the repository
2. Install dependencies:

```bash
corepack enable   # one-time, activates the pinned pnpm
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `pnpm dev` - Start development server (port 3000)
- `pnpm build` - Build for production (Turbopack)
- `pnpm start` - Start production server (port 3302)
- `pnpm lint` - Run ESLint
- `pnpm format` - Format the codebase with Prettier
- `pnpm format:check` - Verify formatting without writing

### Working with the Architecture

#### Adding a New Domain

1. Create domain folder: `src/domain/[new-domain]/`
2. Add required structure: `components/`, `translations/`, `constants/`
3. Export from `src/domain/sections.ts`
4. Import in main page: `src/app/page.tsx`

#### Adding a Global Component

1. Create component folder: `src/components/[ComponentName]/`
2. Add component file, styles, and documentation
3. Export from `src/components/index.ts`
4. Import where needed: `import { ComponentName } from "@/components"`

#### Adding Layout Components

1. Create component in: `src/layout/ComponentName.tsx`
2. Export from `src/layout/index.ts`
3. Import in pages: `import { ComponentName } from "@/layout"`

#### Best Practices

- **Layout**: Use for structural, navigation, and page-level components
- **Components**: Use for global, reusable functionality (like WhatsAppFloat)
- **Domain**: Use for business-specific logic and components
- **Shared**: Use for utilities that span multiple domains

## 🏗️ Architecture Principles

### Layered Architecture

The project implements a **clean, layered architecture** with clear separation of concerns:

#### 1. **Structural Layer** (`/layout`)

- **Purpose**: Application structure and navigation
- **Scope**: Global, affects entire application
- **Examples**: Header, Footer, main layout containers

#### 2. **Functional Layer** (`/components`)

- **Purpose**: Reusable, global functionality
- **Scope**: Cross-cutting concerns
- **Examples**: WhatsAppFloat, UI components, form elements

#### 3. **Business Layer** (`/domain`)

- **Purpose**: Business logic and domain-specific features
- **Scope**: Isolated, domain-specific
- **Examples**: Hero section, About section, Contact forms

#### 4. **Infrastructure Layer** (`/lib`, `/contexts`, `/hooks`)

- **Purpose**: Supporting utilities and shared logic
- **Scope**: Foundation for other layers
- **Examples**: Theme management, translations, utilities

### Domain-Driven Design (DDD)

- **Domain Isolation**: Each business section is self-contained
- **Clear Boundaries**: Components, hooks, and styles are domain-specific
- **Scalability**: Easy to add new sections without affecting existing ones
- **Maintainability**: Code organized by business context, not technical layers

### Development Principles

- **Separation of Concerns**: Clear boundaries between layers
- **Component Isolation**: Each component has its own folder with styles and docs
- **Accessible Components**: ARIA attributes and semantic HTML
- **Clear Code Structure**: Simple and maintainable code
- **Iterative Development**: Start small, improve gradually
- **UX Clarity**: Fast, responsive, with user feedback
- **Type Safety**: Comprehensive TypeScript usage
- **Modular Architecture**: Easy to add, remove, or modify features

### Import Patterns

The layered architecture enables clean import patterns:

```typescript
// Structural components
import { HeaderWithTheme, Footer } from '@/layout';

// Global functionality
import { WhatsAppFloat } from '@/components';

// Business logic
import { HeroSection } from '@/domain/hero';
import { ContactSection } from '@/domain/contact';

// Shared utilities
import { OptimizedImage } from '@/domain/shared';

// Infrastructure
import { useTheme } from '@/contexts';
import { translations } from '@/translations';
```

## 🖼️ Assets Organization

### Image Management Strategy

LondonLink uses a **domain-driven approach** for organizing images and static assets:

#### **Domain-Specific Images** (`public/assets/images/[domain]/`)

Each business domain has its own image folder:

- **Hero Section** (`/hero/`): Landing page visuals, backgrounds, feature icons
- **About Section** (`/about/`): Team photos, methodology illustrations
- **Books Section** (`/books/`): Book covers, previews, thumbnails
- **Gallery Section** (`/gallery/`): Screenshots, demos, portfolio pieces
- **Goals Section** (`/goals/`): Learning objective illustrations
- **Contact Section** (`/contact/`): Location images, contact visuals
- **Feedback Section** (`/feedback/`): Student photos and testimonials

#### **Shared Assets** (`public/assets/images/shared/`)

Global images used across multiple sections:

- **Logos** (`/logos/`): Brand logos, favicons, variations
- **Icons** (`/icons/`): UI icons, symbols, decorative elements
- **Backgrounds** (`/backgrounds/`): Global patterns, gradients

#### **Global Icons** (`public/icons/`)

SVG icons for UI elements:

- **Social Icons**: WhatsApp, Instagram, etc.
- **Flag Icons**: Country flags for language selection
- **UI Icons**: Navigation, actions, status indicators

### Image Optimization Guidelines

1. **Format Selection**:

   - **SVG**: Icons, logos, simple illustrations
   - **WebP/AVIF**: Modern browsers, best compression
   - **JPG**: Photos, complex images
   - **PNG**: Images with transparency

2. **Size Guidelines**:

   - **Hero backgrounds**: 1920x1080px (16:9)
   - **Book covers**: 400x600px (2:3)
   - **Thumbnails**: 150x150px (1:1)
   - **Icons**: 24x24px, 32x32px, 48x48px

3. **Naming Convention**:
   - Use kebab-case: `hero-main-bg.jpg`
   - Be descriptive: `beginner-book-cover.jpg`
   - Include size when relevant: `logo-small.svg`

### Usage with Next.js Image

```tsx
import { OptimizedImage } from '@/domain/shared';
import { HERO_IMAGES } from '@/domain/hero/constants/images';

<OptimizedImage
  src={HERO_IMAGES.backgrounds.main}
  alt="Hero background"
  width={800}
  height={600}
  priority // For above-the-fold images
/>;
```

## 🎨 Design System

The project uses a custom design system with:

- **Primary Colors**: Blue palette for main actions
- **Secondary Colors**: Gray palette for text and backgrounds
- **Accent Colors**: Red palette for highlights
- **Typography**: Geist Sans and Geist Mono fonts
- **Spacing**: Consistent spacing scale
- **Animations**: Smooth transitions and micro-interactions

## 🌐 Internationalization

LondonLink features a comprehensive bilingual system:

### Supported Languages

- **Portuguese (pt)** - Brazilian Portuguese (default; see `DEFAULT_LANGUAGE`)
- **English (en)** - Falls back to English when a translation is missing

### Translation Architecture

- **Domain-Specific**: Each domain manages its own translations
- **Centralized Config**: Language settings in `/src/translations/config.ts`
- **Type-Safe**: TypeScript ensures translation consistency
- **Fallback System**: Automatic fallback to English if translation missing

### Usage Example

```typescript
import { heroTranslations } from '@/domain/hero/translations';

const t = heroTranslations[currentLanguage];
console.log(t.title); // "Do you want to learn English?" or "Você quer aprender inglês?"
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible layouts and components
- Touch-friendly interactions

## 🚀 Deployment

The project is optimized for deployment on:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Next.js

## 📚 Documentation

Engineering conventions, architecture, the theme/i18n systems, persistence keys,
versioning, accessibility, and security guidance are consolidated in
**[CLAUDE.md](CLAUDE.md)** — the single source of truth for contributors and AI
agents. Release history lives in **[CHANGELOG.md](CHANGELOG.md)**.

## 📄 License

This project is private and proprietary to LondonLink.

## 🤝 Contributing

This is a private project. For internal development guidelines, conventions, and
standards, see [CLAUDE.md](CLAUDE.md).

---

**LondonLink Team** - Building the future of English learning for Brazilian students.
