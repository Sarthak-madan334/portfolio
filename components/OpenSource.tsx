"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, GitPullRequest, Github } from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const contributions = [
  {
    pr: "PR #52",
    title: "Fixed crossword printing in Crucigrama.",
    description: (
      <>
        Reproduced the issue, traced it through the{" "}
        <span className="font-medium text-[#1d1d1f] dark:text-white">react-to-print</span>{" "}
        integration, and submitted a focused fix to restore reliable crossword
        printing.
      </>
    ),
    href: "https://github.com/m0nt4ld0/crucigrama/pull/52",
    accent: "bg-[#2563eb]",
    glow: "bg-[#7c3aed]/35",
    showMergedLabel: false,
  },
  {
    pr: "PR #41",
    title: "Improved code execution console in AlgoForge.",
    description:
      "Resolved stale console output during repeated code runs by clearing previous results on execution start, adding a running state, manual clear control, and auto-scroll for new output.",
    href: "https://github.com/Rishabhworkspace/AlgoForge/pull/41",
    accent: "bg-[#111318]",
    glow: "bg-[#34a853]/35",
    showMergedLabel: true,
  },
];

const mobileContributions = [
  ...contributions.filter((contribution) => contribution.showMergedLabel),
  ...contributions.filter((contribution) => !contribution.showMergedLabel),
];

export function OpenSource() {
  return (
    <section
      id="open-source"
      className="section-pad border-y border-black/[0.06] bg-[#f5f5f7] transition-colors duration-500 dark:border-white/[0.07] dark:bg-[#0e0f12]"
    >
      <DesktopOpenSource />
      <MobileOpenSource />
    </section>
  );
}

