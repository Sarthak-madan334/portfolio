"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { links } from "@/lib/data";
import { ProductStage } from "./ProductStage";

export function Hero() {
  return (
    <section id="home" className="noise relative min-h-screen overflow-hidden border-b border-black/[0.06] bg-[#f5f5f7]/70 pt-[74px]">
      <div className="site-shell relative z-10 grid min-h-[calc(100vh-74px)] items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <p className="text-3xl font-semibold tracking-[-0.045em] text-[#1d1d1f] sm:text-4xl">Sarthak Madan</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2"><p className="text-base font-semibold text-[#2563eb] sm:text-lg">Full-stack developer</p><span className="hidden h-1 w-1 rounded-full bg-[#a0a0a5] sm:block" /><p className="flex items-center gap-2 text-xs font-medium text-[#77777d]"><span className="h-2 w-2 rounded-full bg-[#34c759]" /> Open to internships · 2026</p></div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="mt-8 max-w-[780px] text-[clamp(3.4rem,5.25vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[#1d1d1f]">
            Full-stack products.
            <span className="mt-2 block bg-gradient-to-r from-[#2563eb] via-[#7c3aed] to-[#e11d48] bg-clip-text text-transparent">Practical AI.<br />Beautifully built.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="mt-7 max-w-xl text-base leading-7 text-[#6e6e73] sm:text-lg sm:leading-8">
            I build fast, thoughtful web products using React, Next.js, and practical AI — focused on clean interfaces, real usability, and production-ready execution.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }} className="mt-8">
            <a href="#projects" className="focus-ring group inline-flex items-center gap-3 rounded-full bg-[#1d1d1f] px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(0,0,0,.18)] transition hover:scale-[1.02] hover:bg-black">View my projects <ArrowDown size={15} className="transition group-hover:translate-y-0.5" /></a>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .48 }} className="mt-7 flex max-w-xl flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <a href="/Sarthak-Madan-Resume.pdf" target="_blank" className="ios-glass-action focus-ring inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-[#2563eb]">Résumé <ArrowUpRight size={15} /></a>
              <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="ios-glass-action focus-ring inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-[#45464b]"><Github size={17} /> GitHub</a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="ios-glass-action focus-ring inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-[#45464b]"><Linkedin size={17} /> LinkedIn</a>
            </div>
          </motion.div>
        </div>
        <ProductStage />
      </div>
    </section>
  );
}
