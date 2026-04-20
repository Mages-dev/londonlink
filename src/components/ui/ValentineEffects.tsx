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

const VALENTINE_EMOJIS = [
  "💕",
  "💖",
  "💗",
  "💘",
  "💝",
  "💞",
  "💟",
  "❤️",
  "🌹",
  "💐",
] as const;

const HEART_PETALS = [
  "🌹",
  "💐",
  "🌺",
  "🌸",
  "💕",
  "💖",
  "💗",
  "❤️",
] as const;

// Fixed positions for decorative love letters (computed once per page load)
const LOVE_LETTER_POSITIONS = Array.from({ length: 15 }, (_, i) => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  emoji: i % 2 === 0 ? "💌" : "💕",
}));

function createFloatingElements(): FloatingElement[] {
  const count = window.innerWidth < 768 ? 8 : 15;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji:
      VALENTINE_EMOJIS[Math.floor(Math.random() * VALENTINE_EMOJIS.length)],
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 16 + 18,
    speed: Math.random() * 1 + 0.6,
    rotation: Math.random() * 360,
  }));
}

function createHeartPetals(): HeartPetal[] {
  const count = window.innerWidth < 768 ? 12 : 20;
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: -20,
    emoji: HEART_PETALS[Math.floor(Math.random() * HEART_PETALS.length)],
    size: Math.random() * 12 + 8,
    speed: Math.random() * 2 + 1,
    rotation: Math.random() * 360,
    drift: (Math.random() - 0.5) * 2,
  }));
}

export default function ValentineEffects() {
  const { commemorativeTheme } = useTheme();
  const isValentineTheme = commemorativeTheme === "valentine";

  const [elements, setElements] = useState<FloatingElement[]>(() =>
    isValentineTheme ? createFloatingElements() : []
  );
  const [petals, setPetals] = useState<HeartPetal[]>(() =>
    isValentineTheme ? createHeartPetals() : []
  );

  const regenerate = useCallback(() => {
    if (!isValentineTheme) {
      setElements([]);
      setPetals([]);
      return;
    }
    setElements(createFloatingElements());
    setPetals(createHeartPetals());
  }, [isValentineTheme]);

  useEffect(() => {
    if (!isValentineTheme) return;
    const handleResize = () => regenerate();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isValentineTheme, regenerate]);

  // React to theme toggling at runtime (derive state from props pattern)
  const [prevTheme, setPrevTheme] = useState(isValentineTheme);
  if (prevTheme !== isValentineTheme) {
    setPrevTheme(isValentineTheme);
    setElements(isValentineTheme ? createFloatingElements() : []);
    setPetals(isValentineTheme ? createHeartPetals() : []);
  }

  // Animate floating elements
  useEffect(() => {
    if (!isValentineTheme || elements.length === 0) return;

    const interval = setInterval(() => {
      setElements((prev) =>
        prev.map((el) => ({
          ...el,
          y: el.y + el.speed,
          rotation: el.rotation + 0.5,
          ...(el.y > window.innerHeight + 50 && {
            y: -50,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    }, 33);
    return () => clearInterval(interval);
  }, [isValentineTheme, elements.length]);

  // Animate heart petals
  useEffect(() => {
    if (!isValentineTheme || petals.length === 0) return;

    const interval = setInterval(() => {
      setPetals((prev) =>
        prev.map((petal) => ({
          ...petal,
          y: petal.y + petal.speed,
          x: petal.x + petal.drift * 0.5,
          rotation: petal.rotation + 3,
          ...(petal.y > window.innerHeight + 20 && {
            y: -20,
            x: Math.random() * window.innerWidth,
          }),
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, [isValentineTheme, petals.length]);

  if (!isValentineTheme) return null;

  return (
    <>
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

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 valentine-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-36 h-36 bg-rose-500/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-28 h-28 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-32 h-32 bg-red-500/10 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 bg-rose-400/10 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      <div className="fixed inset-0 pointer-events-none z-5">
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

      <div className="fixed inset-0 pointer-events-none z-5">
        {LOVE_LETTER_POSITIONS.map((pos, i) => (
          <div
            key={`letter-${i}`}
            className="absolute text-pink-400"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animation: `valentine-letter-fade 2s ease-in-out infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {pos.emoji}
          </div>
        ))}
      </div>

      <div className="fixed top-4 left-4 pointer-events-none z-10">
        <div className="text-3xl animate-bounce">🕊️💕</div>
      </div>

      <div className="fixed bottom-4 right-4 pointer-events-none z-10">
        <div className="text-2xl animate-pulse">💭💖</div>
      </div>
    </>
  );
}
