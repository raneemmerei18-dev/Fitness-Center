import { Section } from "@prisma/client";
import { SectionCard } from "@/components/section-card";
import { requireSection } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProjectsDashboardPage() {
  await requireSection(Section.PROJECTS);
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <SectionCard title="Projects" subtitle="Manage project content shown on the website">
      <form action="/api/admin/projects" method="post" className="mb-6 grid gap-2 rounded-xl border border-dashed border-slate-300 p-4">
        <input type="hidden" name="_action" value="create" />
        <input name="title" required placeholder="Title" className="rounded-md border border-slate-300 px-3 py-2" />
        <input name="slug" required placeholder="slug-example" className="rounded-md border border-slate-300 px-3 py-2" />
        <input name="description" required placeholder="Description" className="rounded-md border border-slate-300 px-3 py-2" />
        <textarea name="details" required rows={3} placeholder="Details" className="rounded-md border border-slate-300 px-3 py-2" />
        <div className="grid gap-2 md:grid-cols-2">
          <input name="location" placeholder="Location" className="rounded-md border border-slate-300 px-3 py-2" />
          <input name="duration" placeholder="Duration" className="rounded-md border border-slate-300 px-3 py-2" />
        </div>
        <button type="submit" className="justify-self-start rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Add Project</button>
      </form>

      <div className="space-y-4">
        {projects.map((project) => (
          <form key={project.id} action="/api/admin/projects" method="post" className="grid gap-2 rounded-xl border border-slate-200 p-4">
            <input type="hidden" name="id" value={project.id} />
            <input name="title" defaultValue={project.title} className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="slug" defaultValue={project.slug} className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="description" defaultValue={project.description} className="rounded-md border border-slate-300 px-3 py-2" />
            <textarea name="details" defaultValue={project.details} rows={3} className="rounded-md border border-slate-300 px-3 py-2" />
            <div className="grid gap-2 md:grid-cols-2">
              <input name="location" defaultValue={project.location ?? ""} className="rounded-md border border-slate-300 px-3 py-2" />
              <input name="duration" defaultValue={project.duration ?? ""} className="rounded-md border border-slate-300 px-3 py-2" />
            </div>
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
