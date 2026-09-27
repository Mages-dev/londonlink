'use client';

import { useState, useEffect, useRef } from 'react';
import { NavigationItem, Language } from '@/types';
import { OptimizedImage, SHARED_IMAGES, SHARED_IMAGE_ALTS } from '@/domain/shared';
import { ThemeSelector } from '@/components/ui';
import { useTheme } from '@/contexts/ThemeContext';
import './styles/header.css';

// Navigation items with bilingual support
const navigationItems: NavigationItem[] = [
  { href: '#home', label: { pt: 'Início', en: 'Home' } },
  { href: '#about', label: { pt: 'Sobre', en: 'About' } },
  { href: '#goals', label: { pt: 'Objetivos', en: 'Goals' } },
  { href: '#books', label: { pt: 'Livros', en: 'Books' } },
  { href: '#feedback', label: { pt: 'Feedback', en: 'Feedback' } },
  { href: '#gallery', label: { pt: 'Galeria', en: 'Gallery' } },
  { href: '#contact', label: { pt: 'Contato', en: 'Contact' } },
];

const SECTION_IDS = navigationItems.map((item) => item.href.replace('#', ''));

// A click-driven scroll counts as finished once no scroll event arrived for this long.
const SCROLL_IDLE_MS = 150;

interface HeaderProps {
  currentLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
  disableThemeSelector?: boolean;
}

// Tracks the section under the header. The observer is created once: a new one
// reports the current intersections right away, which mid-scroll would mark the
// section being passed over. While a click-driven scroll runs, the clicked
// section stays active until scrolling goes idle.
function useActiveSection(initialSection: string) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const isLockedRef = useRef(false);
  const releaseLockRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isLockedRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Ajusta para ativar a seção quando ela chega mais pro topo
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      },
    );

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
      releaseLockRef.current?.();
    };
  }, []);

  const selectSection = (id: string) => {
    releaseLockRef.current?.();
    setActiveSection(id);
    isLockedRef.current = true;

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    const release = () => {
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', waitForIdle);
      isLockedRef.current = false;
      releaseLockRef.current = null;
    };
    function waitForIdle() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(release, SCROLL_IDLE_MS);
    }

    window.addEventListener('scroll', waitForIdle, { passive: true });
    waitForIdle();
    releaseLockRef.current = release;
  };

  return { activeSection, selectSection };
}

