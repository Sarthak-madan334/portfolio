"use client";

import { useEffect, useRef, useState } from "react";

const groups = [
  { name: "Programming Languages", color: "#3b82f6", tech: ["C++", "Python", "JavaScript", "TypeScript"] },
  { name: "Frontend", color: "#8b5cf6", tech: ["HTML5", "CSS3", "React", "Next.js", "Tailwind"] },
  { name: "Backend", color: "#06b6d4", tech: ["Node.js", "Express", "API Routes"] },
  { name: "Databases", color: "#10b981", tech: ["MongoDB", "PostgreSQL", "Firebase", "MySQL"] },
  { name: "AI / APIs", color: "#d946ef", tech: ["OpenRouter", "Groq", "DeepSeek"] },
  { name: "Tools & Platforms", color: "#0ea5e9", tech: ["Git", "GitHub", "Vercel", "Postman"] },
  { name: "Core Concepts", color: "#f59e0b", tech: ["DSA", "OOP", "DBMS", "OS"] },
] as const;

type TechNode = { name: string; group: number; x: number; y: number; z: number };
type ProjectedNode = { x: number; y: number; z: number; scale: number };

const nodes: TechNode[] = groups.flatMap((group, groupIndex) =>
  group.tech.map((name) => ({ name, group: groupIndex, x: 0, y: 0, z: 0 })),
);

nodes.forEach((node, index) => {
  node.y = 1 - index / (nodes.length - 1) * 2;
  const radius = Math.sqrt(1 - node.y * node.y);
  const theta = index * 2.399963;
  node.x = Math.cos(theta) * radius;
  node.z = Math.sin(theta) * radius;
});

const connections: [number, number][] = [];
const orbitTilts = [0.4, -0.4, 0];
const majorLabels = new Set(["React", "Next.js", "Node.js", "Python", "MongoDB", "PostgreSQL", "Firebase", "Tailwind", "OpenRouter", "TypeScript", "JavaScript", "Groq", "GitHub", "Vercel", "DSA"]);
const mobileLabels = new Set(["React", "Next.js", "Node.js", "Python", "MongoDB", "PostgreSQL", "Firebase", "Tailwind", "OpenRouter"]);
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const dx = nodes[i].x - nodes[j].x;
    const dy = nodes[i].y - nodes[j].y;
    const dz = nodes[i].z - nodes[j].z;
    if (Math.hypot(dx, dy, dz) < 0.68) connections.push([i, j]);
  }
}

