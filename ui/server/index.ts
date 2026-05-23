import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import multer from "multer";
import type { SendMailOptions } from "nodemailer";
import fs from "fs";
import path from "path";

const envPath = ["../../.env", "../.env", ".env", "server/.env"]
  .map((candidate) => path.resolve(process.cwd(), candidate))
  .find((candidate) => fs.existsSync(candidate));

dotenv.config(envPath ? { path: envPath } : undefined);

const requiredEnv = ["MAIL_USER", "MAIL_PASS"] as const;
for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const PORT = Number(process.env.PORT) || 3001;
const isLocalDevOrigin = (origin: string) => /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const isAllowedOrigin = (origin: string) => configuredOrigins.includes(origin) || (process.env.NODE_ENV !== "production" && isLocalDevOrigin(origin));

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const normalizeField = (value: unknown) => (typeof value === "string" ? value.trim() : "");

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
  })
);
app.use(express.json());

app.post("/api/contact", contactRateLimit, upload.single("file"), async (req: Request, res: Response) => {
  const name = normalizeField(req.body.name);
  const email = normalizeField(req.body.email);
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
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const adminMail: SendMailOptions = {
      from: `"Contact Form" <${process.env.MAIL_USER}>`,
      replyTo: email,
      to: process.env.MAIL_USER,
      subject: "New Contact Message from Website",
      html: `<h3>From: ${safeName} (${safeEmail})</h3><p>${safeMessage}</p>`,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    };

    const clientMail: SendMailOptions = {
      from: `"softwer.dev" <${process.env.MAIL_USER}>`,
      replyTo: `${process.env.MAIL_USER}`,
      to: email,
      subject: "We received your message!",
      html: `
        <p>Hi ${safeName},</p>
        <p>Thanks for reaching out to <strong>softwer.dev</strong>. We’ve received your message and will get back to you shortly.</p>
        <p><em>Here’s a copy of what you sent:</em></p>
        <blockquote>${safeMessage}</blockquote>
        <p>Cheers,<br />The softwer.dev Team</p>
      `,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    };

    console.log(`Sending email to admin....`);
    await transporter.sendMail(adminMail);
    console.log(`Sending email to client....`);
    await transporter.sendMail(clientMail);

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
});
