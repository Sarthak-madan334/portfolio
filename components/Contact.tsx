import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { links } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#0b0b0f] py-24 text-white sm:py-36">
      <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-[#2563eb]/25 blur-[120px]" /><div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#e11d48]/20 blur-[120px]" />
      <div className="pointer-events-none absolute left-8 top-12 hidden rotate-[-5deg] font-mono text-[10px] leading-6 text-white/[0.055] lg:block">{`if (idea) {`}<br />&nbsp;&nbsp;{`return buildTogether();`}<br />{`}`}</div>
      <div className="pointer-events-none absolute bottom-16 right-10 hidden rotate-3 font-mono text-[10px] leading-6 text-white/[0.05] lg:block">{`// next chapter`}<br />{`console.log("hello");`}</div>
      <div className="site-shell relative text-center"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">06 · Contact</p><h2 className="mx-auto mt-7 max-w-5xl text-5xl font-semibold leading-[.98] tracking-[-0.065em] sm:text-7xl lg:text-8xl">Let&apos;s make something people want to use.</h2><p className="mx-auto mt-8 max-w-xl text-base leading-8 text-white/55">I’m open to internships, collaborations, ambitious ideas, and conversations with people who care about thoughtful software.</p><div className="mt-10 flex flex-wrap justify-center gap-3"><a href={links.email} className="focus-ring group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.02]"><Mail size={16}/> Say hello <ArrowUpRight size={15}/></a><a href="/Sarthak-Madan-Resume.pdf" target="_blank" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"><Download size={15}/> View resume</a></div><div className="mt-14 flex justify-center gap-3"><Social href={links.github} label="GitHub" icon={<Github size={15}/>} /><Social href={links.linkedin} label="LinkedIn" icon={<Linkedin size={15}/>} /><Social href={links.leetcode} label="LeetCode" icon={<span className="text-[10px] font-bold">LC</span>} /></div></div>
    </section>
  );
}

function Social({href,label,icon}:{href:string;label:string;icon:ReactNode}) { return <a href={href} target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full bg-white/0 px-5 text-xs font-medium text-white/50 backdrop-blur-xl transition hover:bg-white/[0.08] hover:text-white">{icon}{label}</a>; }
