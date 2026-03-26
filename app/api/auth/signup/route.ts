import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/connect";
import { User } from "@/lib/db/models";
import { createSessionToken, sessionCookieName } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "").trim();
    const confirmPassword = String(formData.get("confirmPassword") ?? "").trim();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.redirect(new URL("/signup?error=missing", request.url), 303);
    }

    if (password !== confirmPassword) {
      return NextResponse.redirect(new URL("/signup?error=mismatch", request.url), 303);
    }

    if (password.length < 8) {
      return NextResponse.redirect(new URL("/signup?error=weak", request.url), 303);
    }

    // Check if email already exists
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.redirect(new URL("/signup?error=exists", request.url), 303);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user (not admin)
    const createdUser = await User.create({
      name,
      email,
      passwordHash,
      isSuperAdmin: false,
    });

    const token = await createSessionToken({ userId: createdUser._id.toString() });
    const cookieStore = await cookies();

    cookieStore.set(sessionCookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.redirect(new URL("/user-dashboard", request.url), 303);
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.redirect(new URL("/signup?error=server", request.url), 303);
  }
}
