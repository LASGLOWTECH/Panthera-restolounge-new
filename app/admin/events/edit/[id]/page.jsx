import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Event from "@/models/Events";

// GET ONE EVENT
export async function GET(req, ctx) {
  await connectDB();

  const { id } = await ctx.params; // 👈 FIX

  const event = await Event.findById(id);
  return NextResponse.json(event);
}

// UPDATE EVENT
export async function PUT(req, ctx) {
  await connectDB();

  const { id } = await ctx.params; // 👈 FIX
  const body = await req.json();

  try {
    const updated = await Event.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE EVENT
export async function DELETE(req, ctx) {
  await connectDB();

  const { id } = await ctx.params; // 👈 FIX

  try {
    await Event.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
