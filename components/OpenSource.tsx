import { ArrowUpRight, GitPullRequest, Github } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function OpenSource() {
  return (
    <section id="open-source" className="section-pad border-y border-black/[0.06] bg-[#f5f5f7]">
      <div className="site-shell">
        <SectionHeading number="04" eyebrow="Open source" title="Learning in public. Contributing for real." description="The best way to understand a codebase is to improve it—carefully, clearly, and in collaboration with others." />
        <Reveal className="mt-12 overflow-hidden rounded-[36px] border border-black/[0.06] bg-white shadow-[0_16px_60px_rgba(0,0,0,.06)]">
          <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
            <div className="relative grid min-h-[300px] place-items-center overflow-hidden bg-[#2563eb] p-10"><div className="absolute -left-16 -top-16 h-56 w-56 rounded-full border-[38px] border-white/10" /><div className="absolute -bottom-20 -right-12 h-64 w-64 rounded-full bg-[#7c3aed]/35 blur-2xl" /><div className="relative text-center text-white"><GitPullRequest size={58} strokeWidth={1.4} className="mx-auto" /><p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">Merged contribution</p><p className="mt-2 text-5xl font-semibold tracking-[-0.06em]">PR #52</p></div></div>
            <div className="p-8 sm:p-12"><div className="flex flex-wrap gap-2"><span className="rounded-full bg-[#e6f4ea] px-3 py-1.5 text-[10px] font-semibold text-[#137333]">Open source</span><span className="rounded-full bg-[#f1f3f4] px-3 py-1.5 text-[10px] font-semibold text-[#5f6368]">Jun 2026 — present</span></div><h3 className="mt-8 text-3xl font-semibold tracking-[-0.045em] text-[#1d1d1f] sm:text-4xl">Fixed crossword printing in Crucigrama.</h3><p className="mt-5 max-w-2xl text-base leading-8 text-[#6e6e73]">Reproduced the issue, traced it through the <span className="font-medium text-[#1d1d1f]">react-to-print</span> integration, and submitted a focused fix to restore reliable crossword printing.</p><div className="mt-9 flex flex-wrap gap-3"><a href="https://github.com/m0nt4ld0/crucigrama/pull/52" target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-5 py-3 text-xs font-semibold text-white">View pull request <ArrowUpRight size={14} /></a><a href="https://github.com/Sarthak-madan334" target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-xs font-semibold text-[#1d1d1f]"><Github size={14} /> GitHub profile</a></div></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
