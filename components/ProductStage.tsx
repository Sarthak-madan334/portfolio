"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowUpRight, CheckCircle2, Sparkles } from "lucide-react";

export function ProductStage() {
  return (
    <motion.div initial={false} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }} className="relative hidden min-h-[590px] lg:block">
      <div className="absolute inset-3 rounded-[48px] bg-gradient-to-br from-[#dbeafe] via-[#ede9fe] to-[#ffe4e6] shadow-[0_30px_100px_rgba(74,80,120,.18)]" />
      <div className="absolute inset-3 overflow-hidden rounded-[48px]">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#4285f4]/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-[#ea4335]/15 blur-3xl" />
      </div>

      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute left-[9%] top-[11%] w-[82%] overflow-hidden rounded-[26px] border border-white/80 bg-[#111318] shadow-[0_30px_70px_rgba(24,28,40,.28)]">
        <div className="flex h-11 items-center gap-2 border-b border-white/10 px-4"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /><span className="ml-3 text-[9px] font-medium text-white/35">deadlock · intelligence workspace</span></div>
        <div className="grid min-h-[390px] grid-cols-[72px_1fr]">
          <div className="border-r border-white/10 p-3"><div className="grid h-8 w-8 place-items-center rounded-xl bg-white text-xs font-black text-black">D</div><div className="mt-8 space-y-3">{[1,2,3,4].map((i)=><div key={i} className={`h-8 rounded-lg ${i===1?"bg-white/10":"bg-white/[0.035]"}`} />)}</div></div>
          <div className="p-6">
            <div className="flex items-start justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8b9cff]">Failure intelligence</p><h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">Pressure-test the plan.</h3></div><Sparkles size={18} className="text-[#a5b4fc]" /></div>
            <div className="mt-7 grid grid-cols-3 gap-3"><MiniMetric value="74%" label="Resilience" color="bg-[#34a853]" /><MiniMetric value="06" label="Risks found" color="bg-[#fbbc04]" /><MiniMetric value="05" label="Agents" color="bg-[#4285f4]" /></div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-white"><AlertTriangle size={13} className="text-[#fbbc04]" /> Primary failure path</div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#fbbc04] to-[#ea4335]" /></div>
              <p className="mt-3 text-[10px] leading-5 text-white/45">Execution risk rises when validation is delayed beyond the first build cycle.</p>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-2xl bg-[#2563eb] p-3 text-[10px] font-semibold text-white"><CheckCircle2 size={13} /> Recovery strategy generated <ArrowUpRight size={12} className="ml-auto" /></div>
          </div>
        </div>
      </motion.div>

      <motion.div animate={{ y: [0, 10, 0], rotate: [-2, 0, -2] }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-1 bottom-[9%] w-48 rounded-3xl border border-black/[0.06] bg-white p-4 shadow-[0_22px_55px_rgba(48,53,70,.2)]">
        <p className="text-[10px] font-semibold text-[#6e6e73]">Outcome forecast</p><p className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#1d1d1f]">High clarity</p><div className="mt-4 flex h-12 items-end gap-1">{[34,52,42,66,58,76,88].map((h,i)=><span key={i} style={{height:`${h}%`}} className="flex-1 rounded-full bg-gradient-to-t from-[#2563eb] to-[#60a5fa]" />)}</div>
      </motion.div>
    </motion.div>
  );
}

function MiniMetric({ value, label, color }: { value: string; label: string; color: string }) {
  return <div className="rounded-2xl bg-white/[0.055] p-3"><span className={`mb-3 block h-1.5 w-6 rounded-full ${color}`} /><strong className="block text-lg text-white">{value}</strong><span className="text-[8px] uppercase tracking-wider text-white/35">{label}</span></div>;
}
