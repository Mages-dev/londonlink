'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks the user's `prefers-reduced-motion` setting.
 *
 * Returns `false` during SSR / before mount (no motion assumptions made until
 * the media query is read on the client), then reflects the live value and
 * updates if the user changes the OS setting. Use it to skip JS-driven
 * animation loops — CSS animations are already disabled globally via the
 * `prefers-reduced-motion` block in `globals.css` (WCAG 2.3.3 / 2.2.2).
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}
