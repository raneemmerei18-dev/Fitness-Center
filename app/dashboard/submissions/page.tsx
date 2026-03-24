import { Section } from "@prisma/client";
import { SectionCard } from "@/components/section-card";
import { requireSection } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SubmissionsPage() {
  await requireSection(Section.SUBMISSIONS);

  const [contacts, inquiries] = await Promise.all([
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.projectInquiry.findMany({ include: { project: true }, orderBy: { createdAt: "desc" } }),
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
          {inquiries.map((entry) => (
            <div key={entry.id} className="rounded-lg border border-slate-200 p-3">
              <p className="font-semibold text-slate-900">{entry.name} ({entry.email})</p>
              <p className="text-sm text-slate-600">Project: {entry.project.title}</p>
              <p className="text-sm text-slate-600">{entry.phone || "No phone"}</p>
              <p className="mt-2 text-sm text-slate-700">{entry.message}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
