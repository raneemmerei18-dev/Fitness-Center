import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-orange-200/30 bg-gradient-to-b from-slate-800 to-slate-900 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12 md:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <p className="text-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              💪 FitMotion
            </p>
            <p className="mt-2 text-sm text-gray-300">Transform. Perform. Thrive.</p>
          </div>
          <div>
            <p className="font-bold text-orange-400 mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/about" className="hover:text-orange-400 transition">About</Link></li>
              <li><Link href="/services" className="hover:text-orange-400 transition">Services</Link></li>
              <li><Link href="/projects" className="hover:text-orange-400 transition">Programs</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-orange-400 mb-3">Resources</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link href="/blog" className="hover:text-orange-400 transition">Blog</Link></li>
              <li><Link href="/news" className="hover:text-orange-400 transition">News</Link></li>
              <li><Link href="/contact" className="hover:text-orange-400 transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-orange-400 mb-3">Get in Touch</p>
            <p className="text-sm text-gray-300">📞 +1 555 0100</p>
            <p className="text-sm text-gray-300">📧 hello@fitmotion.example</p>
            <p className="text-sm text-gray-300">📍 125 Active Ave, Wellness City</p>
          </div>
        </div>
        <div className="border-t border-orange-200/20 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2026 FitMotion Center. All rights reserved. Transform your life today.</p>
        </div>
      </div>
    </footer>
  );
}
