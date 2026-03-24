import { Section } from "@/lib/db/models";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import connectDB from "@/lib/db/connect";
import { SiteContent } from "@/lib/db/models";
import mongoose from "mongoose";

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.HOME);
  if (access.error) return access.error;

  await connectDB();

  const formData = await request.formData();
  const id = String(formData.get("id"));

  if (mongoose.Types.ObjectId.isValid(id)) {
    await SiteContent.findByIdAndUpdate(id, {
      title: String(formData.get("title") ?? ""),
      subtitle: String(formData.get("subtitle") ?? ""),
      body: String(formData.get("body") ?? ""),
      details: String(formData.get("details") ?? ""),
    });
  }

  return NextResponse.redirect(new URL("/dashboard/content", request.url));
}
