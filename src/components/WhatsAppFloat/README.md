# WhatsApp Float Component

## 📱 Overview

A floating WhatsApp contact button that appears in the bottom-right corner of the screen, providing users with quick access to contact via WhatsApp.

## 🎯 Features

- **Floating Position**: Fixed bottom-right corner
- **Delayed Appearance**: Shows after 2 seconds of page load
- **Interactive Tooltip**: Appears after 1 second, auto-hides after 5 seconds
- **Bilingual Support**: Portuguese and English messages
- **Responsive Design**: Adapts to mobile and desktop
- **Accessibility**: Screen reader compatible
- **Smooth Animations**: Fade-in, hover effects, and pulse animation
- **Official WhatsApp Icon**: Uses the official WhatsApp SVG icon

## 🔧 Usage

```tsx
import { WhatsAppFloat } from "@/components";

function App() {
  return (
    <div>
      {/* Your app content */}
      <WhatsAppFloat currentLanguage="pt" />
    </div>
  );
}
```

## 📋 Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `currentLanguage` | `"en" \| "pt"` | ✅ | Language for tooltip and aria-label |

## 🎨 Styling

The component uses its own CSS file (`WhatsAppFloat.css`) with:

- **BEM Methodology**: Clean, maintainable CSS class names
- **CSS Custom Properties**: Easy theming and customization
- **Responsive Breakpoints**: Mobile-first approach
- **Accessibility**: Respects `prefers-reduced-motion`

### CSS Classes

- `.whatsapp-float` - Main container
- `.whatsapp-float__button` - The circular button
- `.whatsapp-float__icon` - WhatsApp icon
- `.whatsapp-float__tooltip` - Tooltip container
- `.whatsapp-float__pulse` - Pulse animation overlay

## 🌐 Internationalization

### Portuguese (pt)
- **Tooltip**: "Fale conosco no WhatsApp!"
- **Aria-label**: "Contato via WhatsApp"

### English (en)
- **Tooltip**: "Chat with us on WhatsApp!"
- **Aria-label**: "Contact via WhatsApp"

## 📱 Responsive Behavior

### Desktop (> 768px)
- **Size**: 56px × 56px
- **Position**: 24px from bottom-right
- **Icon**: 50px × 50px (90% of button)

### Mobile (≤ 768px)
- **Size**: 48px × 48px
- **Position**: 16px from bottom-right
- **Smaller tooltip**: Reduced font size and padding

## ♿ Accessibility

- **ARIA Labels**: Descriptive labels in both languages
- **Keyboard Navigation**: Focusable and keyboard accessible
- **Reduced Motion**: Respects user's motion preferences
- **Screen Readers**: Properly announced as WhatsApp contact link

## 🔗 Dependencies

- **React**: Hooks (useState, useEffect)
- **Next.js**: Image component for optimized icon loading
- **Lucide React**: X icon for tooltip close button
- **Domain Dependencies**: Contact translations and constants

## 📁 File Structure

```
src/components/WhatsAppFloat/
├── WhatsAppFloat.tsx     # Main component
├── WhatsAppFloat.css     # Component styles
├── index.ts              # Export file
└── README.md             # This documentation
```

## 🚀 Performance

- **Lazy Loading**: Icon loaded with Next.js Image optimization
- **Minimal Bundle**: Only loads when component is used
- **CSS Isolation**: Styles don't affect global scope
- **Efficient Animations**: GPU-accelerated transforms
