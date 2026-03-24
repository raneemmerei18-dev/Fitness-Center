import { Section } from "@prisma/client";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.PROJECTS);
  if (access.error) return access.error;

  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");

  const baseData = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? ""),
    details: String(formData.get("details") ?? ""),
    location: String(formData.get("location") ?? ""),
    duration: String(formData.get("duration") ?? ""),
  };

  if (action === "create") {
    await prisma.project.create({ data: baseData });
  } else if (action === "delete") {
    await prisma.project.delete({ where: { id: Number(formData.get("id")) } });
  } else {
    await prisma.project.update({
      where: { id: Number(formData.get("id")) },
      data: baseData,
    });
  }

  return NextResponse.redirect(new URL("/dashboard/projects", request.url));
}
