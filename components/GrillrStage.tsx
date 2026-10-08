"use client";

import { motion } from "framer-motion";
import { AudioLines, Mic2 } from "lucide-react";

const waveform = [10, 17, 12, 24, 31, 19, 13, 27, 38, 23, 15, 32, 42, 26, 16, 28, 36, 21, 12, 25, 34, 18, 10, 22, 30, 16, 9];

export function GrillrStage() {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="relative hidden h-[clamp(480px,calc(100svh-190px),590px)] lg:block"
      aria-label="Grillr mock interview product preview"
    >
      <div className="absolute inset-x-[5%] bottom-[8%] top-[8%] flex flex-col overflow-hidden rounded-[25px] border border-white/[0.14] bg-[#111217] text-white shadow-[0_24px_56px_rgba(0,0,0,.3)] [transform:perspective(1400px)_rotateY(-1.5deg)_rotateZ(-0.5deg)]">
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-white/[0.08] px-5">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-violet-300/20 bg-violet-300/[0.09] text-violet-200"><AudioLines size={18} strokeWidth={1.8} /></span>
            <div><p className="text-[13px] font-semibold tracking-[-0.03em]">Grillr</p><p className="mt-0.5 text-[10px] text-white/50">Interview practice</p></div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-white/[0.08] px-2.5 py-1.5 text-[10px] font-medium text-white/65"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Session live</span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-6 pb-4 pt-5">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.13em] text-violet-200/75"><span>Behavioral interview</span><span className="tabular-nums text-white/45">04 / 08</span></div>
          <div className="mt-2 flex gap-1.5" aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <span key={index} className={`h-[3px] flex-1 rounded-full ${index < 4 ? "bg-violet-300/75" : "bg-white/[0.09]"}`} />)}</div>

          <p className="mt-6 max-w-[360px] text-[21px] font-medium leading-[1.24] tracking-[-0.04em] text-white/95">Tell me about a time you solved a difficult problem.</p>

          <div className="mt-auto pt-5">
            <div className="flex h-[82px] items-center justify-center gap-[3px] rounded-[18px] border border-white/[0.07] bg-white/[0.025] px-3" aria-hidden="true">
              {waveform.map((height, index) => <span key={index} style={{ height }} className={`w-1 shrink-0 rounded-full ${index > 8 && index < 20 ? "bg-violet-300/80" : "bg-violet-200/35"}`} />)}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5"><span className="grid h-8 w-8 place-items-center rounded-full bg-violet-300/10 text-violet-200"><Mic2 size={15} /></span><div><p className="text-[11px] font-medium text-white/80">Listening to your answer</p><p className="mt-0.5 text-[10px] text-white/45">Speak naturally</p></div></div>
              <span className="font-mono text-[11px] tabular-nums text-white/50">01:24</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
