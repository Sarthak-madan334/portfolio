"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function AmbientBackground() {
  const { scrollYProgress } = useScroll();
  const yA = useTransform(scrollYProgress, [0, 1], [0, 520]);
  const yB = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 28]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#f5f5f7] transition-colors duration-500 dark:bg-[#08090b]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_12%_8%,rgba(66,133,244,.10),transparent_30%),radial-gradient(ellipse_at_88%_14%,rgba(234,67,53,.07),transparent_24%),radial-gradient(ellipse_at_70%_90%,rgba(52,168,83,.055),transparent_26%)] dark:bg-[radial-gradient(ellipse_at_12%_8%,rgba(66,133,244,.13),transparent_30%),radial-gradient(ellipse_at_88%_14%,rgba(124,58,237,.09),transparent_24%),radial-gradient(ellipse_at_70%_90%,rgba(52,168,83,.07),transparent_26%)]" />
      <motion.div style={{ y: yA, rotate }} className="absolute -left-44 top-[16%] h-[500px] w-[500px] rounded-full bg-blue-300/10 blur-[120px]" />
      <motion.div style={{ y: yB }} className="absolute -right-44 top-[48%] h-[520px] w-[520px] rounded-full bg-fuchsia-300/[0.08] blur-[140px]" />
    </div>
  );
}
