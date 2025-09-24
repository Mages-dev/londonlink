"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface FloatingElement {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
}

interface HeartPetal {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  speed: number;
  rotation: number;
  drift: number;
}

export default function ValentineEffects() {
  const { commemorativeTheme } = useTheme();
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [petals, setPetals] = useState<HeartPetal[]>([]);
  const [mounted, setMounted] = useState(false);

  const isValentineTheme = commemorativeTheme === "valentine";

  // Valentine emojis for floating effects (memoized to prevent re-creation)
  const valentineEmojis = useMemo(
    () => ["💕", "💖", "💗", "💘", "💝", "💞", "💟", "❤️", "🌹", "💐"],
    []
  );

  // Heart petals and romantic elements
  const heartPetals = useMemo(
    () => ["🌹", "💐", "🌺", "🌸", "💕", "💖", "💗", "❤️"],
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Create floating elements
  const createElements = useCallback(() => {
    if (!isValentineTheme) {
      setElements([]);
      return;
    }

    const newElements: FloatingElement[] = [];
    const elementCount = window.innerWidth < 768 ? 8 : 15; // Fewer on mobile

    for (let i = 0; i < elementCount; i++) {
      newElements.push({
        id: i,
        emoji:
          valentineEmojis[Math.floor(Math.random() * valentineEmojis.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 16 + 18, // 18-34px
        speed: Math.random() * 1.2 + 0.6, // 0.6-1.8 speed
        rotation: Math.random() * 360,
      });
    }

    setElements(newElements);
  }, [isValentineTheme, valentineEmojis]);

  // Create heart petals
  const createPetals = useCallback(() => {
    if (!isValentineTheme) {
      setPetals([]);
      return;
    }

    const newPetals: HeartPetal[] = [];
    const petalCount = window.innerWidth < 768 ? 12 : 20;

    for (let i = 0; i < petalCount; i++) {
      newPetals.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        emoji: heartPetals[Math.floor(Math.random() * heartPetals.length)],
        size: Math.random() * 12 + 8, // 8-20px
        speed: Math.random() * 2 + 1, // 1-3 speed
        rotation: Math.random() * 360,
        drift: (Math.random() - 0.5) * 2, // -1 to 1 horizontal drift
      });
    }

    setPetals(newPetals);
  }, [isValentineTheme, heartPetals]);

  // Initialize and handle resize
  useEffect(() => {
    if (!mounted || !isValentineTheme) return;

    createElements();
    createPetals();

    const handleResize = () => {
      createElements();
      createPetals();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, isValentineTheme, createElements, createPetals]);

  // Animate floating elements
  useEffect(() => {
    if (!isValentineTheme || elements.length === 0) return;

    const animateElements = () => {
      setElements((prevElements) =>
        prevElements.map((element) => ({
          ...element,
          y: element.y + element.speed,
          rotation: element.rotation + 1.5,
          // Reset position when element goes off screen
          ...(element.y > window.innerHeight + 50 && {
            y: -50,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    };

    const interval = setInterval(animateElements, 60); // ~16 FPS
    return () => clearInterval(interval);
  }, [isValentineTheme, elements.length]);

  // Animate heart petals
  useEffect(() => {
    if (!isValentineTheme || petals.length === 0) return;

    const animatePetals = () => {
      setPetals((prevPetals) =>
        prevPetals.map((petal) => ({
          ...petal,
          y: petal.y + petal.speed,
          x: petal.x + petal.drift * 0.5,
          rotation: petal.rotation + 3,
          // Reset position when petal goes off screen
          ...(petal.y > window.innerHeight + 20 && {
            y: -20,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    };

    const interval = setInterval(animatePetals, 50); // 20 FPS
    return () => clearInterval(interval);
  }, [isValentineTheme, petals.length]);

  // Don't render anything if not mounted or not Valentine theme
  if (!mounted || !isValentineTheme) {
    return null;
  }

  return (
    <>
      {/* Floating Valentine Elements */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {elements.map((element) => (
          <div
            key={element.id}
            className="absolute transition-transform duration-100 ease-linear"
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              fontSize: `${element.size}px`,
              transform: `rotate(${element.rotation}deg)`,
              filter: "drop-shadow(0 0 3px rgba(225, 29, 72, 0.4))",
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>

      {/* Heart Petals Effect */}
      <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute transition-transform duration-75 ease-linear"
            style={{
              left: `${petal.x}px`,
              top: `${petal.y}px`,
              fontSize: `${petal.size}px`,
              transform: `rotate(${petal.rotation}deg)`,
              filter: "drop-shadow(0 0 2px rgba(236, 72, 153, 0.3))",
            }}
          >
            {petal.emoji}
          </div>
        ))}
      </div>

      {/* Valentine Background Patterns */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Valentine pattern overlay */}
        <div className="absolute inset-0 valentine-pattern opacity-20" />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-36 h-36 bg-rose-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-28 h-28 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-rose-400/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      {/* Cupid's Arrows Effect */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* Animated arrows */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`arrow-${i}`}
            className="absolute text-2xl"
            style={{
              top: `${20 + i * 30}%`,
              left: "-50px",
              animationName: "valentine-arrow",
              animationDuration: `${8 + i * 2}s`,
              animationDelay: `${i * 3}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            }}
          >
            💘
          </div>
        ))}
      </div>

      {/* Love Letters Effect */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={`letter-${i}`}
            className="absolute text-pink-400 animate-pulse"
            style={{
              left: `${i * 15 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: "3s",
            }}
          >
            {i % 2 === 0 ? "💌" : "💕"}
          </div>
        ))}
      </div>

      {/* Romantic Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(10)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-pink-300 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "2s",
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Love Birds Effect (decorative) */}
      <div className="fixed top-4 left-4 pointer-events-none z-10">
        <div className="text-3xl animate-bounce">🕊️💕</div>
      </div>

      {/* Romantic Quote Bubble (decorative) */}
      <div className="fixed bottom-4 right-4 pointer-events-none z-10">
        <div className="text-2xl animate-pulse">💭💖</div>
      </div>
    </>
  );
}
