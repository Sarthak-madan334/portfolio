"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { CalendarDays, Code2, GitCommit, Github, GitPullRequest, Layers3 } from "lucide-react";
import type { GitHubStats } from "@/lib/github-stats";
import { GitHubHeatmap } from "./GitHubHeatmap";
import type { Contribution } from "./GitHubHeatmap";
import styles from "./GitHubHeatmap.module.css";

type Calendar = { contributions: Contribution[]; firstDate: string; today: string; commitCount: number | null };
const accent = "#367DFF";
const dayMs = 86_400_000;

function deriveActivity(calendar: Calendar) {
  const counts = new Map(calendar.contributions.map(day => [day.date, day.count]));
  let total = 0;
  for (let time = Date.parse(`${calendar.firstDate}T00:00:00Z`); time <= Date.parse(`${calendar.today}T00:00:00Z`); time += dayMs) {
    const date = new Date(time).toISOString().slice(0, 10);
    total += counts.get(date) ?? 0;
  }
  return { total };
}

function format(value: number | null | undefined) {
  return typeof value === "number" ? value.toLocaleString("en-US") : "—";
}

function Empty({ loading }: { loading: boolean }) {
  return <p role="status" className="text-sm text-[#9ca3af]">{loading ? "Loading GitHub data…" : "GitHub data unavailable"}</p>;
}

export function AboutGitHubActivity() {
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [stats, setStats] = useState<GitHubStats>({});
  const [calendarFailed, setCalendarFailed] = useState(false);
  const activity = useMemo(() => calendar ? deriveActivity(calendar) : null, [calendar]);

  useEffect(() => {
    const controller = new AbortController();
    let pending = false;
    const refresh = async () => {
      if (pending || document.visibilityState === "hidden") return;
      pending = true;
      try {
        const [calendarResult, statsResult] = await Promise.allSettled([
          fetch("/api/github-contributions", { cache: "no-store", signal: controller.signal }).then(async response => {
            if (!response.ok) throw new Error("Calendar unavailable");
            return response.json() as Promise<Calendar>;
          }),
          fetch("/api/github-stats", { cache: "no-store", signal: controller.signal }).then(async response => {
            if (!response.ok) throw new Error("Stats unavailable");
            return response.json() as Promise<GitHubStats>;
          }),
        ]);
        if (controller.signal.aborted) return;
        if (calendarResult.status === "fulfilled" && Array.isArray(calendarResult.value.contributions)) {
          setCalendar(calendarResult.value);
          setCalendarFailed(false);
        } else setCalendarFailed(true);
        if (statsResult.status === "fulfilled") setStats(statsResult.value);
      } finally { pending = false; }
    };
    void refresh();
    const interval = window.setInterval(() => { void refresh(); }, 300_000);
    const onVisible = () => { if (document.visibilityState === "visible") void refresh(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { controller.abort(); window.clearInterval(interval); document.removeEventListener("visibilitychange", onVisible); };
  }, []);

  const summary = [
    { label: "Contributions", value: activity?.total, icon: Code2, title: "Contributions in the displayed period" },
    { label: "Projects built", value: stats.projectCount, icon: Layers3, title: "Public original repositories, excluding archived repositories" },
    { label: "Commits pushed", value: calendar?.commitCount, icon: GitCommit, title: "Qualifying commit contributions in the displayed period; requires GitHub authentication" },
    { label: "Pull requests", value: stats.pullRequestCount, icon: GitPullRequest, title: "Pull requests authored on GitHub" },
    { label: "Top language", value: stats.language?.name, icon: Code2, title: "By language bytes in public original, non-archived repositories" },
  ];
  return <div className={`${styles.palette} text-white`} style={{ "--activity-accent": accent } as CSSProperties}>
    <div className="rounded-[18px] border border-white/[0.11] bg-[#121214] p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-3 text-xl font-semibold tracking-[-0.03em] sm:text-2xl"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#367DFF]/[0.12] text-[#367DFF]"><Github size={21} /></span>GitHub activity</h3>
        <span className="flex items-center gap-2 text-xs text-[#a1a1aa]"><CalendarDays size={15} /> Last 5 months</span>
      </div>
      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:items-center">
        <div className="grid min-w-0 grid-cols-2 gap-y-4 sm:grid-cols-5 lg:gap-y-0">
          {summary.map(({ label, value, icon: Icon, title }) => <div key={label} title={title} className="min-w-0 border-white/[0.09] px-3 first:pl-0 sm:border-r sm:last:border-r-0 lg:px-2 xl:px-3">
            <Icon size={16} className="mb-3 text-[#8fa5c8]" aria-hidden="true" />
            <div className={`font-semibold leading-none tracking-[-0.04em] ${label === "Top language" ? "text-[13px] xl:text-[15px]" : "truncate text-2xl"}`}>{typeof value === "number" ? format(value) : value ?? "—"}</div>
            <p className="mt-2 text-[11px] leading-4 text-[#a1a1aa]">{label}</p>
          </div>)}
        </div>
        <div className="min-w-0 border-t border-white/[0.09] pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          {calendar && activity ? <GitHubHeatmap contributions={calendar.contributions} firstDate={calendar.firstDate} today={calendar.today} onCellSize={() => {}} /> : <div className="flex h-[174px] items-center"><Empty loading={!calendarFailed} /></div>}
        </div>
      </div>
    </div>

  </div>;
}
