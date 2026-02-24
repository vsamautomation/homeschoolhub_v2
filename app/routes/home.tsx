import type { Route } from "./+types/home";
import { data } from "react-router";
import nodemailer from "nodemailer";
import {
  insertContactSubmission,
  updateContactSubmissionMailStatus,
} from "~/utils/contact-submissions.server";
import { logError } from "~/utils/logger.server";
import Navbar from "~/components/Navbar";
import HeroSection from "~/components/HeroSection";
import WhyUsSection from "~/components/WhyUsSection";
import WhatWeOfferSection from "~/components/WhatWeOfferSection";
import HowToGetStartedSection from "~/components/HowToGetStartedSection";
import ContactSection from "~/components/ContactSection";
import Footer from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "HomeschoolHub — Empowering Kenyan Families" },
    {
      name: "description",
      content:
        "Give your child a world-class education tailored to their unique learning style. CBC-aligned curriculum for Kenyan homeschooling families.",
    },
  ];
}

export async function action({ request }: Route.ActionArgs) {
  const fd = await request.formData();
  const get = (k: string) => (fd.get(k) as string | null)?.trim() ?? "";
  const parseEmailList = (value?: string) =>
    value
      ?.split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  const parseBoolean = (value: string | undefined, fallback: boolean) => {
    if (value == null) return fallback;
    return ["1", "true", "yes", "on"].includes(value.toLowerCase());
  };
  const parsePort = (value: string | undefined, fallback: number) => {
    const parsed = Number.parseInt(value ?? "", 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  };
  const toErrorMessage = (err: unknown) =>
    err instanceof Error ? err.message : String(err);

  const firstName = get("firstName");
  const lastName = get("lastName");
  const email = get("email");
  const phone = get("phone");
  const gradeLevel = get("gradeLevel");
  const location = get("location");
  const message = get("message");

  if (!firstName || !email || !message) {
    return data(
      { ok: false, error: "First name, email and message are required." },
      { status: 400 }
    );
  }

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const safeFirstName = escapeHtml(firstName);
  const safeLastName = escapeHtml(lastName);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "—");
  const safeGrade = escapeHtml(gradeLevel || "—");
  const safeLocation = escapeHtml(location || "—");
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");
  const baseUrl = process.env.PUBLIC_BASE_URL?.replace(/\/+$/, "");
  const logoUrlRaw =
    process.env.EMAIL_LOGO_URL ??
    (baseUrl ? `${baseUrl}/optimized/logo-128.jpg` : "");
  const safeLogoUrl = logoUrlRaw ? escapeHtml(logoUrlRaw) : "";

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const smtpFrom = (process.env.SMTP_FROM ?? smtpUser)?.trim();
  const smtpTo = (process.env.SMTP_TO ?? "info@homeschoolhub.co.ke").trim();
  const smtpPort = parsePort(process.env.SMTP_PORT, 587);
  const smtpSecure = parseBoolean(process.env.SMTP_SECURE, smtpPort === 465);
  const cc = parseEmailList(process.env.SMTP_CC);
  const bcc = parseEmailList(process.env.SMTP_BCC);

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    undefined;
  const userAgent = request.headers.get("user-agent")?.trim() || undefined;

  let submissionId: number | null = null;

  try {
    submissionId = await insertContactSubmission({
      firstName,
      lastName,
      email,
      phone,
      gradeLevel,
      location,
      message,
      ipAddress,
      userAgent,
    });
  } catch (err) {
    await logError({
      scope: "analytics.save",
      message: "Failed to save contact submission",
      error: err,
      context: {
        firstName,
        lastName,
        email,
        gradeLevel: gradeLevel || undefined,
        location: location || undefined,
        hasPhone: Boolean(phone),
        ipAddress,
      },
    });
  }

  const missingConfig: string[] = [];
  if (!smtpHost) missingConfig.push("SMTP_HOST");
  if (!smtpUser) missingConfig.push("SMTP_USER");
  if (!smtpPass) missingConfig.push("SMTP_PASS");
  if (!smtpFrom) missingConfig.push("SMTP_FROM (or SMTP_USER)");

  if (missingConfig.length > 0) {
    if (submissionId !== null) {
      try {
        await updateContactSubmissionMailStatus({
          id: submissionId,
          status: "failed",
          mailError: `Missing SMTP config: ${missingConfig.join(", ")}`,
        });
      } catch (statusErr) {
        await logError({
          scope: "analytics.update",
          message: "Failed to update submission mail status after SMTP config error",
          error: statusErr,
          context: { submissionId },
        });
      }
    }

    await logError({
      scope: "mail.config",
      message: "Missing SMTP configuration",
      context: {
        missing: missingConfig,
      },
    });

    return data(
      { ok: false, error: "Mail service is not configured on the server yet." },
      { status: 500 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls:
        process.env.SMTP_TLS_REJECT_UNAUTHORIZED === "false"
          ? { rejectUnauthorized: false }
          : undefined,
    });

    const subject = `New Consultation Request – ${firstName} ${lastName}`;
    const preheader = "New consultation request from the website.";

    const logoCell = safeLogoUrl
      ? `
        <td style="padding:0 12px 0 0;vertical-align:middle;">
          <img src="${safeLogoUrl}" alt="HomeschoolHub" width="40" height="40" style="display:block;border-radius:8px;">
        </td>
      `
      : "";

    const html = `
      <div style="background:#f6f7fb;padding:24px 12px;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;font-family:Arial, Helvetica, sans-serif;color:#0b1f3a;">
          <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:#f6f7fb;">
            ${preheader}
          </div>
          <div style="background:#0b1f3a;color:#ffd447;padding:18px 24px;">
            <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;border-collapse:collapse;">
              <tr>
                ${logoCell}
                <td style="vertical-align:middle;">
                  <div style="font-size:18px;font-weight:700;">HomeschoolHub</div>
                  <div style="font-size:13px;opacity:0.9;">New consultation request</div>
                </td>
              </tr>
            </table>
          </div>
          <div style="padding:24px;">
            <h2 style="margin:0 0 12px 0;font-size:20px;color:#0b1f3a;">Request Details</h2>
            <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;color:#6b7280;width:140px;">Name</td>
                <td style="padding:8px 0;color:#111827;font-weight:600;">${safeFirstName} ${safeLastName}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;">Email</td>
                <td style="padding:8px 0;color:#111827;font-weight:600;">${safeEmail}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;">Phone</td>
                <td style="padding:8px 0;color:#111827;font-weight:600;">${safePhone}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;">Grade Level</td>
                <td style="padding:8px 0;color:#111827;font-weight:600;">${safeGrade}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280;">Location</td>
                <td style="padding:8px 0;color:#111827;font-weight:600;">${safeLocation}</td>
              </tr>
            </table>

            <div style="margin-top:18px;padding-top:18px;border-top:1px solid #e5e7eb;">
              <h3 style="margin:0 0 8px 0;font-size:16px;color:#0b1f3a;">Message</h3>
              <p style="margin:0;color:#111827;line-height:1.6;">${safeMessage}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const text = [
      "New Consultation Request",
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      `Grade Level: ${gradeLevel || "—"}`,
      `Location: ${location || "—"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    await transporter.sendMail({
      from: `"HomeschoolHub Website" <${smtpFrom}>`,
      to: smtpTo,
      cc: cc && cc.length > 0 ? cc : undefined,
      bcc: bcc && bcc.length > 0 ? bcc : undefined,
      replyTo: email,
      subject,
      text,
      html,
    });

    if (submissionId !== null) {
      try {
        await updateContactSubmissionMailStatus({
          id: submissionId,
          status: "sent",
        });
      } catch (statusErr) {
        await logError({
          scope: "analytics.update",
          message: "Failed to mark submission mail status as sent",
          error: statusErr,
          context: { submissionId },
        });
      }
    }

    return data({ ok: true });
  } catch (err) {
    if (submissionId !== null) {
      try {
        await updateContactSubmissionMailStatus({
          id: submissionId,
          status: "failed",
          mailError: toErrorMessage(err),
        });
      } catch (statusErr) {
        await logError({
          scope: "analytics.update",
          message: "Failed to mark submission mail status as failed",
          error: statusErr,
          context: { submissionId },
        });
      }
    }

    console.error("Email send error:", err);
    await logError({
      scope: "mail.send",
      message: "Failed to send contact email",
      error: err,
      context: {
        firstName,
        lastName,
        email,
        gradeLevel: gradeLevel || undefined,
        location: location || undefined,
        hasPhone: Boolean(phone),
        smtpHostSet: Boolean(process.env.SMTP_HOST),
        smtpUserSet: Boolean(process.env.SMTP_USER),
        smtpPassSet: Boolean(process.env.SMTP_PASS),
        smtpPort,
        smtpSecure,
        submissionId,
      },
    });

    return data(
      { ok: false, error: "Failed to send. Please try again or call us directly." },
      { status: 500 }
    );
  }
}

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute top-0 inset-x-0 z-20">
        <Navbar />
      </div>
      <HeroSection />
      <WhyUsSection />
      <WhatWeOfferSection />
      <HowToGetStartedSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
