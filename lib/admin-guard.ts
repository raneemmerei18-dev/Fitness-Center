import { NextResponse } from "next/server";
import { Section } from "@/lib/db/models";
import { getCurrentUser } from "@/lib/auth";
import { hasSectionPermission } from "@/lib/permissions";

export async function ensureApiSectionAccess(section: Section) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: new NextResponse("Unauthorized", { status: 401 }) };
  }

  if (!hasSectionPermission(user.isSuperAdmin, user.sections, section)) {
    return { error: new NextResponse("Forbidden", { status: 403 }) };
  }

  return { user };
}
