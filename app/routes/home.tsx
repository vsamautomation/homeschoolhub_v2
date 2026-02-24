import type { Route } from "./+types/home";
import { data } from "react-router";
import nodemailer from "nodemailer";
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

  const firstName = get("firstName");
  const lastName  = get("lastName");
  const email     = get("email");
  const phone     = get("phone");
  const gradeLevel = get("gradeLevel");
  const location  = get("location");
  const message   = get("message");

  if (!firstName || !email || !message) {
    return data(
      { ok: false, error: "First name, email and message are required." },
      { status: 400 }
    );
  }

  const port = Number(process.env.SMTP_PORT ?? 587);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"HomeschoolHub Website" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO ?? "info@homeschoolhub.co.ke",
      replyTo: email,
      subject: `New Consultation Request – ${firstName} ${lastName}`,
      html: `
        <h2>New Free Consultation Request</h2>
        <table cellpadding="6">
          <tr><td><strong>Name</strong></td><td>${firstName} ${lastName}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone || "—"}</td></tr>
          <tr><td><strong>Grade Level</strong></td><td>${gradeLevel || "—"}</td></tr>
          <tr><td><strong>Location</strong></td><td>${location || "—"}</td></tr>
        </table>
        <h3>Message</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return data({ ok: true });
  } catch (err) {
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
        smtpPort: port,
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
