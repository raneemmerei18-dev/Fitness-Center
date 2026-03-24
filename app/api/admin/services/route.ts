import { Section } from "@/lib/db/models";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import connectDB from "@/lib/db/connect";
import { Service } from "@/lib/db/models";
import mongoose from "mongoose";

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.SERVICES);
  if (access.error) return access.error;

  await connectDB();

  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");

  if (action === "create") {
    await Service.create({
      title: String(formData.get("title") ?? ""),
      summary: String(formData.get("summary") ?? ""),
      details: String(formData.get("details") ?? ""),
      displayOrder: Number(formData.get("displayOrder") ?? 0),
    });
  } else if (action === "delete") {
    const id = String(formData.get("id"));
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Service.findByIdAndDelete(id);
    }
  } else {
    const id = String(formData.get("id"));
    if (mongoose.Types.ObjectId.isValid(id)) {
      await Service.findByIdAndUpdate(id, {
        title: String(formData.get("title") ?? ""),
        summary: String(formData.get("summary") ?? ""),
        details: String(formData.get("details") ?? ""),
        displayOrder: Number(formData.get("displayOrder") ?? 0),
      });
    }
  }

  return NextResponse.redirect(new URL("/dashboard/services", request.url));
}
