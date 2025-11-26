import nodemailer from "nodemailer";

export async function sendNotificationEmail(to, subject, message) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Panthera Lounge" <${process.env.MAIL_USER}>`,
    to,
    subject,
    text: message,
  });
}
