"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Heart, Search, ShoppingBag, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { projects } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="section-pad bg-white">
      <div className="site-shell">
        <SectionHeading number="03" eyebrow="Selected work" title="Projects, presented as products." description="Two end-to-end builds that show how I think across product structure, interface craft, integrations, and deployment." />
        <div className="mt-12 space-y-8">
          {projects.map((project, index) => <Reveal key={project.title} delay={index * .08}>
            <motion.article whileHover={{ y: -4 }} transition={{ duration: .3 }} className={`relative overflow-hidden rounded-[40px] ${index === 0 ? "bg-[#0b0b0f] text-white" : "bg-[#e8f0fe] text-[#1d1d1f]"}`}>
              {index === 0 && <><div className="absolute -right-24 -top-28 h-96 w-96 rounded-full bg-[#e50914]/30 blur-[100px]" /><div className="absolute bottom-0 left-[30%] h-64 w-64 rounded-full bg-[#7c3aed]/20 blur-[90px]" /></>}
              <div className="relative grid min-h-[620px] lg:grid-cols-[0.82fr_1.18fr]">
                <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-14">
                  <div><span className={`text-xs font-semibold ${index === 0 ? "text-white/45" : "text-[#5f6368]"}`}>PROJECT {project.index} · LIVE</span><h3 className="mt-8 text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">{project.title}</h3><p className={`mt-4 text-sm font-semibold ${index === 0 ? "text-[#ff6b73]" : "text-[#1967d2]"}`}>{project.subtitle}</p><p className={`mt-8 max-w-lg text-base leading-8 ${index === 0 ? "text-white/60" : "text-[#5f6368]"}`}>{project.description}</p></div>
                  <div className="mt-10"><div className="flex flex-wrap gap-2">{project.tech.map((tech)=><span key={tech} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${index === 0 ? "bg-white/10 text-white/65" : "bg-white/70 text-[#4b5563]"}`}>{tech}</span>)}</div><div className="mt-8 flex gap-3"><ProjectLink href={project.live} label="View live" primary dark={index===0} icon={<ArrowUpRight size={15} />} /><ProjectLink href={project.github} label="GitHub" dark={index===0} icon={<Github size={15} />} /></div></div>
                </div>
                <div className="relative min-h-[460px] overflow-hidden p-6 lg:min-h-full lg:p-10">{index === 0 ? <DeadlockVisual /> : <StoreVisual />}</div>
              </div>
            </motion.article>
          </Reveal>)}
        </div>
      </div>
    </section>
  );
}

function DeadlockVisual() {
  return <div className="absolute bottom-[-5%] left-[8%] right-[-12%] top-[12%] rotate-[-2deg] overflow-hidden rounded-[30px] border border-white/15 bg-[#15161c] shadow-[0_30px_80px_rgba(0,0,0,.45)]"><div className="flex h-12 items-center gap-2 border-b border-white/10 px-5"><i className="h-2 w-2 rounded-full bg-[#e50914]" /><span className="ml-2 text-[9px] text-white/30">Failure intelligence dashboard</span></div><div className="grid h-full grid-cols-[86px_1fr]"><div className="border-r border-white/10 p-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#e50914] text-xs font-black">D</div><div className="mt-8 space-y-3">{[1,2,3,4,5].map(i=><div key={i} className={`h-10 rounded-xl ${i===1?"bg-white/10":"bg-white/[0.035]"}`} />)}</div></div><div className="p-7"><div className="flex items-center justify-between"><div><p className="text-[9px] uppercase tracking-wider text-white/35">Analysis complete</p><h4 className="mt-2 text-2xl font-semibold">Your plan has 6 hidden risks.</h4></div><Sparkles size={20} className="text-[#ff6b73]" /></div><div className="mt-7 grid grid-cols-2 gap-4"><div className="rounded-2xl bg-white/[0.055] p-5"><p className="text-[9px] text-white/40">RESILIENCE SCORE</p><p className="mt-2 text-4xl font-semibold">74</p><div className="mt-5 h-2 rounded-full bg-white/10"><div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#e50914] to-[#ffb4b8]" /></div></div><div className="rounded-2xl bg-gradient-to-br from-[#281014] to-[#191116] p-5"><p className="text-[9px] text-[#ff8a91]">PRIMARY RISK</p><p className="mt-3 text-sm font-semibold">Delayed validation loop</p><p className="mt-2 text-[10px] leading-5 text-white/40">Run customer testing before the second build cycle.</p></div></div><div className="mt-4 rounded-2xl border border-white/10 p-5"><div className="flex justify-between text-[9px] text-white/35"><span>FUTURE OUTCOME</span><span>+28% CLARITY</span></div><div className="mt-5 flex h-20 items-end gap-2">{[28,38,35,52,48,67,72,88,82,96].map((h,i)=><span key={i} style={{height:`${h}%`}} className="flex-1 rounded-full bg-gradient-to-t from-[#e50914]/30 to-[#ff6b73]" />)}</div></div></div></div></div>;
}

function StoreVisual() {
  return <div className="absolute bottom-[-4%] left-[8%] right-[-10%] top-[10%] rotate-[2deg] overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_30px_75px_rgba(49,79,130,.2)]"><div className="flex h-14 items-center justify-between border-b border-black/[0.06] px-6"><strong className="text-base tracking-[-0.04em]">Nex<span className="text-[#2563eb]">Store</span></strong><div className="flex gap-4 text-[9px] font-medium text-[#6e6e73]"><span>Shop</span><span>Collections</span><span>Deals</span></div><div className="flex gap-2"><Search size={14} /><ShoppingBag size={14} /></div></div><div className="bg-[#f8fafc] p-7"><div className="rounded-[24px] bg-gradient-to-r from-[#dbeafe] to-[#ede9fe] p-7"><p className="text-[9px] font-semibold uppercase tracking-wider text-[#2563eb]">AI-curated for you</p><h4 className="mt-3 max-w-sm text-3xl font-semibold tracking-[-0.05em]">Find your next favorite thing.</h4><button className="mt-5 rounded-full bg-[#1d1d1f] px-4 py-2 text-[9px] font-semibold text-white">Shop the edit</button></div><div className="mt-6 flex items-center justify-between"><h5 className="font-semibold">Trending now</h5><span className="text-[9px] text-[#6e6e73]">View all →</span></div><div className="mt-4 grid grid-cols-3 gap-3">{[["#fce7f3","Air One","₹4,990"],["#dcfce7","Studio","₹2,490"],["#fef3c7","Pulse","₹3,290"]].map(([bg,name,price],i)=><div key={name} className="rounded-2xl bg-white p-3 shadow-sm"><div style={{background:bg}} className="relative grid aspect-square place-items-center rounded-xl"><div className="h-12 w-12 rounded-[18px] bg-white/80 shadow-md" /><Heart size={12} className="absolute right-2 top-2 text-[#6e6e73]" /></div><p className="mt-3 text-[10px] font-semibold">{name}</p><p className="mt-1 text-[9px] text-[#6e6e73]">{price}</p></div>)}</div></div></div>;
}

function ProjectLink({ href, label, icon, primary=false, dark=false }: { href:string; label:string; icon:ReactNode; primary?:boolean; dark?:boolean }) {
  const cls = primary ? (dark ? "bg-white text-black" : "bg-[#1d1d1f] text-white") : (dark ? "border border-white/20 text-white" : "border border-black/15 text-[#1d1d1f]");
  return <a href={href} target="_blank" rel="noreferrer" className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition hover:scale-[1.02] ${cls}`}>{label}{icon}</a>;
}
