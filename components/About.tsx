import { ArrowUpRight, Box, Copy, Github, GraduationCap, Linkedin, Mail, Users, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { AboutDotField } from "./AboutDotField";
import { links } from "@/lib/data";

const highlights = [
  { icon: GraduationCap, title: "1st Year", text: <>Computer Science<br />at SRM University.</>, color: "border-blue-400/30 bg-blue-500/15 text-blue-600 dark:border-blue-300/25 dark:bg-blue-400/20 dark:text-blue-300" },
  { icon: Box, title: "Building", text: <>Full-stack products<br />and real projects.</>, color: "border-emerald-400/30 bg-emerald-500/15 text-emerald-600 dark:border-emerald-300/25 dark:bg-emerald-400/20 dark:text-emerald-300" },
  { icon: Zap, title: "Learning", text: <>DSA, systems &amp; modern<br />web engineering.</>, color: "border-violet-400/30 bg-violet-500/15 text-violet-600 dark:border-violet-300/25 dark:bg-violet-400/20 dark:text-violet-300" },
  { icon: Users, title: "Sharing", text: <>My journey<br />in public.</>, color: "border-rose-400/30 bg-rose-500/15 text-rose-600 dark:border-rose-300/25 dark:bg-rose-400/20 dark:text-rose-300" },
];

const socialLinks = [
  { href: links.github, label: "GitHub", icon: Github },
  { href: links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: links.email, label: "Email", icon: Mail },
];

export function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-white transition-colors duration-500 dark:bg-[#0b0c0f]">
      <div className="site-shell">
        <div className="mb-12 grid gap-5 md:grid-cols-[1fr_0.8fr] md:items-start">
          <div>
            <p className="mb-5 flex items-center gap-3 text-sm font-medium tracking-[-0.01em] text-[#77777d] dark:text-white/50"><span className="grid h-7 min-w-7 place-items-center rounded-full bg-[#ececf0] px-2 text-[10px] font-bold text-[#55555b] dark:bg-white/[0.08] dark:text-white/60">01</span><span>About</span></p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-[1.04] tracking-[-0.05em] text-[#1d1d1f] dark:text-white sm:text-5xl">Still learning. Already shipping.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#6e6e73] dark:text-[#a8a8b2] md:mt-12 md:justify-self-end md:text-base">I’m a first-year Computer Science student at SRM University, developing strong foundations while shipping full-stack products in public.</p>
        </div>

        <Reveal className="relative isolate pl-12 pr-0 pb-7 pt-14 text-white sm:pl-[60px] sm:pr-3 sm:pb-9 sm:pt-16 lg:min-h-[430px] lg:pl-[84px] lg:pr-7 lg:pb-10 lg:pt-16">
          <svg aria-hidden="true" viewBox="0 0 1200 500" preserveAspectRatio="none" className="pointer-events-none absolute inset-[-2.5%] z-0 h-[105%] w-[105%] overflow-visible">
            <defs>
              <linearGradient id="about-liquid-fill" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#152337" /><stop offset=".48" stopColor="#101720" /><stop offset="1" stopColor="#10201f" /></linearGradient>
              <linearGradient id="about-liquid-edge" x1="0" y1="0" x2="1" y2=".45"><stop offset="0" stopColor="#8dc9ff" stopOpacity=".74" /><stop offset=".52" stopColor="#5a8cae" stopOpacity=".18" /><stop offset="1" stopColor="#75e2d0" stopOpacity=".68" /></linearGradient>
              <radialGradient id="about-liquid-blue"><stop stopColor="#3983c4" stopOpacity=".25" /><stop offset="1" stopColor="#3983c4" stopOpacity="0" /></radialGradient>
              <radialGradient id="about-liquid-teal"><stop stopColor="#36bb9e" stopOpacity=".2" /><stop offset="1" stopColor="#36bb9e" stopOpacity="0" /></radialGradient>
              <filter id="about-liquid-glow" x="-12%" y="-18%" width="124%" height="136%"><feGaussianBlur stdDeviation="12" /></filter>
            </defs>
            <path d="M 82 42 C 139 8 210 32 298 36 C 390 41 463 19 553 28 C 648 38 719 54 810 57 C 905 37 971 16 1048 43 C 1115 66 1131 109 1139 167 C 1148 226 1168 267 1151 329 C 1137 382 1116 423 1062 438 C 1007 454 941 425 859 431 C 761 438 706 464 616 462 C 526 440 469 478 376 457 C 283 437 218 482 141 457 C 69 470 59 460 51 390 C 43 300 28 230 39 157 C 48 87 39 58 82 42 Z" fill="none" stroke="#62bdf3" strokeOpacity=".45" strokeWidth="20" filter="url(#about-liquid-glow)" />
            <path d="M 82 42 C 139 8 210 32 298 36 C 390 41 463 19 553 28 C 648 38 719 54 810 57 C 905 37 971 16 1048 43 C 1115 66 1131 109 1139 167 C 1148 226 1168 267 1151 329 C 1137 382 1116 423 1062 438 C 1007 454 941 425 859 431 C 761 438 706 464 616 462 C 526 440 469 478 376 457 C 283 437 218 482 141 457 C 69 470 59 460 51 390 C 43 300 28 230 39 157 C 48 87 39 58 82 42 Z" fill="url(#about-liquid-fill)" stroke="url(#about-liquid-edge)" strokeWidth="1.8" />
            <ellipse cx="180" cy="110" rx="330" ry="220" fill="url(#about-liquid-blue)" />
            <ellipse cx="1080" cy="410" rx="280" ry="240" fill="url(#about-liquid-teal)" />
            <path d="M 650 390 C 800 380 838 233 974 174 C 1040 145 1097 151 1142 188" fill="none" stroke="#63c6ec" strokeOpacity=".28" strokeWidth="1.4" />
            <path d="M 760 430 C 861 378 894 321 1022 308 C 1081 302 1115 326 1150 354" fill="none" stroke="#67d4c2" strokeOpacity=".19" strokeWidth="1.1" />
          </svg>
          <AboutDotField />

          <div className="relative z-10 lg:max-w-[54%]">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-2 text-xs font-medium text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-xl sm:text-[13px]">
              <span className="relative grid h-2.5 w-2.5 place-items-center"><span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400/35" /><span className="relative h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,.65)]" /></span>
              Student <span className="text-white/35">•</span> Builder <span className="text-white/35">•</span> Always learning
            </div>

            <h3 className="mt-5 max-w-[650px] text-[clamp(1.75rem,3.55vw,3.15rem)] font-medium leading-[1.08] tracking-[-0.04em] sm:mt-6">
              I enjoy turning <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">complicated problems</span> into products that feel <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">simple, fast, and genuinely useful.</span>
            </h3>

            <p className="mt-6 max-w-2xl border-t border-white/12 pt-4 text-[13px] leading-6 text-slate-200/75 sm:mt-7 sm:pt-5 sm:text-sm sm:leading-6">
              Right now I’m sharpening DSA and systems fundamentals while exploring how modern web engineering and useful AI can create genuinely better experiences.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a href="#contact" className="focus-ring inline-flex min-h-10 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#60bce8] to-[#65d2b4] px-5 text-[13px] font-semibold text-[#101820] shadow-[0_5px_18px_rgba(74,190,193,.18)] transition hover:from-[#78cbee] hover:to-[#77dfc4]">Let’s connect <ArrowUpRight size={15} /></a>
              {socialLinks.map(({ href, label, icon: Icon }) => <a key={label} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel={href.startsWith("mailto:") ? undefined : "noreferrer"} aria-label={label} className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/[0.055] text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,.06)] backdrop-blur-lg transition hover:border-white/25 hover:bg-white/[0.1] hover:text-white focus-visible:bg-white/[0.13] focus-visible:text-white"><Icon size={17} /></a>)}
            </div>
          </div>

          <div aria-hidden="true" className="relative z-10 mt-8 lg:absolute lg:right-[8%] lg:top-1/2 lg:mt-0 lg:w-[36%] lg:-translate-y-1/2">
            <div className="absolute -inset-6 rounded-[34px] bg-cyan-400/[0.12] blur-2xl" />
            <div className="relative overflow-hidden rounded-[25px] border border-[#75d7ee]/60 bg-gradient-to-br from-[#17232f]/95 via-[#101922]/95 to-[#0c151c]/95 p-5 shadow-[0_0_0_1px_rgba(83,190,216,.24),0_0_32px_rgba(50,166,201,.26),0_24px_52px_rgba(0,0,0,.36)] backdrop-blur-xl sm:rounded-[28px] sm:p-6 -rotate-[2.5deg] sm:-rotate-[3deg]">
              <div className="flex items-center justify-between border-b border-white/[0.09] px-1 pb-6">
                <div className="flex gap-2"><span className="h-3.5 w-3.5 rounded-full bg-[#f16f70] shadow-[0_0_10px_rgba(241,111,112,.2)] sm:h-4 sm:w-4" /><span className="h-3.5 w-3.5 rounded-full bg-[#f0bd61] shadow-[0_0_10px_rgba(240,189,97,.18)] sm:h-4 sm:w-4" /><span className="h-3.5 w-3.5 rounded-full bg-[#34cf91] shadow-[0_0_10px_rgba(52,207,145,.2)] sm:h-4 sm:w-4" /></div>
                <Copy size={19} className="text-slate-300 sm:h-5 sm:w-5" />
              </div>
              <div className="mt-5 rounded-[19px] bg-[#090e14]/90 px-4 py-10 font-mono text-[15px] leading-[2.1] text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,.035)] sm:px-5 sm:py-11 sm:text-base">
                <CodeLine number="1"><span className="text-cyan-300">ideas</span><span className="text-white">(</span></CodeLine>
                <CodeLine number="2"><span className="pl-3 text-slate-300">complicated_problems</span></CodeLine>
                <CodeLine number="3"><span className="text-white">)</span></CodeLine>
                <CodeLine number="4"><span className="text-amber-300">.map</span><span className="text-white">(</span><span className="text-violet-300">to_simple_solutions</span><span className="text-white">)</span></CodeLine>
                <CodeLine number="5"><span className="text-emerald-300">.ship</span><span className="text-white">()</span></CodeLine>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 flex items-center gap-4 rounded-[22px] border border-emerald-200/45 bg-[#102625]/95 px-9 py-6 text-xl font-medium leading-[1.15] text-white shadow-[0_16px_36px_rgba(0,0,0,.4),0_0_28px_rgba(45,220,190,.2)] backdrop-blur-xl sm:-bottom-6 sm:-right-6 sm:px-9 sm:py-7 sm:text-2xl">
              <span className="h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" /><span>Building<br />in public.</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text, color }, index) => <div key={title} className={`relative px-4 py-4 sm:px-6 sm:py-5 lg:px-7 ${index % 2 === 1 ? "border-l border-[#e1e4eb] dark:border-white/10 md:border-l-0" : ""} ${index > 1 ? "border-t border-[#e1e4eb] dark:border-white/10 md:border-t-0" : ""} ${index > 0 ? "md:border-l md:border-[#e1e4eb] md:dark:border-white/10" : ""}`}>
            <span className={`grid h-11 w-11 place-items-center rounded-2xl border ${color}`}><Icon size={23} strokeWidth={2} /></span>
            <h4 className="mt-3 text-lg font-semibold tracking-[-0.035em] text-[#11131a] dark:text-white sm:text-xl">{title}</h4>
            <p className="mt-1 text-[13px] leading-5 text-[#5e6677] dark:text-white/60 sm:text-sm sm:leading-5">{text}</p>
          </div>)}
        </div>
      </div>
    </section>
  );
}

function CodeLine({ number, children }: { number: string; children: ReactNode }) {
  return <div className="grid grid-cols-[2rem_1fr]"><span className="select-none text-slate-500">{number}</span><span>{children}</span></div>;
}
