import { Section } from "@/lib/db/models";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import connectDB from "@/lib/db/connect";
import { Project } from "@/lib/db/models";
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
  const filename = `project-${timestamp}-${random}.${ext}`;

  const uploadDir = join(process.cwd(), "public", "uploads");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  await writeFile(join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.PROJECTS);
  if (access.error) return access.error;

  await connectDB();

  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");
  const imageFile = formData.get("image") as File | null;

  let uploadedImageUrl: string | null = null;
  if (imageFile && imageFile.size > 0) {
    uploadedImageUrl = await saveUploadedFile(imageFile);
  }

  const baseData: Record<string, string> = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? "").toLowerCase(),
    description: String(formData.get("description") ?? ""),
    details: String(formData.get("details") ?? ""),
    location: String(formData.get("location") ?? ""),
    duration: String(formData.get("duration") ?? ""),
  };

  if (uploadedImageUrl) {
    baseData.imageUrl = uploadedImageUrl;
  }

  if (action === "create") {
    await Project.create(baseData);
  } else if (action === "delete") {
    const id = String(formData.get("id"));
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Project.findByIdAndDelete(id);
    }
  } else {
    const id = String(formData.get("id"));
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Project.findByIdAndUpdate(id, baseData);
    }
  }

  return NextResponse.redirect(new URL("/dashboard/projects", request.url), 303);
}
