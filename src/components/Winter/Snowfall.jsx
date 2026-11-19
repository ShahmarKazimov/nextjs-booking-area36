"use client";

import { useEffect, useRef } from "react";
import { winterEffects, isWinter } from "@/config/winterEffects";

const rand = (min, max) => min + Math.random() * (max - min);

const SIZES = [6, 8, 10, 13]; // px (diametr), kiçik və zərif
const SHAPES = 3;

// 6 qollu qar dənəciyi spritı (bir dəfə çəkilir, sonra drawImage ilə istifadə olunur)
function makeSprite(size, shape, dpr) {
  const px = Math.ceil(size * dpr);
  const c = document.createElement("canvas");
  c.width = c.height = px;
  const g = c.getContext("2d");
  g.scale(dpr, dpr);
  g.translate(size / 2, size / 2);
  g.strokeStyle = "#fff";
  g.fillStyle = "#fff";
  g.lineCap = "round";
  g.lineWidth = Math.max(0.7, size / 11);
  const R = size / 2 - 0.5;
  for (let i = 0; i < 6; i++) {
    g.save();
    g.rotate((i * Math.PI) / 3);
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(0, -R);
    if (shape !== 2) {
      // yan budaqlar
      const by = -R * (shape === 0 ? 0.55 : 0.7);
      const bl = R * (shape === 0 ? 0.38 : 0.3);
      g.moveTo(0, by);
      g.lineTo(-bl * 0.8, by - bl * 0.8);
      g.moveTo(0, by);
      g.lineTo(bl * 0.8, by - bl * 0.8);
    } else {
      // sadə qollar + kiçik ucluq
      g.moveTo(-R * 0.18, -R * 0.78);
      g.lineTo(R * 0.18, -R * 0.78);
    }
    g.stroke();
    g.restore();
  }
  if (shape === 1) {
    g.beginPath();
    g.arc(0, 0, size / 14 + 0.4, 0, Math.PI * 2);
    g.fill();
  }
  return c;
}

function createFlake(w, h, initial) {
  const big = Math.random() < 0.1;
  return {
    x: rand(0, w),
    y: initial ? rand(0, h) : rand(-20, -2),
    size: big ? SIZES.length - 1 : Math.floor(rand(0, SIZES.length - 1)),
    shape: Math.floor(rand(0, SHAPES)),
    speed: rand(14, 36), // px/s
    drift: rand(6, 16),
    freq: rand(0.2, 0.6),
    phase: rand(0, Math.PI * 2),
    rot: rand(0, Math.PI * 2),
    spin: rand(-0.35, 0.35), // rad/s, çox yavaş fırlanma
    alpha: rand(0.4, 0.85),
  };
}

export default function Snowfall() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isWinter("snowfall")) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let flakes = [];
    let raf = 0;
    let last = 0;
    let time = 0;
    let running = false;
    let sprites = [];

    const targetCount = () =>
      window.innerWidth < winterEffects.snowfall.mobileBreakpoint
        ? winterEffects.snowfall.mobileCount
        : winterEffects.snowfall.desktopCount;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      sprites = SIZES.map((sz) =>
        Array.from({ length: SHAPES }, (_, sh) => makeSprite(sz, sh, dpr))
      );
      const n = targetCount();
      if (flakes.length > n) flakes.length = n;
      while (flakes.length < n) flakes.push(createFlake(w, h, true));
    };

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      time += dt;
      const dpr = canvas.width / w;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.y += f.speed * dt;
        f.rot += f.spin * dt;
        const x = f.x + Math.sin(time * f.freq + f.phase) * f.drift;
        if (f.y > h + 14) {
          flakes[i] = createFlake(w, h, false);
          continue;
        }
        const half = SIZES[f.size] / 2;
        const cos = Math.cos(f.rot) * dpr;
        const sin = Math.sin(f.rot) * dpr;
        ctx.setTransform(cos, sin, -sin, cos, x * dpr, f.y * dpr);
        ctx.globalAlpha = f.alpha;
        ctx.drawImage(sprites[f.size][f.shape], -half, -half, SIZES[f.size], SIZES[f.size]);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || media.matches || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotion = () => {
      if (media.matches) {
        stop();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } else start();
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    media.addEventListener("change", onMotion);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      media.removeEventListener("change", onMotion);
    };
  }, []);

  if (!isWinter("snowfall")) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 h-screen w-screen"
      style={{ height: "100dvh" }}
    />
  );
}
