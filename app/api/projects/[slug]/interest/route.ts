import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) {
    return NextResponse.redirect(new URL("/projects", request.url));
  }

  const formData = await request.formData();

  await prisma.projectInquiry.create({
    data: {
      projectId: project.id,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    },
  });

  return NextResponse.redirect(new URL(`/projects/${slug}`, request.url));
}
