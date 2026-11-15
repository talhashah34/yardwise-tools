import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getGuidesByCategory } from "@/content/guides";
import { createMetadata } from "@/lib/seo/metadata";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Best Comparison Guides | Yardwise",
  description:
    "Side-by-side comparisons people search for: mulch vs gravel, quartz vs granite, curtains vs blinds, hardwood vs laminate, gravel vs asphalt, and more.",
  path: "/guides/comparisons",
  keywords: [
    "mulch vs gravel",
    "quartz vs granite",
    "curtains vs blinds",
    "hardwood vs laminate",
    "gravel vs asphalt driveway",
    "paint vs wallpaper",
    "open shelving vs cabinets",
    "fill dirt vs topsoil",
  ],
});

export default function ComparisonsHubPage() {
  const comparisons = getGuidesByCategory("comparisons");

  return (
    <div className="container-yardwise py-10 md:py-14">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Guides", href: "/guides" },
          { label: "Comparisons" },
        ]}
      />

      <header className="mb-10 max-w-3xl">
        <h1 className="text-4xl text-deep-green md:text-5xl">Comparison Guides</h1>
        <p className="mt-4 text-lg text-text-secondary">
          Short keywords and long-tail questions in one place — clear tables, FAQs, and
          next-step links so readers can decide fast and keep browsing Yardwise.
        </p>
        <p className="mt-3 text-sm text-text-muted">
          {comparisons.length} comparison articles
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {comparisons.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="group rounded-[14px] border border-border bg-card p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
              {guide.readingTime} read
            </p>
            <h2 className="mt-2 text-xl text-deep-green group-hover:text-forest">
              {guide.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {guide.description}
            </p>
            <p className="mt-4 text-xs text-text-muted">
              Targets: {guide.keywords.slice(0, 3).join(" · ")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
