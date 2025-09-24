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

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speed: number;
  rotation: number;
}

export default function NewYearEffects() {
  const { commemorativeTheme } = useTheme();
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [mounted, setMounted] = useState(false);

  const isNewYearTheme = commemorativeTheme === "new-year";

  // New Year emojis for floating effects (memoized to prevent re-creation)
  const newYearEmojis = useMemo(
    () => ["🎆", "🎇", "🥂", "🍾", "🎊", "🎉", "✨", "🌟", "💫", "🎈"],
    []
  );

  // Confetti colors
  const confettiColors = useMemo(
    () => ["#d97706", "#f59e0b", "#eab308", "#6366f1", "#8b5cf6", "#f3f4f6"],
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Create floating elements
  const createElements = useCallback(() => {
    if (!isNewYearTheme) {
      setElements([]);
      return;
    }

    const newElements: FloatingElement[] = [];
    const elementCount = window.innerWidth < 768 ? 6 : 12; // Fewer on mobile

    for (let i = 0; i < elementCount; i++) {
      newElements.push({
        id: i,
        emoji: newYearEmojis[Math.floor(Math.random() * newYearEmojis.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 18 + 16, // 16-34px
        speed: Math.random() * 1.5 + 0.8, // 0.8-2.3 speed
        rotation: Math.random() * 360,
      });
    }

    setElements(newElements);
  }, [isNewYearTheme, newYearEmojis]);

  // Create confetti pieces
  const createConfetti = useCallback(() => {
    if (!isNewYearTheme) {
      setConfetti([]);
      return;
    }

    const newConfetti: ConfettiPiece[] = [];
    const confettiCount = window.innerWidth < 768 ? 15 : 25;

    for (let i = 0; i < confettiCount; i++) {
      newConfetti.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color:
          confettiColors[Math.floor(Math.random() * confettiColors.length)],
        size: Math.random() * 8 + 4, // 4-12px
        speed: Math.random() * 3 + 2, // 2-5 speed
        rotation: Math.random() * 360,
      });
    }

    setConfetti(newConfetti);
  }, [isNewYearTheme, confettiColors]);

  // Initialize and handle resize
  useEffect(() => {
    if (!mounted || !isNewYearTheme) return;

    createElements();
    createConfetti();

    const handleResize = () => {
      createElements();
      createConfetti();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, isNewYearTheme, createElements, createConfetti]);

  // Animate floating elements
  useEffect(() => {
    if (!isNewYearTheme || elements.length === 0) return;

    const animateElements = () => {
      setElements((prevElements) =>
        prevElements.map((element) => ({
          ...element,
          y: element.y + element.speed,
          rotation: element.rotation + 2,
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
  }, [isNewYearTheme, elements.length]);

  // Animate confetti
  useEffect(() => {
    if (!isNewYearTheme || confetti.length === 0) return;

    const animateConfetti = () => {
      setConfetti((prevConfetti) =>
        prevConfetti.map((piece) => ({
          ...piece,
          y: piece.y + piece.speed,
          rotation: piece.rotation + 5,
          // Reset position when piece goes off screen
          ...(piece.y > window.innerHeight + 20 && {
            y: -20,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    };

    const interval = setInterval(animateConfetti, 50); // 20 FPS
    return () => clearInterval(interval);
  }, [isNewYearTheme, confetti.length]);

  // Don't render anything if not mounted or not New Year theme
  if (!mounted || !isNewYearTheme) {
    return null;
  }

  return (
    <>
      {/* Floating New Year Elements */}
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
              filter: "drop-shadow(0 0 4px rgba(217, 119, 6, 0.4))",
            }}
          >
            {element.emoji}
          </div>
        ))}
      </div>

      {/* Confetti Effect */}
      <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.x}px`,
              top: `${piece.y}px`,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              transform: `rotate(${piece.rotation}deg)`,
              borderRadius: Math.random() > 0.5 ? "50%" : "0%",
            }}
          />
        ))}
      </div>

      {/* New Year Background Patterns */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle New Year pattern overlay */}
        <div className="absolute inset-0 newyear-pattern opacity-25" />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-amber-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-28 h-28 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-36 h-36 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      {/* Fireworks Effect */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {/* Animated fireworks */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`firework-${i}`}
            className="absolute text-2xl animate-bounce"
            style={{
              left: `${i * 20 + 15}%`,
              bottom: "10px",
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${2 + i * 0.3}s`,
              animationIterationCount: "infinite",
            }}
          >
            {i % 2 === 0 ? "🎆" : "🎇"}
          </div>
        ))}
      </div>

      {/* Golden Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {[...Array(12)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-yellow-400 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "2.5s",
            }}
          >
            {i % 3 === 0 ? "✨" : i % 3 === 1 ? "🌟" : "💫"}
          </div>
        ))}
      </div>

      {/* Countdown Clock Effect (decorative) */}
      <div className="fixed top-4 right-4 pointer-events-none z-10">
        <div className="text-4xl animate-pulse">🕛</div>
      </div>
    </>
  );
}
