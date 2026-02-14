"use client";

import { useState, useEffect, useCallback } from "react";

const HEART_EMOJIS = ["💖", "💗", "💕", "❤️", "💘", "💝", "♥️", "💞", "🩷", "❣️"];
const STAR_EMOJIS = ["✨", "⭐", "🌟", "💫", "🦋", "🌸", "🌺", "🫧"];
const BUTTERFLY_EMOJIS = ["🦋", "🦋", "🦋", "🪽"];
const SPARKLE_COLORS = ["#ff1493", "#ff00ff", "#ff69b4", "#ffd700", "#fff", "#ff0066"];

interface FloatingParticle {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

interface Sparkle {
  id: number;
  left: number;
  top: number;
  color: string;
  duration: number;
  dx: number;
  dy: number;
}

interface Star {
  id: number;
  emoji: string;
  left: number;
  top: number;
  duration: number;
  dx: number;
  dy: number;
}

interface Butterfly {
  id: number;
  emoji: string;
  left: number;
  top: number;
  duration: number;
  delay: number;
  size: number;
}

export default function ValentinePage() {
  const [siScale, setSiScale] = useState(1);
  const [hearts, setHearts] = useState<FloatingParticle[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const [noClickCount, setNoClickCount] = useState(0);
  const [noText, setNoText] = useState("No");
  const [visitorNum, setVisitorNum] = useState("000");

  const noTexts = [
    "No",
    "¿Segura?",
    "¿De verdad?",
    "Piénsalo bien...",
    "¿¿Segurísima??",
    "😢 ¿Última oportunidad?",
    "💔 Reconsidéralo...",
    "🥺 Por favor...",
    "Ya di que sí 😭",
    "...",
  ];

  // Set visitor number client-side to avoid hydration mismatch
  useEffect(() => {
    setVisitorNum(String(Math.floor(Math.random() * 99) + 1).padStart(3, "0"));
  }, []);

  // Generate floating hearts
  useEffect(() => {
    const generateHearts = () => {
      const newHearts: FloatingParticle[] = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
        left: Math.random() * 100,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 10,
        size: 0.8 + Math.random() * 1.5,
      }));
      setHearts(newHearts);
    };
    generateHearts();
  }, []);

  // Generate sparkles
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
        duration: 2 + Math.random() * 4,
        dx: (Math.random() - 0.5) * 100,
        dy: (Math.random() - 0.5) * 100,
      }));
      setSparkles(newSparkles);
    };
    generateSparkles();

    const interval = setInterval(generateSparkles, 5000);
    return () => clearInterval(interval);
  }, []);

  // Generate stars
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        emoji: STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 5,
        dx: (Math.random() - 0.5) * 150,
        dy: -50 - Math.random() * 150,
      }));
      setStars(newStars);
    };
    generateStars();

    const interval = setInterval(generateStars, 4000);
    return () => clearInterval(interval);
  }, []);

  // Generate butterflies
  useEffect(() => {
    const generateButterflies = () => {
      const newButterflies: Butterfly[] = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        emoji: BUTTERFLY_EMOJIS[Math.floor(Math.random() * BUTTERFLY_EMOJIS.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 12,
        size: 1 + Math.random() * 1.2,
      }));
      setButterflies(newButterflies);
    };
    generateButterflies();
  }, []);

  const handleSiClick = useCallback(() => {
    window.location.href =
      "https://www.youtube.com/watch?v=WmlJHCzvs_Y&list=RDWmlJHCzvs_Y&start_radio=1";
  }, []);

  const handleNoClick = useCallback(() => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);
    setSiScale((prev) => prev + 0.5);
    setNoText(noTexts[Math.min(newCount, noTexts.length - 1)]);
  }, [noClickCount, noTexts]);

  return (
    <>
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={`heart-${heart.id}`}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            fontSize: `${heart.size}rem`,
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Sparkle Particles */}
      {sparkles.map((sparkle) => (
        <div
          key={`sparkle-${sparkle.id}`}
          className="sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 6px ${sparkle.color}, 0 0 12px ${sparkle.color}`,
            animationDuration: `${sparkle.duration}s`,
            "--dx": `${sparkle.dx}px`,
            "--dy": `${sparkle.dy}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Star Particles */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDuration: `${star.duration}s`,
            "--star-dx": `${star.dx}px`,
            "--star-dy": `${star.dy}px`,
          } as React.CSSProperties}
        >
          {star.emoji}
        </div>
      ))}

      {/* Butterflies */}
      {butterflies.map((butterfly) => (
        <div
          key={`butterfly-${butterfly.id}`}
          className="butterfly"
          style={{
            left: `${butterfly.left}%`,
            top: `${butterfly.top}%`,
            animationDuration: `${butterfly.duration}s`,
            animationDelay: `${butterfly.delay}s`,
            fontSize: `${butterfly.size}rem`,
          }}
        >
          {butterfly.emoji}
        </div>
      ))}

      <div className="retro-container">
        {/* Header */}
        <header className="retro-header">
          <h1>💘 ~ Feliz San Valent&iacute;n ~ 💘</h1>
          <p className="subtitle">✧ 🦋 Una postal especial para ti 🦋 ✧</p>
        </header>

        <div className="sparkle-divider">🌸 ✦ 💖 ✦ 🦋 ✦ 💖 ✦ 🌸</div>

        {/* Image */}
        <div className="image-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://media.tenor.com/zJvVAZnapHAAAAAe/emo-love.png"
            alt="Emo Love"
          />
        </div>

        {/* Marquee */}
        <div className="marquee-container">
          <div className="marquee-text">
            🦋💖💗💕 Te amo misnina mam&aacute; 💕💗💖🦋 ~ 🌸♥🌸 ~ Siempre en mi coraz&oacute;n ~ 🌸♥🌸 ~
            🦋💖💗💕 Eres lo m&aacute;s bonito de mi vida 💕💗💖🦋 ~ 🫧✨🫧 ~
          </div>
        </div>

        {/* Poem */}
        <div className="poem-container">
          <p className="poem-text">
            Querida Sio,
            <br />
            en tus ojos me pierdo,
            <br />
            en tu luz me encuentro,
            <br />
            en tu coraz&oacute;n destellos sin fin
            <br />
            <span className="poem-highlight">
              &iquest;Quieres ser mi San Valent&iacute;n?
            </span>
            <span className="poem-signature">- Abraham 💌</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="buttons-container">
          <button
            className="btn-si"
            onClick={handleSiClick}
            style={{
              "--si-scale": `scale(${siScale})`,
            } as React.CSSProperties}
          >
            💖🦋 S&iacute; 🦋💖
          </button>
          <button className="btn-no" onClick={handleNoClick}>
            {noText}
          </button>
        </div>

      </div>
    </>
  );
}