function DesktopOpenSource() {
  return (
    <div className="site-shell hidden lg:block">
      <SectionHeading
        number="04"
        eyebrow="Open source"
        title="Learning in public. Contributing for real."
        description="The best way to understand a codebase is to improve it-carefully, clearly, and in collaboration with others."
      />
      <div className="mt-12 grid gap-6">
        {mobileContributions.map((contribution, index) => (
          <Reveal
            key={contribution.pr}
            delay={index * 0.08}
            className="overflow-hidden rounded-[36px] border border-black/[0.06] bg-white shadow-[0_16px_60px_rgba(0,0,0,.06)] dark:border-white/[0.08] dark:bg-[#15161a] dark:shadow-[0_16px_60px_rgba(0,0,0,.24)]"
          >
            <div className="grid lg:grid-cols-[0.38fr_0.62fr]">
              <div
                className={`relative grid min-h-[300px] place-items-center overflow-hidden p-10 ${contribution.accent}`}
              >
                <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full border-[38px] border-white/10" />
                <div
                  className={`absolute -bottom-20 -right-12 h-64 w-64 rounded-full blur-2xl ${contribution.glow}`}
                />
                <div className="relative text-center text-white">
                  <GitPullRequest
                    size={58}
                    strokeWidth={1.4}
                    className="mx-auto"
                  />
                  {contribution.showMergedLabel && (
                    <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
                      Merged contribution
                    </p>
                  )}
                  <p className={`${contribution.showMergedLabel ? "mt-2" : "mt-6"} text-5xl font-semibold tracking-[-0.06em]`}>
                    {contribution.pr}
                  </p>
                </div>
              </div>
              <div className="p-8 sm:p-12">
                <DesktopContributionBody contribution={contribution} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function MobileOpenSource() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeContribution, setActiveContribution] = useState(0);

  const scrollContribution = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>("[data-mobile-open-source-card]");
    rail.scrollBy({ left: direction * ((firstCard?.offsetWidth ?? 290) + 16), behavior: "smooth" });
  };

  const previousContribution = () => scrollContribution(-1);
  const nextContribution = () => scrollContribution(1);

  const updateActiveContribution = () => {
    const rail = railRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>("[data-mobile-open-source-card]");
    const step = (firstCard?.offsetWidth ?? 290) + 16;
    setActiveContribution(Math.round(rail.scrollLeft / step));
  };

  return (
    <div className="lg:hidden">
      <div className="mx-auto max-w-[430px] overflow-hidden rounded-[34px] bg-[#fbfbfa] pb-0 pt-8 shadow-[0_28px_90px_rgba(0,0,0,0.10)] dark:bg-[#121316] dark:shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
        <div className="px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#8c8c91] dark:text-white/60">
            04 · Open source
          </p>
          <h2 className="mt-4 text-[2.35rem] font-semibold leading-[0.98] tracking-[-0.07em] text-black dark:text-white min-[390px]:text-[2.72rem]">
            Learning in public.
            <br />
            Contributing for real.
          </h2>
          <p className="mt-5 max-w-[325px] text-[13px] leading-6 text-[#6f7075] dark:text-white/70">
            Real pull requests, careful debugging, and small improvements that make
            open-source projects better.
          </p>
        </div>

        <div className="relative mt-7">
          <AnimatePresence>
            {activeContribution > 0 && (
              <motion.button
                type="button"
                onClick={previousContribution}
                aria-label="Previous open source contribution"
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
            onScroll={updateActiveContribution}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {mobileContributions.map((contribution, index) => (
              <MobileContributionCard
                key={contribution.pr}
                contribution={contribution}
                index={index}
                active={activeContribution === index}
              />
            ))}
          </div>

          <AnimatePresence>
            {activeContribution < mobileContributions.length - 1 && (
              <motion.button
                type="button"
                onClick={nextContribution}
                aria-label="Next open source contribution"
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

function MobileContributionCard({
  contribution,
  index,
  active,
}: {
  contribution: (typeof contributions)[number];
  index: number;
  active: boolean;
}) {
  const dark = contribution.showMergedLabel;

  return (
    <motion.article
      data-mobile-open-source-card
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      animate={{ scale: active ? 1 : 0.965, opacity: active ? 1 : 0.82 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.42, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-h-[545px] w-[82vw] max-w-[320px] shrink-0 snap-start overflow-hidden rounded-[24px] border dark:!opacity-100 ${
        dark
          ? "border-[#dce9e1] bg-white text-[#111113] shadow-[0_18px_55px_rgba(35,95,61,0.11)] dark:border-white/15 dark:bg-[#111217] dark:text-white dark:shadow-[0_22px_70px_rgba(0,0,0,0.38)]"
          : "border-[#dbe5ff] bg-white text-[#111113] shadow-[0_18px_55px_rgba(37,99,235,0.12)] dark:border-white/15 dark:bg-[#171922] dark:text-white dark:shadow-[0_18px_55px_rgba(0,0,0,0.36)]"
      }`}
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: active ? [0.12, 0.24, 0.12] : 0, scale: active ? [1, 1.08, 1] : 1 }}
        transition={{ duration: 3.6, repeat: active ? Infinity : 0, ease: "easeInOut" }}
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${
          dark ? "bg-[#34a853]" : "bg-[#2563eb]"
        }`}
      />

      <div className={`relative m-3 overflow-hidden rounded-[18px] ${dark ? "bg-[#111318]" : "bg-[#2563eb]"}`}>
        <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full border-[28px] border-white/10" />
        <div className={`absolute -bottom-14 -right-10 h-40 w-40 rounded-full blur-2xl ${contribution.glow}`} />
        <div className="relative grid h-[205px] place-items-center p-6 text-center text-white">
          <motion.div
            animate={{ y: active ? [0, -5, 0] : 0 }}
            transition={{ duration: 3.2, repeat: active ? Infinity : 0, ease: "easeInOut" }}
          >
            <GitPullRequest size={48} strokeWidth={1.35} className="mx-auto" />
            {contribution.showMergedLabel && (
              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.15em] text-white/60">
                Merged contribution
              </p>
            )}
            <p className={`${contribution.showMergedLabel ? "mt-2" : "mt-5"} text-[2.55rem] font-semibold tracking-[-0.06em]`}>
              {contribution.pr}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative p-5 pt-3">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#e6f4ea] px-3 py-1.5 text-[10px] font-semibold text-[#137333] dark:bg-white/10 dark:text-white/75">
            Open source
          </span>
          <span className="rounded-full bg-[#f1f3f4] px-3 py-1.5 text-[10px] font-semibold text-[#5f6368] dark:bg-white/10 dark:text-white/75">
            Jun 2026
          </span>
        </div>
        <h3 className={`mt-5 text-[2rem] font-semibold leading-[1.03] tracking-[-0.055em] ${dark ? "text-[#111113] dark:text-white" : "text-[#111113] dark:text-white"}`}>
          {contribution.title}
        </h3>
        <p className={`mt-4 text-[13px] leading-6 ${dark ? "text-[#656a78] dark:text-white/80" : "text-[#656a78] dark:text-white/80"}`}>
          {contribution.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <MobileOpenSourceLink href={contribution.href} label="View PR" primary dark={dark} icon={<ArrowUpRight size={15} />} />
          <MobileOpenSourceLink href="https://github.com/Sarthak-madan334" label="GitHub" dark={dark} icon={<Github size={15} />} />
        </div>
      </div>
    </motion.article>
  );
}

function DesktopContributionBody({ contribution }: { contribution: (typeof contributions)[number] }) {
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-[#e6f4ea] px-3 py-1.5 text-[10px] font-semibold text-[#137333]">
          Open source
        </span>
        <span className="rounded-full bg-[#f1f3f4] px-3 py-1.5 text-[10px] font-semibold text-[#5f6368]">
          Jun 2026
        </span>
        {contribution.showMergedLabel && (
          <span className="rounded-full bg-[#f1f3f4] px-3 py-1.5 text-[10px] font-semibold text-[#5f6368]">
            Merged contribution
          </span>
        )}
      </div>
      <h3 className="mt-8 text-3xl font-semibold tracking-[-0.045em] text-[#1d1d1f] dark:text-white sm:text-4xl">
        {contribution.title}
      </h3>
      <p className="mt-5 max-w-2xl text-base leading-8 text-[#6e6e73] dark:text-white/55">
        {contribution.description}
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <a
          href={contribution.href}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-5 py-3 text-xs font-semibold text-white dark:bg-white dark:text-[#111113]"
        >
          View pull request <ArrowUpRight size={14} />
        </a>
        <a
          href="https://github.com/Sarthak-madan334"
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-3 text-xs font-semibold text-[#1d1d1f] dark:border-white/20 dark:text-white"
        >
          <Github size={14} /> GitHub profile
        </a>
      </div>
    </>
  );
}

function MobileOpenSourceLink({
  href,
  label,
  icon,
  primary = false,
  dark = false,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  primary?: boolean;
  dark?: boolean;
}) {
  const cls = primary
    ? dark
      ? "bg-[#111113] text-white dark:bg-white dark:text-[#111113]"
      : "bg-[#111113] text-white dark:bg-white dark:text-[#111113]"
    : dark
      ? "border border-black/15 text-[#1d1d1f] dark:border-white/20 dark:text-white"
      : "border border-black/15 text-[#1d1d1f] dark:border-white/20 dark:text-white";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition active:scale-[0.98] ${cls}`}
    >
      {label}
      {icon}
    </a>
  );
}
