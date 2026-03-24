import { Section } from "@prisma/client";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.SERVICES);
  if (access.error) return access.error;

  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");

  if (action === "create") {
    await prisma.service.create({
      data: {
        title: String(formData.get("title") ?? ""),
        summary: String(formData.get("summary") ?? ""),
        details: String(formData.get("details") ?? ""),
        displayOrder: Number(formData.get("displayOrder") ?? 0),
      },
    });
  } else if (action === "delete") {
    await prisma.service.delete({ where: { id: Number(formData.get("id")) } });
  } else {
    await prisma.service.update({
      where: { id: Number(formData.get("id")) },
      data: {
        title: String(formData.get("title") ?? ""),
        summary: String(formData.get("summary") ?? ""),
        details: String(formData.get("details") ?? ""),
        displayOrder: Number(formData.get("displayOrder") ?? 0),
      },
    });
  }

  return NextResponse.redirect(new URL("/dashboard/services", request.url));
}
