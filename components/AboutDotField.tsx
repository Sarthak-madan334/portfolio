"use client";

import { motion, useReducedMotion } from "framer-motion";

export function AboutDotField() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-[4%] z-[1] opacity-30 [background-image:radial-gradient(rgba(171,197,222,.7)_1px,transparent_1.25px)] [background-size:27px_27px] [mask-image:radial-gradient(ellipse_at_68%_55%,black,transparent_68%)]"
      animate={reduceMotion ? undefined : { backgroundPosition: ["0px 0px", "27px 27px"] }}
      transition={{ duration: 48, ease: "linear", repeat: Infinity }}
    />
  );
}
