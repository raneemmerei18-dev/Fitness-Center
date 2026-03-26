"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type UserDashboardShellProps = {
  userName: string;
  userEmail: string;
  children: React.ReactNode;
};

type UserNavItem = {
  href: string;
  label: string;
};

const navItems: UserNavItem[] = [
  { href: "/user-dashboard", label: "Overview" },
  { href: "/projects", label: "Programs" },
  { href: "/contact", label: "Contact" },
  { href: "/", label: "Website Home" },
];

export function UserDashboardShell({ userName, userEmail, children }: UserDashboardShellProps) {
  const pathname = usePathname();

  const isItemActive = (href: string) => pathname === href;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="animate-pulse-slow absolute top-10 left-10 h-72 w-72 rounded-full bg-orange-500 blur-3xl" />
        <div className="animate-pulse-slow absolute right-0 bottom-0 h-80 w-80 rounded-full bg-red-600 blur-3xl" />
      </div>

      <aside className="animate-slide-left fixed top-0 left-0 z-40 hidden h-screen w-[300px] overflow-hidden border-r border-orange-300/20 bg-slate-900/80 p-5 shadow-2xl backdrop-blur-md md:block">
        <div className="pointer-events-none absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-orange-400 via-orange-500 to-red-600" />
        <p className="text-xs font-bold tracking-wider text-orange-300 uppercase">Member Area</p>
        <h2 className="mt-1 pl-2 text-2xl font-black text-white">Dashboard</h2>

        <div className="mt-6 rounded-2xl border border-orange-300/30 bg-orange-500/10 p-4">
          <p className="text-sm font-bold text-white">{userName}</p>
          <p className="text-xs text-orange-200">{userEmail}</p>
          <p className="mt-3 inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
            Regular User
          </p>
        </div>

        <nav className="mt-6 space-y-2 rounded-2xl border border-orange-300/20 bg-slate-900/20 p-2">
          {navItems.map((item, idx) => {
            const active = isItemActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group block rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? "border-orange-300/60 bg-orange-500/30 text-white"
                    : "border-transparent text-orange-100 hover:border-orange-300/30 hover:bg-orange-500/20 hover:text-white"
                }`}
              >
                <span className="mr-2 text-[10px] text-orange-300/80">{String(idx + 1).padStart(2, "0")}</span>
                <span className="transition group-hover:ml-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <form action="/api/auth/logout" method="post" className="mt-6">
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-red-600 px-3 py-2 text-sm font-bold text-white transition hover:from-orange-700 hover:to-red-700"
          >
            Logout
          </button>
        </form>
      </aside>

      <div className="relative z-10 md:pl-[300px]">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
          <div className="mb-4 overflow-x-auto rounded-2xl border border-orange-300/20 bg-slate-900/40 p-2 md:hidden">
            <nav className="flex w-max gap-2">
              {navItems.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-semibold whitespace-nowrap transition ${
                      active ? "bg-orange-500/30 text-white" : "text-orange-100 hover:bg-orange-500/20"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <section className="animate-fade-in-up rounded-3xl border border-orange-200/20 bg-white/10 p-4 shadow-2xl backdrop-blur-sm md:p-5">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
