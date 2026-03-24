import { Section } from "@/lib/db/models";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import connectDB from "@/lib/db/connect";
import { Project } from "@/lib/db/models";
import mongoose from "mongoose";

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.PROJECTS);
  if (access.error) return access.error;

  await connectDB();

  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");

  const baseData = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? "").toLowerCase(),
    description: String(formData.get("description") ?? ""),
    details: String(formData.get("details") ?? ""),
    location: String(formData.get("location") ?? ""),
    duration: String(formData.get("duration") ?? ""),
  };

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

  return NextResponse.redirect(new URL("/dashboard/projects", request.url));
}
