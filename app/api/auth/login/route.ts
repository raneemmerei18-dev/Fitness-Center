import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authenticateUser, createSessionToken, sessionCookieName } from "@/lib/auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  const user = await authenticateUser(email, password);

  if (!user) {
    return NextResponse.redirect(new URL("/login?error=invalid", request.url));
  }

  const token = await createSessionToken({ userId: user.id });
  const cookieStore = await cookies();

  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
