import { getGitHubDayActivity, isValidGitHubDayDate } from "@/lib/github-day-server";

export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date") ?? "";
  if (!isValidGitHubDayDate(date)) {
    return Response.json({ error: "Invalid activity date." }, { status: 400 });
  }

  try {
    return Response.json(await getGitHubDayActivity(date));
  } catch (error) {
    console.error("Failed to load GitHub day details", error);
    return Response.json({ error: "Public activity details are temporarily unavailable." }, { status: 502 });
  }
}
