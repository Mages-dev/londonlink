"use client";

import { useState, useEffect } from "react";
import { NavigationItem, Language } from "@/types";
import {
  OptimizedImage,
  SHARED_IMAGES,
  SHARED_IMAGE_ALTS,
} from "@/domain/shared";

// Navigation items with bilingual support
const navigationItems: NavigationItem[] = [
  {
    href: "#home",
    label: {
      pt: "Início",
      en: "Home",
    },
  },
  {
    href: "#about",
    label: {
      pt: "Sobre",
      en: "About",
    },
  },
  {
    href: "#goals",
    label: {
      pt: "Objetivos",
      en: "Goals",
    },
  },
  {
    href: "#books",
    label: {
      pt: "Livros",
      en: "Books",
    },
  },
  {
    href: "#feedbacks",
    label: {
      pt: "Feedbacks",
      en: "Feedbacks",
    },
  },
  {
    href: "#gallery",
    label: {
      pt: "Galeria",
      en: "Gallery",
    },
  },
  {
    href: "#contact",
    label: {
      pt: "Contato",
      en: "Contact",
    },
  },
];

interface HeaderProps {
  currentLanguage?: Language;
  onLanguageChange?: (language: Language) => void;
}

export default function Header({
  currentLanguage = "en",
  onLanguageChange,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [windowWidth, setWindowWidth] = useState(0);

  // Detect window width for responsive navigation
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "goals",
        "books",
        "feedbacks",
        "gallery",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100; // Offset for fixed header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLanguageToggle = () => {
    const newLanguage: Language = currentLanguage === "en" ? "pt" : "en";
    onLanguageChange?.(newLanguage);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update active section immediately for better UX
      setActiveSection(href.replace("#", ""));
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-slate-700">
      <nav className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <OptimizedImage
              src={SHARED_IMAGES.logos.main}
              alt={SHARED_IMAGE_ALTS.logos.main}
              width={180}
              height={60}
              priority
              className="h-8 sm:h-10 md:h-10 lg:h-14 xl:h-16 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`font-medium transition-all duration-200 text-lg cursor-pointer relative ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-gray-300 hover:text-white"
                  }`}
                  aria-label={`Navigate to ${item.label[currentLanguage]}`}
                >
                  {item.label[currentLanguage]}
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tablet Navigation (817px - 1023px) */}
          <div
            className={`items-center ${
              windowWidth >= 817 && windowWidth < 1024 ? "flex" : "hidden"
            }`}
          >
            <div
              className="flex items-center"
              style={{ gap: "clamp(0.7rem, 2.5vw, 1rem)" }}
            >
              {navigationItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`font-medium transition-all duration-200 text-sm cursor-pointer relative px-2 py-1 rounded ${
                      isActive
                        ? "text-white font-semibold bg-yellow-400/20"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                    }`}
                    aria-label={`Navigate to ${item.label[currentLanguage]}`}
                  >
                    {item.label[currentLanguage]}
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1 right-1 h-0.5 bg-yellow-400 rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-6">
            {/* Language Toggle */}
            <button
              onClick={handleLanguageToggle}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label={`Switch to ${
                currentLanguage === "en" ? "Portuguese" : "English"
              }`}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden shadow-sm">
                <OptimizedImage
                  src={
                    currentLanguage === "en"
                      ? SHARED_IMAGES.icons.ukFlag
                      : SHARED_IMAGES.icons.brFlag
                  }
                  alt={
                    currentLanguage === "en"
                      ? SHARED_IMAGE_ALTS.icons.ukFlag
                      : SHARED_IMAGE_ALTS.icons.brFlag
                  }
                  width={24}
                  height={24}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {currentLanguage === "en" ? "EN" : "PT"}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ${
                windowWidth < 817 || windowWidth >= 1024 ? "block" : "hidden"
              }`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 mt-1 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 mt-1 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            windowWidth < 817 || windowWidth >= 1024 ? "block" : "hidden"
          } ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 mt-6"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="py-6 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-6 py-3 rounded-lg font-medium transition-all duration-200 text-lg cursor-pointer relative ${
                    isActive
                      ? "text-white font-semibold bg-yellow-400/20 border-l-4 border-yellow-400"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                  aria-label={`Navigate to ${item.label[currentLanguage]}`}
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
