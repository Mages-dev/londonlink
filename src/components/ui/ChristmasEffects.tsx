"use client";

import React, { useEffect, useState, useMemo } from "react";
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

export default function ChristmasEffects() {
  const { commemorativeTheme } = useTheme();
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [mounted, setMounted] = useState(false);

  const isChristmasTheme = commemorativeTheme === "christmas";

  // Christmas emojis for floating effects (memoized to prevent re-creation)
  const christmasEmojis = useMemo(
    () => ["🎄", "🎁", "❄️", "⭐", "🔔", "🎅", "🤶", "🦌", "⛄", "🕯️"],
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Create floating elements
  const createElements = () => {
    if (!isChristmasTheme) {
      setElements([]);
      return;
    }

    const newElements: FloatingElement[] = [];
    const elementCount = window.innerWidth < 768 ? 8 : 15; // Fewer on mobile

    for (let i = 0; i < elementCount; i++) {
      newElements.push({
        id: i,
        emoji: christmasEmojis[Math.floor(Math.random() * christmasEmojis.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 20 + 15, // 15-35px
        speed: Math.random() * 2 + 1, // 1-3 speed
        rotation: Math.random() * 360,
      });
    }

    setElements(newElements);
  };

  // Initialize and handle resize
  useEffect(() => {
    if (!mounted || !isChristmasTheme) return;

    createElements();

    const handleResize = () => {
      createElements();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, isChristmasTheme, christmasEmojis]);

  useEffect(() => {
    if (!isChristmasTheme || elements.length === 0) return;

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

    const interval = setInterval(animateElements, 50); // 20 FPS
    return () => clearInterval(interval);
  }, [isChristmasTheme, elements.length]);

  // Don't render anything if not mounted or not Christmas theme
  if (!mounted || !isChristmasTheme) {
    return null;
  }

  return (
    <>
      {/* Floating Christmas Elements */}
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
              filter: "drop-shadow(0 0 3px rgba(220, 38, 38, 0.3))",
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>

      {/* Christmas Background Patterns */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle Christmas pattern overlay */}
        <div className="absolute inset-0 christmas-pattern opacity-30" />
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-2000" />
        
        {/* Christmas lights effect */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500/20 via-green-500/20 to-red-500/20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-500/20 via-red-500/20 to-green-500/20 animate-pulse delay-500" />
      </div>

      {/* Christmas Snow Effect */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* Animated snowflakes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`snow-${i}`}
            className="absolute text-white/60 animate-bounce"
            style={{
              left: `${(i * 15 + 10)}%`,
              top: "-20px",
              fontSize: "1.5rem",
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
              animationIterationCount: "infinite",
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Christmas Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-yellow-400 animate-ping"
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
    </>
  );
}
