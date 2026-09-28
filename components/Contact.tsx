import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { links } from "@/lib/data";
import { ContactStarfield } from "@/components/ContactStarfield";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#e7ebf2] py-24 text-[#1d1d1f] dark:bg-[#04090b] dark:text-white sm:py-36">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_16%_22%,rgba(255,255,255,0.86),transparent_38%),radial-gradient(ellipse_at_82%_78%,rgba(183,199,230,0.58),transparent_45%),linear-gradient(135deg,#e9edf4_0%,#e3e8f0_54%,#edf0f5_100%)] dark:hidden" />
      <ContactStarfield motion="sway" />
      <div className="pointer-events-none absolute -left-24 top-0 z-[1] h-96 w-96 rounded-full bg-blue-500/[0.07] blur-[120px] dark:bg-cyan-400/[0.05]" /><div className="pointer-events-none absolute -right-20 bottom-0 z-[1] h-96 w-96 rounded-full bg-violet-500/[0.05] blur-[120px] dark:bg-emerald-400/[0.04]" />
      <div className="pointer-events-none absolute left-8 top-12 z-[1] hidden rotate-[-5deg] font-mono text-[10px] leading-6 text-black/[0.045] dark:text-white/[0.055] lg:block">{`if (idea) {`}<br />&nbsp;&nbsp;{`return buildTogether();`}<br />{`}`}</div>
      <div className="pointer-events-none absolute bottom-16 right-10 z-[1] hidden rotate-3 font-mono text-[10px] leading-6 text-black/[0.04] dark:text-white/[0.05] lg:block">{`// next chapter`}<br />{`console.log("hello");`}</div>
      <div className="site-shell relative z-10 text-center"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#737379] dark:text-white/45">06 · Contact</p><h2 className="mx-auto mt-7 max-w-5xl text-5xl font-semibold leading-[.98] tracking-[-0.065em] sm:text-7xl lg:text-8xl">Let&apos;s make something people want to use.</h2><p className="mx-auto mt-8 max-w-xl text-base leading-8 text-[#68686d] dark:text-white/55">I’m open to internships, collaborations, ambitious ideas, and conversations with people who care about thoughtful software.</p><div className="mt-10 flex flex-wrap justify-center gap-3"><a href={links.email} className="focus-ring group inline-flex items-center gap-3 rounded-full bg-[#1d1d1f] px-6 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.02] dark:bg-white dark:text-black"><Mail size={16}/> Say hello <ArrowUpRight size={15}/></a><a href="/Sarthak-Madan-Resume.pdf" target="_blank" className="focus-ring inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3.5 text-sm font-semibold text-[#1d1d1f] transition hover:bg-black/[0.04] dark:border-white/20 dark:text-white dark:hover:bg-white/10"><Download size={15}/> View resume</a></div><div className="mt-14 flex justify-center gap-3"><Social href={links.github} label="GitHub" icon={<Github size={15}/>} /><Social href={links.linkedin} label="LinkedIn" icon={<Linkedin size={15}/>} /><Social href={links.leetcode} label="LeetCode" icon={<span className="text-[10px] font-bold">LC</span>} /></div></div>
    </section>
  );
}

function Social({href,label,icon}:{href:string;label:string;icon:ReactNode}) { return <a href={href} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full bg-black/0 px-5 text-xs font-medium text-[#64646a] backdrop-blur-xl transition hover:bg-black/[0.04] hover:text-black dark:text-white/50 dark:hover:bg-white/[0.08] dark:hover:text-white">{icon}{label}</a>; }
