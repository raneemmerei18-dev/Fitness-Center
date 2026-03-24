import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-orange-400 uppercase text-sm font-bold tracking-wider mb-3 animate-fade-in-up">Fitness Knowledge</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">Fitness Blog</h1>
          <p className="text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Expert training tips, nutrition guidance, and mindset strategies to accelerate your fitness journey
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, idx) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-200 h-full flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold mb-3">
                      📅 {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{post.excerpt}</p>
                  </div>
                  <div className="mt-6 text-orange-600 font-bold group-hover:gap-2 flex items-center transition-all">
                    Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
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
