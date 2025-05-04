import express, { Request, Response } from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import multer from "multer";
import type { SendMailOptions } from "nodemailer";
import path from "path";

dotenv.config();
// dotenv.config({ path: path.resolve(__dirname, "../.env") });

const upload = multer({ storage: multer.memoryStorage() });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/contact", upload.single("file"), async (req: Request, res: Response) => {
  const { name, email, message } = req.body;
  const file = req.file;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  console.log("Resolved .env path:", path.resolve(__dirname, "../.env"));
  console.log("MAIL_USER:", process.env.MAIL_USER);
  console.log("MAIL_PASS:", process.env.MAIL_PASS ? "✔ loaded" : "✘ missing");

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // 🔹 Admin Notification
    const adminMail: SendMailOptions = {
      from: `"Contact Form" <${process.env.MAIL_TO}>`,
      replyTo: "info@softwer.dev",
      to: process.env.MAIL_USER,
      subject: "New Contact Message from Website",
      html: `<h3>From: ${name} (${email})</h3><p>${message}</p>`,
      attachments: file
        ? [
            {
              filename: file.originalname,
              content: file.buffer,
            },
          ]
        : [],
    };

    // 🔹 Client Confirmation
    const clientMail: SendMailOptions = {
      from: `"softwer.dev" <${process.env.MAIL_TO}>`,
      replyTo: "info@softwer.dev",
      to: email,
      bcc: process.env.MAIL_ADMIN,
      subject: "We received your message!",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out to <strong>softwer.dev</strong>. We’ve received your message and will get back to you shortly.</p>
        <p><em>Here’s a copy of what you sent:</em></p>
        <blockquote>${message}</blockquote>
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

    // 🔁 Send both
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

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
