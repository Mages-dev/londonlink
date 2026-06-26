# Layout Components

## 📐 Overview

This directory contains all layout-related components that define the structural elements of the LondonLink application. These components are responsible for the overall page structure and navigation.

## 🏗️ Architecture Philosophy

Layout components are **structural elements** that:

- Define the overall page structure
- Handle navigation and routing
- Provide consistent UI patterns across the application
- Are **not domain-specific** but serve the entire application

This is why they are separated from domain-specific components and placed at the root level.

## 📁 Components

### Header.tsx

- Main navigation header
- Logo and branding
- Navigation menu

### HeaderWithTheme.tsx

- Enhanced header with theme switching capabilities
- Language selection
- Commemorative theme integration

### Footer.tsx

- Application footer
- Copyright information
- Simple, clean design

## 🔧 Usage

```tsx
import { HeaderWithTheme, Footer } from '@/layout';

function App() {
  return (
    <div>
      <HeaderWithTheme
        currentLanguage="pt"
        onLanguageChange={handleLanguageChange}
      />

      {/* Page content */}

      <Footer />
    </div>
  );
}
```

## 🎯 Design Principles

### 1. **Separation of Concerns**

- Layout components handle structure
- Domain components handle business logic
- Shared components handle reusable utilities

### 2. **Consistency**

- All layout components follow the same patterns
- Consistent styling and behavior
- Unified theming support

### 3. **Accessibility**

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support

## 📱 Responsive Design

All layout components are designed to be:

- **Mobile-first**: Optimized for mobile devices
- **Responsive**: Adapt to different screen sizes
- **Touch-friendly**: Appropriate touch targets

## 🌐 Internationalization

Layout components support:

- **Bilingual content**: Portuguese and English
- **RTL support**: Ready for right-to-left languages
- **Locale-aware formatting**: Dates, numbers, etc.

## 🎨 Theming

Layout components integrate with:

- **Dark/Light modes**: Automatic theme switching
- **Commemorative themes**: Seasonal and special themes
- **Brand consistency**: LondonLink color palette

## 🔗 Dependencies

- **React**: Core functionality
- **Next.js**: Routing and optimization
- **Tailwind CSS**: Styling framework
- **Theme Context**: Global theme management
- **Translation System**: Internationalization

## 📊 Performance

- **Optimized imports**: Tree-shaking friendly
- **Minimal bundle impact**: Lightweight components
- **Efficient rendering**: Optimized React patterns

## 🚀 Future Enhancements

Potential additions:

- **Breadcrumb navigation**
- **Sidebar layouts**
- **Modal containers**
- **Toast notification containers**
