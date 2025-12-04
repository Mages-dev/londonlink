# Changelog

All notable changes to the LondonLink project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned

- User authentication system
- Course enrollment functionality
- Student dashboard
- Progress tracking
- Interactive exercises

## [2.2.0] - 2025-01-04

### 🔄 Updated - Vercel Compatibility

#### Dependencies Updated

- **Next.js**: 15.5.4 → **16.0.7** (Vercel recommended update)
- **React**: 19.1.1 → **19.2.1** (Performance improvements)
- **Lucide React**: 0.544.0 → **0.555.0** (Icon library update)
- **@types/node**: 22 → **24** (Node.js 24 LTS support)
- **eslint-config-next**: 15.5.4 → **16.0.7** (Aligned with Next.js)

#### Why This Update?

Vercel identified compatibility issues with previous framework versions and recommended these updates for:

- ✅ Better deployment stability
- ✅ Improved performance
- ✅ Latest security patches
- ✅ Enhanced build optimization

#### Technical Stack (Updated)

- **Next.js 16.0.7**: Latest stable with App Router
- **React 19.2.1**: Latest with concurrent features
- **Node.js 24**: LTS runtime environment
- **TypeScript 5**: Full type safety
- **Tailwind CSS 4**: Modern utility-first CSS
- **Lucide React 0.555.0**: Icon library

### Changed

- Updated all framework dependencies to Vercel-recommended versions
- Improved build stability and deployment compatibility
- Enhanced performance with latest React optimizations

### Fixed

- Vercel deployment compatibility issues
- Build warnings related to outdated dependencies

---

## [2.1.4] - 2025-01-03

### Added

- Version display system in footer
- Comprehensive versioning utilities
- CHANGELOG.md for tracking releases
- Version documentation guide

### Changed

- Footer now displays current version (v2.1.4)
- Enhanced project metadata in package.json

---

## [2.1.0] - 2025-01-02

### Added

- **Language Persistence**: User language preference saved in localStorage
- **LanguageContext**: Global language state management
- **Browser Language Detection**: Auto-detects user's preferred language
- **Language Toggle**: Easy switch between PT/EN

### Changed

- Refactored language management from local state to Context API
- Improved user experience with persistent preferences

---

## [2.0.0] - 2025-01-01

### 🎉 Major Architecture Refactor

#### Added

- **Layered Architecture**: Clear separation (Layout/Components/Domain/Infrastructure)
- **Layout Directory**: Dedicated folder for structural components
- **Context System**: Global state management with persistence
- **Theme Persistence**: User theme preference saved in localStorage

#### Changed

- **BREAKING**: Moved layout components from `/components/layout` to `/layout`
- **BREAKING**: Moved Footer from `/domain/shared` to `/layout`
- Reorganized imports and exports for better modularity

#### Architecture Improvements

- Clear separation between structural, functional, and business layers
- Better scalability and maintainability
- Improved developer experience with intuitive structure

---

## [1.0.0] - 2024-12-XX

### 🎉 Initial Release

#### Added

- **Landing Page**: Complete responsive landing page
- **Hero Section**: Interactive hero with CTA buttons
- **About Section**: Information about LondonLink methodology
- **Goals Section**: Student learning objectives showcase
- **Books Section**: Three Lions English book series display
- **Feedback Section**: Alternating student testimonials
- **Gallery Section**: L-shaped interactive image gallery with modal
- **Contact Section**: Course registration and contact forms

#### Features

- **Bilingual Support**: Complete Portuguese/English internationalization
- **Language Persistence**: User language preference saved in localStorage
- **Theme System**: Dark/Light mode with automatic detection
- **Commemorative Themes**: Seasonal themes (Halloween, Christmas, Carnival, etc.)
- **Theme Persistence**: User theme preference saved in localStorage
- **Responsive Design**: Mobile-first approach with Tailwind CSS v4
- **WhatsApp Integration**: Floating WhatsApp contact button
- **Accessibility**: ARIA compliant components and semantic HTML
- **Performance**: Optimized images, lazy loading, code splitting
- **SEO**: Meta tags, Open Graph, Twitter Cards

#### Technical Stack

- **Next.js 15.5.4**: React framework with App Router
- **React 19.1.1**: Latest React features
- **TypeScript 5**: Full type safety
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React**: Icon library

#### Architecture

- **Domain-Driven Design**: Code organized by business domains
- **Layered Architecture**: Clear separation (Layout/Components/Domain/Infrastructure)
- **Context System**: Global state management with persistence
- **Translation System**: Centralized bilingual content management

#### Performance Metrics

- **Bundle Size**: 31 kB (page-specific)
- **First Load JS**: 137 kB (including shared chunks)
- **Build Time**: ~1.5s
- **Static Generation**: All pages pre-rendered

---

## Version History

### Version Numbering

LondonLink follows [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH

1.0.0
│ │ │
│ │ └─ Patch: Bug fixes, small improvements
│ └─── Minor: New features, backward compatible
└───── Major: Breaking changes, major redesigns
```

### Examples

- **1.0.0 → 1.0.1**: Bug fix (typo correction, style fix)
- **1.0.0 → 1.1.0**: New feature (new section, new functionality)
- **1.0.0 → 2.0.0**: Major change (complete redesign, new architecture)

---

## How to Update Version

### 1. Manual Update

Edit `package.json`:

```json
{
  "version": "1.1.0"
}
```

### 2. Using npm (Recommended)

```bash
# Patch release (1.0.0 → 1.0.1)
npm version patch

# Minor release (1.0.0 → 1.1.0)
npm version minor

# Major release (1.0.0 → 2.0.0)
npm version major
```

### 3. Update Changelog

Add entry to this file:

```markdown
## [1.1.0] - 2025-02-15

### Added

- New student dashboard
- Course progress tracking

### Fixed

- Mobile menu navigation bug
```

---

## Release Checklist

Before releasing a new version:

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with changes
- [ ] Run `npm run build` to verify build
- [ ] Run `npm run lint` to check code quality
- [ ] Test all features in production mode
- [ ] Update documentation if needed
- [ ] Create git tag: `git tag v1.0.0`
- [ ] Push tag: `git push origin v1.0.0`
- [ ] Deploy to production

---

## Categories

Use these categories in changelog entries:

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements

---

## Links

- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [LondonLink Repository](https://github.com/londonlink/londonlink)
