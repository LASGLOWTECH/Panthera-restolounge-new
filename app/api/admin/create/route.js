import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectDB();

    // CHANGE THIS TO YOUR NEW PASSWORD
    const newPassword = "Panthera@2025";

    const hashed = await bcrypt.hash(newPassword, 10);

    const admin = await Admin.create({
      username: "Pantherarestolounge@gmail.com", 
      password: hashed,
    });

    return NextResponse.json({
      message: "Admin created successfully!",
      login_details: {
        username: admin.username,
        password: newPassword,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