export default function Header({
  currentLanguage = 'pt',
  onLanguageChange,
  disableThemeSelector = false,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, selectSection } = useActiveSection('home');
  const [windowWidth, setWindowWidth] = useState(0);
  const { mode, setMode } = useTheme();

  // Detect window width for responsive navigation
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLanguageToggle = () => {
    const newLanguage: Language = currentLanguage === 'en' ? 'pt' : 'en';
    onLanguageChange?.(newLanguage);
  };

  const handleThemeToggle = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      selectSection(href.replace('#', ''));
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-slate-700 bg-slate-900/75 backdrop-blur-sm">
      <nav
        aria-label={currentLanguage === 'pt' ? 'Navegação principal' : 'Main navigation'}
        className="mx-auto max-w-7xl px-6 py-5"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <OptimizedImage
              src={SHARED_IMAGES.logos.main}
              alt={SHARED_IMAGE_ALTS.logos.main}
              width={180}
              height={60}
              priority
              className="h-8 w-auto object-contain sm:h-10 md:h-10 lg:h-14 xl:h-16"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-10 lg:flex">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative cursor-pointer text-lg font-medium transition-colors duration-200 ${
                    isActive ? 'font-semibold text-white' : 'text-gray-300 hover:text-white'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item.label[currentLanguage]}
                  {isActive && <span className="nav-active-indicator"></span>}
                </button>
              );
            })}
          </div>

          {/* Tablet Navigation */}
          <div
            className={`items-center ${
              windowWidth >= 817 && windowWidth < 1024 ? 'flex' : 'hidden'
            }`}
          >
            <div className="flex items-center" style={{ gap: 'clamp(0.7rem, 2.5vw, 1rem)' }}>
              {navigationItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative cursor-pointer rounded px-2 py-1 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'nav-tablet-active'
                        : 'text-gray-300 hover:bg-gray-800/30 hover:text-white'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label[currentLanguage]}
                    {isActive && <span className="nav-tablet-active-indicator"></span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Theme Selector, Theme Toggle, Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {!disableThemeSelector && process.env.NODE_ENV === 'development' && (
              <ThemeSelector currentLanguage={currentLanguage} />
            )}

            {/* Theme Toggle Button - Shows current theme */}
            <button
              onClick={handleThemeToggle}
              aria-pressed={mode === 'dark'}
              className="flex items-center justify-center rounded-lg bg-gray-800 p-3 shadow-sm transition-all duration-200 hover:bg-gray-700 hover:shadow-md"
              aria-label={
                mode === 'dark'
                  ? currentLanguage === 'pt'
                    ? 'Tema escuro ativo - Clique para alternar'
                    : 'Dark theme active - Click to toggle'
                  : currentLanguage === 'pt'
                    ? 'Tema claro ativo - Clique para alternar'
                    : 'Light theme active - Click to toggle'
              }
            >
              <div className="flex h-6 w-6 items-center justify-center">
                <OptimizedImage
                  src={mode === 'dark' ? SHARED_IMAGES.icons.moon : SHARED_IMAGES.icons.sun}
                  alt={mode === 'dark' ? SHARED_IMAGE_ALTS.icons.moon : SHARED_IMAGE_ALTS.icons.sun}
                  width={24}
                  height={24}
                  className="h-full w-full object-contain text-gray-300"
                />
              </div>
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={handleLanguageToggle}
              aria-pressed={currentLanguage === 'en'}
              className="flex items-center space-x-2 rounded-lg bg-gray-800 px-4 py-2 shadow-sm transition-all duration-200 hover:bg-gray-700 hover:shadow-md"
              aria-label={
                currentLanguage === 'en' ? 'EN — switch to Portuguese' : 'PT — mudar para inglês'
              }
            >
              <div className="h-6 w-6 overflow-hidden rounded-full shadow-sm">
                <OptimizedImage
                  src={
                    currentLanguage === 'en'
                      ? SHARED_IMAGES.icons.ukFlag
                      : SHARED_IMAGES.icons.brFlag
                  }
                  alt={
                    currentLanguage === 'en'
                      ? SHARED_IMAGE_ALTS.icons.ukFlag
                      : SHARED_IMAGE_ALTS.icons.brFlag
                  }
                  width={24}
                  height={24}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-300">
                {currentLanguage === 'en' ? 'EN' : 'PT'}
              </span>
            </button>

            <button
              onClick={toggleMobileMenu}
              className={`rounded-lg p-3 transition-colors duration-200 hover:bg-gray-800 ${
                windowWidth < 817 ? 'block' : 'hidden'
              }`}
              aria-label={currentLanguage === 'pt' ? 'Alternar menu' : 'Toggle menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <div className="flex h-6 w-6 flex-col items-center justify-center">
                <span
                  className={`block h-0.5 w-5 bg-gray-300 transition-all duration-300 ${
                    isMobileMenuOpen ? 'translate-y-1 rotate-45' : ''
                  }`}
                />
                <span
                  className={`mt-1 block h-0.5 w-5 bg-gray-300 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`mt-1 block h-0.5 w-5 bg-gray-300 transition-all duration-300 ${
                    isMobileMenuOpen ? '-translate-y-1 -rotate-45' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-nav"
          className={`transition-all duration-300 ease-in-out ${
            windowWidth < 817 ? 'block' : 'hidden'
          } ${
            isMobileMenuOpen ? 'mt-6 max-h-screen opacity-100' : 'max-h-0 overflow-hidden opacity-0'
          }`}
        >
          <div className="space-y-2 border-t border-slate-700 py-6">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative block w-full cursor-pointer rounded-lg px-6 py-3 text-left text-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? 'nav-mobile-active'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  {item.label[currentLanguage]}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
