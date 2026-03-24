import Link from "next/link";
import connectDB from "@/lib/db/connect";
import { NewsPost } from "@/lib/db/models";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  await connectDB();
  const news = await NewsPost.find()
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-orange-400 uppercase text-sm font-bold tracking-wider mb-3 animate-fade-in-up">Latest Updates</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">FitMotion News</h1>
          <p className="text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Stay updated with our latest announcements, community events, and fitness breakthroughs
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {news.map((item, idx) => (
              <Link
                key={item.id}
                href={`/news/${item.slug}`}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover-lift border border-gray-200 h-full flex flex-col justify-between">
                  <div>
                    <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
                      🔔 {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{item.excerpt}</p>
                  </div>
                  <div className="mt-6 text-orange-600 font-bold group-hover:gap-2 flex items-center transition-all">
                    Read News <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
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
