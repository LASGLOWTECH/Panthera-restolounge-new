// app/api/events/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Events";

export async function GET(req, { params }) {
  await connectDB();
  const event = await Event.findById(params.id);
  if (!event) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(event);
}

export async function PUT(req, { params }) {
  await connectDB();
  try {
    const body = await req.json();
    const updated = await Event.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await connectDB();
  try {
    await Event.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
