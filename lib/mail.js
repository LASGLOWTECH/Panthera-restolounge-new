import nodemailer from "nodemailer";

export async function sendNotificationEmail({ to, subject, html, text }) {
  if (!to) throw new Error("No recipient email provided");

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
    html: html || `<pre>${text}</pre>`, // fallback to text if no html
    text: text || "",
  });
}

// Convenience wrapper for contact form notifications
export async function sendContactNotification(contact) {
  const { name, email, phone, message } = contact;
  const subject = "New Contact Message - Panthera Lounge";
  const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nMessage:\n${message}`;
  const html = `<p><strong>${name}</strong> sent a message</p>
                <p>Email: ${email}</p>
                <p>Phone: ${phone || "N/A"}</p>
                <p>Message:<br/>${message}</p>`;
  
  await sendNotificationEmail({
    to: process.env.NOTIFY_EMAIL,
    subject,
    text,
    html,
  });
}

// Convenience wrapper for reservation notifications
export async function sendReservationNotification(reservation) {
  const { name, phone, guests, date, time, seating, request } = reservation;
  const subject = "New Reservation - Panthera Lounge";
  const text = `Name: ${name}\nPhone: ${phone}\nGuests: ${guests}\nDate: ${date}\nTime: ${time}\nSeating: ${seating}\nRequest: ${request || "None"}`;
  const html = `<p><strong>New Reservation</strong></p>
                <p>Name: ${name}</p>
                <p>Phone: ${phone}</p>
                <p>Guests: ${guests}</p>
                <p>Date: ${date}</p>
                <p>Time: ${time}</p>
                <p>Seating: ${seating}</p>
                <p>Request: ${request || "None"}</p>`;
  
  await sendNotificationEmail({
    to: process.env.NOTIFY_EMAIL,
    subject,
    text,
    html,
  });
}
