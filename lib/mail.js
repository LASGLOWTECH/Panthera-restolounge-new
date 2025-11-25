// lib/mail.js
import nodemailer from "nodemailer";

export async function sendNotificationEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Panthera Resto Lounge" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });

  console.log(`Notification email sent to ${to}`);
}
