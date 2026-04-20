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

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  speed: number;
  rotation: number;
}

const NEW_YEAR_EMOJIS = ["🎆", "🎇", "🥂", "🍾", "🎊", "🎉", ""] as const;

const CONFETTI_COLORS = [
  "#d97706",
  "#f59e0b",
  "#eab308",
  "#6366f1",
  "#8b5cf6",
  "#f3f4f6",
] as const;

// Fixed positions for sparkles (computed once per page load)
const SPARKLE_POSITIONS = Array.from({ length: 20 }, (_, i) => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  emoji: i % 3 === 0 ? "✨" : i % 3 === 1 ? "🌟" : "💫",
}));

// Fixed border radius for each confetti piece (computed once per page load)
const CONFETTI_BORDER_RADIUS = Array.from({ length: 25 }, () =>
  Math.random() > 0.5 ? "50%" : "0%"
);

function createFloatingElements(): FloatingElement[] {
  const elementCount = window.innerWidth < 768 ? 6 : 12; // Fewer on mobile
  return Array.from({ length: elementCount }, (_, i) => ({
    id: i,
    emoji:
      NEW_YEAR_EMOJIS[Math.floor(Math.random() * NEW_YEAR_EMOJIS.length)],
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 18 + 16, // 16-34px
    speed: Math.random() * 1 + 0.6, // 0.6-1.6 speed (mais rápido)
    rotation: Math.random() * 360,
  }));
}

function createConfetti(): ConfettiPiece[] {
  const confettiCount = window.innerWidth < 768 ? 15 : 25;
  return Array.from({ length: confettiCount }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: -20,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: Math.random() * 8 + 4, // 4-12px
    speed: Math.random() * 3 + 2, // 2-5 speed
    rotation: Math.random() * 360,
  }));
}

export default function NewYearEffects() {
  const { commemorativeTheme } = useTheme();
  const isNewYearTheme = commemorativeTheme === "new-year";

  const [elements, setElements] = useState<FloatingElement[]>(() =>
    isNewYearTheme ? createFloatingElements() : []
  );
  const [confetti, setConfetti] = useState<ConfettiPiece[]>(() =>
    isNewYearTheme ? createConfetti() : []
  );

  const regenerate = useCallback(() => {
    if (!isNewYearTheme) {
      setElements([]);
      setConfetti([]);
      return;
    }
    setElements(createFloatingElements());
    setConfetti(createConfetti());
  }, [isNewYearTheme]);

  // Handle resize
  useEffect(() => {
    if (!isNewYearTheme) return;
    const handleResize = () => regenerate();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isNewYearTheme, regenerate]);

  // React to theme toggling at runtime (derive state from props pattern)
  const [prevTheme, setPrevTheme] = useState(isNewYearTheme);
  if (prevTheme !== isNewYearTheme) {
    setPrevTheme(isNewYearTheme);
    setElements(isNewYearTheme ? createFloatingElements() : []);
    setConfetti(isNewYearTheme ? createConfetti() : []);
  }

  // Animate floating elements
  useEffect(() => {
    if (!isNewYearTheme || elements.length === 0) return;

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

  if (!isNewYearTheme) {
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
              borderRadius: CONFETTI_BORDER_RADIUS[piece.id],
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
        {SPARKLE_POSITIONS.map((pos, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-yellow-400"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animation: `newyear-sparkle-fade 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            {pos.emoji}
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
