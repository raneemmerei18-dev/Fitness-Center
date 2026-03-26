import Link from "next/link";
import connectDB from "@/lib/db/connect";
import { Project, BlogPost, NewsPost, ContactSubmission, ProjectInquiry } from "@/lib/db/models";

export const dynamic = "force-dynamic";

export default async function DashboardHomePage() {
  await connectDB();
  const [projects, blogs, news, contacts, inquiries] = await Promise.all([
    Project.countDocuments(),
    BlogPost.countDocuments(),
    NewsPost.countDocuments(),
    ContactSubmission.countDocuments(),
    ProjectInquiry.countDocuments(),
  ]);

  return (
    <section className="space-y-6">
      <div className="animate-fade-in-up">
        <p className="text-sm font-bold tracking-wider text-orange-500 uppercase">Control Center</p>
        <h1 className="text-3xl font-black text-white md:text-4xl">Fitness Center Admin</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        {[
          { label: "Projects", value: projects },
          { label: "Blogs", value: blogs },
          { label: "News", value: news },
          { label: "Contacts", value: contacts },
          { label: "Interests", value: inquiries },
        ].map((item, idx) => (
          <div
            key={item.label}
            className="hover-lift animate-fade-in-up rounded-2xl border border-orange-200/30 bg-gradient-to-br from-white to-orange-50 p-5"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            <p className="text-xs font-bold tracking-wide text-orange-700 uppercase">{item.label}</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-orange-100">
        Manage content and permissions from the navigation panel.
        <Link href="/dashboard/submissions" className="ml-1 font-bold text-orange-300 hover:text-orange-200">
          View submissions
        </Link>
      </p>
    </section>
  );
}
