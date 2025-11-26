// app/api/events/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Events";

export async function DELETE(req, { params }) {
  await connectDB();

  const id = params?.id; // <-- unwrap here
  if (!id) {
    return NextResponse.json({ error: "Event ID is required" }, { status: 400 });
  }

  try {
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
  }
}
