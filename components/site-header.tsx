import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { SiteHeaderClient } from "@/components/site-header-client";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Programs" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export async function SiteHeader() {
  const user = await getCurrentUser();
  const dashboardHref = user
    ? (user.isSuperAdmin || user.sections.length > 0 ? "/dashboard" : "/user-dashboard")
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-red-400/20 bg-gradient-to-r from-black via-slate-900 to-black backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-2xl font-black bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-red-600 transition-all">
            💪 FitMotion
          </div>
        </Link>
        <SiteHeaderClient
          links={links}
          isAuthenticated={Boolean(user)}
          dashboardHref={dashboardHref ?? "/user-dashboard"}
        />
      </div>
    </header>
  );
}
