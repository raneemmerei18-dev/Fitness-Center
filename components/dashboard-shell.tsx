import Link from "next/link";
import { Section } from "@prisma/client";
import { SessionUser } from "@/lib/auth";
import { hasSectionPermission } from "@/lib/permissions";

type NavItem = {
  href: string;
  label: string;
  section?: Section;
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/content", label: "Site Content", section: Section.HOME },
  { href: "/dashboard/services", label: "Services", section: Section.SERVICES },
  { href: "/dashboard/projects", label: "Projects", section: Section.PROJECTS },
  { href: "/dashboard/blog", label: "Blog", section: Section.BLOG },
  { href: "/dashboard/news", label: "News", section: Section.NEWS },
  {
    href: "/dashboard/submissions",
    label: "Submissions",
    section: Section.SUBMISSIONS,
  },
  { href: "/dashboard/users", label: "Users & Roles", section: Section.USERS },
];

export function DashboardShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 md:grid-cols-[240px,1fr] md:px-6">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4">
          <h2 className="mb-2 text-lg font-bold text-slate-900">Dashboard</h2>
          <p className="mb-1 text-xs text-slate-600">{user.name}</p>
          <p className="mb-4 text-xs font-semibold text-slate-700">
            {user.isSuperAdmin ? "Super Admin" : (user.roleName ?? "No Role")}
          </p>
          <nav className="space-y-2">
            {navItems
              .filter((item) =>
                item.section
                  ? hasSectionPermission(user.isSuperAdmin, user.sections, item.section)
                  : true,
              )
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                >
                  {item.label}
                </Link>
              ))}
          </nav>
          <form action="/api/auth/logout" method="post" className="mt-6">
            <button
              type="submit"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </form>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
