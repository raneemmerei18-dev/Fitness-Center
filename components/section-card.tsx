export function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="dashboard-panel animate-fade-in-up rounded-3xl border border-orange-300/20 bg-white/95 p-6 shadow-2xl backdrop-blur-sm">
      <div className="mb-4">
        <h2 className="text-xl font-black text-slate-900 md:text-2xl">{title}</h2>
        {subtitle ? <p className="text-sm font-medium text-slate-600">{subtitle}</p> : null}
        <div className="mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-orange-500 to-red-600" />
      </div>
      {children}
    </section>
  );
}
