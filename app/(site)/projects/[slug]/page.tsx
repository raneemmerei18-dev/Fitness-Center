import Link from "next/link";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db/connect";
import { Project } from "@/lib/db/models";

export const dynamic = "force-dynamic";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connectDB();
  const { slug } = await params;
  const project = (await Project.findOne({ slug }).lean().exec()) as {
    title: string;
    slug: string;
    description: string;
    details: string;
    location?: string | null;
    duration?: string | null;
  } | null;

  if (!project) {
    notFound();
  }

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-4 animate-fade-in-up">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
              ⏱️ {project.duration}
            </span>
            {project.location && (
              <span className="text-gray-300 text-sm font-semibold">📍 {project.location}</span>
            )}
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">{project.title}</h1>
          <p className="text-2xl text-orange-300 font-bold animate-fade-in-up" style={{ animationDelay: "0.2s" }}>{project.description}</p>
          <p className="mt-6 text-lg text-gray-200 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>{project.details}</p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl font-black text-slate-900 mb-8">Register Your Interest</h2>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-1 animate-fade-in-up">
            <form action={`/api/projects/${project.slug}/interest`} method="post" className="bg-white rounded-2xl p-10 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Full Name *</label>
                  <input 
                    name="name" 
                    required 
                    placeholder="John Doe" 
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">Email *</label>
                  <input 
                    name="email" 
                    type="email" 
                    required 
                    placeholder="john@example.com" 
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Phone</label>
                <input 
                  name="phone" 
                  placeholder="+1 (555) 000-0000" 
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">Your Fitness Goal *</label>
                <textarea 
                  name="message" 
                  required 
                  placeholder="Tell us about your fitness goals and why this program interests you..."
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                  rows={5}
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg hover-lift transition-all shadow-lg"
              >
                Submit Interest
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-6 bg-slate-50 text-center">
        <div className="mx-auto max-w-4xl">
          <p className="text-gray-600 mb-4">Ready to learn more?</p>
          <Link 
            href="/contact" 
            className="inline-block bg-slate-900 hover:bg-black text-white font-bold py-3 px-8 rounded-full hover-lift transition-all"
          >
            Contact Our Team
          </Link>
        </div>
      </section>
    </main>
  );
}
