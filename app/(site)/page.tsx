import Link from "next/link";
import { getSiteContentMap } from "@/lib/data";
import connectDB from "@/lib/db/connect";
import { Service, Project } from "@/lib/db/models";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await connectDB();
  const content = await getSiteContentMap();
  const hero = content.home_hero;
  const services = await Service.find()
    .sort({ displayOrder: 1 })
    .limit(3)
    .lean();
  const projects = await Project.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return (
    <main className="overflow-x-hidden">
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="animate-pulse-slow absolute top-10 left-10 h-96 w-96 rounded-full bg-orange-500 blur-3xl" />
          <div className="animate-pulse-slow absolute right-10 bottom-10 h-96 w-96 rounded-full bg-red-600 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-20 md:px-6 md:py-32">
          <div className="grid w-full items-center gap-12 md:grid-cols-2">
            <div className="animate-fade-in-up space-y-8">
              <div className="space-y-4">
                <p className="animate-slide-left text-sm font-bold tracking-wider text-orange-400 uppercase">
                  Transform Your Body & Mind
                </p>
                <h1 className="animate-slide-left text-5xl leading-tight font-black text-white md:text-6xl">
                  {hero?.title ?? "Rise to Your Peak"}
                </h1>
              </div>

              <p
                className="animate-fade-in-up max-w-lg text-xl leading-relaxed text-gray-200"
                style={{ animationDelay: "0.2s" }}
              >
                {hero?.subtitle}
              </p>

              <p
                className="animate-fade-in-up max-w-lg text-lg text-gray-300"
                style={{ animationDelay: "0.4s" }}
              >
                {hero?.body}
              </p>

              <div
                className="animate-fade-in-up flex gap-4 pt-4"
                style={{ animationDelay: "0.6s" }}
              >
                <Link
                  href="/projects"
                  className="hover-lift rounded-full bg-orange-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:bg-orange-700 hover:shadow-orange-500/50"
                >
                  Start Your Journey
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border-2 border-orange-400 px-8 py-3 font-bold text-orange-400 transition-all duration-300 hover:bg-orange-400 hover:text-slate-900"
                >
                  Get in Touch
                </Link>
              </div>

              <div
                className="animate-fade-in-up flex gap-8 pt-6 text-white"
                style={{ animationDelay: "0.8s" }}
              >
                <div>
                  <p className="text-3xl font-black text-orange-400">2000+</p>
                  <p className="text-sm text-gray-300">Transformations</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-orange-400">25+</p>
                  <p className="text-sm text-gray-300">Expert Coaches</p>
                </div>
                <div>
                  <p className="text-3xl font-black text-orange-400">24/7</p>
                  <p className="text-sm text-gray-300">Access</p>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="animate-pulse-slow absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 opacity-30 blur-2xl" />
              <div className="hover-lift relative rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-1">
                <div className="flex h-80 items-center justify-center rounded-2xl bg-slate-900 p-12">
                  <div className="animate-float text-center">
                    <div className="mb-4 text-6xl font-black text-orange-500">💪</div>
                    <p className="text-xl font-bold text-white">Elite Fitness</p>
                    <p className="mt-2 text-sm text-gray-300">Performance Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-20 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="animate-fade-in-up mb-16 text-center">
            <p className="mb-3 text-sm font-bold tracking-wider text-orange-600 uppercase">
              What We Offer
            </p>
            <h2 className="text-4xl font-black text-slate-900 md:text-5xl">
              Premium Services
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Comprehensive programs designed to transform your fitness and
              health
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className="hover-lift animate-fade-in-up group rounded-2xl bg-white p-8 shadow-lg"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 transition-transform group-hover:scale-110">
                  <span className="text-xl font-black text-white">{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 transition-colors group-hover:text-orange-600">
                  {service.title}
                </h3>
                <p className="mt-3 font-semibold text-gray-600">
                  {service.summary}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {service.details}
                </p>
                <div className="mt-6 h-1 bg-gradient-to-r from-orange-500 to-transparent transition-all group-hover:to-orange-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 px-4 py-20 md:px-6">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-orange-500 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="animate-fade-in-up mb-16 text-center">
            <p className="mb-3 text-sm font-bold tracking-wider text-orange-400 uppercase">
              Results That Inspire
            </p>
            <h2 className="text-4xl font-black text-white md:text-5xl">
              Featured Programs
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project, idx) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="animate-fade-in-up group"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="hover-lift relative h-full rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-1">
                  <div className="flex h-full flex-col justify-between rounded-xl bg-slate-800 p-8 transition-colors group-hover:bg-slate-700">
                    <div>
                      <div className="mb-3 inline-block rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white transition-colors group-hover:bg-orange-600">
                        {project.duration}
                      </div>
                      <h3 className="text-2xl font-black text-white transition-colors group-hover:text-orange-400">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-sm text-gray-300">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center font-bold text-orange-400 transition-all group-hover:gap-2">
                      Explore
                      <span className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-20 md:px-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white blur-3xl" />
        </div>

        <div className="animate-fade-in-up relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
            Ready to Transform?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-orange-100">
            Join 2000+ members who&apos;ve already achieved their fitness goals
            at FitMotion
          </p>
          <Link
            href="/contact"
            className="hover-lift inline-block rounded-full bg-slate-900 px-10 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:bg-black"
          >
            Start Your Transformation Today
          </Link>
        </div>
      </section>
    </main>
  );
}
