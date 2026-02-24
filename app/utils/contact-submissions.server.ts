import mysql from "mysql2/promise";
import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export type MailDeliveryStatus = "pending" | "sent" | "failed";

export type ContactSubmissionInput = {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  gradeLevel?: string;
  location?: string;
  message: string;
  userAgent?: string;
  ipAddress?: string;
};

type DbConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
  ssl?: {
    rejectUnauthorized: boolean;
  };
};

let pool: Pool | null = null;

function parsePort(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseConnectionLimit(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (value == null) return fallback;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function getDbConfig(): DbConfig | null {
  const host = process.env.DB_HOST?.trim();
  const user = process.env.DB_USER?.trim();
  const database = process.env.DB_NAME?.trim();
  const password = process.env.DB_PASSWORD;

  if (!host || !user || !database || password == null) {
    return null;
  }

  const useSsl = parseBoolean(process.env.DB_SSL, false);

  return {
    host,
    port: parsePort(process.env.DB_PORT, 3306),
    user,
    password,
    database,
    connectionLimit: parseConnectionLimit(process.env.DB_CONNECTION_LIMIT, 10),
    ssl: useSsl
      ? {
          rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false",
        }
      : undefined,
  };
}

export function isDbConfigured() {
  return getDbConfig() !== null;
}

function getPool() {
  if (pool) return pool;

  const config = getDbConfig();

  if (!config) {
    throw new Error("Database configuration is missing. Set DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME.");
  }

  pool = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: config.connectionLimit,
    queueLimit: 0,
    ssl: config.ssl,
  });

  return pool;
}

function toMySqlDateTimeUtc(date: Date) {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

function toCount(value: unknown) {
  const count = Number(value ?? 0);
  return Number.isFinite(count) ? count : 0;
}

export async function insertContactSubmission(input: ContactSubmissionInput) {
  const db = getPool();

  const [result] = await db.execute<ResultSetHeader>(
    `
      INSERT INTO contact_submissions (
        first_name,
        last_name,
        email,
        phone,
        grade_level,
        location,
        message,
        user_agent,
        ip_address,
        mail_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `,
    [
      input.firstName,
      input.lastName || null,
      input.email,
      input.phone || null,
      input.gradeLevel || null,
      input.location || null,
      input.message,
      input.userAgent || null,
      input.ipAddress || null,
    ]
  );

  return result.insertId;
}

export async function updateContactSubmissionMailStatus(args: {
  id: number;
  status: Exclude<MailDeliveryStatus, "pending">;
  mailError?: string | null;
}) {
  const db = getPool();

  await db.execute<ResultSetHeader>(
    `
      UPDATE contact_submissions
      SET
        mail_status = ?,
        mail_error = ?,
        mail_sent_at = CASE WHEN ? = 'sent' THEN UTC_TIMESTAMP() ELSE mail_sent_at END
      WHERE id = ?
    `,
    [args.status, args.mailError ?? null, args.status, args.id]
  );
}

type SummaryRow = RowDataPacket & {
  total_submissions: number | string | null;
  total_sent: number | string | null;
  total_failed: number | string | null;
};

type DailyRow = RowDataPacket & {
  day: string;
  submissions: number | string;
  sent: number | string;
  failed: number | string;
};

type BreakdownRow = RowDataPacket & {
  label: string;
  total: number | string;
};

export async function getContactSubmissionAnalytics(days: number) {
  const db = getPool();
  const windowDays = Number.isFinite(days) ? Math.min(Math.max(Math.floor(days), 1), 365) : 30;
  const since = toMySqlDateTimeUtc(
    new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000)
  );

  const [summaryRows] = await db.query<SummaryRow[]>(
    `
      SELECT
        COUNT(*) AS total_submissions,
        SUM(CASE WHEN mail_status = 'sent' THEN 1 ELSE 0 END) AS total_sent,
        SUM(CASE WHEN mail_status = 'failed' THEN 1 ELSE 0 END) AS total_failed
      FROM contact_submissions
      WHERE created_at >= ?
    `,
    [since]
  );

  const [dailyRows] = await db.query<DailyRow[]>(
    `
      SELECT
        DATE_FORMAT(created_at, '%Y-%m-%d') AS day,
        COUNT(*) AS submissions,
        SUM(CASE WHEN mail_status = 'sent' THEN 1 ELSE 0 END) AS sent,
        SUM(CASE WHEN mail_status = 'failed' THEN 1 ELSE 0 END) AS failed
      FROM contact_submissions
      WHERE created_at >= ?
      GROUP BY DATE(created_at)
      ORDER BY day DESC
    `,
    [since]
  );

  const [gradeRows] = await db.query<BreakdownRow[]>(
    `
      SELECT
        COALESCE(NULLIF(grade_level, ''), 'Unknown') AS label,
        COUNT(*) AS total
      FROM contact_submissions
      WHERE created_at >= ?
      GROUP BY label
      ORDER BY total DESC
      LIMIT 10
    `,
    [since]
  );

  const [locationRows] = await db.query<BreakdownRow[]>(
    `
      SELECT
        COALESCE(NULLIF(location, ''), 'Unknown') AS label,
        COUNT(*) AS total
      FROM contact_submissions
      WHERE created_at >= ?
      GROUP BY label
      ORDER BY total DESC
      LIMIT 10
    `,
    [since]
  );

  const summary = summaryRows[0] ?? {
    total_submissions: 0,
    total_sent: 0,
    total_failed: 0,
  };

  const totalSubmissions = toCount(summary.total_submissions);
  const totalSent = toCount(summary.total_sent);
  const totalFailed = toCount(summary.total_failed);

  return {
    summary: {
      totalSubmissions,
      totalSent,
      totalFailed,
      failureRatePercent:
        totalSubmissions > 0
          ? Number(((totalFailed / totalSubmissions) * 100).toFixed(2))
          : 0,
    },
    daily: dailyRows.map((row) => ({
      day: row.day,
      submissions: toCount(row.submissions),
      sent: toCount(row.sent),
      failed: toCount(row.failed),
    })),
    byGradeLevel: gradeRows.map((row) => ({
      label: row.label,
      total: toCount(row.total),
    })),
    byLocation: locationRows.map((row) => ({
      label: row.label,
      total: toCount(row.total),
    })),
  };
}
