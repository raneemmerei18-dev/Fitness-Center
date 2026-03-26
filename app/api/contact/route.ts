import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import { ContactSubmission } from "@/lib/db/models";

export async function POST(request: Request) {
  await connectDB();

  const formData = await request.formData();

  await ContactSubmission.create({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? "") || null,
    message: String(formData.get("message") ?? ""),
  });

  return NextResponse.redirect(new URL("/contact", request.url), 303);
}
