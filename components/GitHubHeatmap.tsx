"use client";

import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./GitHubHeatmap.module.css";

export type Contribution = { date: string; count: number; level?: number };
type Day = { date: string; count: number; level: number; inRange: boolean };
type Tooltip = { day: Day; element: HTMLButtonElement };
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

function describe(day: Day) {
  const date = new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  });
  return `${day.count === 0 ? "No contributions" : `${day.count} contribution${day.count === 1 ? "" : "s"}`} on ${date}`;
}

export function GitHubHeatmap({ contributions, firstDate, today, onCellSize }: {
  contributions: Contribution[];
  firstDate: string;
  today: string;
  onCellSize: (size: number) => void;
}) {
  const weeks = useMemo(() => buildWeeks(contributions, firstDate, today), [contributions, firstDate, today]);
  const months = useMemo(() => weeks.flatMap((week, column) => week.filter(day => day.inRange && day.date.endsWith("-01"))
    .map(day => ({ column, label: new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) }))), [weeks]);
  const host = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const lastTip = useRef<Tooltip | null>(null);
  const [active, setActive] = useState<Tooltip | null>(null);
  const [position, setPosition] = useState({ left: 0, top: 0, arrow: 12, below: false });
  const tooltipId = useId();

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

  useLayoutEffect(() => {
    if (!active || !host.current || !tip.current) return;
    const root = host.current.getBoundingClientRect();
    const card = host.current.closest(".about-github-activity")?.getBoundingClientRect() ?? root;
    const cell = active.element.getBoundingClientRect();
    const tooltip = tip.current.getBoundingClientRect();
    const center = cell.left + cell.width / 2 - root.left;
    const left = Math.min(Math.max(0, center - tooltip.width / 2), Math.max(0, root.width - tooltip.width));
    let top = cell.top - root.top - tooltip.height - 9;
    const below = top + root.top < card.top + 8;
    if (below) top = cell.bottom - root.top + 9;
    top = Math.min(top, card.bottom - root.top - tooltip.height - 8);
    setPosition({ left, top, arrow: Math.max(8, Math.min(tooltip.width - 8, center - left)), below });
  }, [active]);

  function show(day: Day, element: HTMLButtonElement) {
    const next = { day, element };
    lastTip.current = next;
    setActive(next);
  }

  const graphStyle = { "--week-count": weeks.length, "--mobile-grid-width": `${weeks.length * 18 + (weeks.length - 1) * 4}px` } as CSSProperties;
  return (
    <div ref={host} className={styles.host}>
      <div ref={viewport} className={styles.viewport} role="region" aria-label="GitHub contributions over the last five months" onScroll={() => {
        const focused = document.activeElement;
        if (focused instanceof HTMLButtonElement && viewport.current?.contains(focused)) {
          const day = weeks.flat().find(item => item.date === focused.dataset.date);
          if (day) show(day, focused);
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
              tabIndex={0}
              data-date={day.date}
              aria-label={describe(day)}
              aria-describedby={active?.day.date === day.date ? tooltipId : undefined}
              className={`${styles.cell} ${day.date === today ? styles.today : ""}`}
              style={{ backgroundColor: `var(--activity-level-${day.level})`, boxShadow: day.level === 0 ? "inset 0 0 0 1px rgba(255,255,255,.07)" : undefined }}
              onMouseEnter={event => show(day, event.currentTarget)}
              onMouseLeave={event => { if (document.activeElement !== event.currentTarget) setActive(null); }}
              onFocus={event => show(day, event.currentTarget)}
              onBlur={() => setActive(null)}
              onKeyDown={event => { if (event.key === "Escape") setActive(null); }}
            /> : <span key={day.date} className={styles.placeholder} aria-hidden="true" />)}
          </div>
        </div>
      </div>
      <div ref={tip} id={tooltipId} role="tooltip" aria-hidden={!active} className={styles.tooltip} data-visible={!!active} data-below={position.below}
        style={{ left: position.left, top: position.top, "--arrow-left": `${position.arrow}px` } as CSSProperties}>
        {lastTip.current ? describe(lastTip.current.day) : ""}
        <span className={styles.arrow} aria-hidden="true" />
      </div>
    </div>
  );
}
