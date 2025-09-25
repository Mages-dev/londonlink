"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Carnival Effects Component
 *
 * Creates vibrant carnival-themed visual effects including:
 * - Floating carnival emojis (masks, confetti, musical instruments)
 * - Samba dancers and parade elements
 * - Colorful confetti rain
 * - Decorative carnival elements
 *
 * Features:
 * - Performance optimized with useCallback and useMemo
 * - Responsive design for mobile and desktop
 * - Accessibility support (respects prefers-reduced-motion)
 * - Brazilian Carnival theme with vibrant colors
 */

export default function CarnivalEffects(): React.JSX.Element | null {
  const { commemorativeTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isCarnivalTheme = commemorativeTheme === "carnival";

  // Carnival emojis for floating effects (memoized to prevent re-creation)
  const carnivalEmojis = useMemo(
    () => [
      "🎭",
      "🎪",
      "🎨",
      "🎺",
      "🥁",
      "🎷",
      "💃",
      "🕺",
      "🤹",
      "🎊",
      "🎉",
      "🎈",
    ],
    []
  );

  // Samba and parade elements
  const sambaEmojis = useMemo(
    () => ["💃", "🕺", "🥁", "🎺", "🎷", "🎪", "🎭", "👑", "💎", "✨"],
    []
  );

  // Confetti colors (Brazilian carnival inspired)
  const confettiColors = useMemo(
    () => ["#ff6b35", "#f7931e", "#c41e3a", "#2e8b57", "#9932cc", "#ffd700"],
    []
  );

  // Create floating carnival elements
  const createElements = useCallback((): Array<{
    id: number;
    emoji: string;
    left: number;
    animationDuration: number;
    animationDelay: number;
    size: number;
  }> => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: carnivalEmojis[Math.floor(Math.random() * carnivalEmojis.length)],
      left: Math.random() * 100,
      animationDuration: 8 + Math.random() * 12, // 8-20 seconds
      animationDelay: Math.random() * 5, // 0-5 seconds delay
      size: 0.8 + Math.random() * 0.8, // 0.8-1.6 size multiplier
    }));
  }, [carnivalEmojis]);

  // Create confetti pieces
  const createConfetti = useCallback((): Array<{
    id: number;
    color: string;
    left: number;
    animationDuration: number;
    animationDelay: number;
    rotation: number;
  }> => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 4, // 3-7 seconds
      animationDelay: Math.random() * 3, // 0-3 seconds delay
      rotation: Math.random() * 360, // Random initial rotation
    }));
  }, [confettiColors]);

  // Create samba parade elements
  const createSambaElements = useCallback((): Array<{
    id: number;
    emoji: string;
    left: number;
    animationDuration: number;
    animationDelay: number;
    size: number;
  }> => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      emoji: sambaEmojis[Math.floor(Math.random() * sambaEmojis.length)],
      left: Math.random() * 100,
      animationDuration: 12 + Math.random() * 8, // 12-20 seconds
      animationDelay: Math.random() * 6, // 0-6 seconds delay
      size: 1 + Math.random() * 0.5, // 1-1.5 size multiplier
    }));
  }, [sambaEmojis]);

  // Memoize the element arrays to prevent unnecessary re-renders
  const floatingElements = useMemo(() => createElements(), [createElements]);
  const confettiPieces = useMemo(() => createConfetti(), [createConfetti]);
  const sambaElements = useMemo(
    () => createSambaElements(),
    [createSambaElements]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isCarnivalTheme) return;

    // Add carnival theme class to body
    document.body.classList.add("theme-carnival");

    // Cleanup function
    return () => {
      document.body.classList.remove("theme-carnival");
    };
  }, [
    mounted,
    isCarnivalTheme,
    createElements,
    createConfetti,
    createSambaElements,
  ]);

  // Don't render on server or if not carnival theme
  if (!mounted || !isCarnivalTheme) {
    return null;
  }

  return (
    <>
      {/* Floating Carnival Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {floatingElements.map((element) => (
          <div
            key={`carnival-${element.id}`}
            className="absolute animate-bounce"
            style={{
              left: `${element.left}%`,
              fontSize: `${element.size * 2}rem`,
              animationDuration: `${element.animationDuration}s`,
              animationDelay: `${element.animationDelay}s`,
              animationDirection: Math.random() > 0.5 ? "normal" : "reverse",
              transform: `translateY(100vh)`,
              animation: `
                carnivalFloat ${
                  element.animationDuration
                }s ease-in-out infinite,
                carnivalSway ${
                  element.animationDuration * 0.7
                }s ease-in-out infinite
              `,
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>

      {/* Confetti Rain */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {confettiPieces.map((confetti) => (
          <div
            key={`confetti-${confetti.id}`}
            className="absolute w-2 h-2 opacity-80"
            style={{
              left: `${confetti.left}%`,
              backgroundColor: confetti.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
              animationDuration: `${confetti.animationDuration}s`,
              animationDelay: `${confetti.animationDelay}s`,
              transform: `rotate(${confetti.rotation}deg) translateY(100vh)`,
              animation: `carnivalConfettiFall ${confetti.animationDuration}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Samba Parade Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {sambaElements.map((element) => (
          <div
            key={`samba-${element.id}`}
            className="absolute"
            style={{
              left: `${element.left}%`,
              top: `${60 + Math.random() * 30}%`, // Lower part of screen
              fontSize: `${element.size * 2.5}rem`,
              animationDuration: `${element.animationDuration}s`,
              animationDelay: `${element.animationDelay}s`,
              animation: `carnivalSamba ${
                element.animationDuration * 0.3
              }s ease-in-out infinite`,
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>

      {/* Carnival Masks (decorative) */}
      <div className="fixed top-4 left-4 pointer-events-none z-10">
        <div className="text-4xl animate-pulse carnival-mask">🎭🎪</div>
      </div>

      {/* Samba Dancers (decorative) */}
      <div className="fixed top-4 right-4 pointer-events-none z-10">
        <div className="text-3xl carnival-mask">💃🕺</div>
      </div>

      {/* Carnival Instruments (decorative) */}
      <div className="fixed bottom-4 left-4 pointer-events-none z-10">
        <div className="text-3xl animate-bounce">🎺🥁</div>
      </div>

      {/* Carnival Celebration (decorative) */}
      <div className="fixed bottom-4 right-4 pointer-events-none z-10">
        <div className="text-2xl animate-pulse">🎉🎊</div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes carnivalFloat {
          0% {
            transform: translateY(100vh) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes carnivalSway {
          0%,
          100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(30px);
          }
        }

        @keyframes carnivalConfettiFall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes carnivalSamba {
          0%,
          100% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateX(5px) translateY(-3px) rotate(3deg);
          }
          50% {
            transform: translateX(-3px) translateY(-6px) rotate(-2deg);
          }
          75% {
            transform: translateX(7px) translateY(-2px) rotate(4deg);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .carnival-mask {
            font-size: 2rem;
          }
        }

        /* Accessibility - Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .carnival-mask,
          .animate-bounce,
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
