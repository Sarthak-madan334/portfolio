import type { GitHubStats } from "@/lib/github-stats";

const username = "Sarthak-madan334";
type Repository = { name: string; fork: boolean; archived: boolean };

async function readJson(url: string) {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "sarthak-portfolio", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    next: { revalidate: 3600 }, signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`GitHub stats unavailable (${response.status})`);
  return response.json();
}

async function repositoryStats(): Promise<GitHubStats> {
  const repositories: Repository[] = [];
  for (let page = 1; ; page++) {
    const batch = await readJson(`https://api.github.com/users/${username}/repos?type=owner&per_page=100&page=${page}`);
    if (!Array.isArray(batch) || !batch.every(repo => typeof repo.name === "string" && typeof repo.fork === "boolean" && typeof repo.archived === "boolean")) throw new Error("Invalid repository data");
    repositories.push(...batch.filter(repo => !repo.fork && !repo.archived));
    if (batch.length < 100) break;
  }
  const result: GitHubStats = { projectCount: repositories.length };
  if (!repositories.length) return result;
  const requests = await Promise.allSettled(repositories.map(repo => readJson(`https://api.github.com/repos/${username}/${encodeURIComponent(repo.name)}/languages`)));
  if (!requests.every(item => item.status === "fulfilled" && item.value && typeof item.value === "object" && !Array.isArray(item.value)
    && Object.values(item.value).every(bytes => typeof bytes === "number"))) return result;
  const totals = new Map<string, number>();
  for (const item of requests as PromiseFulfilledResult<Record<string, number>>[]) {
    for (const [name, bytes] of Object.entries(item.value)) if (Number.isFinite(bytes) && bytes > 0) totals.set(name, (totals.get(name) ?? 0) + bytes);
  }
  const sorted = Array.from(totals).sort((a, b) => b[1] - a[1]);
  const total = sorted.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (!total) return result;
  const top = sorted.slice(0, 4).map(([name, bytes]) => ({ name, percentage: Math.round(bytes / total * 1000) / 10 }));
  const rest = sorted.slice(4).reduce((sum, [, bytes]) => sum + bytes, 0);
  result.languages = rest ? [...top, { name: "Other", percentage: Math.round(rest / total * 1000) / 10 }] : top;
  result.language = top[0];
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
  return Response.json(stats, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } });
}
