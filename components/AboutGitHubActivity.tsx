"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { BarChart3, Braces, CalendarDays, Code2, Github, GitPullRequest, Layers3, PieChart, Zap } from "lucide-react";
import type { GitHubStats } from "@/lib/github-stats";
import { GitHubHeatmap } from "./GitHubHeatmap";
import type { Contribution } from "./GitHubHeatmap";
import styles from "./GitHubHeatmap.module.css";

type Calendar = { contributions: Contribution[]; firstDate: string; today: string };
const accent = "#367DFF";
const languageColors = ["#367DFF", "#2563d9", "#6b9df2", "#91a8d2", "#536176"];
const dayMs = 86_400_000;

function dayBefore(date: string) {
  return new Date(Date.parse(`${date}T00:00:00Z`) - dayMs).toISOString().slice(0, 10);
}

function deriveActivity(calendar: Calendar) {
  const counts = new Map(calendar.contributions.map(day => [day.date, day.count]));
  const days: Contribution[] = [];
  for (let time = Date.parse(`${calendar.firstDate}T00:00:00Z`); time <= Date.parse(`${calendar.today}T00:00:00Z`); time += dayMs) {
    const date = new Date(time).toISOString().slice(0, 10);
    days.push({ date, count: counts.get(date) ?? 0 });
  }
  let longest = 0;
  let run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  let current = 0;
  let cursor = counts.get(calendar.today) ? calendar.today : dayBefore(calendar.today);
  while (cursor >= calendar.firstDate && (counts.get(cursor) ?? 0) > 0) {
    current++;
    cursor = dayBefore(cursor);
  }
  const monthly = new Map<string, number>();
  for (const day of days) {
    const month = day.date.slice(0, 7);
    monthly.set(month, (monthly.get(month) ?? 0) + day.count);
  }
  return {
    total: days.reduce((sum, day) => sum + day.count, 0),
    current,
    longest,
    recent: days.slice(-14),
    months: Array.from(monthly, ([key, count]) => ({
      key,
      count,
      label: new Date(`${key}-01T00:00:00Z`).toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
    })),
  };
}

function format(value: number | null | undefined) {
  return typeof value === "number" ? value.toLocaleString("en-US") : "—";
}

function Empty({ loading }: { loading: boolean }) {
  return <p role="status" className="text-sm text-[#9ca3af]">{loading ? "Loading GitHub data…" : "GitHub data unavailable"}</p>;
}

function Trend({ months }: { months: { key: string; count: number; label: string }[] }) {
  const width = 360;
  const max = Math.max(1, ...months.map(month => month.count));
  const top = 25;
  const bottom = 103;
  const points = months.map((month, index) => ({
    ...month,
    x: 46 + index * (width - 66) / Math.max(1, months.length - 1),
    y: bottom - month.count / max * (bottom - top),
  }));
  return <svg viewBox={`0 0 ${width} 136`} className="h-[136px] w-full overflow-visible" role="img" aria-label="Monthly GitHub contributions">
    {(max > 1 ? [1, .5, 0] : [1, 0]).map(level => {
      const y = bottom - level * (bottom - top);
      return <g key={level}>
        <line x1="41" x2="340" y1={y} y2={y} stroke="rgba(255,255,255,.09)" strokeDasharray="3 4" />
        <text x="32" y={y + 3} textAnchor="end" fill="#9ca3af" fontSize="10">{Math.round(max * level)}</text>
      </g>;
    })}
    <polyline points={points.map(point => `${point.x},${point.y}`).join(" ")} fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {points.map(point => <g key={point.key} tabIndex={0} aria-label={`${point.label}: ${point.count} contributions`}>
      <title>{`${point.label}: ${point.count} contributions`}</title>
      <circle cx={point.x} cy={point.y} r="4" fill="#121416" stroke={accent} strokeWidth="2.5" />
      <text x={point.x} y={point.y - 10} textAnchor="middle" fill="#c3c9d3" fontSize="10" fontWeight="600">{point.count}</text>
      <text x={point.x} y="132" textAnchor="middle" fill="#9ca3af" fontSize="11">{point.label}</text>
    </g>)}
  </svg>;
}

