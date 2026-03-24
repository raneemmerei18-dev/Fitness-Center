import Link from "next/link";
import connectDB from "@/lib/db/connect";
import { Project } from "@/lib/db/models";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  await connectDB();
  const projects = await Project.find()
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-orange-400 uppercase text-sm font-bold tracking-wider mb-3 animate-fade-in-up">Success Stories</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">Transformation Programs</h1>
          <p className="text-xl text-gray-300 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Proven programs that deliver real results. Join thousands of members who&apos;ve transformed their bodies and lives.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group animate-fade-in-up hover-lift"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="relative bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-1 h-full">
                  <div className="bg-white rounded-2xl p-8 h-full flex flex-col justify-between group-hover:shadow-2xl transition-all duration-300">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                          ⏱️ {project.duration}
                        </span>
                        {project.location && (
                          <span className="inline-block text-gray-600 text-xs font-semibold">📍 {project.location}</span>
                        )}
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 group-hover:text-orange-600 transition-colors mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed">{project.description}</p>
                    </div>
                    <div className="mt-6 flex items-center text-orange-600 font-bold group-hover:gap-2 transition-all">
                      Learn More <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
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
