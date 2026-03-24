import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Programs" },
  { href: "/blog", label: "Blog" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-orange-200/30 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:to-red-500 transition-all">
            💪 FitMotion
          </div>
        </Link>
        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-gray-200 transition-all hover:text-orange-400 hover:gap-1 flex items-center gap-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/login"
          className="rounded-full bg-orange-600 hover:bg-orange-700 px-6 py-2 text-sm font-bold text-white transition-all hover-lift shadow-lg hover:shadow-orange-500/50"
        >
          Admin
        </Link>
      </div>
    </header>
  );
}
