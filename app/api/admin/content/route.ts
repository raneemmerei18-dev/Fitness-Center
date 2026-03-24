import { Section } from "@prisma/client";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.HOME);
  if (access.error) return access.error;

  const formData = await request.formData();
  const id = Number(formData.get("id"));

  await prisma.siteContent.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? ""),
      subtitle: String(formData.get("subtitle") ?? ""),
      body: String(formData.get("body") ?? ""),
      details: String(formData.get("details") ?? ""),
    },
  });

  return NextResponse.redirect(new URL("/dashboard/content", request.url));
}
