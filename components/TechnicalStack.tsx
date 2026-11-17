"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Braces, CloudCog, Code2, Cpu, Database, Layers3, Wrench } from "lucide-react";
import { stackGroups } from "@/lib/data";

const icons = [Code2, Layers3, CloudCog, Database, Cpu, Wrench, Braces];
const brandMarks = ["typescript", "react", "nodedotjs", "postgresql", null, "github", null];
const accents = [
  "text-[#3178c6] dark:text-[#60a5fa]",
  "text-[#087ea4] dark:text-[#61dafb]",
  "text-[#43853d] dark:text-[#7cc66e]",
  "text-[#336791] dark:text-[#83b5df]",
  "text-[#95652c] dark:text-[#d9af78]",
  "text-[#24292f] dark:text-white/85",
  "text-[#737379] dark:text-white/65",
];

export function TechnicalStack() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="stack" aria-labelledby="stack-heading" className="border-y border-black/[0.06] bg-[#f5f5f7] py-10 transition-colors duration-500 dark:border-white/[0.07] dark:bg-[#0e0f12] sm:py-12">
      <div className="site-shell">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-3 flex items-center gap-2.5 text-xs font-medium text-[#737379] dark:text-white/50">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-black/[0.05] text-[10px] dark:bg-white/[0.08]">02</span>
              Technical stack
            </p>
            <h2 id="stack-heading" className="text-3xl font-semibold leading-tight tracking-[-0.05em] text-[#1d1d1f] dark:text-white sm:text-4xl">Built with purpose.</h2>
          </div>
          <p className="text-xs leading-5 text-[#737379] dark:text-white/50">The tools behind the work.</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {stackGroups.map((group, index) => {
            const Icon = icons[index] ?? Braces;
            const isConcepts = group.title === "Core Concepts";
            return (
              <motion.article
                key={group.title}
                initial={false}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`group relative rounded-xl border border-black/[0.07] bg-white/65 p-3 backdrop-blur-md transition-colors duration-200 hover:border-black/20 hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.025] dark:hover:border-white/20 dark:hover:bg-white/[0.055] ${isConcepts ? "col-span-2" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className={`grid h-5 w-5 shrink-0 place-items-center transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none ${accents[index]}`}>
                    {brandMarks[index] ? (
                      <span className="block h-4 w-4 bg-current" style={{ maskImage: `url(/stack-icons/${brandMarks[index]}.svg)`, WebkitMaskImage: `url(/stack-icons/${brandMarks[index]}.svg)`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center" }} />
                    ) : <Icon size={16} strokeWidth={1.8} />}
                  </span>
                  <h3 className="text-xs font-semibold leading-4 tracking-[-0.015em] text-[#1d1d1f] dark:text-white/90 sm:text-[13px]">{group.title}</h3>
                </div>
                <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                  {group.items.map((item) => (
                    <li key={item.name} title={item.use} className="text-[11px] leading-4 text-[#606068] transition-colors duration-200 group-hover:text-[#35353b] dark:text-white/60 dark:group-hover:text-white/80">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
