import { Section } from "@prisma/client";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.NEWS);
  if (access.error) return access.error;

  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");

  const baseData = {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    content: String(formData.get("content") ?? ""),
  };

  if (action === "create") {
    await prisma.newsPost.create({ data: baseData });
  } else if (action === "delete") {
    await prisma.newsPost.delete({ where: { id: Number(formData.get("id")) } });
  } else {
    await prisma.newsPost.update({ where: { id: Number(formData.get("id")) }, data: baseData });
  }

  return NextResponse.redirect(new URL("/dashboard/news", request.url));
}
