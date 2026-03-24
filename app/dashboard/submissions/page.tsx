import { Section, ContactSubmission, ProjectInquiry } from "@/lib/db/models";
import { SectionCard } from "@/components/section-card";
import { requireSection } from "@/lib/auth";
import connectDB from "@/lib/db/connect";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage() {
  await connectDB();
  await requireSection(Section.SUBMISSIONS);

  const [contacts, inquiries] = await Promise.all([
    ContactSubmission.find().sort({ createdAt: -1 }).lean(),
    ProjectInquiry.find().populate("projectId").sort({ createdAt: -1 }).lean(),
  ]);

  return (
    <div className="space-y-6">
      <SectionCard title="Contact Form Submissions">
        <div className="space-y-3">
          {contacts.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-slate-200 p-3">
              <p className="font-semibold text-slate-900">{entry.name} ({entry.email})</p>
              <p className="text-sm text-slate-600">{entry.phone || "No phone"}</p>
              <p className="mt-2 text-sm text-slate-700">{entry.message}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Project Interest Submissions">
        <div className="space-y-3">
          {inquiries.map((entry) => {
            const projectTitle = (entry.projectId as { title?: string } | null)?.title || "Unknown";
            return (
              <div key={entry.id} className="rounded-lg border border-slate-200 p-3">
                <p className="font-semibold text-slate-900">{entry.name} ({entry.email})</p>
                <p className="text-sm text-slate-600">Project: {projectTitle}</p>
                <p className="text-sm text-slate-600">{entry.phone || "No phone"}</p>
                <p className="mt-2 text-sm text-slate-700">{entry.message}</p>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
