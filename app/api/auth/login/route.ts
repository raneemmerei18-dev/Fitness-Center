import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authenticateUser, createSessionToken, sessionCookieName } from "@/lib/auth";
import connectDB from "@/lib/db/connect";
import { User, RolePermission } from "@/lib/db/models";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  const user = await authenticateUser(email, password);

  if (!user) {
    return NextResponse.redirect(new URL("/login?error=invalid", request.url), 303);
  }

  // Get user full data to check if admin
  await connectDB();
  const userData = (await User.findById(user.id).lean().exec()) as {
    isSuperAdmin?: boolean;
    roleId?: string | null;
  } | null;
  const isSuperAdmin = Boolean(userData?.isSuperAdmin);
  const hasRolePermissions = userData?.roleId
    ? (await RolePermission.countDocuments({ roleId: userData.roleId })) > 0
    : false;

  const token = await createSessionToken({ userId: user.id });
  const cookieStore = await cookies();

  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  // Redirect based on user type
  const redirectUrl = isSuperAdmin || hasRolePermissions ? "/dashboard" : "/user-dashboard";
  return NextResponse.redirect(new URL(redirectUrl, request.url), 303);
}
