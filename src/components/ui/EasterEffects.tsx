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

const EASTER_EMOJIS = [
  "🐰",
  "🥚",
  "🐣",
  "🐤",
  "🥕",
  "🌷",
  "🌸",
  "🌺",
  "🦋",
  "🌿",
  "🌱",
] as const;

const SPRING_EMOJIS = [
  "🌸",
  "🌷",
  "🌺",
  "🦋",
  "🌿",
  "🌱",
  "🌼",
  "🌻",
] as const;

// Fixed positions for butterflies (computed once per page load)
const BUTTERFLY_POSITIONS = Array.from({ length: 12 }, () => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

// Fixed positions for garden flowers (computed once per page load)
const GARDEN_FLOWER_POSITIONS = Array.from({ length: 12 }, (_, i) => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  emoji:
    i % 4 === 0 ? "🌷" : i % 4 === 1 ? "🌸" : i % 4 === 2 ? "🌺" : "🌼",
}));

function createFloatingElements(): FloatingElement[] {
  const count = window.innerWidth < 768 ? 8 : 14; // Fewer on mobile
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: EASTER_EMOJIS[Math.floor(Math.random() * EASTER_EMOJIS.length)],
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 16 + 18, // 18-34px
    speed: Math.random() * 1 + 0.6, // 0.6-1.6 speed (ajustado)
    rotation: Math.random() * 360,
  }));
}

function createSpringElements(): SpringElement[] {
  const count = window.innerWidth < 768 ? 10 : 18;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: -20,
    emoji: SPRING_EMOJIS[Math.floor(Math.random() * SPRING_EMOJIS.length)],
    size: Math.random() * 14 + 10, // 10-24px
    speed: Math.random() * 1.8 + 0.8, // 0.8-2.6 speed
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 1.5, // -0.75 to 0.75 horizontal drift
  }));
}

export default function EasterEffects() {
  const { commemorativeTheme } = useTheme();
  const isEasterTheme = commemorativeTheme === "easter";

  const [elements, setElements] = useState<FloatingElement[]>(() =>
    isEasterTheme ? createFloatingElements() : []
  );
  const [springElements, setSpringElements] = useState<SpringElement[]>(() =>
    isEasterTheme ? createSpringElements() : []
  );

  const regenerate = useCallback(() => {
    if (!isEasterTheme) {
      setElements([]);
      setSpringElements([]);
      return;
    }
    setElements(createFloatingElements());
    setSpringElements(createSpringElements());
  }, [isEasterTheme]);

  // Handle resize
  useEffect(() => {
    if (!isEasterTheme) return;
    const handleResize = () => regenerate();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isEasterTheme, regenerate]);

  // React to theme toggling at runtime (derive state from props pattern)
  const [prevTheme, setPrevTheme] = useState(isEasterTheme);
  if (prevTheme !== isEasterTheme) {
    setPrevTheme(isEasterTheme);
    setElements(isEasterTheme ? createFloatingElements() : []);
    setSpringElements(isEasterTheme ? createSpringElements() : []);
  }

  // Animate floating elements
  useEffect(() => {
    if (!isEasterTheme || elements.length === 0) return;

    const animateElements = () => {
      setElements((prevElements) =>
        prevElements.map((element) => ({
          ...element,
          y: element.y + element.speed,
          rotation: element.rotation + 0.5,
          // Reset position when element goes off screen
          ...(element.y > window.innerHeight + 50 && {
            y: -50,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    };

    const interval = setInterval(animateElements, 33); // 30 FPS
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

  if (!isEasterTheme) {
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
        {GARDEN_FLOWER_POSITIONS.map((pos, i) => (
          <div
            key={`flower-${i}`}
            className="absolute text-green-400"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animation: `easter-flower-bloom 3s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}
          >
            {pos.emoji}
          </div>
        ))}
      </div>

      {/* Butterflies Effect */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {BUTTERFLY_POSITIONS.map((pos, i) => (
          <div
            key={`butterfly-${i}`}
            className="absolute text-yellow-400"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animation: `easter-butterfly-float 4s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            🦋
          </div>
        ))}
      </div>

      {/* Easter Bunny (decorative) */}
      <div className="fixed top-4 left-4 pointer-events-none z-10">
        <div className="text-3xl animate-bounce">🐰🥕</div>
      </div>

      {/* Spring Garden (decorative) */}
      <div className="fixed bottom-4 right-4 pointer-events-none z-10">
        <div className="text-2xl animate-pulse">🥕🌱</div>
      </div>
    </>
  );
}
