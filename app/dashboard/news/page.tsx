import { Section } from "@prisma/client";
import { SectionCard } from "@/components/section-card";
import { requireSection } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function NewsDashboardPage() {
  await requireSection(Section.NEWS);
  const posts = await prisma.newsPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <SectionCard title="News Management" subtitle="Create, edit, and delete news posts">
      <form action="/api/admin/news" method="post" className="mb-6 grid gap-2 rounded-xl border border-dashed border-slate-300 p-4">
        <input type="hidden" name="_action" value="create" />
        <input name="title" required placeholder="Title" className="rounded-md border border-slate-300 px-3 py-2" />
        <input name="slug" required placeholder="slug" className="rounded-md border border-slate-300 px-3 py-2" />
        <input name="excerpt" required placeholder="Excerpt" className="rounded-md border border-slate-300 px-3 py-2" />
        <textarea name="content" required rows={4} placeholder="Content" className="rounded-md border border-slate-300 px-3 py-2" />
        <button type="submit" className="justify-self-start rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Add News</button>
      </form>

      <div className="space-y-4">
        {posts.map((post) => (
          <form key={post.id} action="/api/admin/news" method="post" className="grid gap-2 rounded-xl border border-slate-200 p-4">
            <input type="hidden" name="id" value={post.id} />
            <input name="title" defaultValue={post.title} className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="slug" defaultValue={post.slug} className="rounded-md border border-slate-300 px-3 py-2" />
            <input name="excerpt" defaultValue={post.excerpt} className="rounded-md border border-slate-300 px-3 py-2" />
            <textarea name="content" defaultValue={post.content} rows={4} className="rounded-md border border-slate-300 px-3 py-2" />
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
