import { Section } from "@/lib/db/models";
import { NextResponse } from "next/server";
import { ensureApiSectionAccess } from "@/lib/admin-guard";
import connectDB from "@/lib/db/connect";
import { Role, RolePermission, User } from "@/lib/db/models";
import mongoose from "mongoose";

const allSections = Object.values(Section);

function toSection(value: FormDataEntryValue): Section | null {
  const str = String(value);
  return allSections.includes(str as Section) ? (str as Section) : null;
}

export async function POST(request: Request) {
  const access = await ensureApiSectionAccess(Section.USERS);
  if (access.error) return access.error;

  await connectDB();

  const formData = await request.formData();
  const action = String(formData.get("_action") ?? "update");

  if (action === "create") {
    const name = String(formData.get("name") ?? "").trim();
    if (name) {
      await Role.create({
        name,
        description: String(formData.get("description") ?? "").trim() || null,
      });
    }
  } else if (action === "delete") {
    const roleId = String(formData.get("id"));
    if (mongoose.Types.ObjectId.isValid(roleId)) {
      const usersCount = await User.countDocuments({ roleId: new mongoose.Types.ObjectId(roleId) });

      if (usersCount === 0) {
        await Role.findByIdAndDelete(roleId);
      }
    }
  } else {
    const roleId = String(formData.get("id"));
    if (mongoose.Types.ObjectId.isValid(roleId)) {
      const name = String(formData.get("name") ?? "").trim();
      const description = String(formData.get("description") ?? "").trim() || null;

      const selectedSections = formData
        .getAll("sections")
        .map(toSection)
        .filter((item): item is Section => Boolean(item));

      if (name) {
        await Role.findByIdAndUpdate(roleId, {
          name,
          description,
        });

        // Delete existing permissions and create new ones
        await RolePermission.deleteMany({ roleId: new mongoose.Types.ObjectId(roleId) });
        if (selectedSections.length > 0) {
          await RolePermission.insertMany(
            selectedSections.map((section) => ({
              roleId: new mongoose.Types.ObjectId(roleId),
              section,
            }))
          );
        }
      }
    }
  }

  return NextResponse.redirect(new URL("/dashboard/users", request.url), 303);
}
