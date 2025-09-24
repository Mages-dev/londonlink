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

interface SpringElement {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  speed: number;
  rotation: number;
  drift: number;
}

export default function EasterEffects() {
  const { commemorativeTheme } = useTheme();
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [springElements, setSpringElements] = useState<SpringElement[]>([]);
  const [mounted, setMounted] = useState(false);

  const isEasterTheme = commemorativeTheme === "easter";

  // Easter emojis for floating effects (memoized to prevent re-creation)
  const easterEmojis = useMemo(
    () => ["🐰", "🥚", "🐣", "🐤", "🌷", "🌸", "🌺", "🦋", "🌿", "🌱"],
    []
  );

  // Spring elements (flowers, butterflies, etc.)
  const springEmojis = useMemo(
    () => ["🌸", "🌷", "🌺", "🦋", "🌿", "🌱", "🌼", "🌻"],
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Create floating elements
  const createElements = useCallback(() => {
    if (!isEasterTheme) {
      setElements([]);
      return;
    }

    const newElements: FloatingElement[] = [];
    const elementCount = window.innerWidth < 768 ? 8 : 14; // Fewer on mobile

    for (let i = 0; i < elementCount; i++) {
      newElements.push({
        id: i,
        emoji: easterEmojis[Math.floor(Math.random() * easterEmojis.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 16 + 18, // 18-34px
        speed: Math.random() * 1.0 + 0.5, // 0.5-1.5 speed
        rotation: Math.random() * 360,
      });
    }

    setElements(newElements);
  }, [isEasterTheme, easterEmojis]);

  // Create spring elements
  const createSpringElements = useCallback(() => {
    if (!isEasterTheme) {
      setSpringElements([]);
      return;
    }

    const newSpringElements: SpringElement[] = [];
    const springCount = window.innerWidth < 768 ? 10 : 18;

    for (let i = 0; i < springCount; i++) {
      newSpringElements.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        emoji: springEmojis[Math.floor(Math.random() * springEmojis.length)],
        size: Math.random() * 14 + 10, // 10-24px
        speed: Math.random() * 1.8 + 0.8, // 0.8-2.6 speed
        rotation: Math.random() * 360,
        drift: (Math.random() - 0.5) * 1.5, // -0.75 to 0.75 horizontal drift
      });
    }

    setSpringElements(newSpringElements);
  }, [isEasterTheme, springEmojis]);

  // Initialize and handle resize
  useEffect(() => {
    if (!mounted || !isEasterTheme) return;

    createElements();
    createSpringElements();

    const handleResize = () => {
      createElements();
      createSpringElements();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, isEasterTheme, createElements, createSpringElements]);

  // Animate floating elements
  useEffect(() => {
    if (!isEasterTheme || elements.length === 0) return;

    const animateElements = () => {
      setElements((prevElements) =>
        prevElements.map((element) => ({
          ...element,
          y: element.y + element.speed,
          rotation: element.rotation + 1,
          // Reset position when element goes off screen
          ...(element.y > window.innerHeight + 50 && {
            y: -50,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    };

    const interval = setInterval(animateElements, 70); // ~14 FPS
    return () => clearInterval(interval);
  }, [isEasterTheme, elements.length]);

  // Animate spring elements
  useEffect(() => {
    if (!isEasterTheme || springElements.length === 0) return;

    const animateSpringElements = () => {
      setSpringElements((prevElements) =>
        prevElements.map((element) => ({
          ...element,
          y: element.y + element.speed,
          x: element.x + element.drift * 0.3,
          rotation: element.rotation + 2,
          // Reset position when element goes off screen
          ...(element.y > window.innerHeight + 20 && {
            y: -20,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    };

    const interval = setInterval(animateSpringElements, 60); // ~16 FPS
    return () => clearInterval(interval);
  }, [isEasterTheme, springElements.length]);

  // Don't render anything if not mounted or not Easter theme
  if (!mounted || !isEasterTheme) {
    return null;
  }

  return (
    <>
      {/* Floating Easter Elements */}
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
              filter: "drop-shadow(0 0 3px rgba(16, 185, 129, 0.3))",
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>

      {/* Spring Elements Effect */}
      <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
        {springElements.map((element) => (
          <div
            key={element.id}
            className="absolute transition-transform duration-75 ease-linear"
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              fontSize: `${element.size}px`,
              transform: `rotate(${element.rotation}deg)`,
              filter: "drop-shadow(0 0 2px rgba(245, 158, 11, 0.3))",
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>

      {/* Easter Background Patterns */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Easter pattern overlay */}
        <div className="absolute inset-0 easter-pattern opacity-20" />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-28 h-28 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-36 h-36 bg-amber-500/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      {/* Easter Egg Hunt Effect */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* Animated rolling eggs */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`egg-${i}`}
            className="absolute text-2xl"
            style={{
              top: `${30 + i * 25}%`,
              left: "-50px",
              animationName: "easter-egg-roll",
              animationDuration: `${10 + i * 2}s`,
              animationDelay: `${i * 4}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            }}
          >
            🥚
          </div>
        ))}
      </div>

      {/* Garden Flowers Effect */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={`flower-${i}`}
            className="absolute text-green-400 animate-pulse"
            style={{
              left: `${i * 12 + 8}%`,
              top: `${Math.random() * 80 + 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          >
            {i % 4 === 0
              ? "🌷"
              : i % 4 === 1
              ? "🌸"
              : i % 4 === 2
              ? "🌺"
              : "🌼"}
          </div>
        ))}
      </div>

      {/* Butterflies Effect */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={`butterfly-${i}`}
            className="absolute text-yellow-400 easter-butterfly"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: "3s",
            }}
          >
            🦋
          </div>
        ))}
      </div>

      {/* Easter Bunny (decorative) */}
      <div className="fixed top-4 left-4 pointer-events-none z-10">
        <div className="text-3xl animate-bounce">🐰🌸</div>
      </div>

      {/* Spring Garden (decorative) */}
      <div className="fixed bottom-4 right-4 pointer-events-none z-10">
        <div className="text-2xl animate-pulse">🌱🌷</div>
      </div>
    </>
  );
}
