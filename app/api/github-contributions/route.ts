import type { Contribution } from "@/components/GitHubHeatmap";

const username = "Sarthak-madan334";
export const dynamic = "force-dynamic";

function fiveMonthWindow(now = new Date()) {
  const first = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 4, 1));
  return {
    firstDate: first.toISOString().slice(0, 10),
    today: now.toISOString().slice(0, 10),
  };
}

function parseContributions(markup: string): Contribution[] {
  const contributions: Contribution[] = [];
  const cells = /<td\b([^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*)><\/td>\s*<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g;

  let match: RegExpExecArray | null;
  while ((match = cells.exec(markup)) !== null) {
    const [, cellAttributes, date, tooltipAttributes, rawTooltip] = match;
    const id = cellAttributes.match(/\bid="([^"]+)"/)?.[1];
    const target = tooltipAttributes.match(/\bfor="([^"]+)"/)?.[1];
    if (!date || !id || id !== target) continue;

    const tooltip = rawTooltip.replace(/<[^>]*>/g, "").trim();
    const countMatch = tooltip.match(/([\d,]+)\s+contributions?/i);
    const count = /no contributions/i.test(tooltip) ? 0 : Number(countMatch?.[1].replace(/,/g, ""));
    if (Number.isFinite(count)) contributions.push({ date, count });
  }

  return contributions;
}

export async function GET() {
  try {
    const response = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: { Accept: "text/html", "User-Agent": "sarthak-portfolio" },
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`GitHub contributions unavailable (${response.status})`);

    const { firstDate, today } = fiveMonthWindow();
    const contributions = parseContributions(await response.text())
      .filter(({ date }) => date >= firstDate && date <= today);
    if (!contributions.length) throw new Error("GitHub returned no contribution days");

    return Response.json({ contributions, firstDate, today }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Failed to load GitHub contribution data", error);
    return Response.json({ error: "GitHub activity is temporarily unavailable." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
