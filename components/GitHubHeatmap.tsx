"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { GitHubDayActivity, GitHubDayItem } from "@/lib/github-day";
import styles from "./GitHubHeatmap.module.css";

export type Contribution = { date: string; count: number; level?: number };
type Day = { date: string; count: number; level: number; inRange: boolean };
const dayMs = 86_400_000;

function quartile(values: number[], fraction: number) {
  const position = (values.length - 1) * fraction;
  const lower = Math.floor(position);
  return values[lower] + (values[Math.ceil(position)] - values[lower]) * (position - lower);
}

export function buildWeeks(contributions: Contribution[], firstDate: string, today: string) {
  const first = new Date(`${firstDate}T00:00:00Z`);
  const last = new Date(`${today}T00:00:00Z`);
  const counts = new Map(contributions.map(({ date, count }) => [date, Math.max(0, count)]));
  const positive = contributions.filter(({ date, count }) => date >= firstDate && date <= today && count > 0)
    .map(({ count }) => count).sort((a, b) => a - b);
  const thresholds = positive.length ? [quartile(positive, .25), quartile(positive, .5), quartile(positive, .75)] : [0, 0, 0];
  const start = first.getTime() - first.getUTCDay() * dayMs;
  const end = last.getTime() + (6 - last.getUTCDay()) * dayMs;
  const weeks: Day[][] = [];
  for (let weekStart = start; weekStart <= end; weekStart += 7 * dayMs) {
    const week: Day[] = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(weekStart + day * dayMs).toISOString().slice(0, 10);
      const count = counts.get(date) ?? 0;
      const level = count === 0 ? 0 : count <= thresholds[0] ? 1 : count <= thresholds[1] ? 2 : count <= thresholds[2] ? 3 : 4;
      week.push({ date, count, level, inRange: date >= firstDate && date <= today });
    }
    weeks.push(week);
  }
  return weeks;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  });
}

function describe(day: Day) {
  return `${day.count === 0 ? "No contributions" : `${day.count} contribution${day.count === 1 ? "" : "s"}`} on ${formatDate(day.date)}`;
}

