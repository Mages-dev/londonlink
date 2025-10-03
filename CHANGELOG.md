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

## [1.0.0] - 2025-01-XX

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

