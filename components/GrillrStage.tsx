"use client";

import { motion } from "framer-motion";
import { AudioLines, Code2, Mic2 } from "lucide-react";

const waveform = [8, 13, 10, 20, 27, 17, 11, 24, 34, 20, 13, 29, 38, 23, 14, 25, 32, 18, 10, 22, 30, 16, 8, 19, 26, 14, 7];
const panel = "absolute overflow-hidden rounded-[22px] border border-white/[0.12] bg-[#141519] text-white shadow-[0_20px_44px_rgba(0,0,0,.28)]";
const bar = "border-b border-white/[0.08] bg-white/[0.025] px-4 py-3 text-[11px] font-medium text-white/75";

export function GrillrStage() {
  return (
    <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
      className="relative hidden min-h-[clamp(500px,calc(100svh-170px),610px)] items-center lg:flex"
      aria-label="Selected work and interview practice preview">
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
          <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-4 py-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-[11px] bg-[#b7a5eb] text-[#211a32]"><AudioLines size={16} /></span>
              <div><p className="text-[13px] font-semibold tracking-[-0.03em]">Grillr<span className="text-[#b7a5eb]">.</span></p><p className="mt-0.5 text-[9px] text-white/45">Voice interview coach</p></div>
            </div>
            <span className="flex items-center gap-1.5 text-[9px] text-white/50"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> LIVE</span>
          </div>
          <div className="px-4 pt-5">
            <div className="flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.12em]">
              <span className="text-[#c5b4f4]">Behavioral interview</span><span className="text-white/40">04 / 08</span>
            </div>
            <div className="mt-2.5 flex gap-1">{Array.from({ length: 8 }, (_, index) => <span key={index} className={`h-0.5 flex-1 rounded-full ${index < 4 ? "bg-[#b7a5eb]/80" : "bg-white/10"}`} />)}</div>
            <p className="mt-6 text-[17px] font-medium leading-[1.3] tracking-[-0.035em] text-white/90">Tell me about a time you solved a difficult problem.</p>
            <div className="mt-5 rounded-[15px] border border-white/[0.07] bg-white/[0.025] px-3.5 py-3">
              <div className="flex items-center justify-between text-[9px] text-white/45"><span>Your answer</span><span className="font-mono">01:24</span></div>
              <div className="my-3 flex h-12 items-center justify-center gap-[3px]" aria-hidden="true">
                {waveform.map((height, index) => <span key={index} style={{ height }} className={`w-[3px] shrink-0 rounded-full ${index > 8 && index < 20 ? "bg-[#c5b4f4]" : "bg-[#b7a5eb]/35"}`} />)}
              </div>
              <div className="mt-2.5 flex items-center gap-2 border-t border-white/[0.06] pt-2.5">
                <Mic2 size={12} className="text-[#c5b4f4]" /><span className="text-[9px] text-white/55">Listening to your answer</span>
              </div>
            </div>
          </div>
        </article>

        <article className={`${panel} left-[55%] top-[25%] z-20 h-[300px] w-[44%] rotate-[5deg]`}>
          <div className={`${bar} text-right`}>02 <span className="mx-1 text-white/40">·</span> IN PROGRESS</div>
          <div className="pl-[44%] pr-3 pt-5">
            <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-white/40">Selected work</p>
            <div className="mt-3 space-y-3">
              <div><p className="text-[12px] font-semibold tracking-[-0.02em]">MigrationY</p><p className="mt-0.5 text-[9px] leading-4 text-white/45">Database rehearsal</p></div>
              <div className="border-t border-white/[0.07] pt-2.5"><p className="text-[12px] font-semibold tracking-[-0.02em]">Deadlock</p><p className="mt-0.5 text-[9px] leading-4 text-white/45">Failure intelligence</p></div>
              <span className="inline-flex rounded-full border border-emerald-300/[0.16] px-2 py-1 text-[8px] text-emerald-200/75">Building in public</span>
            </div>
          </div>
        </article>
      </div>
    </motion.div>
  );
}
