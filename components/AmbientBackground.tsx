"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const yA = useTransform(scrollYProgress, [0, 1], [0, 520]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 });

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#f5f5f7]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_8%,rgba(66,133,244,.10),transparent_30%),radial-gradient(ellipse_at_88%_14%,rgba(234,67,53,.07),transparent_24%),radial-gradient(ellipse_at_70%_90%,rgba(52,168,83,.055),transparent_26%)]" />
      <motion.div style={{ y: yA, rotate }} className="absolute -left-44 top-[16%] h-[500px] w-[500px] rounded-full bg-blue-300/10 blur-[120px]" />
      <motion.div style={{ y: yB }} className="absolute -right-44 top-[48%] h-[520px] w-[520px] rounded-full bg-fuchsia-300/[0.08] blur-[140px]" />
      <motion.div style={{ scaleX: progress }} className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#4285f4] via-[#a855f7] to-[#ea4335]" />
    </div>
  );
}
