import { Section } from "@/lib/db/models";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import connectDB from "@/lib/db/connect";
import { User } from "@/lib/db/models";
import mongoose from "mongoose";

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.USERS);
  if (access.error) return access.error;

  await connectDB();

  const formData = await request.formData();
  const id = String(formData.get("id"));
  const rawRoleId = String(formData.get("roleId") ?? "").trim();
  const roleId = rawRoleId && mongoose.Types.ObjectId.isValid(rawRoleId) 
    ? new mongoose.Types.ObjectId(rawRoleId) 
    : null;
  const isSuperAdmin = formData.get("isSuperAdmin") === "true";

  await User.findByIdAndUpdate(id, {
    isSuperAdmin,
    roleId,
  });

  return NextResponse.redirect(new URL("/dashboard/users", request.url), 303);
}
