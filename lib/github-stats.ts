export type GitHubStats = {
  pullRequestCount?: number;
  language?: { name: string; percentage: number };
};

export function calculateTopLanguage(repositories: Record<string, number>[]) {
  const totals = new Map<string, number>();
  for (const languages of repositories) {
    for (const [name, bytes] of Object.entries(languages)) {
      if (Number.isFinite(bytes) && bytes > 0) totals.set(name, (totals.get(name) ?? 0) + bytes);
    }
  }
  const sorted = Array.from(totals).sort((a, b) => b[1] - a[1]);
  const total = sorted.reduce((sum, [, bytes]) => sum + bytes, 0);
  return total ? { name: sorted[0][0], percentage: Math.round(sorted[0][1] / total * 100) } : undefined;
}
