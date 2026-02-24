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

function getLogConfig() {
  const logDir =
    process.env.LOG_DIR ?? path.join(process.cwd(), "logs");
  const errorLogFile =
    process.env.ERROR_LOG_FILE ?? path.join(logDir, "error.log");
  const logToConsole =
    process.env.LOG_TO_CONSOLE !== "false";
  const logToFile =
    process.env.LOG_TO_FILE !== "false";

  return { logDir, errorLogFile, logToConsole, logToFile };
}

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

  const { logDir, errorLogFile, logToConsole, logToFile } =
    getLogConfig();

  if (logToConsole) {
    const payload = {
      ts: record.ts,
      level: record.level,
      scope: record.scope,
      message: record.message,
      context: record.context,
      error: record.error,
    };
    const line = JSON.stringify(payload);

    if (record.level === "warn") {
      console.warn(line);
    } else if (record.level === "info") {
      console.log(line);
    } else {
      console.error(line);
    }
  }

  if (!logToFile) return;

  try {
    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(errorLogFile, `${JSON.stringify(record)}\n`, "utf8");
  } catch (writeErr) {
    console.error("Failed to write error log:", writeErr);
    console.error("Original error:", record);
  }
}
