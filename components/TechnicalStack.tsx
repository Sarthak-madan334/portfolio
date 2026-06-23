"use client";

import { motion } from "framer-motion";
import {
  Braces,
  CloudCog,
  Code2,
  Cpu,
  Database,
  Layers3,
  Wrench,
} from "lucide-react";
import { stackGroups } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

const icons = [Code2, Layers3, CloudCog, Database, Cpu, Wrench, Braces];
const accents = [
  { icon: "text-blue-600", dot: "bg-blue-500" },
  { icon: "text-violet-600", dot: "bg-violet-500" },
  { icon: "text-cyan-700", dot: "bg-cyan-500" },
  { icon: "text-emerald-700", dot: "bg-emerald-500" },
  { icon: "text-fuchsia-700", dot: "bg-fuchsia-500" },
  { icon: "text-sky-700", dot: "bg-sky-500" },
  { icon: "text-amber-700", dot: "bg-amber-500" },
];
const spans = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-4",
  "lg:col-span-4",
  "col-span-2 lg:col-span-4",
];

export function TechnicalStack() {
  return (
    <section
      id="stack"
      className="relative overflow-hidden border-y border-black/[0.06] bg-[#f5f5f7] py-14 sm:py-20"
    >
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 80, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-blue-200/25 blur-[90px]"
      />

      <div className="site-shell relative">
        <SectionHeading
          number="02"
          eyebrow="Technical stack"
          title="One toolkit. Every layer."
          description="The technologies I use across product engineering—visible at a glance, from interface to infrastructure."
        />

        <div className="mt-8 grid grid-cols-2 gap-x-5 md:gap-x-8 lg:grid-cols-12">
          {stackGroups.map((group, index) => {
            const Icon = icons[index];
            const accent = accents[index];

            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.42, delay: index * 0.045 }}
                className={`group relative border-t border-black/[0.10] py-4 sm:py-5 ${spans[index]}`}
              >
                <motion.span
                  aria-hidden="true"
                  className={`absolute -top-px left-0 h-[2px] origin-left ${accent.dot}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: 34 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.045 }}
                />

                <div className="flex items-center gap-2.5">
                  <motion.span
                    whileHover={{ rotate: 9, scale: 1.12 }}
                    className={accent.icon}
                  >
                    <Icon size={17} />
                  </motion.span>
                  <h3 className="text-[13px] font-semibold tracking-[-0.025em] text-[#17181c] sm:text-sm">
                    {group.title}
                  </h3>
                  <span className="ml-auto hidden font-mono text-[9px] text-black/25 sm:block">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
                  {group.items.map((item, itemIndex) => (
                    <span key={item.name} className="inline-flex items-center gap-2">
                      <motion.span
                        whileHover={{ y: -2, color: "#111318" }}
                        title={item.use}
                        aria-label={`${item.name}: ${item.use}`}
                        className="cursor-default text-[11px] font-medium text-[#68686e] sm:text-xs"
                      >
                        {item.name}
                      </motion.span>
                      {itemIndex < group.items.length - 1 && (
                        <motion.span
                          aria-hidden="true"
                          animate={{ opacity: [0.28, 0.72, 0.28] }}
                          transition={{ duration: 2.4, delay: index * 0.14, repeat: Infinity }}
                          className={`h-1 w-1 rounded-full ${accent.dot}`}
                        />
                      )}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
