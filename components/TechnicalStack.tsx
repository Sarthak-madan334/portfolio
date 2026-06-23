"use client";

import { motion } from "framer-motion";
import { Braces, CloudCog, Code2, Cpu, Database, Layers3, Wrench } from "lucide-react";
import { stackGroups } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const icons = [Code2, Layers3, CloudCog, Database, Cpu, Wrench, Braces];
const cards = [
  { span: "lg:col-span-5", bg: "bg-[#111318]", title: "text-white", sub: "text-white/45", icon: "bg-white/10 text-[#7dd3fc]", chip: "border-white/10 bg-white/[0.065] text-white", mark: "bg-white/10 text-[#7dd3fc]", height: "min-h-[360px]" },
  { span: "lg:col-span-7", bg: "bg-gradient-to-br from-[#2563eb] to-[#5946e8]", title: "text-white", sub: "text-white/55", icon: "bg-white/15 text-white", chip: "border-white/15 bg-white/10 text-white", mark: "bg-white/15 text-white", height: "min-h-[360px]" },
  { span: "lg:col-span-4", bg: "bg-gradient-to-br from-[#172554] to-[#1e3a8a]", title: "text-white", sub: "text-blue-100/50", icon: "bg-white/10 text-[#93c5fd]", chip: "border-white/10 bg-white/[0.075] text-white", mark: "bg-white/10 text-[#bfdbfe]", height: "min-h-[330px]" },
  { span: "lg:col-span-4", bg: "bg-gradient-to-br from-[#123c3b] to-[#0f5b55]", title: "text-white", sub: "text-emerald-100/50", icon: "bg-white/10 text-[#6ee7b7]", chip: "border-white/10 bg-white/[0.075] text-white", mark: "bg-white/10 text-[#a7f3d0]", height: "min-h-[330px]" },
  { span: "lg:col-span-4", bg: "bg-gradient-to-br from-[#21162f] to-[#351751]", title: "text-white", sub: "text-white/45", icon: "bg-white/10 text-[#d8b4fe]", chip: "border-white/10 bg-white/[0.07] text-white", mark: "bg-white/10 text-[#e9d5ff]", height: "min-h-[330px]" },
  { span: "lg:col-span-7", bg: "bg-gradient-to-br from-[#0c4a6e] to-[#075985]", title: "text-white", sub: "text-sky-100/50", icon: "bg-white/10 text-[#7dd3fc]", chip: "border-white/10 bg-white/[0.075] text-white", mark: "bg-white/10 text-[#bae6fd]", height: "min-h-[300px]" },
  { span: "lg:col-span-5", bg: "bg-gradient-to-br from-[#30245f] to-[#4c1d95]", title: "text-white", sub: "text-violet-100/50", icon: "bg-white/10 text-[#c4b5fd]", chip: "border-white/10 bg-white/[0.075] text-white", mark: "bg-white/10 text-[#ddd6fe]", height: "min-h-[300px]" },
];

export function TechnicalStack() {
  return (
    <section id="stack" className="section-pad relative overflow-hidden border-y border-black/[0.06] bg-[#f5f5f7]">
      <div className="pointer-events-none absolute right-[3%] top-12 hidden rotate-2 rounded-2xl border border-black/[0.06] bg-white/75 px-5 py-4 font-mono text-[11px] leading-6 text-[#2563eb]/45 shadow-[0_12px_35px_rgba(0,0,0,.06)] backdrop-blur-xl xl:block"><span className="mb-2 flex gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" /><i className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" /><i className="h-1.5 w-1.5 rounded-full bg-[#28c840]" /></span>{`const stack = { frontend, backend, data, ai };`}<br />{`export default ship(stack);`}</div>
      <div className="site-shell relative">
        <SectionHeading number="02" eyebrow="Technical stack" title="One toolkit. Every layer." description="From core logic to interface polish and deployment—organized around what each technology helps me deliver." />
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          {stackGroups.map((group, index) => {
            const Icon = icons[index]; const style = cards[index];
            return <Reveal key={group.title} delay={(index % 3) * .05} className={style.span}>
              <motion.article whileHover={{ y: -5 }} transition={{ duration: .25 }} className={`relative h-full overflow-hidden rounded-[34px] p-7 shadow-[0_1px_2px_rgba(0,0,0,.03)] sm:p-9 ${style.bg} ${style.height}`}>
                {index < 2 && <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />}
                <div className="relative flex items-start justify-between"><span className={`grid h-12 w-12 place-items-center rounded-2xl shadow-sm ${style.icon}`}><Icon size={21}/></span><span className={`text-xs font-semibold ${style.sub}`}>0{index+1}</span></div>
                <div className="relative mt-12"><h3 className={`text-2xl font-semibold tracking-[-0.04em] ${style.title}`}>{group.title}</h3><p className={`mt-2 text-xs ${style.sub}`}>{group.items.length} technologies · hover to explore</p></div>
                <div className="relative mt-7 flex flex-wrap gap-2.5">{group.items.map(item=><div key={item.name} tabIndex={0} className={`focus-ring group/tech flex min-w-[132px] flex-1 items-center gap-3 rounded-2xl border px-3 py-3.5 backdrop-blur-sm transition hover:-translate-y-0.5 ${style.chip}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-[10px] font-bold ${style.mark}`}>{item.mark}</span><span className="min-w-0"><span className="block whitespace-nowrap text-[11px] font-semibold">{item.name}</span><span className={`mt-0.5 block max-h-0 overflow-hidden text-[9px] opacity-0 transition-all duration-300 group-hover/tech:max-h-8 group-hover/tech:opacity-100 group-focus/tech:max-h-8 group-focus/tech:opacity-100 ${style.sub}`}>{item.use}</span></span></div>)}</div>
              </motion.article>
            </Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}
