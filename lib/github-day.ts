export type GitHubDayItem = {
  kind: "commit" | "pull-request" | "issue";
  repository: string;
  title: string;
  url: string;
};

export type GitHubDayActivity = {
  date: string;
  items: GitHubDayItem[];
  totalFound: number;
  incomplete: boolean;
};
