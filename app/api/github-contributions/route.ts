import type { Contribution } from "@/components/GitHubHeatmap";

const username = "Sarthak-madan334";
export const dynamic = "force-dynamic";

function dateWindow(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  const firstDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 4, 1)).toISOString().slice(0, 10);
  return { firstDate, today };
}

function parsePublicCalendar(markup: string): Contribution[] {
  const days: Contribution[] = [];
  const cells = /<td\b([^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*)><\/td>\s*<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g;
  let match: RegExpExecArray | null;
  while ((match = cells.exec(markup)) !== null) {
    const [, attributes, date, tooltipAttributes, text] = match;
    if (attributes.match(/\bid="([^"]+)"/)?.[1] !== tooltipAttributes.match(/\bfor="([^"]+)"/)?.[1]) continue;
    const tooltip = text.replace(/<[^>]*>/g, "").trim();
    const count = /no contributions/i.test(tooltip) ? 0 : Number(tooltip.match(/([\d,]+)\s+contributions?/i)?.[1].replace(/,/g, ""));
    if (Number.isFinite(count)) days.push({ date, count });
  }
  return days;
}

async function graphQLCalendar(firstDate: string, today: string, token: string) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "sarthak-portfolio" },
    body: JSON.stringify({
      query: `query Activity($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) { contributionsCollection(from: $from, to: $to) {
          contributionCalendar { weeks { contributionDays { date contributionCount } } }
        } }
      }`,
      variables: { login: username, from: `${firstDate}T00:00:00Z`, to: `${today}T23:59:59Z` },
    }),
    next: { revalidate: 300 }, signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`GitHub GraphQL unavailable (${response.status})`);
  const body = await response.json();
  if (body.errors?.length) throw new Error("GitHub GraphQL returned errors");
  const collection = body.data?.user?.contributionsCollection;
  const weeks = collection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) throw new Error("Invalid GitHub calendar");
  const contributions = weeks.flatMap((week: { contributionDays?: { date: string; contributionCount: number }[] }) => week.contributionDays ?? [])
    .filter((day: { date: string; contributionCount: number }) => typeof day.date === "string" && Number.isInteger(day.contributionCount))
    .map((day: { date: string; contributionCount: number }) => ({ date: day.date, count: day.contributionCount }));
  return { contributions };
}

export async function GET() {
  try {
    const { firstDate, today } = dateWindow();
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      try {
        const data = await graphQLCalendar(firstDate, today, token);
        return Response.json({ ...data, firstDate, today }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300" } });
      } catch (error) {
        console.error("GitHub GraphQL calendar failed; trying public calendar", error);
      }
    }
    const response = await fetch(`https://github.com/users/${username}/contributions?to=${today}`, {
      headers: { Accept: "text/html", "User-Agent": "sarthak-portfolio" },
      next: { revalidate: 300 }, signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`GitHub calendar unavailable (${response.status})`);
    const contributions = parsePublicCalendar(await response.text()).filter(day => day.date >= firstDate && day.date <= today);
    if (!contributions.length) throw new Error("GitHub returned no contribution days");
    return Response.json({ contributions, firstDate, today }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300" } });
  } catch (error) {
    console.error("Failed to load GitHub contribution data", error);
    return Response.json({ error: "GitHub activity is temporarily unavailable." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
