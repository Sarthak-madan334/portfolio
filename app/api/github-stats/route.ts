import { calculateTopLanguage } from "@/lib/github-stats";
import type { GitHubStats } from "@/lib/github-stats";

const username = "Sarthak-madan334";
type Repository = { name: string; fork: boolean };

async function readJson(url: string) {
  const response = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": "sarthak-portfolio" },
    next: { revalidate: 3600 },
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

export async function GET() {
  const results = await Promise.allSettled([repositoryStats(), pullRequestStats()]);
  const stats: GitHubStats = {};
  for (const result of results) if (result.status === "fulfilled") Object.assign(stats, result.value);
  return Response.json(stats, { headers: { "Cache-Control": "no-store" } });
}
