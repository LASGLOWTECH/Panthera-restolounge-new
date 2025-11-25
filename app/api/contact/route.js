// app/api/contact/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Contact from "@/models/Contact";
import { sendNotificationEmail } from "@/lib/mail";

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const created = await Contact.create(body);

    try {
      await sendNotificationEmail({
        to: process.env.NOTIFY_EMAIL,
        subject: "New Contact Message - Panthera",
        html: `<p><strong>${body.name}</strong> sent a message</p>
               <p>Email: ${body.email}</p>
               <p>Phone: ${body.phone || "N/A"}</p>
               <p>Message:<br/>${body.message}</p>`,
      });
    } catch (e) {
      console.error("Email failed:", e.message || e);
    }

    return NextResponse.json({ success: true, contact: created });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
