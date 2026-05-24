import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import multer from "multer";
import type { SendMailOptions } from "nodemailer";
import fs from "fs";
import path from "path";

const envPath = ["server/.env", ".env", "../.env", "../../.env"]
  .map((candidate) => path.resolve(process.cwd(), candidate))
  .find((candidate) => fs.existsSync(candidate));

dotenv.config(envPath ? { path: envPath } : undefined);

const PORT = Number(process.env.PORT) || 3001;

const brand = {
  name: process.env.COMPANY_NAME || "softwer.dev",
  tagline: process.env.COMPANY_TAGLINE || "Custom software for growing businesses",
  email: process.env.COMPANY_EMAIL || process.env.MAIL_USER || "",
  phone: process.env.COMPANY_PHONE || "",
  location: process.env.COMPANY_LOCATION || "",
  website: process.env.COMPANY_WEBSITE || "https://softwer.dev",
  logoUrl: process.env.COMPANY_LOGO_URL || "",
};

const adminEmail = process.env.MAIL_TO || process.env.MAIL_USER || brand.email;
const requiredEnv = ["MAIL_USER", "MAIL_PASS"] as const;

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  pool: true,
  maxConnections: 1,
  maxMessages: 100,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const isLocalDevOrigin = (origin: string) => /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const isAllowedOrigin = (origin: string) => configuredOrigins.includes(origin) || (process.env.NODE_ENV !== "production" && isLocalDevOrigin(origin));

const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const normalizeField = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const logoPath = ["../src/assets/icon.png", "../src/assets/softwer.dev.png", "src/assets/softwer.dev.png", "src/assets/icon.png"]
  .map((candidate) => path.resolve(process.cwd(), candidate))
  .find((candidate) => fs.existsSync(candidate));

const logoAttachment = logoPath
  ? {
      filename: path.basename(logoPath),
      path: logoPath,
      cid: "softwer-logo",
    }
  : undefined;

const renderBrandDetails = () =>
  [
    `<a href="${escapeHtml(brand.website)}" style="color:#0f766e;text-decoration:none;">${escapeHtml(brand.website.replace(/^https?:\/\//, ""))}</a>`,
    brand.email ? `<a href="mailto:${escapeHtml(brand.email)}" style="color:#0f766e;text-decoration:none;">${escapeHtml(brand.email)}</a>` : "",
    brand.phone ? `<span>${escapeHtml(brand.phone)}</span>` : "",
    brand.location ? `<span>${escapeHtml(brand.location)}</span>` : "",
  ]
    .filter(Boolean)
    .join('<span style="color:#a1a1aa;"> · </span>');

const renderEmailLayout = ({ title, preview, children }: { title: string; preview: string; children: string }) => `
  <!doctype html>
  <html>
    <body style="margin:0;background:#f5f5f4;color:#18181b;font-family:Arial,Helvetica,sans-serif;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preview}</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f4;padding:28px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #e7e5e4;border-radius:10px;overflow:hidden;">
              <tr>
                <td style="background:#09090b;padding:24px 28px;color:#ffffff;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="vertical-align:middle;">
                        ${
                          brand.logoUrl || logoAttachment
                            ? `<img src="${brand.logoUrl ? escapeHtml(brand.logoUrl) : "cid:softwer-logo"}" alt="softwer.dev" width="44" height="44" style="display:inline-block;vertical-align:middle;border-radius:8px;margin-right:12px;" />`
                            : ""
                        }
                        <span style="display:inline-block;vertical-align:middle;">
                          <strong style="display:block;font-size:20px;line-height:24px;">${escapeHtml(brand.name)}</strong>
                          <span style="display:block;color:#d4d4d8;font-size:13px;line-height:18px;">${escapeHtml(brand.tagline)}</span>
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:30px 28px;">
                  <h1 style="margin:0 0 18px;font-size:26px;line-height:34px;color:#18181b;">${title}</h1>
                  ${children}
                </td>
              </tr>
              <tr>
                <td style="border-top:1px solid #e7e5e4;background:#fafaf9;padding:22px 28px;color:#52525b;font-size:13px;line-height:21px;">
                  <strong style="display:block;color:#18181b;margin-bottom:5px;">${escapeHtml(brand.name)}</strong>
                  <span>${escapeHtml(brand.tagline)}</span>
                  <div style="margin-top:10px;">${renderBrandDetails()}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

const renderDetailTable = (rows: Array<[string, string]>) => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:22px 0;border:1px solid #e7e5e4;border-radius:8px;overflow:hidden;">
    ${rows
      .map(
        ([label, value]) => `
          <tr>
            <td style="width:34%;padding:12px 14px;background:#fafaf9;border-bottom:1px solid #e7e5e4;color:#52525b;font-size:13px;font-weight:bold;">${label}</td>
            <td style="padding:12px 14px;border-bottom:1px solid #e7e5e4;color:#18181b;font-size:14px;">${value}</td>
          </tr>
        `,
      )
      .join("")}
  </table>
`;

const allowedAttachmentTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!allowedAttachmentTypes.has(file.mimetype)) {
      callback(new Error("Unsupported attachment type."));
      return;
    }

    callback(null, true);
  },
});

const buildAttachments = (file?: Express.Multer.File) => [
  ...(logoAttachment && !brand.logoUrl ? [logoAttachment] : []),
  ...(file
    ? [
        {
          filename: file.originalname,
          content: file.buffer,
        },
      ]
    : []),
];

const contactAttempts = new Map<string, { count: number; resetAt: number }>();

const contactRateLimit = (req: Request, res: Response, next: NextFunction) => {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const attempt = contactAttempts.get(key);

  if (!attempt || attempt.resetAt <= now) {
    contactAttempts.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 });
    next();
    return;
  }

  if (attempt.count >= 5) {
    return res.status(429).json({ error: "Too many messages. Please try again later." });
  }

  attempt.count += 1;
  next();
};

const app = express();

app.set("trust proxy", 1);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json());

app.post("/api/contact", contactRateLimit, upload.single("file"), async (req: Request, res: Response) => {
  const name = normalizeField(req.body.name);
  const email = normalizeField(req.body.email);
  const company = normalizeField(req.body.company);
  const projectType = normalizeField(req.body.projectType);
  const budget = normalizeField(req.body.budget);
  const timeline = normalizeField(req.body.timeline);
  const message = normalizeField(req.body.message);
  const file = req.file;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  try {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company || "Not provided");
    const safeProjectType = escapeHtml(projectType || "Not provided");
    const safeBudget = escapeHtml(budget || "Not provided");
    const safeTimeline = escapeHtml(timeline || "Not provided");
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
    const projectDetails = renderDetailTable([
      ["Name", safeName],
      ["Email", safeEmail],
      ["Company", safeCompany],
      ["Project type", safeProjectType],
      ["Budget", safeBudget],
      ["Timeline", safeTimeline],
    ]);

    const adminMail: SendMailOptions = {
      from: `"Contact Form" <${process.env.MAIL_USER}>`,
      replyTo: email,
      to: adminEmail,
      subject: `New Project Enquiry: ${safeProjectType}`,
      html: renderEmailLayout({
        title: "New project enquiry",
        preview: `${safeName} submitted a ${safeProjectType} enquiry.`,
        children: `
          <p style="margin:0 0 16px;color:#3f3f46;font-size:15px;line-height:24px;">A new project enquiry was submitted through the website.</p>
          ${projectDetails}
          <h2 style="margin:24px 0 10px;font-size:18px;line-height:26px;color:#18181b;">Project details</h2>
          <div style="padding:16px;border-left:4px solid #0f766e;background:#f0fdfa;color:#134e4a;font-size:15px;line-height:24px;">${safeMessage}</div>
        `,
      }),
      attachments: buildAttachments(file),
    };

    const clientMail: SendMailOptions = {
      from: `"softwer.dev" <${process.env.MAIL_USER}>`,
      replyTo: `${adminEmail}`,
      to: email,
      subject: "We received your project enquiry",
      html: renderEmailLayout({
        title: "We received your project enquiry",
        preview: `Thanks for contacting ${brand.name}. We will review your project details shortly.`,
        children: `
          <p style="margin:0 0 16px;color:#3f3f46;font-size:15px;line-height:24px;">Hi ${safeName},</p>
          <p style="margin:0 0 16px;color:#3f3f46;font-size:15px;line-height:24px;">
            Thanks for reaching out to <strong>${escapeHtml(brand.name)}</strong>. We have received your project enquiry and will review the details shortly.
          </p>
          <p style="margin:0 0 12px;color:#3f3f46;font-size:15px;line-height:24px;">Here is a copy of what you sent:</p>
          ${projectDetails}
          <div style="padding:16px;border-left:4px solid #0f766e;background:#f0fdfa;color:#134e4a;font-size:15px;line-height:24px;">${safeMessage}</div>
          <p style="margin:22px 0 0;color:#3f3f46;font-size:15px;line-height:24px;">Cheers,<br />The ${escapeHtml(brand.name)} Team</p>
        `,
      }),
      attachments: buildAttachments(file),
    };

    console.log(`Sending email to admin....`);
    await transporter.sendMail(adminMail);
    console.log(`Sending email to client....`);
    try {
      await transporter.sendMail(clientMail);
    } catch (clientMailError) {
      console.error("Client confirmation email failed:", clientMailError);
    }

    res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

app.get("/api", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello" });
});

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  void _next;
  console.error("API Error:", error);
  res.status(500).json({ error: error.message || "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
  console.log(`Loaded env from ${envPath || "default environment"}`);
  console.log("Email provider: gmail");
});
