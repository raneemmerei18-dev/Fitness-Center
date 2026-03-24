import { DashboardShell } from "@/components/dashboard-shell";
import { requireDashboardUser } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireDashboardUser();
  return <DashboardShell user={user}>{children}</DashboardShell>;
}
