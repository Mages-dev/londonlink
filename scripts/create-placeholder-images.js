#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Create directories if they don't exist
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Create a simple SVG placeholder
function createSVGPlaceholder(width, height, text, color = "#3B82F6") {
  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" rx="8" fill="${color}"/>
  <text x="${width / 2}" y="${
    height / 2 + 5
  }" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">${text}</text>
</svg>`;
}

// Create a simple JPG placeholder (base64 encoded 1x1 pixel)
function createJPGPlaceholder() {
  return Buffer.from(
    "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
    "base64"
  );
}

// Create PNG placeholder
function createPNGPlaceholder() {
  return Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
    "base64"
  );
}

// Define all the images we need to create
const imagesToCreate = [
  // Note: Logo files (logo.png) already exist, so we skip creating them

  // Shared icons
  {
    path: "src/assets/images/shared/icons/menu.svg",
    content: createSVGPlaceholder(24, 24, "☰", "#374151"),
  },
  {
    path: "src/assets/images/shared/icons/close.svg",
    content: createSVGPlaceholder(24, 24, "✕", "#374151"),
  },
  {
    path: "src/assets/images/shared/icons/language.svg",
    content: createSVGPlaceholder(24, 24, "🌐", "#374151"),
  },
  {
    path: "src/assets/images/shared/icons/dark-mode.svg",
    content: createSVGPlaceholder(24, 24, "🌙", "#374151"),
  },
  {
    path: "src/assets/images/shared/icons/light-mode.svg",
    content: createSVGPlaceholder(24, 24, "☀️", "#374151"),
  },

  // Shared backgrounds
  {
    path: "src/assets/images/shared/backgrounds/pattern.svg",
    content: createSVGPlaceholder(100, 100, "Pattern", "#F3F4F6"),
  },
  {
    path: "src/assets/images/shared/backgrounds/noise.png",
    content: createPNGPlaceholder(),
    binary: true,
  },
  {
    path: "src/assets/images/shared/backgrounds/main-gradient.jpg",
    content: createJPGPlaceholder(),
    binary: true,
  },

  // Hero section images
  {
    path: "src/assets/images/hero/backgrounds/hero-main-bg.jpg",
    content: createJPGPlaceholder(),
    binary: true,
  },
  {
    path: "src/assets/images/hero/backgrounds/hero-mobile-bg.jpg",
    content: createJPGPlaceholder(),
    binary: true,
  },
  {
    path: "src/assets/images/hero/backgrounds/gradient-overlay.png",
    content: createPNGPlaceholder(),
    binary: true,
  },
  {
    path: "src/assets/images/hero/features/interactive-books.svg",
    content: createSVGPlaceholder(64, 64, "📚", "#10B981"),
  },
  {
    path: "src/assets/images/hero/features/personalized-learning.svg",
    content: createSVGPlaceholder(64, 64, "🎯", "#8B5CF6"),
  },
  {
    path: "src/assets/images/hero/features/progress-tracking.svg",
    content: createSVGPlaceholder(64, 64, "📊", "#F59E0B"),
  },
  {
    path: "src/assets/images/hero/illustrations/hero-main.svg",
    content: createSVGPlaceholder(400, 300, "Hero", "#3B82F6"),
  },
  {
    path: "src/assets/images/hero/illustrations/floating-elements.svg",
    content: createSVGPlaceholder(200, 200, "✨", "#EC4899"),
  },
];

// Create the images
console.log("Creating placeholder images...");

imagesToCreate.forEach(({ path: imagePath, content, binary = false }) => {
  const fullPath = path.resolve(imagePath);
  const dir = path.dirname(fullPath);

  ensureDir(dir);

  if (binary) {
    fs.writeFileSync(fullPath, content);
  } else {
    fs.writeFileSync(fullPath, content, "utf8");
  }

  console.log(`✓ Created: ${imagePath}`);
});

console.log("\n✅ All placeholder images created successfully!");
