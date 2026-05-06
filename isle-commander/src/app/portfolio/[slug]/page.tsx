import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FileText, GitBranch, Layers, Target } from "lucide-react";
import {
  allPortfolioItems,
  getPortfolioItemBySlug,
  getRelatedPortfolioItems,
} from "@/lib/portfolio";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return allPortfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);

  if (!item) {
    return {
      title: "Portfolio Item",
    };
  }

  return {
    title: `${item.title} - Louis Zhang`,
    description: item.details.slice(0, 155),
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getPortfolioItemBySlug(slug);

  if (!item) notFound();

  const related = getRelatedPortfolioItems(item);
  const primaryAction = item.demo ?? item.github ?? item.documents[0]?.href;

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-on-background)]">
      <section className="relative overflow-hidden bg-[#061015] px-6 pb-16 pt-8 text-white">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `radial-gradient(circle at 72% 18%, ${item.accent}55, transparent 28%), linear-gradient(135deg, #061015, #0d1d21 52%, #161006)`,
          }}
        />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative mx-auto max-w-6xl">
          <Link
            href="/portfolio#projects"
            className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/78 backdrop-blur transition hover:bg-white/16"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-100/76">
                <Target className="h-3.5 w-3.5" />
                {item.sector}
              </div>
              <h1 className="font-headline text-5xl font-extrabold leading-[0.95] sm:text-7xl">
                {item.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">{item.subtitle}</p>
            </div>

            <div className="rounded-2xl border border-white/12 bg-white/[0.07] p-5 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="text-xs font-bold uppercase tracking-widest text-white/45">Snapshot</div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/72">{item.emoji}</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(item.metrics.length ? item.metrics : item.skills.slice(0, 4)).map((metric) => (
                  <div key={metric} className="rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white/75">
                    {metric}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="space-y-10">
            <div className="rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">
                <Layers className="h-4 w-4" />
                Full Brief
              </div>
              <p className="text-base leading-8 text-[var(--color-on-surface-variant)]">{item.details}</p>
            </div>

            {item.gallery.length > 0 && (
              <div>
                <h2 className="mb-5 font-headline text-2xl font-extrabold text-[var(--color-on-surface)]">
                  Visual Evidence
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {item.gallery.map((src, index) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${item.title} visual ${index + 1}`}
                      className="aspect-video w-full rounded-2xl border border-[var(--color-outline-variant)] object-cover shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}

            {item.documents.length > 0 && (
              <div>
                <h2 className="mb-5 font-headline text-2xl font-extrabold text-[var(--color-on-surface)]">
                  Documents
                </h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {item.documents.map((doc) => (
                    <a
                      key={doc.href}
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-4 transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <FileText className="mb-4 h-6 w-6 text-[var(--color-primary)]" />
                      <div className="font-semibold text-[var(--color-on-surface)]">{doc.label}</div>
                      <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)]">
                        Open PDF
                        <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="space-y-6">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="aspect-[4/3] w-full rounded-2xl border border-[var(--color-outline-variant)] object-cover shadow-sm"
              />
            )}

            <div className="rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-5">
              <h2 className="font-headline text-xl font-extrabold text-[var(--color-on-surface)]">Stack & Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-[var(--color-surface-container-highest)] px-3 py-1 text-xs font-semibold text-[var(--color-on-surface-variant)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {(item.github || item.demo || primaryAction) && (
              <div className="rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-5">
                <h2 className="font-headline text-xl font-extrabold text-[var(--color-on-surface)]">Links</h2>
                <div className="mt-4 grid gap-3">
                  {item.demo && (
                    <a href={item.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-bold text-white">
                      View demo <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                  {item.github && (
                    <a href={item.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between rounded-xl border border-[var(--color-outline-variant)] px-4 py-3 text-sm font-bold text-[var(--color-on-surface)]">
                      <span className="inline-flex items-center gap-2"><GitBranch className="h-4 w-4" /> GitHub</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            )}

            {related.length > 0 && (
              <div className="rounded-2xl border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-low)] p-5">
                <h2 className="font-headline text-xl font-extrabold text-[var(--color-on-surface)]">Related</h2>
                <div className="mt-4 grid gap-2">
                  {related.map((relatedItem) => (
                    <Link
                      key={relatedItem.id}
                      href={`/portfolio/${relatedItem.slug}`}
                      className="rounded-xl border border-[var(--color-outline-variant)] bg-white/30 px-4 py-3 text-sm font-semibold text-[var(--color-on-surface)] transition hover:text-[var(--color-primary)]"
                    >
                      {relatedItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
