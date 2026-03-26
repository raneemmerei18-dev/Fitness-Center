import Link from "next/link";
import connectDB from "@/lib/db/connect";
import { Project } from "@/lib/db/models";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  await connectDB();
  const projects = (await Project.find().sort({ createdAt: -1 }).lean().exec()) as unknown as Array<{
    _id: { toString(): string };
    title: string;
    slug: string;
    description: string;
    location?: string | null;
    duration?: string | null;
    imageUrl?: string | null;
  }>;

  const fallbackImages: Record<string, string> = {
    "transformation-12-week": "https://images.unsplash.com/photo-1549570652-97324981a6fd?auto=format&fit=crop&w=1200&q=80",
    "marathon-training": "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
  };

  return (
    <main>
      <section className="bg-gradient-to-br from-black via-slate-900 to-black py-20 px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-red-400 uppercase text-sm font-bold tracking-wider mb-3 animate-fade-in-up">Success Stories</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">Transformation Programs</h1>
          <p className="text-xl text-gray-300 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Proven programs that deliver real results. Join thousands of members who&apos;ve transformed their bodies and lives.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 bg-slate-100">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <Link
                key={project._id.toString()}
                href={`/projects/${project.slug}`}
                className="group animate-fade-in-up hover-lift"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="relative bg-gradient-to-br from-red-700 to-red-900 rounded-3xl p-1 h-full">
                  <div className="overflow-hidden rounded-2xl bg-black h-full flex flex-col justify-between group-hover:shadow-2xl transition-all duration-300">
                    <img
                      src={project.imageUrl || fallbackImages[project.slug] || "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80"}
                      alt={project.title}
                      className="h-56 w-full object-cover opacity-90 transition duration-500 group-hover:scale-105"
                    />
                    <div className="p-8">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-block bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-1 rounded-full text-xs font-bold">
                          ⏱️ {project.duration}
                        </span>
                        {project.location && (
                          <span className="inline-block text-gray-300 text-xs font-semibold">📍 {project.location}</span>
                        )}
                      </div>
                      <h3 className="text-3xl font-black text-white group-hover:text-red-300 transition-colors mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
                    </div>
                    <div className="mt-6 flex items-center text-red-300 font-bold group-hover:gap-2 transition-all">
                      Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
