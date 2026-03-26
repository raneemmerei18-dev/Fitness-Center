"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionUser } from "@/lib/auth";

type SectionKey =
  | "HOME"
  | "ABOUT"
  | "SERVICES"
  | "PROJECTS"
  | "BLOG"
  | "NEWS"
  | "CONTACT"
  | "SUBMISSIONS"
  | "USERS";

type NavItem = {
  href: string;
  label: string;
  section?: SectionKey;
};

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/content", label: "Site Content", section: "HOME" },
  { href: "/dashboard/services", label: "Services", section: "SERVICES" },
  { href: "/dashboard/projects", label: "Projects", section: "PROJECTS" },
  { href: "/dashboard/blog", label: "Blog", section: "BLOG" },
  { href: "/dashboard/news", label: "News", section: "NEWS" },
  {
    href: "/dashboard/submissions",
    label: "Submissions",
    section: "SUBMISSIONS",
  },
  { href: "/dashboard/users", label: "Users & Roles", section: "USERS" },
];

export function DashboardShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hasSectionPermission = (section: SectionKey) =>
    user.isSuperAdmin || user.sections.includes(section as never);

  const visibleItems = navItems.filter((item) =>
    item.section
      ? hasSectionPermission(item.section)
      : true,
  );

  const isItemActive = (href: string) =>
    pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="animate-pulse-slow absolute top-10 left-10 h-72 w-72 rounded-full bg-orange-500 blur-3xl" />
        <div className="animate-pulse-slow absolute right-0 bottom-0 h-80 w-80 rounded-full bg-red-600 blur-3xl" />
      </div>

      <aside className="animate-slide-left fixed top-0 left-0 z-40 hidden h-screen w-[300px] overflow-hidden border-r border-orange-300/20 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-md md:block">
        <div className="pointer-events-none absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-orange-400 via-orange-500 to-red-600" />
        <h2 className="mb-2 pl-2 text-lg font-black text-white">Admin Dashboard</h2>
        <p className="mb-1 text-xs text-orange-200">{user.name}</p>
        <p className="mb-4 text-xs font-semibold text-orange-300">
          {user.isSuperAdmin ? "Super Admin" : (user.roleName ?? "No Role")}
        </p>
        <nav className="space-y-2 rounded-2xl border border-orange-300/20 bg-slate-900/20 p-2">
          {visibleItems.map((item, idx) => {
            const active = isItemActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group block rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "border-orange-300/60 bg-orange-500/30 text-white"
                    : "border-transparent text-gray-200 hover:border-orange-300/40 hover:bg-orange-500/20 hover:text-white"
                }`}
              >
                <span className="mr-2 text-[10px] text-orange-300/80">{String(idx + 1).padStart(2, "0")}</span>
                <span className="transition group-hover:ml-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-4 space-y-3">
          <Link
            href="/"
            className="block rounded-xl border border-orange-300/40 px-3 py-2 text-center text-sm font-semibold text-orange-200 transition hover:bg-orange-500/20 hover:text-white"
          >
            Back 
          </Link>
        </div>
        <form action="/api/auth/logout" method="post" className="mt-4">
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-3 py-2 text-sm font-bold text-white transition-all hover:from-orange-700 hover:to-red-700"
          >
            Logout
          </button>
        </form>
      </aside>

      <div className="relative z-10 md:pl-[300px]">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
          <div className="mb-4 overflow-x-auto rounded-2xl border border-orange-300/20 bg-slate-900/40 p-2 md:hidden">
            <nav className="flex w-max gap-2">
              {visibleItems.map((item) => {
                const active = isItemActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap transition ${
                      active
                        ? "bg-orange-500/30 text-white"
                        : "text-orange-100 hover:bg-orange-500/20"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <main className="animate-fade-in-up">
            <div className="rounded-3xl border border-orange-200/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm md:p-5">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
