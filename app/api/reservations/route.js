import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Reservation from "@/models/Reservation";
import { sendNotificationEmail } from "@/lib/mail";
// import { sendWhatsAppCloud, generateReservationWaLink } from "@/lib/whatsapp";
import { requireToken } from "@/lib/auth";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();

    const reservationData = {
      ...body,
      seating: body.seating || "Indoor",
    };

    const created = await Reservation.create(reservationData);

    const msg = `NEW RESERVATION
Name: ${body.name}
Phone: ${body.phone}
Guests: ${body.guests}
Date: ${body.date}
Time: ${body.time}
Seating: ${reservationData.seating}
Request: ${body.request || "None"}`;

    // Send email
    try {
      await sendNotificationEmail(process.env.NOTIFY_EMAIL, "New Reservation", msg);
    } catch (e) {
      console.error("Email failed:", e);
    }

    // Try WhatsApp Cloud API
    // let waLink = "";
    // try {
    //   await sendWhatsAppCloud({
    //     phoneId: process.env.WHATSAPP_PHONE_ID,
    //     token: process.env.WHATSAPP_TOKEN,
    //     toNumber: body.phone,
    //     message: msg,
    //   });
    // } catch (e) {
    //   console.error("WhatsApp API failed:", e.message);
    //   // Generate wa.me fallback link
    //   waLink = generateReservationWaLink(reservationData, process.env.CLIENT_WHATSAPP_NUMBER);
    //   console.log("Fallback WhatsApp link:", waLink);
    // }

    return NextResponse.json({ success: true, reservation: created, waLink });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function GET(req) {
  await connectDB();

  try {
    requireToken(req); // admin only
    const list = await Reservation.find().sort({ createdAt: -1 });
    return NextResponse.json(list);
  } catch (e) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
