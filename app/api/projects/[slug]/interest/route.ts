import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import { Project, ProjectInquiry } from "@/lib/db/models";
import { getCurrentUser } from "@/lib/auth";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  await connectDB();

  const project = await Project.findOne({ slug });

  if (!project) {
    return NextResponse.redirect(new URL("/projects", request.url), 303);
  }

  const formData = await request.formData();
  const currentUser = await getCurrentUser();

  const name = currentUser?.name ?? String(formData.get("name") ?? "").trim();
  const email = currentUser?.email ?? String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.redirect(new URL(`/projects/${slug}?error=missing`, request.url), 303);
  }

  if (currentUser) {
    await ProjectInquiry.findOneAndUpdate(
      {
        projectId: project._id,
        userId: currentUser.id,
      },
      {
        projectId: project._id,
        userId: currentUser.id,
        name,
        email,
        phone,
        message,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
  } else {
    await ProjectInquiry.create({
      projectId: project._id,
      name,
      email,
      phone,
      message,
    });
  }

  return NextResponse.redirect(new URL(`/projects/${slug}?success=interest`, request.url), 303);
}