function Languages({ languages }: { languages: NonNullable<GitHubStats["languages"]> }) {
  const radius = 37;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return <div className="flex items-center gap-5">
    <div className="relative h-[112px] w-[112px] shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" role="img" aria-label="Public repository language distribution">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#272a30" strokeWidth="13" />
        {languages.map((language, index) => {
          const dash = circumference * language.percentage / 100;
          const segment = <circle key={language.name} cx="50" cy="50" r={radius} fill="none" stroke={languageColors[index]} strokeWidth="13" strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-offset} />;
          offset += dash;
          return segment;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xl font-semibold leading-none text-white">{languages[0].percentage}%</span>
        <span className="mt-1 max-w-[76px] truncate text-[10px] text-[#9ca3af]">{languages[0].name}</span>
      </div>
    </div>
    <ul className="min-w-0 flex-1 space-y-1.5 text-xs">
      {languages.map((language, index) => <li key={language.name} className="flex items-center gap-2">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: languageColors[index] }} />
        <span className="min-w-0 flex-1 truncate text-[#b0b7c4]">{language.name}</span>
        <span className="text-white">{language.percentage}%</span>
      </li>)}
    </ul>
  </div>;
}

export function AboutGitHubActivity() {
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [stats, setStats] = useState<GitHubStats>({});
  const [calendarFailed, setCalendarFailed] = useState(false);
  const [statsFailed, setStatsFailed] = useState(false);
  const [statsLoaded, setStatsLoaded] = useState(false);
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
        if (statsResult.status === "fulfilled") {
          setStats(statsResult.value);
          setStatsLoaded(true);
          setStatsFailed(false);
        } else setStatsFailed(true);
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
    { label: "Languages used", value: stats.languageCount, icon: Braces, title: "Distinct languages in original public repositories, excluding forks and archived repositories" },
    { label: "Pull requests", value: stats.pullRequestCount, icon: GitPullRequest, title: "Pull requests authored on GitHub" },
    { label: "Top language", value: stats.language?.name, icon: Code2, title: "By language bytes in public original, non-archived repositories" },
  ];
  const recentMax = Math.max(1, ...(activity?.recent.map(day => day.count) ?? []));

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

    <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1.3fr_1.2fr]">
      <section className="min-w-0 rounded-[18px] border border-white/[0.11] bg-[#121214] p-5">
        <h4 className="flex items-center gap-2.5 text-base font-semibold"><Zap size={17} className="text-[#367DFF]" /> Contribution streak</h4>
        {activity ? <>
          <div className="mt-5 flex items-end justify-between gap-3">
            <div><span className="text-4xl font-semibold leading-none">{activity.current}</span><span className="ml-2 text-xs text-[#a1a1aa]">{activity.current === 1 ? "day" : "days"}</span><p className="mt-1 text-xs text-[#a1a1aa]">Current streak</p></div>
            <div className="flex h-12 items-end gap-1" aria-label="Daily contributions over the last 14 days">{activity.recent.map(day => <span key={day.date} title={`${day.date}: ${day.count} ${day.count === 1 ? "contribution" : "contributions"}`} className="w-2 rounded-[3px] bg-[#367DFF]" style={{ height: `${day.count ? Math.max(15, day.count / recentMax * 100) : 12}%`, opacity: day.count ? .45 + .55 * day.count / recentMax : .12 }} />)}</div>
          </div>
          <div className="mt-6 flex justify-between border-t border-white/[0.09] pt-3 text-xs"><span className="text-[#a1a1aa]">Longest in this period</span><span className="font-medium">{activity.longest} {activity.longest === 1 ? "day" : "days"}</span></div>
        </> : <div className="mt-8"><Empty loading={!calendarFailed} /></div>}
      </section>

      <section className="min-w-0 rounded-[18px] border border-white/[0.11] bg-[#121214] p-5">
        <h4 className="flex items-center gap-2.5 text-base font-semibold"><BarChart3 size={17} className="text-[#367DFF]" /> Activity trend</h4>
        {activity ? <div className="mt-3"><Trend months={activity.months} /></div> : <div className="mt-8"><Empty loading={!calendarFailed} /></div>}
      </section>

      <section className="min-w-0 rounded-[18px] border border-white/[0.11] bg-[#121214] p-5">
        <h4 className="flex items-center gap-2.5 text-base font-semibold"><PieChart size={17} className="text-[#367DFF]" /> Top languages</h4>
        <p className="mt-1 text-[11px] text-[#a1a1aa]">Public repository languages · excluding forks and archived repos</p>
        {stats.languages?.length ? <div className="mt-3"><Languages languages={stats.languages} /></div> : <div className="mt-8"><Empty loading={!statsLoaded && !statsFailed} /></div>}
      </section>
    </div>
  </div>;
}
