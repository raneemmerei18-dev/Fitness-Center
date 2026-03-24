import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DashboardHomePage() {
  const [projects, blogs, news, contacts, inquiries] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.newsPost.count(),
    prisma.contactSubmission.count(),
    prisma.projectInquiry.count(),
  ]);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">Fitness Center Admin</h1>
      <div className="grid gap-4 md:grid-cols-5">
        {[
          { label: "Projects", value: projects },
          { label: "Blogs", value: blogs },
          { label: "News", value: news },
          { label: "Contacts", value: contacts },
          { label: "Interests", value: inquiries },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-600">
        Manage content and permissions from the navigation panel.
        <Link href="/dashboard/submissions" className="ml-1 font-semibold text-orange-600">
          View submissions
        </Link>
      </p>
    </section>
  );
}
