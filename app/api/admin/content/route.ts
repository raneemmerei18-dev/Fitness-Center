import { Section } from "@/lib/db/models";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import connectDB from "@/lib/db/connect";
import { SiteContent } from "@/lib/db/models";
import mongoose from "mongoose";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

async function saveUploadedFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split(".").pop() || "jpg";
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  const filename = `content-${timestamp}-${random}.${ext}`;

  const uploadDir = join(process.cwd(), "public", "uploads");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  await writeFile(join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.HOME);
  if (access.error) return access.error;

  await connectDB();

  const formData = await request.formData();
  const id = String(formData.get("id") ?? "").trim();
  const key = String(formData.get("key") ?? "").trim();
  const imageFile = formData.get("image") as File | null;
  let imageUrl = String(formData.get("imageUrl") ?? "").trim();

  if (imageFile && imageFile.size > 0) {
    imageUrl = await saveUploadedFile(imageFile);
  }

  const update = {
    title: String(formData.get("title") ?? ""),
    subtitle: String(formData.get("subtitle") ?? ""),
    body: String(formData.get("body") ?? ""),
    imageUrl,
    details: String(formData.get("details") ?? ""),
  };

  if (mongoose.Types.ObjectId.isValid(id)) {
    await SiteContent.findByIdAndUpdate(id, update);
  } else if (key) {
    await SiteContent.updateOne({ key }, { $set: update }, { upsert: true });
  }

  return NextResponse.redirect(new URL("/dashboard/content?saved=1", request.url), 303);
}
