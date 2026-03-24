import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Section } from "@/lib/db/models";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db/connect";
import { User, Role, RolePermission } from "@/lib/db/models";
import { hasSectionPermission } from "@/lib/permissions";

const SESSION_COOKIE = "fc_session";
const encoder = new TextEncoder();

function getSecret() {
  return encoder.encode(process.env.AUTH_SECRET ?? "fitness-center-local-secret");
}

type SessionPayload = {
  userId: string;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  isSuperAdmin: boolean;
  roleName: string | null;
  sections: Section[];
};

export async function createSessionToken(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());

  return {
    userId: payload.userId as string,
  } satisfies SessionPayload;
}

export async function authenticateUser(email: string, password: string) {
  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;

  return {
    id: user._id.toString(),
  };
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  try {
    const session = await verifySessionToken(token);
    await connectDB();

    const user = await User.findById(session.userId);

    if (!user) return null;

    let roleData: { name?: string; permissions?: Array<{ section: Section }> } | null = null;

    if (user.roleId) {
      const role = await Role.findById(user.roleId);
      if (role) {
        const permissions = await RolePermission.find({ roleId: user.roleId });
        roleData = {
          name: role.name,
          permissions: permissions.map((p) => ({ section: p.section as Section })),
        };
      }
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      isSuperAdmin: Boolean(user.isSuperAdmin),
      roleName: roleData?.name ?? null,
      sections: roleData?.permissions?.map((item) => item.section) ?? [],
    };
  } catch {
    return null;
  }
}

export async function requireDashboardUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireSection(section: Section) {
  const user = await requireDashboardUser();
  if (!hasSectionPermission(user.isSuperAdmin, user.sections, section)) {
    redirect("/dashboard");
  }
  return user;
}

export const sessionCookieName = SESSION_COOKIE;
