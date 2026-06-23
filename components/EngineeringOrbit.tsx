"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Braces, Code2, Cpu, Database, Sparkles } from "lucide-react";
import { links } from "@/lib/data";

const nodes = [
  { label: "Next.js", detail: "Frontend", icon: Code2, className: "left-0 top-[18%]", delay: 0 },
  { label: "TypeScript", detail: "Type-safe", icon: Braces, className: "right-0 top-[11%]", delay: 0.5 },
  { label: "Databases", detail: "Data layer", icon: Database, className: "-left-3 bottom-[17%]", delay: 1 },
  { label: "AI / APIs", detail: "Intelligence", icon: Sparkles, className: "right-1 bottom-[14%]", delay: 1.5 },
];

export function EngineeringOrbit() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto hidden h-[510px] w-full max-w-[430px] lg:block" aria-label="Sarthak's engineering toolkit">
      <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(94,231,255,.1),rgba(94,231,255,.025)_42%,transparent_70%)] blur-sm" />
      <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035] bg-white/[0.008] backdrop-blur-[1px]" />

      <motion.div animate={{ rotate: 360 }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan/20">
        <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_18px_#5ee7ff]" />
        <span className="absolute bottom-[26px] right-[35px] h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_10px_white]" />
      </motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 23, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-acid/15">
        <span className="absolute right-[12px] top-[48px] h-2 w-2 rounded-full bg-acid shadow-[0_0_16px_#c8ff33]" />
      </motion.div>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute left-1/2 top-1/2 h-[178px] w-[178px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]">
        <span className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-violet-300 shadow-[0_0_14px_rgba(196,181,253,.8)]" />
      </motion.div>

      <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} className="absolute left-1/2 top-1/2 z-10 flex h-[142px] w-[142px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan/25 bg-[#091016]/80 shadow-[0_0_55px_rgba(94,231,255,.12),inset_0_0_28px_rgba(94,231,255,.04)] backdrop-blur-xl">
        <Cpu size={22} strokeWidth={1.5} className="mb-3 text-cyan" />
        <span className="font-mono text-3xl font-black tracking-[-0.16em] text-white">S<span className="ml-1 text-acid">/</span></span>
        <span className="mt-2 font-mono text-[8px] uppercase tracking-[0.22em] text-muted">build · learn · ship</span>
      </motion.div>

      {nodes.map(({ label, detail, icon: Icon, className, delay }) => (
        <motion.div key={label} animate={{ y: [0, -9, 0] }} transition={{ duration: 4.2, delay, repeat: Infinity, ease: "easeInOut" }} className={`absolute z-20 flex items-center gap-3 rounded-2xl border border-white/[0.09] bg-[#0a1015]/75 px-3.5 py-3 shadow-[0_12px_35px_rgba(0,0,0,.25)] backdrop-blur-xl ${className}`}>
          <span className="grid h-8 w-8 place-items-center rounded-xl border border-cyan/15 bg-cyan/[0.07] text-cyan"><Icon size={14} /></span>
          <span><strong className="block text-[11px] font-semibold text-white">{label}</strong><span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.14em] text-muted">{detail}</span></span>
        </motion.div>
      ))}

      <a href={links.email} className="focus-ring group absolute bottom-1 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-acid/20 bg-acid/[0.065] px-5 py-3 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-acid backdrop-blur-xl transition hover:border-acid/50 hover:bg-acid/[0.12]">
        <span className="h-1.5 w-1.5 rounded-full bg-acid shadow-[0_0_9px_#c8ff33]" /> Open to build <ArrowUpRight size={13} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </motion.div>
  );
}
