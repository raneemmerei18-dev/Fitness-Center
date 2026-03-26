import { DashboardShell } from "@/components/dashboard-shell";
import { requireDashboardUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireDashboardUser();

  // Users with no admin privileges should use the user dashboard.
  if (!user.isSuperAdmin && user.sections.length === 0) {
    redirect("/user-dashboard");
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
