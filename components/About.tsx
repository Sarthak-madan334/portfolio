import { ArrowUpRight, Copy, Github, Linkedin, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { ContactStarfield } from "./ContactStarfield";
import { AboutGitHubActivity } from "./AboutGitHubActivity";
import { AboutStats } from "./AboutStats";
import { links } from "@/lib/data";

const socialLinks = [
  { href: links.github, label: "GitHub", icon: Github },
  { href: links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: links.email, label: "Email", icon: Mail },
];

export function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-white transition-colors duration-500 dark:bg-[#0B0B0D]">
      <div className="site-shell">
        <div className="mb-12 grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-start">
          <div>
            <p className="mb-5 flex items-center gap-3 text-sm font-medium tracking-[-0.01em] text-[#77777d] dark:text-white/50"><span className="grid h-7 min-w-7 place-items-center rounded-full bg-[#ececf0] px-2 text-[10px] font-bold text-[#55555b] dark:bg-white/[0.08] dark:text-white/60">01</span><span>About</span></p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-[1.04] tracking-[-0.05em] text-[#1d1d1f] dark:text-white sm:text-5xl">Still learning. Already shipping.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#6e6e73] dark:text-[#a8a8b2] md:mt-12 md:justify-self-end md:text-base">I’m a first-year Computer Science student at SRM University, developing strong foundations while shipping full-stack products in public.</p>
        </div>

        <Reveal className="relative isolate pl-12 pr-0 pb-10 pt-14 text-white sm:pl-[60px] sm:pr-3 sm:pb-9 sm:pt-16 lg:min-h-[430px] lg:pl-[84px] lg:pr-7 lg:pb-10 lg:pt-16">
          <svg aria-hidden="true" viewBox="0 0 1200 500" preserveAspectRatio="none" className="pointer-events-none absolute inset-[-2.5%] z-0 h-[105%] w-[105%] overflow-visible">
            <path d="M 82 42 C 139 8 210 32 298 36 C 390 41 463 19 553 28 C 648 38 719 54 810 57 C 905 37 971 16 1048 43 C 1115 66 1131 109 1139 167 C 1148 226 1168 267 1151 329 C 1137 382 1116 423 1062 438 C 1007 454 941 425 859 431 C 761 438 706 464 616 462 C 526 440 469 478 376 457 C 283 437 218 482 141 457 C 69 470 59 460 51 390 C 43 300 28 230 39 157 C 48 87 39 58 82 42 Z" fill="#121214" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          </svg>
          <ContactStarfield motion="sway" density={0.7} opacity={0.65} palette="about" />

          <div className="relative z-10 pr-10 lg:max-w-[54%] lg:pr-0 lg:-translate-y-5">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-xs font-medium text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl sm:text-[13px]">
              <span className="relative grid h-2.5 w-2.5 place-items-center"><span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-[#4C8DFF]/30" /><span className="relative h-2 w-2 rounded-full bg-[#4C8DFF]" /></span>
              Student <span className="text-white/35">•</span> Builder <span className="text-white/35">•</span> Always learning
            </div>

            <h3 className="mt-5 max-w-[650px] text-[clamp(1.75rem,3.55vw,3.15rem)] font-medium leading-[1.08] tracking-[-0.04em] sm:mt-6">
              I enjoy turning <span className="text-[#4C8DFF]">complicated problems</span> into products that feel <span className="text-[#4C8DFF]">simple, fast, and genuinely useful.</span>
            </h3>

            <p className="mt-6 max-w-2xl border-t border-white/12 pt-4 text-[13px] leading-6 text-slate-100/85 sm:mt-7 sm:pt-5 sm:text-sm sm:leading-6">
              Right now I’m sharpening DSA and systems fundamentals while exploring how modern web engineering and useful AI can create genuinely better experiences.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a href="#contact" className="focus-ring inline-flex min-h-10 items-center gap-2.5 rounded-full bg-[#4C8DFF] px-5 text-[13px] font-semibold text-[#0B0B0D] shadow-[0_5px_18px_rgba(76,141,255,.16)] transition hover:bg-[#5D99FF]">Let’s connect <ArrowUpRight size={15} /></a>
              {socialLinks.map(({ href, label, icon: Icon }) => <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noreferrer"} aria-label={label} className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/[0.055] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-lg transition hover:border-white/25 hover:bg-white/[0.1] hover:text-white focus-visible:bg-white/[0.13] focus-visible:text-white"><Icon size={17} /></a>)}
            </div>
          </div>

          <div aria-hidden="true" className="relative z-10 mt-10 lg:absolute lg:right-[5%] lg:top-1/2 lg:mt-0 lg:w-[32%] lg:-translate-y-1/2">
            <div className="relative overflow-hidden rounded-[25px] border border-white/10 bg-[#151517] p-4 shadow-[0_18px_44px_rgba(0,0,0,.28)] sm:rounded-[28px] sm:p-5 -rotate-[2.5deg] sm:-rotate-[3deg]">
              <div className="flex items-center justify-between border-b border-white/[0.09] px-1 pb-6">
                <div className="flex gap-2"><span className="h-3.5 w-3.5 rounded-full bg-white/70 sm:h-4 sm:w-4" /><span className="h-3.5 w-3.5 rounded-full bg-white/40 sm:h-4 sm:w-4" /><span className="h-3.5 w-3.5 rounded-full bg-white/20 sm:h-4 sm:w-4" /></div>
                <Copy size={19} className="text-slate-300 sm:h-5 sm:w-5" />
              </div>
              <div className="mt-4 rounded-[19px] bg-[#1C1C1F] px-3.5 py-8 font-mono text-[14px] leading-[2.05] text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,.035)] sm:px-4 sm:py-9 sm:text-[15px]">
                <CodeLine number="1"><span className="text-[#4C8DFF]">ideas</span><span className="text-white">(</span></CodeLine>
                <CodeLine number="2"><span className="pl-3 text-slate-300">complicated_problems</span></CodeLine>
                <CodeLine number="3"><span className="text-white">)</span></CodeLine>
                <CodeLine number="4"><span className="text-[#4C8DFF]">.map</span><span className="text-white">(</span><span className="text-[#4C8DFF]">to_simple_solutions</span><span className="text-white">)</span></CodeLine>
                <CodeLine number="5"><span className="text-[#4C8DFF]">.ship</span><span className="text-white">()</span></CodeLine>
              </div>
            </div>
            <div className="absolute -bottom-6 right-2 z-20 flex items-center gap-2.5 rounded-[18px] border border-white/15 bg-white/[0.07] px-5 py-3 text-sm font-medium leading-[1.15] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12),0_10px_28px_rgba(0,0,0,.24)] backdrop-blur-xl sm:-bottom-5 sm:-right-5 sm:px-5 sm:py-3.5 sm:text-base">
              <span className="h-3 w-3 rounded-full bg-[#4C8DFF]" /><span>Building<br />in public.</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid py-4 sm:py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <AboutStats />
          <div className="mt-8 min-w-0 lg:mt-0 lg:pl-8">
            <AboutGitHubActivity />
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeLine({ number, children }: { number: string; children: ReactNode }) {
  return <div className="grid grid-cols-[2rem_1fr]"><span className="select-none text-slate-500">{number}</span><span>{children}</span></div>;
}
