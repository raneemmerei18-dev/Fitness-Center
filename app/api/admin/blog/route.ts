import { Section } from "@/lib/db/models";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import connectDB from "@/lib/db/connect";
import { BlogPost } from "@/lib/db/models";
import mongoose from "mongoose";

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.BLOG);
  if (access.error) return access.error;

  await connectDB();

  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");

  const baseData = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? "").toLowerCase(),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
  };

  if (action === "create") {
    await BlogPost.create(baseData);
  } else if (action === "delete") {
    const id = String(formData.get("id"));
    if (mongoose.Types.ObjectId.isValid(id)) {
      await BlogPost.findByIdAndDelete(id);
    }
  } else {
    const id = String(formData.get("id"));
    if (mongoose.Types.ObjectId.isValid(id)) {
      await BlogPost.findByIdAndUpdate(id, baseData);
    }
  }

  return NextResponse.redirect(new URL("/dashboard/blog", request.url), 303);
}
