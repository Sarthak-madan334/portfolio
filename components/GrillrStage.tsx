"use client";

import { motion } from "framer-motion";
import { Bot, Code2, FileCode2, Mic2, ScanLine } from "lucide-react";

const waveform = [8, 13, 10, 20, 27, 17, 11, 24, 34, 20, 13, 29, 38, 23, 14, 25, 32, 18, 10, 22, 30, 16, 8, 19, 26, 14, 7];
const panel = "absolute overflow-hidden rounded-[22px] border border-white/[0.12] bg-[#141519] text-white shadow-[0_20px_44px_rgba(0,0,0,.28)]";
const bar = "border-b border-white/[0.08] bg-white/[0.025] px-4 py-3 text-[11px] font-medium text-white/75";

export function GrillrStage() {
  return (
    <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
      className="relative hidden min-h-[clamp(500px,calc(100svh-170px),610px)] items-center lg:flex"
      aria-label="TokGuard coding agent and Grillr interview previews">
      <div className="relative mx-auto h-[480px] w-[110%] max-w-[627px] -translate-x-[5%]">
        <article className={`${panel} left-0 top-[25%] z-10 h-[300px] w-[44%] -rotate-[6deg]`}>
          <div className={bar}>01 <span className="ml-2 text-white/40">·</span> HOW I BUILD</div>
          <div className="px-4 pt-5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-400/10 text-blue-300"><Code2 size={16} /></span>
            <p className="mt-4 text-[15px] font-semibold leading-tight tracking-[-0.03em]">Ideas into<br />useful products.</p>
            <div className="mt-4 space-y-2 text-[10px] text-white/55">
              <p><span className="mr-2 text-blue-300">●</span>Next.js · TypeScript</p>
              <p><span className="mr-2 text-violet-300">●</span>AI · real workflows</p>
              <p><span className="mr-2 text-emerald-300">●</span>Design · detail</p>
            </div>
          </div>
        </article>

        <article className={`${panel} left-[27%] top-[7%] z-30 h-[400px] w-[48%] rotate-[1deg] border-white/[0.16] bg-[#111216]`}>
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4">
            <ScanLine className="text-violet-300" size={23} />
            <div><h3 className="text-sm font-semibold">TokGuard</h3><p className="text-[10px] text-white/55">Context for coding agents</p></div>
          </div>
          <figure className="px-4 pt-4">
            <div className="relative rounded-2xl border border-white/10 bg-[#11121a] p-3">
              <div className="space-y-1.5 font-mono text-[10px]">
                {["layout.tsx", "auth.ts", "theme.css"].map((file) => (
                  <div key={file} className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${file === "auth.ts" ? "border-violet-300/35 bg-violet-300/10 text-violet-200" : "border-transparent text-white/40"}`}>
                    <FileCode2 size={13} />{file}
                  </div>
                ))}
              </div>
              <div aria-hidden="true" className="ml-4 h-5 w-5 rounded-bl-lg border-b border-l border-violet-300/55" />
              <div className="ml-5 flex items-center gap-2 rounded-lg border border-violet-300/25 bg-[#1c1b2a] p-2">
                <Bot size={24} className="shrink-0 text-violet-200" />
                <div className="text-[10px] text-white/75">Agent context<code className="block text-[9px] text-violet-200">auth.ts · lines 12–24</code></div>
              </div>
            </div>
            <figcaption className="mt-4 text-sm font-medium leading-snug">Only the code the agent needs.</figcaption>
            <p className="mt-2 text-[11px] leading-relaxed text-white/55">TokGuard maps the repo and narrows each read to the lines that matter.</p>
          </figure>
        </article>

        <article className={`${panel} left-[55%] top-[25%] z-20 h-[300px] w-[44%] rotate-[5deg]`}>
          <div className="pl-[48%] pr-3 pt-5">
            <Mic2 size={19} className="text-violet-300" />
            <h3 className="mt-3 text-base font-semibold">Grillr</h3>
            <p className="mt-1 text-[10px] text-white/55">Voice interview coach</p>
            <div aria-hidden="true" className="mt-5 flex h-14 items-center gap-[2px] border-y border-white/10">
              {waveform.map((height, index) => <span key={index} style={{ height }} className="min-w-0 flex-1 rounded-full bg-violet-300/70" />)}
            </div>
            <p className="mt-2 font-mono text-[9px] text-violet-200">Recording · 01:24</p>
          </div>
        </article>
      </div>
    </motion.div>
  );
}
