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

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "goals",
        "books",
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
              className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
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
              className="md:hidden p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
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
          className={`md:hidden transition-all duration-300 ease-in-out ${
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
