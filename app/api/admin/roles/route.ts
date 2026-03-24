import { Section } from "@prisma/client";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

const allSections = Object.values(Section);

function toSection(value: FormDataEntryValue): Section | null {
  const str = String(value);
  return allSections.includes(str as Section) ? (str as Section) : null;
}

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.USERS);
  if (access.error) return access.error;

  const prismaRoleDelegate = prisma as unknown as {
    role: {
      create(args: unknown): Promise<unknown>;
      delete(args: unknown): Promise<unknown>;
      update(args: unknown): Promise<unknown>;
    };
    user: {
      count(args: unknown): Promise<number>;
    };
  };

  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");

  if (action === "create") {
    const name = String(formData.get("name") ?? "").trim();
    if (name) {
      await prismaRoleDelegate.role.create({
        data: {
          name,
          description: String(formData.get("description") ?? "").trim() || null,
        },
      });
    }
  } else if (action === "delete") {
    const roleId = Number(formData.get("id"));
    const usersCount = await prismaRoleDelegate.user.count({ where: { roleId } });

    if (usersCount === 0) {
      await prismaRoleDelegate.role.delete({ where: { id: roleId } });
    }
  } else {
    const roleId = Number(formData.get("id"));
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim() || null;

    const selectedSections = formData
      .getAll("sections")
      .map(toSection)
      .filter((item): item is Section => Boolean(item));

    if (name) {
      await prismaRoleDelegate.role.update({
        where: { id: roleId },
        data: {
          name,
          description,
          permissions: {
            deleteMany: {},
            create: selectedSections.map((section) => ({ section })),
          },
        },
      });
    }
  }

  return NextResponse.redirect(new URL("/dashboard/users", request.url));
}
