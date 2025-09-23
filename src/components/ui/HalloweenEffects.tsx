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
  rotationSpeed: number;
}

export default function HalloweenEffects() {
  const { commemorativeTheme } = useTheme();
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [mounted, setMounted] = useState(false);

  const isHalloweenTheme = commemorativeTheme === "halloween";

  // Halloween emojis for floating effects (memoized to prevent re-creation)
  const halloweenEmojis = useMemo(
    () => ["🎃", "👻", "🦇", "🕷️", "🕸️", "🌙", "⭐", "🍂"],
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isHalloweenTheme) {
      setElements([]);
      return;
    }

    // Create floating elements
    const createElements = () => {
      const newElements: FloatingElement[] = [];
      const elementCount = window.innerWidth < 768 ? 8 : 15; // Fewer on mobile

      for (let i = 0; i < elementCount; i++) {
        newElements.push({
          id: i,
          emoji:
            halloweenEmojis[Math.floor(Math.random() * halloweenEmojis.length)],
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 20 + 15, // 15-35px
          speed: Math.random() * 2 + 0.5, // 0.5-2.5 speed
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2, // -1 to 1 rotation speed
        });
      }
      setElements(newElements);
    };

    createElements();

    // Handle window resize
    const handleResize = () => {
      createElements();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, isHalloweenTheme, halloweenEmojis]);

  useEffect(() => {
    if (!isHalloweenTheme || elements.length === 0) return;

    const animateElements = () => {
      setElements((prevElements) =>
        prevElements.map((element) => ({
          ...element,
          y: element.y - element.speed,
          rotation: element.rotation + element.rotationSpeed,
          // Reset position when element goes off screen
          ...(element.y < -50 && {
            y: window.innerHeight + 50,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    };

    const interval = setInterval(animateElements, 50); // 20 FPS
    return () => clearInterval(interval);
  }, [isHalloweenTheme, elements.length]);

  if (!mounted || !isHalloweenTheme) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Floating Halloween elements */}
      {elements.map((element) => (
        <div
          key={element.id}
          className="absolute transition-opacity duration-1000 opacity-70 hover:opacity-100"
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            fontSize: `${element.size}px`,
            transform: `rotate(${element.rotation}deg)`,
            filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))",
            animation: "halloween-float 3s ease-in-out infinite",
            animationDelay: `${element.id * 0.2}s`,
          }}
        >
          {element.emoji}
        </div>
      ))}

      {/* Spooky background overlay */}
      <div className="absolute inset-0 halloween-bg-pattern opacity-30" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-xl animate-pulse" />
      <div
        className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-orange-500/20 blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-3/4 w-20 h-20 rounded-full bg-yellow-500/20 blur-xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      {/* Subtle spider web in corners */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0,0 L50,50 L100,0 M0,0 L50,25 L100,0 M0,0 L25,50 L0,100 M50,50 L100,100 M50,50 L0,100"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-gray-400"
          />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 opacity-20 transform scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M0,0 L50,50 L100,0 M0,0 L50,25 L100,0 M0,0 L25,50 L0,100 M50,50 L100,100 M50,50 L0,100"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-gray-400"
          />
        </svg>
      </div>
    </div>
  );
}
