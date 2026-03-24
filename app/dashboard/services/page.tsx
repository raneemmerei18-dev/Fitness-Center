import { Section } from "@prisma/client";
import { SectionCard } from "@/components/section-card";
import { requireSection } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ServicesDashboardPage() {
  await requireSection(Section.SERVICES);
  const services = await prisma.service.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <SectionCard title="Services" subtitle="Create, update, and delete service cards">
      <form action="/api/admin/services" method="post" className="mb-6 grid gap-2 rounded-xl border border-dashed border-slate-300 p-4">
        <input type="hidden" name="_action" value="create" />
        <input name="title" placeholder="Title" required className="rounded-md border border-slate-300 px-3 py-2" />
        <input name="summary" placeholder="Summary" required className="rounded-md border border-slate-300 px-3 py-2" />
        <textarea name="details" placeholder="Details" required rows={3} className="rounded-md border border-slate-300 px-3 py-2" />
        <input name="displayOrder" type="number" defaultValue={1} className="rounded-md border border-slate-300 px-3 py-2" />
        <button type="submit" className="justify-self-start rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Add Service</button>
      </form>

      <div className="space-y-4">
        {services.map((service) => (
          <form key={service.id} action="/api/admin/services" method="post" className="grid gap-2 rounded-xl border border-slate-200 p-4">
            <input type="hidden" name="id" value={service.id} />
            <input name="title" defaultValue={service.title} className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="summary" defaultValue={service.summary} className="rounded-md border border-slate-300 px-3 py-2" />
            <textarea name="details" defaultValue={service.details} rows={3} className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="displayOrder" type="number" defaultValue={service.displayOrder} className="rounded-md border border-slate-300 px-3 py-2" />
            <div className="flex gap-2">
              <button type="submit" className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600">Update</button>
              <button type="submit" name="_action" value="delete" className="rounded-md border border-red-300 px-3 py-2 text-sm font-semibold text-red-700">Delete</button>
            </div>
          </form>
        ))}
      </div>
    </SectionCard>
  );
}
