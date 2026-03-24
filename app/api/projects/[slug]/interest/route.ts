import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import { Project, ProjectInquiry } from "@/lib/db/models";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  await connectDB();

  const project = await Project.findOne({ slug });

  if (!project) {
    return NextResponse.redirect(new URL("/projects", request.url));
  }

  const formData = await request.formData();

  await ProjectInquiry.create({
    projectId: project._id,
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? "") || null,
    message: String(formData.get("message") ?? ""),
  });

  return NextResponse.redirect(new URL(`/projects/${slug}`, request.url));
}
