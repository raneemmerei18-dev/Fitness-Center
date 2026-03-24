import { Section, SiteContent } from "@/lib/db/models";
import { SectionCard } from "@/components/section-card";
import { requireSection } from "@/lib/auth";
import connectDB from "@/lib/db/connect";

export const dynamic = "force-dynamic";

export default async function ContentDashboardPage() {
  await connectDB();
  await requireSection(Section.HOME);

  const items = await SiteContent.find()
    .sort({ key: 1 })
    .lean();

  return (
    <SectionCard title="Site Content" subtitle="Edit Home, About, and Contact sections">
      <div className="space-y-4">
        {items.map((item) => (
          <form key={item.id} action="/api/admin/content" method="post" className="grid gap-2 rounded-xl border border-slate-200 p-4">
            <input type="hidden" name="id" value={item.id} />
            <label className="text-xs font-semibold uppercase text-slate-500">{item.key}</label>
            <input name="title" defaultValue={item.title ?? ""} placeholder="Title" className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="subtitle" defaultValue={item.subtitle ?? ""} placeholder="Subtitle" className="rounded-md border border-slate-300 px-3 py-2" />
            <textarea name="body" defaultValue={item.body ?? ""} rows={3} placeholder="Body" className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="details" defaultValue={item.details ?? ""} placeholder="Details" className="rounded-md border border-slate-300 px-3 py-2" />
            <button type="submit" className="justify-self-start rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600">
              Save
            </button>
          </form>
        ))}
      </div>
    </SectionCard>
  );
}
