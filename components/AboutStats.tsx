"use client";

import { useEffect, useRef, useState } from "react";
import type { GitHubStats } from "@/lib/github-stats";

function CountUp({ value, suffix = "", live = false }: { value: number; suffix?: string; live?: boolean }) {
  const element = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (started.current) {
      if (live) setDisplay(value);
      return;
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const finish = () => { cancelAnimationFrame(frame); setDisplay(value); };
    const onMotionChange = () => { if (media.matches) finish(); };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      observer.disconnect();
      if (media.matches) return;
      const start = performance.now();
      setDisplay(0);
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 800, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (element.current) observer.observe(element.current);
    media.addEventListener("change", onMotionChange);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); media.removeEventListener("change", onMotionChange); };
  }, [value, live]);

  return <span ref={element} aria-label={`${value}${suffix}`}><span aria-hidden="true">{display}{suffix}</span></span>;
}

export function AboutStats() {
  const [data, setData] = useState<GitHubStats>({});
  useEffect(() => {
    const controller = new AbortController();
    let pending = false;
    let initialLoad = true;
    const refresh = async () => {
      if (pending || document.visibilityState === "hidden") return;
      pending = true;
      try {
        const response = await fetch("/api/github-stats", { signal: controller.signal, cache: "no-store", priority: "low" });
        if (!response.ok) throw new Error("Stats unavailable");
        const stats = await response.json() as GitHubStats;
        if (!controller.signal.aborted) {
          if (initialLoad) {
            setData(stats);
            initialLoad = false;
          } else if (typeof stats.commitCount === "number") {
            setData(current => ({ ...current, commitCount: stats.commitCount }));
          }
        }
      } catch {
        // Keep the current stats if GitHub is unavailable.
      } finally {
        pending = false;
      }
    };
    const onVisibilityChange = () => { if (document.visibilityState === "visible") void refresh(); };
    document.addEventListener("visibilitychange", onVisibilityChange);
    void refresh();
    const interval = window.setInterval(() => { void refresh(); }, 60_000);
    return () => { window.clearInterval(interval); document.removeEventListener("visibilitychange", onVisibilityChange); controller.abort(); };
  }, []);

  const commitCount = Math.floor((data.commitCount ?? 585) / 10) * 10;
  const stats = [
    { label: "Projects built", value: 10, suffix: "+" },
    { label: "Commits pushed", value: commitCount, suffix: "+" },
    { label: "Top language", value: data.language?.name ?? "TypeScript", suffix: "", detail: data.language ? `${data.language.percentage}% of public code` : "Primary language across public repositories", title: "Share of language bytes in original public repositories, excluding forks." },
    { label: "Pull requests", value: data.pullRequestCount ?? 26, suffix: "+", detail: "Authored on GitHub" },
  ];

  return <dl aria-label="Developer statistics" className="grid min-w-0 grid-cols-2 self-center text-left">
    {stats.map((stat, index) => <div key={stat.label} title={"title" in stat ? stat.title : undefined}
      className={`flex min-w-0 flex-col border-black/[0.08] py-5 dark:border-white/[0.08] ${index % 2 ? "border-l pl-4" : "pr-4"} ${index >= 2 ? "border-t" : ""}`}>
      <dt className="mt-2 text-sm leading-5 text-[#A1A1AA]">{stat.label}</dt>
      <dd className={`order-first flex h-12 items-end font-semibold leading-none tracking-[-0.05em] text-[#11131a] dark:text-white sm:h-14 ${typeof stat.value === "number" ? "text-5xl sm:text-[56px] lg:text-[40px] xl:text-[56px]" : "text-xl sm:text-2xl lg:text-xl xl:text-2xl"}`}>
        {typeof stat.value === "number" ? <CountUp value={stat.value} suffix={stat.suffix} live={stat.label === "Commits pushed"} /> : stat.value}
      </dd>
      {stat.detail && <dd className="mt-1 text-[13px] leading-[18px] text-[#11131a]/60 dark:text-white/60">{stat.detail}</dd>}
    </div>)}
  </dl>;
}
