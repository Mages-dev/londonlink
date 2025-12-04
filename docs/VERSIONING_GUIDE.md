# 📦 LondonLink Versioning Guide

## Overview

LondonLink uses **Semantic Versioning (SemVer)** to track releases and changes. This guide explains how to manage versions effectively.

## 🎯 Semantic Versioning

### Format: MAJOR.MINOR.PATCH

```
1.0.0
│ │ │
│ │ └─ PATCH: Bug fixes, small improvements
│ └─── MINOR: New features, backward compatible
└───── MAJOR: Breaking changes, major redesigns
```

### Examples

| Change Type | Example | Version Change |
|-------------|---------|----------------|
| Bug fix | Fix typo in contact form | 1.0.0 → 1.0.1 |
| Small improvement | Optimize image loading | 1.0.0 → 1.0.1 |
| New feature | Add student dashboard | 1.0.0 → 1.1.0 |
| New section | Add blog section | 1.0.0 → 1.1.0 |
| Complete redesign | New UI/UX overhaul | 1.0.0 → 2.0.0 |
| Breaking change | Change API structure | 1.0.0 → 2.0.0 |

## 📍 Where Version is Stored

### 1. **package.json** (Source of Truth)
```json
{
  "name": "londonlink",
  "version": "1.0.0"
}
```

### 2. **src/lib/version.ts** (Application Code)
```typescript
export const APP_VERSION = "1.0.0";
```

### 3. **CHANGELOG.md** (Documentation)
```markdown
## [1.0.0] - 2025-01-15
```

## 🔄 How to Update Version

### Method 1: Using npm (Recommended)

```bash
# Patch release (1.0.0 → 1.0.1)
npm version patch

# Minor release (1.0.0 → 1.1.0)
npm version minor

# Major release (1.0.0 → 2.0.0)
npm version major
```

This automatically:
- ✅ Updates `package.json`
- ✅ Creates a git commit
- ✅ Creates a git tag

### Method 2: Manual Update

1. **Update package.json**:
```json
{
  "version": "1.1.0"
}
```

2. **Update src/lib/version.ts**:
```typescript
export const APP_VERSION = "1.1.0";
```

3. **Update CHANGELOG.md**:
```markdown
## [1.1.0] - 2025-02-15

### Added
- New student dashboard
```

4. **Commit changes**:
```bash
git add .
git commit -m "chore: bump version to 1.1.0"
git tag v1.1.0
```

## 📝 Release Checklist

Before releasing a new version:

### Pre-Release
- [ ] All features tested and working
- [ ] No critical bugs
- [ ] Documentation updated
- [ ] CHANGELOG.md updated with changes
- [ ] Version number decided (patch/minor/major)

### Version Update
- [ ] Update `package.json` version
- [ ] Update `src/lib/version.ts` version
- [ ] Update `CHANGELOG.md` with release date
- [ ] Commit changes: `git commit -m "chore: release v1.x.x"`

### Testing
- [ ] Run `npm run build` successfully
- [ ] Run `npm run lint` with no errors
- [ ] Test in production mode locally
- [ ] Test all critical features

### Release
- [ ] Create git tag: `git tag v1.x.x`
- [ ] Push commits: `git push origin main`
- [ ] Push tag: `git push origin v1.x.x`
- [ ] Deploy to production
- [ ] Verify deployment

### Post-Release
- [ ] Monitor for issues
- [ ] Update documentation if needed
- [ ] Announce release (if applicable)

## 🎨 Version Display

### Footer Display

The version is automatically displayed in the footer:

```tsx
// src/layout/Footer.tsx
import { getVersionString } from "@/lib/version";

export function Footer() {
  const version = getVersionString(); // Returns "v1.0.0"
  
  return (
    <footer>
      <p>Version {version}</p>
    </footer>
  );
}
```

### Version Utilities

```typescript
import { 
  APP_VERSION,
  getVersionString,
  getVersionInfo,
  parseVersion 
} from "@/lib/version";

// Get raw version
console.log(APP_VERSION); // "1.0.0"

// Get formatted version
console.log(getVersionString()); // "v1.0.0"

// Get version components
const { major, minor, patch } = parseVersion();
console.log(major, minor, patch); // 1, 0, 0

// Get full version info
const info = getVersionInfo();
console.log(info);
// {
//   version: "1.0.0",
//   versionString: "v1.0.0",
//   major: 1,
//   minor: 0,
//   patch: 0,
//   isProduction: true,
//   badgeColor: "green",
//   name: "londonlink",
//   description: "English Learning Platform..."
// }
```

## 📊 Version History Strategy

### Pre-1.0.0 (Beta/Development)
- **0.1.0 - 0.9.x**: Development versions
- **Frequent changes**: Rapid iteration
- **Breaking changes allowed**: Not production-ready

### 1.0.0 (First Stable Release)
- **Production ready**: Fully tested and stable
- **Feature complete**: All core features implemented
- **Public release**: Ready for users

### 1.x.x (Stable Releases)
- **Backward compatible**: No breaking changes
- **New features**: Added in minor versions
- **Bug fixes**: Added in patch versions

### 2.0.0+ (Major Updates)
- **Breaking changes**: API or architecture changes
- **Major redesigns**: Complete UI/UX overhaul
- **Migration guide**: Provided for users

## 🔖 Git Tagging

### Creating Tags

```bash
# Create annotated tag (recommended)
git tag -a v1.0.0 -m "Release version 1.0.0"

# Create lightweight tag
git tag v1.0.0

# Push tag to remote
git push origin v1.0.0

# Push all tags
git push origin --tags
```

### Viewing Tags

```bash
# List all tags
git tag

# Show tag details
git show v1.0.0

# Checkout specific version
git checkout v1.0.0
```

## 📋 CHANGELOG Format

Follow [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
# Changelog

## [Unreleased]
### Added
- Feature in development

## [1.1.0] - 2025-02-15
### Added
- New student dashboard
- Course progress tracking

### Changed
- Improved mobile navigation

### Fixed
- Contact form validation bug

## [1.0.1] - 2025-01-20
### Fixed
- Typo in hero section
- Image loading optimization

## [1.0.0] - 2025-01-15
### Added
- Initial release
- All core features
```

### Categories

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements

## 🚀 Deployment Workflow

### Automated Deployment (Recommended)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to production
        run: npm run deploy
```

### Manual Deployment

```bash
# 1. Update version
npm version minor

# 2. Build
npm run build

# 3. Deploy
npm run deploy
# or
vercel --prod
```

## 🔍 Version Checking

### In Development

```bash
# Check current version
npm version

# Check package.json version
cat package.json | grep version
```

### In Production

Visit the footer of the website to see the current version.

## 📚 Best Practices

1. **Always update CHANGELOG.md**: Document all changes
2. **Use semantic versioning**: Follow SemVer strictly
3. **Test before releasing**: Run full test suite
4. **Tag releases**: Create git tags for all releases
5. **Keep versions in sync**: package.json and version.ts
6. **Document breaking changes**: Provide migration guides
7. **Communicate releases**: Inform team/users of updates

## 🔮 Future Enhancements

- **Automated version bumping**: CI/CD integration
- **Release notes generation**: Auto-generate from commits
- **Version API endpoint**: `/api/version` for monitoring
- **Update notifications**: Notify users of new versions
