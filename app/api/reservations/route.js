import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Reservation from "@/models/Reservation";
import { sendReservationNotification } from "@/lib/mail"; // use wrapper
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

    // Send email notification using wrapper
    try {
      await sendReservationNotification(reservationData);
    } catch (e) {
      console.error("Email failed:", e.message || e);
    }

    // WhatsApp is still commented out
    /*
    let waLink = "";
    try {
      await sendWhatsAppCloud({
        phoneId: process.env.WHATSAPP_PHONE_ID,
        token: process.env.WHATSAPP_TOKEN,
        toNumber: body.phone,
        message: msg,
      });
    } catch (e) {
      console.error("WhatsApp API failed:", e.message);
      waLink = generateReservationWaLink(reservationData, process.env.CLIENT_WHATSAPP_NUMBER);
      console.log("Fallback WhatsApp link:", waLink);
    }
    */

    return NextResponse.json({ success: true, reservation: created });
  } catch (err) {
    console.error("Reservation API error:", err);
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
