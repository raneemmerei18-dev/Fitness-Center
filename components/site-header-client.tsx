"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderLink = {
  href: string;
  label: string;
};

type SiteHeaderClientProps = {
  links: HeaderLink[];
  isAuthenticated: boolean;
  dashboardHref: string;
};

export function SiteHeaderClient({ links, isAuthenticated, dashboardHref }: SiteHeaderClientProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <>
      <nav className="hidden gap-3 md:flex">
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                active
                  ? "bg-red-600 text-white shadow-lg shadow-red-900/40"
                  : "text-gray-200 hover:bg-red-500/20 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <Link
            href={dashboardHref}
            className="rounded-full bg-red-600 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-red-700 hover-lift shadow-lg shadow-red-900/40"
          >
            Dashboard
          </Link>
          <form action="/api/auth/logout" method="post">
            <button
              type="submit"
              className="rounded-full bg-black/40 border border-red-400/40 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-red-500/20 hover-lift"
            >
              Logout
            </button>
          </form>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            href="/login"
            className="rounded-full bg-black/40 border border-red-400/40 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-red-500/20 hover-lift"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-red-600 px-6 py-2 text-sm font-bold text-white transition-all hover:bg-red-700 hover-lift shadow-lg shadow-red-900/40"
          >
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
}
