import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });

  if (!post) {
    notFound();
  }

  return (
    <main>
      <article className="mx-auto max-w-4xl px-4 md:px-6 py-20">
        <div className="mb-8 animate-fade-in-up">
          <Link href="/blog" className="text-orange-600 font-bold hover:text-orange-700 flex items-center gap-1 mb-4">
            ← Back to Blog
          </Link>
          <p className="text-sm text-gray-500 font-semibold mb-4">
            📅 {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6">{post.title}</h1>
          <p className="text-xl text-gray-700 leading-relaxed">{post.excerpt}</p>
        </div>

        <div className="border-t-2 border-orange-200 py-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="prose prose-lg max-w-none">
            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">{post.content}</p>
          </div>
        </div>

        <section className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <h3 className="text-2xl font-black text-slate-900 mb-4">Continue Your Fitness Journey</h3>
          <p className="text-gray-700 mb-6">Ready to apply these tips to your training? Let&apos;s work together to achieve your goals.</p>
          <Link href="/contact" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-8 rounded-lg hover-lift transition-all inline-block">
            Contact Our Team
          </Link>
        </section>
      </article>
    </main>
  );
}
