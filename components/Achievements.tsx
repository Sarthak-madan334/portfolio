import { ArrowUpRight, Award, BookOpen, GraduationCap } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const certificates = [
  { title: "SQL (Advanced)", issuer: "HackerRank", href: "https://www.hackerrank.com/certificates/6480ec05f2b2", bg: "bg-[#e6f4ea]", ink: "text-[#137333]", badge: "bg-white text-[#188038]" },
  { title: "Generative AI Fundamentals", issuer: "Google Cloud", href: "https://www.skills.google/public_profiles/41444b30-9a0a-467a-b6f5-629f7603c72b/badges/24883679", bg: "bg-[#e8f0fe]", ink: "text-[#1967d2]", badge: "bg-white text-[#1967d2]" },
];

export function Achievements() {
  return (
    <section id="achievements" className="section-pad bg-white">
      <div className="site-shell">
        <SectionHeading number="05" eyebrow="Education" title="Building the foundation." description="Computer science fundamentals, structured learning, and credentials that connect theory to the products I build." />
        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="relative flex min-h-[560px] h-full flex-col overflow-hidden rounded-[38px] bg-[#111318] p-8 text-white sm:p-11">
              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#2563eb]/30 blur-[100px]" /><div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#7c3aed]/20 blur-[100px]" />
              <div className="relative flex items-center justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-[#93c5fd]"><GraduationCap size={22}/></span><span className="rounded-full border border-white/15 px-3 py-1.5 text-[10px] font-semibold text-white/55">IN PROGRESS</span></div>
              <div className="relative my-auto py-14"><p className="text-sm font-semibold text-[#93c5fd]">2026 — 2030</p><h3 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-6xl">B.Tech in Computer Science Engineering.</h3><p className="mt-6 text-base text-white/55">SRM University · Delhi NCR</p></div>
              <div className="relative grid gap-5 border-t border-white/15 pt-7 sm:grid-cols-[1fr_auto] sm:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">Current focus</p><p className="mt-2 text-sm text-white/75">DSA · Systems · Full-stack engineering</p></div><span className="text-5xl font-semibold tracking-[-0.06em] text-white/10">CSE</span></div>
            </div>
          </Reveal>
          <div className="grid gap-5 lg:col-span-5">
            {certificates.map((c,i)=><Reveal key={c.title} delay={i*.07}><a href={c.href} target="_blank" rel="noreferrer" className={`focus-ring group relative flex min-h-[220px] h-full flex-col overflow-hidden rounded-[32px] p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(0,0,0,.1)] ${c.bg}`}><div className="flex items-start justify-between"><span className={`grid h-11 w-11 place-items-center rounded-2xl shadow-sm ${c.badge}`}><Award size={19}/></span><ArrowUpRight size={17} className={`transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${c.ink}`}/></div><div className="mt-auto pt-10"><p className={`text-[10px] font-bold uppercase tracking-[0.14em] ${c.ink}`}>{c.issuer} · 2026</p><h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">{c.title}</h3><p className="mt-3 text-xs text-[#6e6e73]">Verified credential</p></div></a></Reveal>)}
            <Reveal delay={.14}><div className="flex min-h-[116px] items-center gap-5 rounded-[28px] border border-black/[0.06] bg-[#f5f5f7] p-6"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#7c3aed] shadow-sm"><BookOpen size={19}/></span><div><p className="text-sm font-semibold text-[#1d1d1f]">Class XII · CBSE</p><p className="mt-1 text-xs text-[#6e6e73]">Swarprastha Public School</p></div></div></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
