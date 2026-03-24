import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Section } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { hasSectionPermission } from "@/lib/permissions";

const SESSION_COOKIE = "fc_session";
const encoder = new TextEncoder();

function getSecret() {
  return encoder.encode(process.env.AUTH_SECRET ?? "fitness-center-local-secret");
}

type SessionPayload = {
  userId: number;
};

export type SessionUser = {
  id: number;
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
    userId: Number(payload.userId),
  } satisfies SessionPayload;
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) return null;

  return {
    id: user.id,
  };
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  try {
    const session = await verifySessionToken(token);
    const prismaUserDelegate = prisma as unknown as {
      user: {
        findUnique(args: unknown): Promise<unknown>;
      };
    };

    const user = (await prismaUserDelegate.user.findUnique({
      where: { id: session.userId },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    })) as
      | {
          id: number;
          name: string;
          email: string;
          isSuperAdmin?: boolean;
          role?: {
            name?: string;
            permissions?: Array<{ section: Section }>;
          } | null;
        }
      | null;

    if (!user) return null;

    const roleData = user.role as
      | {
          name?: string;
          permissions?: Array<{ section: Section }>;
        }
      | null
      | undefined;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      isSuperAdmin: Boolean((user as { isSuperAdmin?: boolean }).isSuperAdmin),
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
