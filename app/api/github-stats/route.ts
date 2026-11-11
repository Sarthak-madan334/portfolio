import { calculateTopLanguage } from "@/lib/github-stats";
import type { GitHubStats } from "@/lib/github-stats";

const username = "Sarthak-madan334";
const commitBaseline = 585;
const commitBaselineAt = "2026-11-11T06:53:04Z";
type Repository = { name: string; fork: boolean };

async function readJson(url: string, revalidate = 3600, accept = "application/json") {
  const response = await fetch(url, {
    headers: { Accept: accept, "User-Agent": "sarthak-portfolio" },
    next: { revalidate },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`GitHub stats unavailable (${response.status})`);
  return response.json();
}

async function repositoryStats(): Promise<GitHubStats> {
  const repositories: Repository[] = [];
  for (let page = 1; ; page++) {
    const batch = await readJson(`https://api.github.com/users/${username}/repos?type=owner&per_page=100&page=${page}`);
    if (!Array.isArray(batch) || !batch.every(repo => typeof repo.name === "string" && typeof repo.fork === "boolean")) {
      throw new Error("Invalid repository data");
    }
    repositories.push(...batch.filter(repo => !repo.fork));
    if (batch.length < 100) break;
  }
  const result: GitHubStats = {};
  const languages = await Promise.allSettled(repositories.map(repo =>
    readJson(`https://api.github.com/repos/${username}/${encodeURIComponent(repo.name)}/languages`)));
  // A partial sample could misidentify the top language, so omit it if any request fails.
  if (languages.every(item => item.status === "fulfilled" && item.value && typeof item.value === "object"
    && !Array.isArray(item.value) && Object.values(item.value).every(bytes => typeof bytes === "number"))) {
    result.language = calculateTopLanguage(languages.map(item => (item as PromiseFulfilledResult<Record<string, number>>).value));
  }
  return result;
}

async function pullRequestStats(): Promise<GitHubStats> {
  const data = await readJson(`https://api.github.com/search/issues?q=author%3A${username}+is%3Apr&per_page=1`);
  if (!Number.isInteger(data.total_count) || data.total_count < 0) throw new Error("Invalid pull request data");
  return { pullRequestCount: data.total_count };
}

async function commitStats(): Promise<GitHubStats> {
  const events = await readJson(`https://api.github.com/users/${username}/events/public?per_page=100`, 60, "application/vnd.github+json");
  if (!Array.isArray(events)) throw new Error("Invalid GitHub event data");

  const commitShas = new Set<string>();
  const zeroSha = "0000000000000000000000000000000000000000";
  const pushes = events.filter(event => event?.type === "PushEvent"
    && typeof event.created_at === "string" && event.created_at > commitBaselineAt
    && typeof event.repo?.name === "string"
    && typeof event.payload?.before === "string" && typeof event.payload?.head === "string"
    && event.payload.head !== zeroSha);

  for (const event of pushes) {
    try {
      let before = event.payload.before;
      if (before === zeroSha) {
        const repository = await readJson(`https://api.github.com/repos/${event.repo.name}`, 3600, "application/vnd.github+json");
        if (typeof repository.default_branch !== "string") continue;
        before = repository.default_branch;
      }
      const comparison = await readJson(
        `https://api.github.com/repos/${event.repo.name}/compare/${before}...${event.payload.head}`,
        60,
        "application/vnd.github+json",
      );
      if (!Array.isArray(comparison.commits)) continue;
      for (const commit of comparison.commits) {
        if (typeof commit?.sha === "string") commitShas.add(commit.sha);
      }
    } catch {
      // Keep counting the pushes whose comparisons are available.
    }
  }

  return { commitCount: commitBaseline + commitShas.size };
}

export async function GET() {
  const results = await Promise.allSettled([repositoryStats(), pullRequestStats(), commitStats()]);
  const stats: GitHubStats = {};
  for (const result of results) if (result.status === "fulfilled") Object.assign(stats, result.value);
  return Response.json(stats, { headers: { "Cache-Control": "no-store" } });
}
