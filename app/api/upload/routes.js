// app/api/upload/route.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

const uploadPath = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, name);
  },
});

const upload = multer({ storage });

export const POST = async (req) => {
  return new Promise((resolve, reject) => {
    upload.single("image")(req, {}, (err) => {
      if (err) {
        console.error("Upload error:", err);
        return reject(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
      }
      const file = req.file;
      if (!file) return reject(NextResponse.json({ error: "No file" }, { status: 400 }));
      const url = `/uploads/${file.filename}`;
      resolve(NextResponse.json({ url }));
    });
  });
};
