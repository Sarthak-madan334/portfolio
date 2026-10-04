"use client";

import { cloneElement, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import dynamic from "next/dynamic";
import { Github } from "lucide-react";
import type { Activity, Props as CalendarProps } from "react-github-calendar";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then(({ GitHubCalendar }) => GitHubCalendar),
  { ssr: false, loading: () => <div className="h-[140px]" aria-hidden="true" /> },
);

const username = "Sarthak-madan334";
const accent = "#4C8DFF";
const blueScale: [string, string, string, string, string] = [
  "rgba(255,255,255,0.05)",
  "rgba(76,141,255,0.25)",
  "rgba(76,141,255,0.45)",
  "rgba(76,141,255,0.70)",
  accent,
];
const theme = { light: blueScale, dark: blueScale };

function getFiveMonthWindow() {
  const now = new Date();
  const firstDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 4, 1));
  const today = now.toISOString().slice(0, 10);
  return { firstDay, firstDate: firstDay.toISOString().slice(0, 10), today };
}

function selectLastFiveMonths(contributions: Activity[]) {
  const { firstDate, today } = getFiveMonthWindow();
  return contributions.filter(({ date }) => date >= firstDate && date <= today);
}

export function AboutGitHubActivity() {
  const [fiveMonthTotal, setFiveMonthTotal] = useState<number | null>(null);
  const [totalUnavailable, setTotalUnavailable] = useState(false);
  const [blockSize] = useState(16);
  const graphViewport = useRef<HTMLDivElement>(null);
  const { firstDay, today } = getFiveMonthWindow();

  useEffect(() => {
    const viewport = graphViewport.current;
    if (!viewport) return;
    const mobile = window.matchMedia("(max-width: 639px)");
    const scrollToLatest = () => {
      if (mobile.matches) viewport.scrollLeft = viewport.scrollWidth;
    };
    const sizeObserver = new ResizeObserver(scrollToLatest);
    const contentObserver = new MutationObserver(scrollToLatest);
    sizeObserver.observe(viewport);
    contentObserver.observe(viewport, { childList: true, subtree: true });
    return () => {
      sizeObserver.disconnect();
      contentObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const year = new Date().getUTCFullYear();
    async function loadTotal() {
      try {
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Contribution total unavailable");
        const data = await response.json();
        const { firstDate, today } = getFiveMonthWindow();
        const contributions = data.contributions as Activity[] | undefined;
        if (!Array.isArray(contributions)) throw new Error("Contribution data unavailable");
        const count = contributions
          .filter(({ date }) => date >= firstDate && date <= today)
          .reduce((total, activity) => total + activity.count, 0);
        if (!controller.signal.aborted) setFiveMonthTotal(count);
      } catch {
        if (!controller.signal.aborted) setTotalUnavailable(true);
      }
    }
    void loadTotal();
    return () => controller.abort();
  }, []);

  const renderBlock: CalendarProps["renderBlock"] = (block, activity) => {
    const date = new Date(`${activity.date}T00:00:00Z`);
    const offset = Math.floor((date.getTime() - firstDay.getTime()) / 86_400_000) + firstDay.getUTCDay();
    const column = Math.max(0, Math.floor(offset / 7));
    const isToday = activity.date === today;
    return cloneElement(block, {
      className: `${block.props.className ?? ""} about-github-cell`,
      style: {
        ...block.props.style,
        ...({ "--column-delay": `${column * 10}ms` } as CSSProperties),
        transformBox: "fill-box",
        transformOrigin: "center",
        transition: "transform 120ms ease, stroke 120ms ease",
        stroke: isToday ? accent : undefined,
        strokeWidth: isToday ? 1.5 : undefined,
        vectorEffect: "non-scaling-stroke",
      },
    });
  };

  return (
    <div className="about-github-activity relative w-full max-w-[520px] rounded-[25px] border border-white/[0.08] bg-[#151517] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:rounded-[28px]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="flex items-center gap-2 text-[13px] text-[#A1A1AA]">
          <Github size={16} aria-hidden="true" />
          <span>GitHub activity</span>
        </p>
        <p aria-live="polite" className="flex items-baseline gap-1.5">
          <span className="text-xl font-semibold leading-none text-white">
            {fiveMonthTotal === null ? (totalUnavailable ? "—" : "…") : fiveMonthTotal.toLocaleString("en-US")}
          </span>
          <span className="text-xs text-[#A1A1AA]">contributions in the last 5 months</span>
        </p>
      </div>

      <div ref={graphViewport} className="min-h-[140px] overflow-x-auto text-[11px] text-[#A1A1AA]" tabIndex={0} role="region" aria-label="GitHub contributions over the last five months">
        <GitHubCalendar
          username={username}
          year="last"
          transformData={selectLastFiveMonths}
          theme={theme}
          colorScheme="dark"
          blockSize={blockSize}
          blockMargin={4}
          blockRadius={4}
          fontSize={11}
          showTotalCount={false}
          showColorLegend={false}
          showMonthLabels
          showWeekdayLabels={false}
          renderBlock={renderBlock}
          tooltips={{
            activity: {
              text: ({ count, date }) => `${count} contributions on ${new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}`,
              offset: 8,
              withArrow: true,
            },
          }}
          errorMessage="GitHub activity is temporarily unavailable."
          style={{ color: "#A1A1AA", fontFamily: "inherit", width: "100%", maxWidth: "100%" }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA]" aria-label="Contribution activity scale">
          <span>Less</span>
          {blueScale.map((color, index) => <span key={index} aria-hidden="true" className="h-3 w-3 rounded-[4px]" style={{ backgroundColor: color }} />)}
          <span>More</span>
        </div>
        <a href="https://github.com/Sarthak-madan334" target="_blank" rel="noopener noreferrer" className="text-xs text-[#A1A1AA] transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline">
          View on GitHub ↗
        </a>
      </div>

      <style jsx global>{`
        .about-github-activity .react-activity-calendar__month-label { fill: #a1a1aa; font-size: 11px; }
        .about-github-activity .about-github-cell { animation: about-github-cell-in 180ms ease-out both; animation-delay: var(--column-delay, 0ms); transform-box: fill-box; }
        .about-github-activity .about-github-cell:hover { transform: scale(1.15); }
        .about-github-activity .react-activity-calendar__tooltip { z-index: 20; padding: 6px 9px; border: 1px solid rgba(255,255,255,.12); border-radius: 8px; background: #151517; color: #f4f4f5; font-size: 12px; }
        .about-github-activity .react-activity-calendar__tooltip .react-activity-calendar__tooltip-arrow { fill: #151517; }
        @keyframes about-github-cell-in { from { opacity: 0; } to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .about-github-activity .about-github-cell { animation: none; transition: none; } }
      `}</style>
    </div>
  );
}
