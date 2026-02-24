import fs from "node:fs/promises";
import path from "node:path";

type LogLevel = "error" | "warn" | "info";

type LogEntry = {
  ts: string;
  level: LogLevel;
  scope: string;
  message: string;
  context?: Record<string, unknown>;
  error?: Record<string, unknown>;
};

const LOG_DIR =
  process.env.LOG_DIR ?? path.join(process.cwd(), "logs");
const ERROR_LOG_FILE =
  process.env.ERROR_LOG_FILE ?? path.join(LOG_DIR, "error.log");

function normalizeError(err: unknown): Record<string, unknown> {
  if (err instanceof Error) {
    const anyErr = err as Error & {
      code?: string;
      response?: string;
      responseCode?: number;
      command?: string;
    };

    return {
      name: err.name,
      message: err.message,
      stack: err.stack,
      code: anyErr.code,
      response: anyErr.response,
      responseCode: anyErr.responseCode,
      command: anyErr.command,
    };
  }

  return { value: err };
}

export async function logError(
  entry: Omit<LogEntry, "ts" | "level" | "error"> & {
    level?: LogLevel;
    error?: unknown;
  }
) {
  const record: LogEntry = {
    ts: new Date().toISOString(),
    level: entry.level ?? "error",
    scope: entry.scope,
    message: entry.message,
    context: entry.context,
    error: entry.error ? normalizeError(entry.error) : undefined,
  };

  try {
    await fs.mkdir(LOG_DIR, { recursive: true });
    await fs.appendFile(ERROR_LOG_FILE, `${JSON.stringify(record)}\n`, "utf8");
  } catch (writeErr) {
    console.error("Failed to write error log:", writeErr);
    console.error("Original error:", record);
  }
}
