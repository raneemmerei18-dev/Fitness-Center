import { getSiteContentMap } from "@/lib/data";

export default async function ContactPage() {
  const content = await getSiteContentMap();
  const contactInfo = content.contact_info;

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-orange-400 uppercase text-sm font-bold tracking-wider mb-3 animate-fade-in-up">Get In Touch</p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">Contact FitMotion</h1>
          <p className="text-xl text-gray-300 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Have questions? Our team is ready to help you start your transformation journey.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 md:px-6 bg-slate-50">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6">We&apos;d Love to Hear From You</h2>
              <p className="text-lg text-gray-700 whitespace-pre-wrap leading-relaxed">{contactInfo?.body}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <p className="text-sm text-gray-500 font-semibold mb-2">Hours of Operation</p>
              <p className="text-lg font-bold text-slate-900">{contactInfo?.details}</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                <p className="text-sm font-bold text-orange-700 mb-2">📞 Call</p>
                <p className="text-2xl font-black text-slate-900">+1 555 0100</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                <p className="text-sm font-bold text-orange-700 mb-2">📧 Email</p>
                <p className="text-2xl font-black text-slate-900">hello@fitmotion.example</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-1 h-full">
              <form action="/api/contact" method="post" className="bg-white rounded-2xl p-10 space-y-5 h-full flex flex-col justify-between">
                <div className="space-y-5">
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
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Phone</label>
                    <input
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">Tell Us About You *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Your fitness goals, questions, or inquiry details..."
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition resize-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg hover-lift transition-all shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
