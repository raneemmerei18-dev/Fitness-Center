import { requireDashboardUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/db/connect";
import { ProjectInquiry } from "@/lib/db/models";
import Link from "next/link";
import { UserDashboardShell } from "@/components/user-dashboard-shell";

export const dynamic = "force-dynamic";

export default async function UserDashboardPage() {
  const user = await requireDashboardUser();

  await connectDB();
  const inquiries = (await ProjectInquiry.find({ userId: user.id })
    .populate("projectId")
    .sort({ createdAt: -1 })
    .lean()
    .exec()) as unknown as Array<{
      _id: { toString(): string };
      projectId?: { title?: string; slug?: string } | null;
      phone?: string | null;
      message: string;
      createdAt: Date;
    }>;

  // Redirect admin users to admin dashboard
  if (user.isSuperAdmin) {
    redirect("/dashboard");
  }

  return (
    <UserDashboardShell userName={user.name} userEmail={user.email}>
      <section className="space-y-6">
          <div className="animate-fade-in-up">
            <p className="text-sm font-bold tracking-wider text-orange-400 uppercase">Member Space</p>
            <h1 className="text-3xl font-black text-white md:text-4xl">Welcome back, {user.name}</h1>
          </div>

          <div className="animate-fade-in-up rounded-3xl border border-orange-200/20 bg-white/95 p-8 shadow-2xl">
            <h2 className="mb-6 text-2xl font-black text-slate-900">Profile Information</h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Full Name</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{user.name}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Email Address</p>
                <p className="mt-2 text-lg font-bold text-slate-900">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up rounded-3xl border border-orange-200/20 bg-white/95 p-8 shadow-2xl" style={{ animationDelay: "0.1s" }}>
            <h2 className="mb-6 text-2xl font-black text-slate-900">My Program Requests</h2>
            {inquiries.length === 0 ? (
              <p className="text-sm text-slate-600">
                You have not submitted any program requests yet.
              </p>
            ) : (
              <div className="space-y-4">
                {inquiries.map((entry, idx) => {
                  const projectTitle = entry.projectId?.title ?? "Program";
                  const projectSlug = entry.projectId?.slug;

                  return (
                    <div
                      key={entry._id.toString()}
                      className="hover-lift animate-fade-in-up rounded-2xl border border-orange-200/40 bg-gradient-to-br from-orange-50 to-white p-4"
                      style={{ animationDelay: `${idx * 0.08}s` }}
                    >
                      <p className="font-bold text-slate-900">{projectTitle}</p>
                      <p className="mt-1 text-sm text-slate-600">{entry.message}</p>
                      {entry.phone ? (
                        <p className="mt-1 text-sm text-slate-600">Phone: {entry.phone}</p>
                      ) : null}
                      {projectSlug ? (
                        <Link
                          href={`/projects/${projectSlug}`}
                          className="mt-2 inline-block text-sm font-bold text-orange-600 hover:text-orange-700"
                        >
                          Edit request
                        </Link>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
      </section>
    </UserDashboardShell>
  );
}
