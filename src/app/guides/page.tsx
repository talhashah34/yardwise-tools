import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { guides } from "@/content/guides";
import { createMetadata } from "@/lib/seo/metadata";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Landscaping Guides | Yardwise",
  description:
    "Practical global landscaping guides on mulch, gravel, topsoil, compost, bags vs bulk, and measuring garden beds in imperial or metric units.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <div className="container-yardwise py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]} />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-4xl text-deep-green md:text-5xl">Guides</h1>
        <p className="mt-4 text-lg text-text-secondary">
          Clear answers behind material estimates — imperial and metric, written to
          help you plan before you buy.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {guides.map((guide) => (
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
          </Link>
        ))}
      </div>
    </div>
  );
}
