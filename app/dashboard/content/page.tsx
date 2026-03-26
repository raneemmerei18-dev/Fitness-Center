import { Section, SiteContent } from "@/lib/db/models";
import { SectionCard } from "@/components/section-card";
import { requireSection } from "@/lib/auth";
import connectDB from "@/lib/db/connect";

export const dynamic = "force-dynamic";

export default async function ContentDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  await connectDB();
  await requireSection(Section.HOME);
  const query = await searchParams;

  const items = (await SiteContent.find().sort({ key: 1 }).lean().exec()) as unknown as Array<{
    _id: { toString(): string };
    key: string;
    title?: string | null;
    subtitle?: string | null;
    body?: string | null;
    imageUrl?: string | null;
    details?: string | null;
  }>;

  return (
    <SectionCard title="Site Content" subtitle="Edit Home, About, and Contact sections">
      {query.saved === "1" ? (
        <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          Content updated successfully.
        </div>
      ) : null}
      <div className="space-y-4">
        {items.map((item) => (
          <form key={item._id.toString()} action="/api/admin/content" method="post" encType="multipart/form-data" className="grid gap-2 rounded-xl border border-slate-200 p-4">
            <input type="hidden" name="id" value={item._id.toString()} />
            <input type="hidden" name="key" value={item.key} />
            <label className="text-xs font-semibold uppercase text-slate-500">{item.key}</label>
            <input name="title" defaultValue={item.title ?? ""} placeholder="Title" className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="subtitle" defaultValue={item.subtitle ?? ""} placeholder="Subtitle" className="rounded-md border border-slate-300 px-3 py-2" />
            <textarea name="body" defaultValue={item.body ?? ""} rows={3} placeholder="Body" className="rounded-md border border-slate-300 px-3 py-2" />
            {item.key === "home_hero" || item.key === "hero_title" ? (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Hero Image</label>
                <input name="image" type="file" accept="image/*" className="w-full rounded-md border border-slate-300 px-3 py-2" />
                {item.imageUrl && <p className="mt-1 text-xs text-slate-500">Current: {item.imageUrl}</p>}
              </div>
            ) : null}
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
