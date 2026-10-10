"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  hue: number;
  highlight: boolean;
  moves: boolean;
  offsetX: number;
  offsetY: number;
  targetOffsetX: number;
  targetOffsetY: number;
  nextDriftAt: number;
};

type ParticleMotion = "ambient" | "orbit" | "sway";
type ParticlePalette = "theme" | "about";

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function ContactStarfield({
  motion = "ambient",
  particleCount,
  density = 1,
  opacity = 1,
  palette = "theme",
}: {
  motion?: ParticleMotion;
  particleCount?: number;
  density?: number;
  opacity?: number;
  palette?: ParticlePalette;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !section || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    let sectionVisible = false;
    let pointer = { x: 0.5, y: 0.5 };
    let target = pointer;
    let lightMode = !document.documentElement.classList.contains("dark");
    const aboutBlobPath = palette === "about"
      ? new Path2D("M 82 42 C 139 8 210 32 298 36 C 390 41 463 19 553 28 C 648 38 719 54 810 57 C 905 37 971 16 1048 43 C 1115 66 1131 109 1139 167 C 1148 226 1168 267 1151 329 C 1137 382 1116 423 1062 438 C 1007 454 941 425 859 431 C 761 438 706 464 616 462 C 526 440 469 478 376 457 C 283 437 218 482 141 457 C 69 470 59 460 51 390 C 43 300 28 230 39 157 C 48 87 39 58 82 42 Z")
      : null;
    const starCount = Math.round((particleCount ?? (window.innerWidth < 640 ? 1700 : 3600)) * density);
    let startTime = 0;
    let stars: Star[] = [];

    const initializeStars = () => {
      if (stars.length) return;
      startTime = performance.now();
      stars = Array.from({ length: starCount }, () => {
        // Most points gather into a loose, vertically stretched orbital cloud,
        // with the rest spread across the whole section like distant stars.
        const clustered = Math.random() < 0.68;
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.22 + Math.random() * 0.83;
        return {
          x: clustered ? 0.5 + Math.cos(angle) * radius * 0.49 : Math.random(),
          y: clustered ? 0.5 + Math.sin(angle) * radius * 0.53 : Math.random(),
          size: Math.random() * 1.05 + 0.2,
          alpha: Math.random() * 0.58 + 0.18,
          hue: Math.random() > 0.93 ? 42 : Math.random() > 0.62 ? 190 : 210,
          highlight: Math.random() < 0.1,
          moves: Math.random() < 0.88,
          offsetX: 0,
          offsetY: 0,
          targetOffsetX: (Math.random() - 0.5) * 28,
          targetOffsetY: (Math.random() - 0.5) * 28,
          nextDriftAt: startTime + Math.random() * 4000,
        };
      });
    };

    const resize = () => {
      const bounds = section.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      if (!sectionVisible) return;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    };

    const draw = () => {
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
      const clipToAboutBlob = palette === "about" && lightMode && aboutBlobPath;
      if (clipToAboutBlob) {
        context.save();
        context.translate(-width * 0.025, -height * 0.025);
        context.scale((width * 1.05) / 1200, (height * 1.05) / 500);
        context.clip(aboutBlobPath);
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      }

      const pointerX = pointer.x * width;
      const pointerY = pointer.y * height;
      const time = performance.now();
      const angle = motion === "orbit" && !reducedMotion ? ((time % 120000) / 120000) * Math.PI * 2 : 0;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const centerX = width / 2;
      const centerY = height / 2;
      const driftX = motion === "sway" && !reducedMotion ? Math.sin(time / 6500) * 18 : 0;
      const influenceRadius = Math.min(150, Math.max(88, Math.min(width, height) * 0.23));
      if (palette !== "about") {
        const halo = context.createRadialGradient(pointerX, pointerY, 0, pointerX, pointerY, influenceRadius);
        halo.addColorStop(0, lightMode ? "rgba(54, 104, 184, 0.13)" : "rgba(10, 93, 105, 0.11)");
        halo.addColorStop(0.68, lightMode ? "rgba(107, 119, 171, 0.045)" : "rgba(3, 39, 48, 0.045)");
        halo.addColorStop(1, lightMode ? "rgba(231, 235, 242, 0)" : "rgba(3, 8, 11, 0)");
        context.fillStyle = halo;
        context.fillRect(0, 0, width, height);
      }

      const renderedStarCount = stars.length;
      for (let index = 0; index < renderedStarCount; index += 1) {
        const star = stars[index];
        const sourceX = star.x * width + star.offsetX;
        const sourceY = star.y * height + star.offsetY;
        const relativeX = sourceX - centerX;
        const relativeY = sourceY - centerY;
        const baseX = centerX + relativeX * cosine - relativeY * sine + driftX;
        const baseY = centerY + relativeX * sine + relativeY * cosine;
        const dx = baseX - pointerX;
        const dy = baseY - pointerY;
        const distance = Math.hypot(dx, dy);
        const proximity = Math.max(0, 1 - distance / influenceRadius);
        const push = proximity * proximity * 16;
        const direction = distance || 1;
        const x = baseX + (dx / direction) * push;
        const y = baseY + (dy / direction) * push;

        let visibility = 1;
        if (palette === "about") {
          const normalizedX = x / width;
          const normalizedY = y / height;
          const textZone = width >= 768
            ? Math.hypot((normalizedX - 0.31) / 0.34, (normalizedY - 0.5) / 0.52)
            : Math.hypot((normalizedX - 0.5) / 0.58, (normalizedY - 0.31) / 0.3);
          const cardZone = width >= 768
            ? Math.hypot((normalizedX - 0.82) / 0.2, (normalizedY - 0.5) / 0.4)
            : Math.hypot((normalizedX - 0.5) / 0.5, (normalizedY - 0.8) / 0.22);
          visibility = Math.min(
            smoothstep(0.78, 1.28, textZone),
            smoothstep(1, 1.24, cardZone),
          );
          if (visibility < 0.015) continue;
        }

        context.beginPath();
        context.arc(x, y, star.size * (lightMode ? (star.highlight ? 1.55 : 1.12) : 1), 0, Math.PI * 2);
        const alpha = star.alpha * opacity * visibility;
        const lightColor = `hsla(${star.hue === 42 ? 39 : star.hue === 190 ? 190 : 212}, ${star.hue === 42 ? 72 : 70}%, ${star.hue === 42 ? 51 : star.hue === 190 ? 42 : 48}%, ${alpha * (star.highlight ? 0.86 : 0.62)})`;
        context.fillStyle = palette === "about"
          ? star.hue === 190 ? `rgba(76, 141, 255, ${alpha})` : `rgba(255, 255, 255, ${alpha})`
          : lightMode ? lightColor : `hsla(${star.hue}, 88%, 78%, ${alpha})`;
        context.shadowColor = palette !== "about" && lightMode && star.highlight ? lightColor : "transparent";
        context.shadowBlur = palette !== "about" && lightMode && star.highlight ? 5 : 0;
        context.fill();
        context.shadowBlur = 0;
      }
      if (clipToAboutBlob) context.restore();
    };

    const move = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      target = {
        x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
        y: Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)),
      };

      if (reducedMotion) {
        if (sectionVisible) {
          pointer = target;
          draw();
        }
        return;
      }

      if (sectionVisible && !frame) frame = window.requestAnimationFrame(animate);
    };

    let lastDrawAt = 0;
    const animate = (time: number) => {
      frame = 0;
      if (document.hidden || !sectionVisible) return;

      pointer = {
        x: pointer.x + (target.x - pointer.x) * 0.14,
        y: pointer.y + (target.y - pointer.y) * 0.14,
      };

      if (time - lastDrawAt >= 32) {
        if (motion === "ambient") {
          for (const star of stars) {
            if (!star.moves) continue;
            if (time >= star.nextDriftAt) {
              star.targetOffsetX = (Math.random() - 0.5) * 28;
              star.targetOffsetY = (Math.random() - 0.5) * 28;
              star.nextDriftAt = time + 1200 + Math.random() * 3000;
            }
            star.offsetX += (star.targetOffsetX - star.offsetX) * 0.018;
            star.offsetY += (star.targetOffsetY - star.offsetY) * 0.018;
          }
        }
        draw();
        lastDrawAt = time;
      }

      frame = window.requestAnimationFrame(animate);
    };

    const leave = () => {
      target = { x: 0.5, y: 0.5 };
      if (reducedMotion && sectionVisible) {
        pointer = target;
        draw();
      }
    };
    const visibility = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      } else if (sectionVisible) {
        draw();
        if (!reducedMotion && !frame) frame = window.requestAnimationFrame(animate);
      }
    };
    const sectionVisibility = new IntersectionObserver(([entry]) => {
      sectionVisible = entry.isIntersecting;
      if (!sectionVisible) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        return;
      }
      initializeStars();
      resize();
      if (!reducedMotion && !document.hidden && !frame) {
        frame = window.requestAnimationFrame(animate);
      }
    }, { rootMargin: "250px 0px" });
    const themeObserver = new MutationObserver(() => {
      const nextLightMode = !document.documentElement.classList.contains("dark");
      if (nextLightMode !== lightMode) {
        lightMode = nextLightMode;
        if (sectionVisible) draw();
      }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const observer = new ResizeObserver(resize);
    observer.observe(section);
    sectionVisibility.observe(section);
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    resize();
    return () => {
      observer.disconnect();
      sectionVisibility.disconnect();
      themeObserver.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      window.cancelAnimationFrame(frame);
    };
  }, [motion, particleCount, density, opacity, palette]);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" />;
}
