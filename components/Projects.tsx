"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, AudioLines, Check, ChevronLeft, ChevronRight, Code2, Database, GitBranch, Github, Heart, Mic, Search, ShoppingBag, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { projects } from "@/lib/data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="section-pad bg-white transition-colors duration-500 dark:bg-[#0b0c0f]">
      <div className="site-shell hidden lg:block">
        <SectionHeading number="03" eyebrow="Selected work" title="Projects, presented as products." description="End-to-end builds that show how I think across product structure, interface craft, integrations, and deployment." />
        <div className="mt-12 space-y-8">
          {projects.map((project, index) => { const dark = project.title === "Grillr" || project.title === "DEADLOCK"; return <Reveal key={project.title} delay={index * .08}>
            <motion.article whileHover={{ y: -4 }} transition={{ duration: .3 }} className={`relative overflow-hidden rounded-[40px] ${dark ? "bg-[#0b0b0f] text-white" : "bg-[#e8f0fe] text-[#1d1d1f] dark:bg-[#151925] dark:text-white"}`}>
              {dark && <><div className={`absolute -right-24 -top-28 h-96 w-96 rounded-full blur-[100px] ${project.title === "Grillr" ? "bg-[#7c3aed]/25" : "bg-[#e50914]/30"}`} /><div className="absolute bottom-0 left-[30%] h-64 w-64 rounded-full bg-[#7c3aed]/20 blur-[90px]" /></>}
              <div className="relative grid min-h-[620px] lg:grid-cols-[0.82fr_1.18fr]">
                <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-14">
                  <div><span className={`text-xs font-semibold ${dark ? "text-white/45" : "text-[#5f6368] dark:text-white/45"}`}>PROJECT {project.index} · {project.live ? "LIVE" : project.status?.toUpperCase()}</span><h3 className="mt-8 text-5xl font-semibold tracking-[-0.065em] sm:text-7xl">{project.title}</h3><p className={`mt-4 text-sm font-semibold ${dark ? (project.title === "Grillr" ? "text-[#b7a2ff]" : "text-[#ff6b73]") : "text-[#1967d2] dark:text-[#78a6ff]"}`}>{project.subtitle}</p><p className={`mt-8 max-w-lg text-base leading-8 ${dark ? "text-white/60" : "text-[#5f6368] dark:text-white/55"}`}>{project.description}</p></div>
                  <div className="mt-10"><div className="flex flex-wrap gap-2">{project.tech.map((tech)=><span key={tech} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${dark ? "bg-white/10 text-white/65" : "bg-white/70 text-[#4b5563] dark:bg-white/10 dark:text-white/65"}`}>{tech}</span>)}</div><div className="mt-8 flex flex-wrap items-center gap-3">{project.live ? <ProjectLink href={project.live} label="View live" primary dark={dark} icon={<ArrowUpRight size={15} />} /> : <ProjectStatus label={project.status ?? "In development"} dark={dark} />}<ProjectLink href={project.github} label="GitHub" dark={dark} icon={<Github size={15} />} /></div></div>
                </div>
                <div className="relative min-h-[460px] overflow-hidden p-6 lg:min-h-full lg:p-10">{project.title === "Grillr" ? <GrillrVisual /> : project.title === "MigrationY" ? <MigrationVisual /> : project.title === "DEADLOCK" ? <DeadlockVisual /> : <StoreVisual />}</div>
              </div>
            </motion.article>
          </Reveal>; })}
        </div>
      </div>
      <MobileProjects />
    </section>
  );
}

function MobileProjects() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);

  const scrollProject = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>("[data-mobile-project-card]");
    rail.scrollBy({ left: direction * ((firstCard?.offsetWidth ?? 290) + 16), behavior: "smooth" });
  };

  const previousProject = () => scrollProject(-1);
  const nextProject = () => scrollProject(1);

  const updateActiveProject = () => {
    const rail = railRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>("[data-mobile-project-card]");
    const step = (firstCard?.offsetWidth ?? 290) + 16;
    setActiveProject(Math.round(rail.scrollLeft / step));
  };

  return (
    <div className="lg:hidden">
      <div className="mx-auto max-w-[430px] overflow-hidden rounded-[34px] bg-[#fbfbfa] pb-0 pt-8 shadow-[0_28px_90px_rgba(0,0,0,0.10)] dark:bg-[#121316] dark:shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
        <div className="px-6">
          <div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8c8c91] dark:text-white/60">
                03 · Selected work
              </p>
              <h2 className="mt-4 text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.07em] text-black dark:text-white min-[390px]:text-[2.72rem]">
                Projects, presented
                <br />
                as products.
              </h2>
            </div>
          </div>
          <p className="mt-5 max-w-[325px] text-[13px] leading-6 text-[#6f7075] dark:text-white/70">
            End-to-end builds that cover product structure, interface craft,
            integrations, and deployment.
          </p>
        </div>

        <div className="relative mt-7">
          <AnimatePresence>
            {activeProject > 0 && (
              <motion.button
                type="button"
                onClick={previousProject}
                aria-label="Previous project"
                initial={{ opacity: 0, x: -12, scale: 0.86 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -12, scale: 0.86 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/90 text-[#111113] shadow-[0_12px_34px_rgba(0,0,0,0.14)] backdrop-blur-xl dark:border-white/15 dark:bg-[#26272c]/90 dark:text-white"
              >
                <ChevronLeft size={20} />
              </motion.button>
            )}
          </AnimatePresence>

          <div
            ref={railRef}
            onScroll={updateActiveProject}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, index) => (
              <MobileProjectCard key={project.title} project={project} index={index} active={activeProject === index} />
            ))}
          </div>

          <AnimatePresence>
            {activeProject < projects.length - 1 && (
              <motion.button
                type="button"
                onClick={nextProject}
                aria-label="Next project"
                initial={{ opacity: 0, x: 12, scale: 0.86 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.86 }}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-black/10 bg-white/90 text-[#111113] shadow-[0_12px_34px_rgba(0,0,0,0.14)] backdrop-blur-xl dark:border-white/15 dark:bg-[#26272c]/90 dark:text-white"
              >
                <ChevronRight size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MobileProjectCard({ project, index, active }: { project: (typeof projects)[number]; index: number; active: boolean }) {
  const dark = project.title === "Grillr" || project.title === "DEADLOCK";
  const title = project.title === "DEADLOCK" ? "Deadlock" : project.title;

  return (
    <motion.article
      data-mobile-project-card
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      animate={{ scaleX: active ? 1 : 0.965, opacity: active ? 1 : 0.82 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.42, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-h-[560px] w-[82vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-[24px] border dark:!opacity-100 ${
        dark
          ? "border-[#e6e6ea] bg-white text-[#111113] shadow-[0_18px_55px_rgba(0,0,0,0.10)] dark:border-white/15 dark:bg-[#111217] dark:text-white dark:shadow-[0_22px_70px_rgba(0,0,0,0.38)]"
          : "border-[#dfe4f4] bg-[#f3f6ff] text-[#111113] shadow-[0_18px_55px_rgba(75,91,140,0.13)] dark:border-white/15 dark:bg-[#171922] dark:text-white dark:shadow-[0_18px_55px_rgba(0,0,0,0.36)]"
      }`}
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: active ? [0.1, 0.22, 0.1] : 0, scale: active ? [1, 1.08, 1] : 1 }}
        transition={{ duration: 3.6, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${
          dark ? "bg-transparent dark:bg-[#ff5b62]" : "bg-[#7c91ff]"
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-0 ${
          dark
            ? "bg-transparent dark:bg-[radial-gradient(circle_at_96%_0%,rgba(143,37,41,0.55),transparent_30%),radial-gradient(circle_at_0%_100%,rgba(255,255,255,0.07),transparent_38%)]"
            : "bg-[radial-gradient(circle_at_86%_8%,rgba(91,119,255,0.12),transparent_36%),radial-gradient(circle_at_0%_100%,rgba(255,255,255,0.9),transparent_42%)] dark:bg-[radial-gradient(circle_at_86%_8%,rgba(91,119,255,0.18),transparent_36%),radial-gradient(circle_at_0%_100%,rgba(255,255,255,0.04),transparent_42%)]"
        }`}
      />

      <div className="relative p-3 pb-0">
        <div className={`overflow-hidden rounded-[17px] border ${dark ? "border-white/12 bg-[#121318]" : "border-white/80 bg-white dark:border-white/10 dark:bg-[#111318]"}`}>
          {project.title === "Grillr" ? <MobileGrillrPreview /> : project.title === "MigrationY" ? <MobileMigrationPreview /> : project.title === "DEADLOCK" ? <MobileDeadlockPreview /> : <MobileStorePreview />}
        </div>
      </div>

      <div className="relative p-5 pt-6">
        <p className={`text-[10px] font-bold uppercase tracking-[0.13em] ${project.title === "Grillr" ? "text-violet-600 dark:text-violet-300" : dark ? "text-[#ff766b]" : "text-[#7f8eff]"}`}>
          Project {project.index} · {project.live ? "Live" : project.status}
        </p>
        <h3 className={`mt-3 text-[2rem] font-semibold leading-[1.03] tracking-[-0.055em] ${dark ? "text-[#111113] dark:text-white" : "text-[#111113] dark:text-white"}`}>
          {title}
        </h3>
        <p className={`mt-3 text-sm font-semibold ${project.title === "Grillr" ? "text-violet-700 dark:text-violet-300" : dark ? "text-[#ff766b]" : "text-[#2f63ff]"}`}>
          {project.subtitle}
        </p>
        <p className={`mt-4 text-[13px] leading-6 ${dark ? "text-[#555963] dark:text-white/80" : "text-[#656a78] dark:text-white/80"}`}>
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                dark ? "bg-black/[0.055] text-[#4f5360] dark:bg-white/[0.11] dark:text-white/75" : "bg-black/[0.055] text-[#4f5360] dark:bg-white/[0.09] dark:text-white/75"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.live ? <MobileProjectLink href={project.live} label="View live" primary dark={dark} icon={<ArrowUpRight size={15} />} /> : <ProjectStatus label={project.status ?? "In development"} dark={dark} />}
          <MobileProjectLink href={project.github} label="GitHub" dark={dark} icon={<Github size={15} />} />
        </div>
      </div>
    </motion.article>
  );
}

function MobileMigrationPreview() {
  return (
    <div className="relative h-[190px] overflow-hidden bg-[#f3f6fc] p-3 text-[#171a22] dark:bg-[#151922] dark:text-white">
      <div className="flex items-center justify-between border-b border-black/[0.07] pb-2 dark:border-white/[0.08]">
        <span className="flex items-center gap-1.5 text-[9px] font-semibold"><Database size={12} className="text-blue-600 dark:text-blue-300"/> MIGRATION REHEARSAL</span>
        <span className="rounded-full bg-blue-600/[0.08] px-2 py-1 text-[7px] font-semibold text-blue-700 dark:bg-blue-300/10 dark:text-blue-200">SAMPLE RUN</span>
      </div>
      <div className="mt-3 rounded-xl border border-black/[0.07] bg-white p-3 dark:border-white/[0.08] dark:bg-white/[0.035]">
        <div className="flex items-center justify-between"><div><p className="text-[7px] font-medium uppercase tracking-[.12em] text-[#7b8190] dark:text-white/45">Migration</p><p className="mt-1 text-[10px] font-semibold">add_customer_index.sql</p></div><span className="flex items-center gap-1 text-[7px] font-semibold text-emerald-700 dark:text-emerald-300"><Check size={9}/> Rehearsed</span></div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">{[["01","Seed data"],["02","Apply change"],["03","Compare queries"]].map(([step,label])=><div key={step} className="rounded-lg bg-[#f3f6fc] p-2 dark:bg-white/[0.045]"><p className="text-[6px] font-bold text-blue-600 dark:text-blue-300">{step}</p><p className="mt-1 text-[7px] font-medium text-[#555b67] dark:text-white/65">{label}</p></div>)}</div>
      </div>
      <div className="mt-2 flex items-center justify-between px-1 text-[7px] text-[#737987] dark:text-white/50"><span>Before / after query check</span><span className="flex items-center gap-1"><GitBranch size={9}/> Phase 0</span></div>
    </div>
  );
}

function MobileDeadlockPreview() {
  return (
    <div className="relative h-[190px] bg-white text-[#111113] dark:bg-[linear-gradient(150deg,#17181f_0%,#0d0d10_68%)] dark:text-white">
      <div className="absolute inset-y-0 left-0 w-[46px] border-r border-black/[0.08] bg-[#f7f8fb] p-2.5 dark:border-white/8 dark:bg-white/[0.025]">
        <span className="grid h-7 w-7 place-items-center rounded-xl bg-[#ff343d] text-[9px] font-black text-white">D</span>
        <div className="mt-4 space-y-2.5">
          {[0, 1, 2, 3, 4].map((item) => (
            <span key={item} className="grid h-7 w-7 place-items-center rounded-lg bg-[#eceef4] dark:bg-white/[0.08]">
              <span className="h-2 w-2 rounded-sm border border-black/25 dark:border-white/25" />
            </span>
          ))}
        </div>
      </div>
      <div className="ml-[46px] p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[7px] font-bold uppercase tracking-[0.12em] text-[#6d717c] dark:text-white/42">Failure intelligence dashboard</p>
            <h4 className="mt-2 text-[12px] font-semibold tracking-[-0.03em] text-[#111113] dark:text-white">Your plan has 6 hidden risks.</h4>
          </div>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f0f1f5] text-[#ff3f48] dark:bg-white/[0.06] dark:text-[#ff7d78]">
            <Sparkles size={12} />
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#f4f5f8] p-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.035)] dark:bg-white/[0.075] dark:shadow-none">
            <p className="text-[6px] font-semibold uppercase text-[#717682] dark:text-white/38">Readiness score</p>
            <p className="mt-2 text-2xl font-semibold">74</p>
            <div className="mt-3 h-1.5 rounded-full bg-[#dfe2e8] dark:bg-white/12">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#ff424a] to-[#ffb0b0]" />
            </div>
          </div>
          <div className="rounded-xl bg-[#fff1f2] p-3 dark:bg-[#2a1f23]/85">
            <p className="text-[6px] font-semibold uppercase text-[#e14950] dark:text-[#ff6f69]">Primary risk</p>
            <p className="mt-2 text-[10px] font-semibold text-[#111113] dark:text-white">Delayed validation loop</p>
            <p className="mt-2 text-[7px] leading-3 text-[#6e6063] dark:text-white/48">Run customer testing before launch.</p>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-black/[0.08] bg-[#fbfbfd] p-3 dark:border-white/8 dark:bg-black/10">
          <div className="flex h-9 items-end gap-1.5">
            {[20, 22, 20, 35, 31, 46, 58, 68, 80, 91].map((height, i) => (
              <motion.span
                key={i}
                initial={{ height: 8 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.03 }}
                className="flex-1 rounded-t-full bg-gradient-to-t from-[#88363c] to-[#ff7771]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileGrillrPreview() {
  return (
    <div className="relative h-[190px] overflow-hidden bg-[radial-gradient(circle_at_82%_8%,rgba(124,58,237,.2),transparent_38%),linear-gradient(145deg,#191820,#101014_70%)] p-3 text-white">
      <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.045] px-3 py-2">
        <span className="flex items-center gap-2 text-[9px] font-semibold tracking-wide"><span className="grid h-5 w-5 place-items-center rounded-md bg-violet-400/20 text-violet-200"><AudioLines size={12}/></span>GRILLR <span className="text-white/35">/ MOCK INTERVIEW</span></span>
        <span className="flex items-center gap-1.5 text-[7px] font-medium text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300"/> SESSION LIVE</span>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_82px] gap-2">
        <div className="rounded-xl border border-white/[0.08] bg-black/25 p-3">
          <p className="text-[7px] font-semibold uppercase tracking-[.14em] text-violet-200/80">Behavioral · Question 04</p>
          <p className="mt-2 text-[10px] font-medium leading-4 text-white/90">Tell me about a time you solved a difficult problem.</p>
          <div className="mt-3 flex h-5 items-center gap-[3px]">{[6,12,8,16,10,18,8,13,6,17,10,14,7,19,9,13,6,16,10,7,14,8].map((h,i)=><span key={i} className="w-1 rounded-full bg-violet-300/80" style={{height:h}} />)}</div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.045]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-violet-400/15 text-violet-200"><Mic size={14}/></span>
          <span className="mt-2 text-[7px] text-white/55">Your answer</span>
          <span className="mt-1 text-[9px] font-semibold tabular-nums">01:24</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.035] px-2.5 py-2 text-[8px] text-white/65"><Check size={11} className="text-emerald-300"/> Clear structure <span className="ml-auto text-violet-200">Follow-up ready</span></div>
    </div>
  );
}

function MigrationVisual() {
  return (
    <div className="relative flex h-full min-h-[460px] items-center justify-center">
      <div className="absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-blue-400/10 blur-[100px]" />
      <div className="relative w-full max-w-[700px] overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_28px_80px_rgba(53,69,105,.16)] dark:border-white/10 dark:bg-[#11141b] dark:shadow-[0_28px_80px_rgba(0,0,0,.35)]">
        <div className="flex items-center justify-between border-b border-black/[0.07] px-5 py-4 dark:border-white/[0.08]">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600/[0.08] text-blue-700 dark:bg-blue-300/10 dark:text-blue-200"><Database size={17}/></span><div><p className="text-xs font-semibold text-[#1d2028] dark:text-white">Migration Rehearsal</p><p className="mt-0.5 text-[9px] text-[#7b8190] dark:text-white/40">Database change analysis</p></div></div>
          <span className="rounded-full border border-blue-600/10 bg-blue-600/[0.045] px-3 py-1.5 text-[8px] font-semibold tracking-wide text-blue-700 dark:border-blue-300/15 dark:bg-blue-300/[0.08] dark:text-blue-200">SAMPLE RUN</span>
        </div>
        <div className="grid gap-4 p-5 sm:grid-cols-[1fr_190px]">
          <div className="rounded-2xl border border-black/[0.07] bg-[#f8f9fc] p-5 dark:border-white/[0.08] dark:bg-white/[0.025]">
            <div className="flex items-start justify-between"><div><p className="text-[9px] font-semibold uppercase tracking-[.14em] text-[#828898] dark:text-white/40">Migration file</p><p className="mt-2 font-mono text-xs font-semibold text-[#252936] dark:text-white/85">add_customer_index.sql</p></div><span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500/[0.09] text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-300"><Check size={15}/></span></div>
            <div className="mt-6 space-y-3">{[["01","Seed representative data"],["02","Apply schema migration"],["03","Compare query behavior"]].map(([step,label],index)=><div key={step} className="flex items-center gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-blue-600/[0.07] font-mono text-[9px] font-semibold text-blue-700 dark:bg-blue-300/10 dark:text-blue-200">{step}</span><span className="text-[11px] font-medium text-[#525866] dark:text-white/65">{label}</span><span className={`ml-auto h-1.5 w-1.5 rounded-full ${index < 3 ? "bg-emerald-500" : "bg-gray-300"}`} /></div>)}</div>
            <div className="mt-6 rounded-xl border border-black/[0.06] bg-white px-4 py-3 dark:border-white/[0.07] dark:bg-white/[0.025]"><div className="flex items-center justify-between text-[9px] font-medium text-[#707787] dark:text-white/45"><span>Query plan comparison</span><span>Before <span className="px-1 text-blue-500">→</span> After</span></div><div className="mt-3 flex h-8 items-end gap-1">{[10,14,12,20,16,24,18,28,22,30,26,34,27,32,24,36,30,38,31,35,28,39,32,37].map((height,index)=><span key={index} className={`flex-1 rounded-t-sm ${index < 12 ? "bg-blue-500/30" : "bg-blue-600/65 dark:bg-blue-300/60"}`} style={{height}} />)}</div></div>
          </div>
          <div className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-4 dark:border-white/[0.08] dark:bg-white/[0.025]">
            <p className="text-[9px] font-semibold uppercase tracking-[.13em] text-[#828898] dark:text-white/40">Rehearsal scope</p>
            <div className="mt-5 flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600/[0.07] text-blue-700 dark:bg-blue-300/10 dark:text-blue-200"><GitBranch size={17}/></span><div><p className="text-xs font-semibold text-[#252936] dark:text-white/85">Schema change</p><p className="mt-1 text-[9px] text-[#7b8190] dark:text-white/40">Isolated test database</p></div></div>
            <div className="mt-5 border-t border-black/[0.06] pt-4 dark:border-white/[0.08]"><p className="text-[9px] font-medium text-[#7b8190] dark:text-white/45">Checks in this run</p><div className="mt-3 space-y-3 text-[10px] font-medium text-[#505664] dark:text-white/65"><div className="flex items-center gap-2"><Check size={12} className="text-emerald-600 dark:text-emerald-300"/> Migration applied</div><div className="flex items-center gap-2"><Check size={12} className="text-emerald-600 dark:text-emerald-300"/> Queries compared</div><div className="flex items-center gap-2"><Check size={12} className="text-emerald-600 dark:text-emerald-300"/> Results recorded</div></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GrillrVisual() {
  return (
    <div className="relative flex h-full min-h-[460px] items-center justify-center">
      <div className="absolute left-[12%] top-[12%] h-64 w-64 rounded-full bg-violet-500/10 blur-[90px]" />
      <div className="relative w-full max-w-[680px] overflow-hidden rounded-[28px] border border-white/[0.11] bg-[#111116]/95 p-4 shadow-[0_35px_100px_rgba(0,0,0,.48)] sm:p-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-400/15 text-violet-200"><AudioLines size={18}/></span><div><p className="text-sm font-semibold">Grillr</p><p className="mt-0.5 text-[10px] text-white/40">Interview practice</p></div></div>
          <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-1.5 text-[9px] font-semibold tracking-wide text-emerald-200">SESSION LIVE</span>
        </div>
        <div className="grid gap-4 py-5 sm:grid-cols-[1fr_190px]">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[.15em] text-violet-200/80">Behavioral interview <span className="px-1 text-white/20">·</span> 04 / 08</p>
            <h4 className="mt-4 max-w-md text-xl font-medium leading-snug tracking-[-.035em] text-white/90">Tell me about a time you solved a difficult problem.</h4>
            <div className="mt-7 flex h-10 items-center gap-1">{[10,18,12,24,15,32,18,25,11,29,18,35,20,26,12,31,18,24,13,35,20,28,14,24,10,32,16,25,12,19,9,27,16,31,13,22].map((h,i)=><span key={i} className="w-[4px] rounded-full bg-violet-300/75" style={{height:h}} />)}</div>
            <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4"><span className="flex items-center gap-2 text-[11px] text-white/55"><Mic size={14} className="text-violet-200"/> Listening to your answer</span><span className="text-xs tabular-nums text-white/45">01:24</span></div>
          </div>
          <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4">
            <p className="text-[9px] font-semibold uppercase tracking-[.14em] text-white/40">Live analysis</p>
            <div className="mt-4 flex items-end gap-2"><span className="text-4xl font-semibold tracking-[-.06em]">86</span><span className="pb-1 text-[10px] text-white/40">/ 100</span></div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]"><div className="h-full w-[86%] rounded-full bg-violet-300" /></div>
            <div className="mt-5 space-y-3 text-[10px]"><div className="flex items-center gap-2 text-white/65"><Check size={12} className="text-emerald-300"/> Strong structure</div><div className="flex items-center gap-2 text-white/65"><Check size={12} className="text-emerald-300"/> Clear delivery</div><div className="mt-4 rounded-xl bg-violet-300/[0.08] p-3 leading-4 text-violet-100/75">A follow-up question is ready when you finish.</div></div>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-black/20 px-4 py-3"><span className="text-[10px] text-white/45">Answer <span className="text-white/70">→</span> Analyze <span className="text-white/70">→</span> Improve</span><span className="flex items-center gap-1.5 text-[10px] text-white/45"><span className="h-1.5 w-1.5 rounded-full bg-violet-300"/> AI coach</span></div>
      </div>
    </div>
  );
}

function MobileStorePreview() {
  return (
    <div className="relative bg-white dark:bg-[#111318] dark:text-white">
      <div className="flex h-11 items-center justify-between border-b border-black/[0.06] px-3.5 dark:border-white/10">
        <strong className="text-[13px] tracking-[-0.04em]">
          Nex<span className="text-[#2563eb]">Store</span>
        </strong>
        <div className="flex gap-3 text-[7px] font-medium text-[#6e6e73] dark:text-white/45">
          <span>Shop</span>
          <span>Deals</span>
        </div>
        <div className="flex gap-2 text-[#50535a] dark:text-white/55">
          <Search size={12} />
          <ShoppingBag size={12} />
        </div>
      </div>
      <div className="grid grid-cols-[0.95fr_1fr] gap-2.5 bg-[#fbfcff] p-3.5 dark:bg-[#0d0f14]">
        <div className="rounded-2xl bg-gradient-to-br from-[#e7edff] to-[#f5f0ff] p-3.5 dark:from-[#17203c] dark:to-[#211a36]">
          <p className="text-[6px] font-bold uppercase tracking-[0.08em] text-[#315cf6]">AI-curated for you</p>
          <h4 className="mt-3 text-base font-bold leading-tight tracking-[-0.055em]">Find your next favorite thing.</h4>
          <span className="mt-4 inline-flex rounded-full bg-[#111113] px-3 py-1.5 text-[8px] font-bold text-white">Shop now</span>
        </div>
        <div>
          <p className="mb-2.5 text-[8px] font-semibold text-[#33343a] dark:text-white/70">Trending now</p>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              ["#f6d4de", "AirOne", "$129"],
              ["#d7f0e0", "Studio", "$24"],
              ["#faeccb", "Pulse", "$79"],
            ].map(([bg, name, price]) => (
              <div key={name}>
                <div style={{ backgroundColor: bg }} className="relative grid aspect-[0.88] place-items-center rounded-xl">
                  <div className="h-6 w-6 rounded-xl bg-white/80 shadow-md" />
                  <Heart size={8} className="absolute right-1 top-1 text-[#858893]" />
                </div>
                <p className="mt-1.5 text-[7px] font-semibold">{name}</p>
                <p className="text-[6px] text-[#6e6e73] dark:text-white/45">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectStatus({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold ${dark ? "border-white/15 bg-white/[0.05] text-white/60" : "border-black/10 bg-white/65 text-[#5f6368] dark:border-white/15 dark:bg-white/[0.04] dark:text-white/60"}`}>
      <Code2 size={14} /> {label}
    </span>
  );
}

function MobileProjectLink({ href, label, icon, primary = false, dark = false }: { href: string; label: string; icon: ReactNode; primary?: boolean; dark?: boolean }) {
  const cls = primary
    ? dark
      ? "bg-[#111113] text-white dark:bg-white dark:text-[#111113]"
      : "bg-[#111113] text-white dark:bg-white dark:text-[#111113]"
    : dark
      ? "border border-black/15 text-[#1d1d1f] dark:border-white/20 dark:text-white"
      : "border border-black/15 text-[#1d1d1f] dark:border-white/20 dark:text-white";

  return (
    <a href={href} target="_blank" rel="noreferrer" className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition active:scale-[0.98] ${cls}`}>
      {label}
      {icon}
    </a>
  );
}

function DeadlockVisual() {
  return <div className="absolute bottom-[-5%] left-[8%] right-[-12%] top-[12%] rotate-[-2deg] overflow-hidden rounded-[30px] border border-white/15 bg-[#15161c] shadow-[0_30px_80px_rgba(0,0,0,.45)]"><div className="flex h-12 items-center gap-2 border-b border-white/10 px-5"><i className="h-2 w-2 rounded-full bg-[#e50914]" /><span className="ml-2 text-[9px] text-white/30">Failure intelligence dashboard</span></div><div className="grid h-full grid-cols-[86px_1fr]"><div className="border-r border-white/10 p-3"><div className="grid h-9 w-9 place-items-center rounded-xl bg-[#e50914] text-xs font-black">D</div><div className="mt-8 space-y-3">{[1,2,3,4,5].map(i=><div key={i} className={`h-10 rounded-xl ${i===1?"bg-white/10":"bg-white/[0.035]"}`} />)}</div></div><div className="p-7"><div className="flex items-center justify-between"><div><p className="text-[9px] uppercase tracking-wider text-white/35">Analysis complete</p><h4 className="mt-2 text-2xl font-semibold">Your plan has 6 hidden risks.</h4></div><Sparkles size={20} className="text-[#ff6b73]" /></div><div className="mt-7 grid grid-cols-2 gap-4"><div className="rounded-2xl bg-white/[0.055] p-5"><p className="text-[9px] text-white/40">RESILIENCE SCORE</p><p className="mt-2 text-4xl font-semibold">74</p><div className="mt-5 h-2 rounded-full bg-white/10"><div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#e50914] to-[#ffb4b8]" /></div></div><div className="rounded-2xl bg-gradient-to-br from-[#281014] to-[#191116] p-5"><p className="text-[9px] text-[#ff8a91]">PRIMARY RISK</p><p className="mt-3 text-sm font-semibold">Delayed validation loop</p><p className="mt-2 text-[10px] leading-5 text-white/40">Run customer testing before the second build cycle.</p></div></div><div className="mt-4 rounded-2xl border border-white/10 p-5"><div className="flex justify-between text-[9px] text-white/35"><span>FUTURE OUTCOME</span><span>+28% CLARITY</span></div><div className="mt-5 flex h-20 items-end gap-2">{[28,38,35,52,48,67,72,88,82,96].map((h,i)=><span key={i} style={{height:`${h}%`}} className="flex-1 rounded-full bg-gradient-to-t from-[#e50914]/30 to-[#ff6b73]" />)}</div></div></div></div></div>;
}

function StoreVisual() {
  return (
    <div className="absolute bottom-[-4%] left-[8%] right-[-10%] top-[10%] rotate-[2deg] overflow-hidden rounded-[30px] border border-white bg-white shadow-[0_30px_75px_rgba(49,79,130,.2)] dark:border-white/10 dark:bg-[#101217] dark:shadow-[0_30px_75px_rgba(0,0,0,.42)]">
      <div className="flex h-14 items-center justify-between border-b border-black/[0.06] px-6 dark:border-white/10">
        <strong className="text-base tracking-[-0.04em]">Nex<span className="text-[#2563eb] dark:text-[#78a6ff]">Store</span></strong>
        <div className="flex gap-4 text-[9px] font-medium text-[#6e6e73] dark:text-white/45"><span>Shop</span><span>Collections</span><span>Deals</span></div>
        <div className="flex gap-2"><Search size={14} /><ShoppingBag size={14} /></div>
      </div>
      <div className="bg-[#f8fafc] p-7 dark:bg-[#0b0d12]">
        <div className="rounded-[24px] bg-gradient-to-r from-[#dbeafe] to-[#ede9fe] p-7 dark:from-[#17244a] dark:to-[#2a1f44]">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[#2563eb] dark:text-[#78a6ff]">AI-curated for you</p>
          <h4 className="mt-3 max-w-sm text-3xl font-semibold tracking-[-0.05em] dark:text-white">Find your next favorite thing.</h4>
          <button className="mt-5 rounded-full bg-[#1d1d1f] px-4 py-2 text-[9px] font-semibold text-white dark:bg-white dark:text-[#111113]">Shop the edit</button>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <h5 className="font-semibold dark:text-white">Trending now</h5>
          <span className="text-[9px] text-[#6e6e73] dark:text-white/40">View all →</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[["#fce7f3","Air One","₹4,990"],["#dcfce7","Studio","₹2,490"],["#fef3c7","Pulse","₹3,290"]].map(([bg,name,price]) => (
            <div key={name} className="rounded-2xl border border-transparent bg-white p-3 shadow-sm dark:border-white/[0.07] dark:bg-[#17191f]">
              <div style={{background:bg}} className="relative grid aspect-square place-items-center rounded-xl dark:brightness-[.82]">
                <div className="h-12 w-12 rounded-[18px] bg-white/80 shadow-md" />
                <Heart size={12} className="absolute right-2 top-2 text-[#6e6e73]" />
              </div>
              <p className="mt-3 text-[10px] font-semibold dark:text-white/85">{name}</p>
              <p className="mt-1 text-[9px] text-[#6e6e73] dark:text-white/40">{price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectLink({ href, label, icon, primary=false, dark=false }: { href:string; label:string; icon:ReactNode; primary?:boolean; dark?:boolean }) {
  const cls = primary ? (dark ? "bg-white text-black" : "bg-[#1d1d1f] text-white dark:bg-white dark:text-black") : (dark ? "border border-white/20 text-white" : "border border-black/15 text-[#1d1d1f] dark:border-white/20 dark:text-white");
  return <a href={href} target="_blank" rel="noreferrer" className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition hover:scale-[1.02] ${cls}`}>{label}{icon}</a>;
}
