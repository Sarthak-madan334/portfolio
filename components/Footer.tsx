"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function Footer() {
  return <footer className="border-t border-white/10 bg-[#0b0b0f] py-9 text-white"><div className="site-shell flex flex-col items-center justify-between gap-7 sm:flex-row"><div><p className="text-base font-bold tracking-[-0.035em]">Sarthak Madan<span className="text-[#60a5fa]">.</span></p><p className="mt-1 text-[9px] uppercase tracking-[0.14em] text-white/35">© 2026 · Delhi NCR, India</p></div><div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-xs text-white/65">Made with <motion.span animate={{scale:[1,1.22,1]}} transition={{duration:1.4,repeat:Infinity}}><Heart size={14} fill="#ff375f" className="text-[#ff375f]"/></motion.span> by <span className="font-semibold text-white">Sarthak</span></div></div></footer>;
}