export function TechSphere({ onHoverGroup }: { onHoverGroup?: (group: number | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<TechNode | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const drawOrder = nodes.map((_, index) => index);
    let projected: ProjectedNode[] = [];
    let width = 0;
    let height = 0;
    let radius = 0;
    let coreGlow: CanvasGradient;
    let fontFamily = "Manrope, sans-serif";
    let angleX = 0.3;
    let angleY = 0;
    let velocity = reducedMotion ? 0 : 0.0012;
    let hoverIndex = -1;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let startTime = 0;
    let lastTime = 0;
    let frameId = 0;
    let visible = false;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const dpr = window.devicePixelRatio || 1;
      width = bounds.width;
      height = bounds.height;
      radius = width * 0.36;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fontFamily = getComputedStyle(canvas).fontFamily;
      coreGlow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, radius * 0.34);
      coreGlow.addColorStop(0, "rgba(37,99,235,.16)");
      coreGlow.addColorStop(0.4, "rgba(37,99,235,.06)");
      coreGlow.addColorStop(1, "rgba(37,99,235,0)");
    };

    const setHover = (index: number) => {
      if (hoverIndex === index) return;
      hoverIndex = index;
      setHovered(index < 0 ? null : nodes[index]);
      onHoverGroup?.(index < 0 ? null : nodes[index].group);
    };

    const findHover = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      let nearest = -1;
      let nearestDistance = 30 * 30;
      projected.forEach((point, index) => {
        if (point.z <= -0.35) return;
        const dx = point.x - x;
        const dy = point.y - y;
        const distance = dx * dx + dy * dy;
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      });
      setHover(nearest);
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
      setHover(-1);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) {
        findHover(event);
        return;
      }
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      angleY += dx * 0.009;
      angleX = Math.max(-1, Math.min(1, angleX + dy * 0.006));
      velocity = dx * 0.009;
      lastX = event.clientX;
      lastY = event.clientY;
    };

    const onPointerUp = (event: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
      canvas.style.cursor = "grab";
      if (event.type === "pointercancel") setHover(-1);
      else findHover(event);
    };

    const onPointerLeave = () => { if (!dragging) setHover(-1); };

    const draw = (time: number) => {
      frameId = window.requestAnimationFrame(draw);
      if (!width || !height || !visible || document.hidden) return;
      if (!startTime) startTime = time;
      const delta = lastTime ? Math.min(2, (time - lastTime) / (1000 / 60)) : 1;
      lastTime = time;

      if (!dragging && !reducedMotion) {
        if (hoverIndex >= 0) velocity *= Math.pow(0.9, delta);
        else velocity += (0.0012 - velocity) * Math.min(1, 0.025 * delta);
        angleY += velocity * delta;
        angleX += (0.3 - angleX) * Math.min(1, 0.015 * delta);
      }

      const intro = reducedMotion ? 1 : Math.min(1, (time - startTime) / 1900);
      const ease = 1 - Math.pow(1 - intro, 3);
      const cx = width / 2;
      const cy = height / 2;
      const sinY = Math.sin(angleY);
      const cosY = Math.cos(angleY);
      const sinX = Math.sin(angleX);
      const cosX = Math.cos(angleX);
      const dark = document.documentElement.classList.contains("dark");
      ctx.clearRect(0, 0, width, height);

      projected = nodes.map((node) => {
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;
        const scale = 2.6 / (2.6 - z2);
        return { x: cx + x1 * radius * scale * ease, y: cy + y2 * radius * scale * ease, z: z2, scale };
      });

      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.34, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(96,165,250,.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.11 * (1 + 0.05 * Math.sin(time / 600)), 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = dark ? "rgba(255,255,255,.8)" : "rgba(29,29,31,.65)";
      ctx.font = `800 ${radius * 0.075}px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("SM", cx, cy);

      ctx.strokeStyle = "rgba(96,165,250,.07)";
      ctx.lineWidth = 1;
      for (const tilt of orbitTilts) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, radius * 1.2, radius * 0.3, tilt, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (const [a, b] of connections) {
        const first = projected[a];
        const second = projected[b];
        const connectedToHover = hoverIndex === a || hoverIndex === b;
        const depth = (first.z + second.z + 2) / 4;
        ctx.strokeStyle = connectedToHover
          ? groups[nodes[hoverIndex].group].color
          : `rgba(96,165,250,${0.025 + depth * 0.07})`;
        ctx.globalAlpha = ease * (connectedToHover ? 0.8 : 0.9);
        ctx.lineWidth = connectedToHover ? 1.4 : 1;
        ctx.beginPath();
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.stroke();
      }

      drawOrder.sort((a, b) => projected[a].z - projected[b].z);
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      for (const index of drawOrder) {
        const point = projected[index];
        const node = nodes[index];
        const group = groups[node.group];
        const depth = (point.z + 1) / 2;
        const isHovered = index === hoverIndex;
        ctx.globalAlpha = ease * (0.28 + depth * 0.72);
        ctx.fillStyle = group.color;
        ctx.shadowColor = group.color;
        ctx.shadowBlur = (isHovered ? 15 : 6) * depth;
        ctx.beginPath();
        ctx.arc(point.x, point.y, (isHovered ? 6.5 : 3.6) * point.scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (isHovered) {
          ctx.font = `700 15px ${fontFamily}`;
          const pillWidth = ctx.measureText(node.name).width + 20;
          const pillX = Math.max(4, Math.min(width - pillWidth - 4, point.x + 12));
          const pillY = Math.max(4, Math.min(height - 32, point.y - 16));
          ctx.globalAlpha = ease;
          ctx.fillStyle = dark ? "rgba(18,20,26,.92)" : "rgba(255,255,255,.94)";
          ctx.strokeStyle = group.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(pillX, pillY, pillWidth, 32, 9);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = dark ? "#fff" : "#1d1d1f";
          ctx.fillText(node.name, pillX + 10, pillY + 16);
        } else if (point.z > (width < 320 ? 0 : -0.4) && (width < 320 ? mobileLabels : majorLabels).has(node.name)) {
          ctx.globalAlpha = ease * 0.82 * (0.28 + depth * 0.72);
          ctx.fillStyle = dark ? "#fff" : "#1d1d1f";
          ctx.font = `700 ${Math.min(12, 10.5 * point.scale)}px ${fontFamily}`;
          const labelWidth = ctx.measureText(node.name).width;
          const right = point.x + 7 * point.scale;
          ctx.fillText(node.name, right + labelWidth > width - 2 ? point.x - labelWidth - 7 * point.scale : right, point.y);
        }
      }
      ctx.globalAlpha = 1;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibilityObserver.observe(canvas);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    frameId = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [onHoverGroup]);

  return (
    <div className="mx-auto w-full max-w-[290px] sm:max-w-[310px] lg:max-w-[360px]">
      <canvas ref={canvasRef} className="block aspect-square w-full cursor-grab font-sans" style={{ touchAction: "pan-y" }} role="img" aria-label="Interactive sphere showing Sarthak's technology stack" />
      <p className="mt-1 text-center text-xs text-muted dark:text-white/55" aria-live="polite">
        {hovered ? `${hovered.name} · ${groups[hovered.group].name}` : "Drag to explore · Hover to connect"}
      </p>
    </div>
  );
}
