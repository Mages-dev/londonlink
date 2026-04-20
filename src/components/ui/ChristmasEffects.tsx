import { useEffect, useState, useCallback } from "react";
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

const CHRISTMAS_EMOJIS = [
  "🎄",
  "🎁",
  "❄️",
  "⭐",
  "🔔",
  "🎅",
  "🤶",
  "🦌",
  "⛄",
  "🕯️",
] as const;

// Fixed positions for sparkles (computed once per page load)
const SPARKLE_POSITIONS = Array.from({ length: 25 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

function createFloatingElements(): FloatingElement[] {
  const elementCount = window.innerWidth < 768 ? 8 : 15; // Fewer on mobile
  return Array.from({ length: elementCount }, (_, i) => ({
    id: i,
    emoji:
      CHRISTMAS_EMOJIS[Math.floor(Math.random() * CHRISTMAS_EMOJIS.length)],
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 20 + 15, // 15-35px
    speed: Math.random() * 1 + 0.6, // 0.6-1.6 speed (mais rápido)
    rotation: Math.random() * 360,
  }));
}

export default function ChristmasEffects() {
  const { commemorativeTheme } = useTheme();
  const isChristmasTheme = commemorativeTheme === "christmas";

  const [elements, setElements] = useState<FloatingElement[]>(() =>
    isChristmasTheme ? createFloatingElements() : []
  );

  const regenerate = useCallback(() => {
    if (!isChristmasTheme) {
      setElements([]);
      return;
    }
    setElements(createFloatingElements());
  }, [isChristmasTheme]);

  // Handle resize
  useEffect(() => {
    if (!isChristmasTheme) return;
    const handleResize = () => regenerate();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isChristmasTheme, regenerate]);

  // React to theme toggling at runtime (derive state from props pattern)
  const [prevTheme, setPrevTheme] = useState(isChristmasTheme);
  if (prevTheme !== isChristmasTheme) {
    setPrevTheme(isChristmasTheme);
    setElements(isChristmasTheme ? createFloatingElements() : []);
  }

  useEffect(() => {
    if (!isChristmasTheme || elements.length === 0) return;

    const animateElements = () => {
      setElements((prevElements) =>
        prevElements.map((element) => ({
          ...element,
          y: element.y + element.speed,
          rotation: element.rotation + 0.5, // Rotação mais suave (era +1)
          // Reset position when element goes off screen
          ...(element.y > window.innerHeight + 50 && {
            y: -50,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    };

    const interval = setInterval(animateElements, 33); // 30 FPS (mais fluido, era 50ms/20 FPS)
    return () => clearInterval(interval);
  }, [isChristmasTheme, elements.length]);

  if (!isChristmasTheme) {
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
            className="absolute text-white/60"
            style={{
              left: `${i * 15 + 10}%`,
              animation: `christmas-snow ${8 + i * 2}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
              fontSize: "1.5rem",
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      {/* Christmas Sparkles */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {SPARKLE_POSITIONS.map((pos, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-yellow-400"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animation: `sparkle-fade 1s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </>
  );
}
