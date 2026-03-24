import { prisma } from "@/lib/prisma";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="text-orange-400 uppercase text-sm font-bold tracking-wider mb-3 animate-fade-in-up">Power Your Fitness</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">Our Services</h1>
          <p className="text-xl text-gray-300 max-w-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Comprehensive fitness solutions designed to meet you where you are and take you where you want to go
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl p-8 shadow-lg hover-lift animate-fade-in-up border border-gray-200"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="text-white text-2xl font-black">{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-600 transition-colors mb-3">{service.title}</h3>
                <p className="text-gray-700 font-semibold mb-4 text-lg">{service.summary}</p>
                <p className="text-gray-600 leading-relaxed">{service.details}</p>
                <div className="mt-6 h-1 bg-gradient-to-r from-orange-500 to-transparent group-hover:to-orange-500 transition-all w-0 group-hover:w-full duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-4">Ready to Get Started?</h2>
          <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full hover-lift transition-all">
            Consultation Call
          </button>
        </div>
      </section>
    </main>
  );
}
