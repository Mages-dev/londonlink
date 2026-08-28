'use client';

import { useLanguage } from '@/contexts';

/**
 * Skip-to-content link — first focusable element in the document.
 * Visually hidden until focused (WCAG 2.4.1 Bypass Blocks).
 */
export function SkipLink() {
  const { language } = useLanguage();

  return (
    <a href="#main-content" className="skip-link">
      {language === 'pt' ? 'Pular para o conteúdo' : 'Skip to main content'}
    </a>
  );
}
