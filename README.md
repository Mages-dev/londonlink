# LondonLink 🇬🇧🇧🇷

**English Learning Platform with Brazilian Portuguese Focus**

LondonLink is a comprehensive English learning platform designed specifically for Brazilian Portuguese speakers. Built with modern web technologies, it provides an interactive and engaging learning experience.

## 🚀 Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── domain/                # Domain-Driven Architecture
│   ├── hero/              # Hero section domain
│   ├── about/             # About section domain
│   ├── goals/             # Goals section domain
│   ├── books/             # Books section domain
│   ├── gallery/           # Gallery section domain
│   ├── contact/           # Contact section domain
│   ├── shared/            # Shared components across domains
│   └── sections.ts        # Domain exports
├── components/            # Global React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── forms/            # Form components
│   └── index.ts          # Component exports
├── translations/          # Internationalization system
│   ├── config.ts         # Language configuration
│   ├── utils.ts          # Translation utilities
│   └── index.ts          # Translation exports
├── contexts/             # React contexts
├── hooks/                # Global custom hooks
├── lib/                  # Utility functions
├── types/                # TypeScript definitions
├── styles/               # Additional global styles
└── assets/               # Static assets
    ├── images/           # Organized by domain
    └── icons/
```

### Domain Structure

Each domain follows a consistent internal structure:

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
- **Modern React**: React 19 with Next.js 15 App Router

## 🛠️ Development

### Prerequisites

- Node.js 22.0.0 or higher
- npm, yarn, pnpm, or bun

### Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Working with Domains

#### Adding a New Domain

1. Create domain folder: `src/domain/[new-domain]/`
2. Add required structure: `components/`, `translations/`, `constants/`
3. Export from `src/domain/sections.ts`
4. Import in main page: `src/app/page.tsx`

#### Domain Best Practices

- Keep domain-specific code within the domain folder
- Use shared components from `/components` for global UI elements
- Place domain-specific translations in the domain's `translations/` folder
- Export main components through domain's `index.ts`

## 🏗️ Architecture Principles

### Domain-Driven Design (DDD)

- **Domain Isolation**: Each section is a self-contained domain
- **Clear Boundaries**: Components, hooks, and styles are domain-specific
- **Scalability**: Easy to add new sections without affecting existing ones
- **Maintainability**: Code organized by business context, not technical layers

### Development Principles

- **Accessible Components**: ARIA attributes and semantic HTML
- **Clear Code Structure**: Simple and maintainable code
- **Iterative Development**: Start small, improve gradually
- **UX Clarity**: Fast, responsive, with user feedback
- **Type Safety**: Comprehensive TypeScript usage
- **Component Reusability**: Shared components in `/components` and `/domain/shared`

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

- **English (en)** - Default language
- **Portuguese (pt)** - Brazilian Portuguese

### Translation Architecture

- **Domain-Specific**: Each domain manages its own translations
- **Centralized Config**: Language settings in `/src/translations/config.ts`
- **Type-Safe**: TypeScript ensures translation consistency
- **Fallback System**: Automatic fallback to English if translation missing

### Usage Example

```typescript
import { heroTranslations } from "@/domain/hero/translations";

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

## 📄 License

This project is private and proprietary to LondonLink.

## 🤝 Contributing

This is a private project. For internal development guidelines, please refer to the project documentation.

---

**LondonLink Team** - Building the future of English learning for Brazilian students.
