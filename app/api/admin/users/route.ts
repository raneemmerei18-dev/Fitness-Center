import { Section } from "@prisma/client";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.USERS);
  if (access.error) return access.error;

  const formData = await request.formData();
  const id = Number(formData.get("id"));
  const rawRoleId = String(formData.get("roleId") ?? "").trim();
  const roleId = rawRoleId ? Number(rawRoleId) : null;
  const isSuperAdmin = formData.get("isSuperAdmin") === "true";

  const prismaUserDelegate = prisma as unknown as {
    user: {
      update(args: unknown): Promise<unknown>;
    };
  };

  await prismaUserDelegate.user.update({
    where: { id },
    data: {
      isSuperAdmin,
      roleId,
    },
  });

  return NextResponse.redirect(new URL("/dashboard/users", request.url));
}
