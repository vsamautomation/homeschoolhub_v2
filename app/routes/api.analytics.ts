import type { Route } from "./+types/api.analytics";
import { data } from "react-router";
import {
  getContactSubmissionAnalytics,
  isDbConfigured,
} from "~/utils/contact-submissions.server";
import { logError } from "~/utils/logger.server";

function parseDays(value: string | null) {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return 30;
  return Math.min(parsed, 365);
}

export async function loader({ request }: Route.LoaderArgs) {
  const analyticsKey = process.env.ANALYTICS_API_KEY?.trim();

  if (!analyticsKey) {
    return data(
      { ok: false, error: "Analytics endpoint is not configured." },
      { status: 404 }
    );
  }

  const url = new URL(request.url);
  const providedKey =
    request.headers.get("x-analytics-key")?.trim() ??
    url.searchParams.get("key")?.trim();

  if (!providedKey || providedKey !== analyticsKey) {
    return data({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  if (!isDbConfigured()) {
    return data(
      { ok: false, error: "Database is not configured." },
      { status: 500 }
    );
  }

  const days = parseDays(url.searchParams.get("days"));

  try {
    const analytics = await getContactSubmissionAnalytics(days);
    return data({ ok: true, windowDays: days, ...analytics });
  } catch (err) {
    await logError({
      scope: "analytics.query",
      message: "Failed to query contact analytics",
      error: err,
      context: { days },
    });

    return data({ ok: false, error: "Failed to load analytics." }, { status: 500 });
  }
}
