import { getSiteContentMap } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getSiteContentMap();
  const about = content.about_main ?? content.about_intro;

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-orange-400 uppercase text-sm font-bold tracking-wider mb-3 animate-fade-in-up">Who We Are</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">{about?.title ?? "About FitMotion"}</h1>
          <p className="text-2xl text-orange-300 font-bold mb-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>{about?.subtitle}</p>
          <p className="text-lg text-gray-200 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>{about?.body}</p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-1 animate-fade-in-up">
            <div className="bg-white rounded-2xl p-12 text-center">
              <p className="text-gray-700 whitespace-pre-wrap text-lg font-semibold leading-relaxed">{about?.details}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