export function GitHubHeatmap({ contributions, firstDate, today, onCellSize }: {
  contributions: Contribution[];
  firstDate: string;
  today: string;
  onCellSize: (size: number) => void;
}) {
  const weeks = useMemo(() => buildWeeks(contributions, firstDate, today), [contributions, firstDate, today]);
  const months = useMemo(() => weeks.flatMap((week, column) => week.filter(day => day.inRange && day.date.endsWith("-01"))
    .map(day => ({ column, label: formatDate(day.date).slice(0, 3) }))), [weeks]);
  const host = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const cache = useRef(new Map<string, GitHubDayActivity>());
  const [active, setActive] = useState<Day | null>(null);
  const [details, setDetails] = useState<{ date: string; data: GitHubDayActivity | null; error: boolean } | null>(null);
  const detailsId = useId();
  const activeDate = active?.date;
  const activeCount = active?.count;

  useLayoutEffect(() => {
    const root = grid.current;
    const scroll = viewport.current;
    if (!root || !scroll) return;
    const measure = () => {
      const cell = root.querySelector<HTMLButtonElement>("button");
      if (cell) onCellSize(cell.getBoundingClientRect().width);
      if (window.matchMedia("(max-width: 639px)").matches) scroll.scrollLeft = scroll.scrollWidth;
      setActive(null);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [weeks, onCellSize]);

  useEffect(() => {
    if (!activeDate || !activeCount) return;
    const cached = cache.current.get(activeDate);
    if (cached) {
      setDetails({ date: activeDate, data: cached, error: false });
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(`/api/github-day?date=${activeDate}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Day details unavailable");
        const data = await response.json() as GitHubDayActivity;
        if (!controller.signal.aborted) {
          cache.current.set(activeDate, data);
          setDetails({ date: activeDate, data, error: false });
        }
      } catch {
        if (!controller.signal.aborted) setDetails({ date: activeDate, data: null, error: true });
      }
    }, 180);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [activeDate, activeCount]);

  const activity = details?.date === activeDate ? details?.data ?? null : null;
  const error = details?.date === activeDate && details?.error;
  const groups = new Map<string, GitHubDayItem[]>();
  for (const item of activity?.items ?? []) {
    const list = groups.get(item.repository) ?? [];
    list.push(item);
    groups.set(item.repository, list);
  }

  const graphStyle = { "--week-count": weeks.length, "--mobile-grid-width": `${weeks.length * 18 + (weeks.length - 1) * 4}px` } as CSSProperties;
  return (
    <div ref={host} className={styles.host}
      onMouseLeave={() => { if (!host.current?.contains(document.activeElement)) setActive(null); }}
      onBlurCapture={event => { if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setActive(null); }}
      onKeyDown={event => { if (event.key === "Escape") setActive(null); }}>
      <div ref={viewport} className={styles.viewport} role="region" aria-label="GitHub contributions over the last five months" onScroll={() => {
        const focused = document.activeElement;
        if (focused instanceof HTMLButtonElement && viewport.current?.contains(focused)) {
          const day = weeks.flat().find(item => item.date === focused.dataset.date);
          if (day) setActive(day);
        } else setActive(null);
      }}>
        <div className={styles.graph} style={graphStyle}>
          <div className={styles.months} aria-hidden="true">
            {months.map(({ column, label }) => <span key={label} style={{ gridColumn: column + 1 }}>{label}</span>)}
          </div>
          <div ref={grid} className={styles.grid}>
            {weeks.flat().map(day => day.inRange ? <button
              key={day.date}
              type="button"
              data-date={day.date}
              aria-label={describe(day)}
              aria-pressed={active?.date === day.date}
              aria-controls={active?.date === day.date ? detailsId : undefined}
              className={`${styles.cell} ${day.date === today ? styles.today : ""}`}
              style={{ backgroundColor: `var(--activity-level-${day.level})`, boxShadow: day.level === 0 ? "inset 0 0 0 1px rgba(255,255,255,.07)" : undefined }}
              onMouseEnter={() => setActive(day)}
              onFocus={() => setActive(day)}
              onClick={() => setActive(day)}
            /> : <span key={day.date} className={styles.placeholder} aria-hidden="true" />)}
          </div>
        </div>
      </div>
      {active && <section id={detailsId} className={styles.detailPanel} aria-label={`Activity on ${formatDate(active.date)}`}>
        <div className={styles.detailHeader}>
          <strong>{formatDate(active.date)}</strong>
          <span>{active.count === 0 ? "No contributions" : `${active.count} contribution${active.count === 1 ? "" : "s"}`}</span>
        </div>
        {active.count > 0 && <div aria-live="polite">
          {error ? <p className={styles.detailNote}>Public activity details are temporarily unavailable.</p>
            : !activity ? <p className={styles.detailNote}>Loading public activity...</p>
              : activity.items.length === 0 ? <p className={styles.detailNote}>No public commit, pull request, or issue details found for this day.</p>
                : <>
                  <p className={styles.detailNote}>
                    {activity.totalFound} public {activity.totalFound === 1 ? "update" : "updates"} across {groups.size} {groups.size === 1 ? "repository" : "repositories"}.
                    {activity.incomplete && " Showing the first 100 results per search."}
                  </p>
                  <div className={styles.detailList}>
                    {Array.from(groups.entries()).map(([repository, items]) => <div key={repository} className={styles.repoGroup}>
                      <p className={styles.repoName}>{repository}</p>
                      <ul>
                        {items.map(item => <li key={item.url}>
                          <span className={styles.itemKind}>{item.kind === "pull-request" ? "PR" : item.kind === "commit" ? "Commit" : "Issue"}</span>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                        </li>)}
                      </ul>
                    </div>)}
                  </div>
                </>}
        </div>}
      </section>}
    </div>
  );
}
