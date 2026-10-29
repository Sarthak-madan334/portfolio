import type { GitHubDayActivity, GitHubDayItem } from "@/lib/github-day";

const username = "Sarthak-madan334";

type SearchResponse<T> = {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
};

type CommitResult = {
  html_url: string;
  commit: { message: string };
  repository: { full_name: string };
};

type IssueResult = {
  html_url: string;
  title: string;
  repository_url: string;
  pull_request?: unknown;
};

function indiaToday() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date()).map(({ type, value }) => [type, value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function isValidGitHubDayDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const today = indiaToday();
  const firstDate = new Date(`${today}T00:00:00Z`);
  firstDate.setUTCMonth(firstDate.getUTCMonth() - 5, 1);
  const parsedDate = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString().slice(0, 10) === date &&
    date >= firstDate.toISOString().slice(0, 10) && date <= today;
}

async function search<T>(path: string, query: string, revalidate: number): Promise<SearchResponse<T>> {
  const url = new URL(`https://api.github.com/search/${path}`);
  url.searchParams.set("q", query);
  url.searchParams.set("per_page", "100");

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "sarthak-portfolio",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: { revalidate },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`GitHub search unavailable (${response.status})`);
  return response.json() as Promise<SearchResponse<T>>;
}

export async function getGitHubDayActivity(date: string): Promise<GitHubDayActivity> {
  if (!isValidGitHubDayDate(date)) throw new RangeError("Invalid activity date");
  const revalidate = date === indiaToday() ? 300 : 3600;
  const [commits, issues] = await Promise.all([
    search<CommitResult>("commits", `author:${username} committer-date:${date}`, revalidate),
    search<IssueResult>("issues", `author:${username} created:${date}`, revalidate),
  ]);

  const items: GitHubDayItem[] = [
    ...commits.items.map(item => ({
      kind: "commit" as const,
      repository: item.repository.full_name,
      title: item.commit.message.split("\n", 1)[0].slice(0, 180),
      url: item.html_url,
    })),
    ...issues.items.map(item => ({
      kind: item.pull_request ? "pull-request" as const : "issue" as const,
      repository: item.repository_url.split("/repos/")[1] ?? "GitHub",
      title: item.title.slice(0, 180),
      url: item.html_url,
    })),
  ].sort((a, b) => a.repository.localeCompare(b.repository));

  return {
    date,
    items,
    totalFound: commits.total_count + issues.total_count,
    incomplete: commits.incomplete_results || issues.incomplete_results ||
      commits.total_count > commits.items.length || issues.total_count > issues.items.length,
  };
}
