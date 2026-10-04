"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { Github } from "lucide-react";
import { GitHubHeatmap } from "./GitHubHeatmap";
import type { Contribution } from "./GitHubHeatmap";
import styles from "./GitHubHeatmap.module.css";

const username = "Sarthak-madan334";

function getFiveMonthWindow() {
  const now = new Date();
  const firstDay = new Date(Date.UTC(now.getFullYear(), now.getMonth() - 4, 1));
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return { firstDate: firstDay.toISOString().slice(0, 10), today };
}

export function AboutGitHubActivity() {
  const [fiveMonthTotal, setFiveMonthTotal] = useState<number | null>(null);
  const [totalUnavailable, setTotalUnavailable] = useState(false);
  const [activity, setActivity] = useState<{ contributions: Contribution[]; firstDate: string; today: string } | null>(null);
  const [cellSize, setCellSize] = useState(18);

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
        const contributions = data.contributions as Contribution[] | undefined;
        if (!Array.isArray(contributions)) throw new Error("Contribution data unavailable");
        const count = contributions
          .filter(({ date }) => date >= firstDate && date <= today)
          .reduce((total, item) => total + item.count, 0);
        if (!controller.signal.aborted) {
          setFiveMonthTotal(count);
          setActivity({ contributions, firstDate, today });
        }
      } catch {
        if (!controller.signal.aborted) setTotalUnavailable(true);
      }
    }
    void loadTotal();
    return () => controller.abort();
  }, []);

  return (
    <div className={`about-github-activity ${styles.palette} relative w-full max-w-[520px] rounded-[25px] border border-white/[0.08] bg-[#151517] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:rounded-[28px]`}
      style={{ "--activity-cell-size": `${cellSize}px` } as CSSProperties}>
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

      {activity ? <GitHubHeatmap {...activity} onCellSize={setCellSize} /> : <div className="min-h-[140px] text-xs text-[#A1A1AA]" role="status">
        {totalUnavailable ? "GitHub activity is temporarily unavailable." : "Loading GitHub activity…"}
      </div>}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA]" aria-label="Contribution activity scale">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(level => <span key={level} aria-hidden="true" className={styles.legendCell}
            style={{ backgroundColor: `var(--activity-level-${level})`, boxShadow: level === 0 ? "inset 0 0 0 1px rgba(255,255,255,.07)" : undefined }} />)}
          <span>More</span>
        </div>
        <a href="https://github.com/Sarthak-madan334" target="_blank" rel="noopener noreferrer" className="text-xs text-[#A1A1AA] transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline">
          View on GitHub ↗
        </a>
      </div>
    </div>
  );
}
