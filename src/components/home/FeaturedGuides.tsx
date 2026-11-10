import Link from "next/link";

const guides = [
  {
    href: "/guides/how-much-mulch-do-i-need",
    title: "How Much Mulch Do I Need?",
    description:
      "Learn the volume formula in imperial and metric, then convert to bags.",
  },
  {
    href: "/guides/how-many-tons-of-gravel-do-i-need",
    title: "How Many Tons of Gravel Do I Need?",
    description:
      "Convert gravel volume to approximate tons or tonnes for bulk orders.",
  },
  {
    href: "/guides/bags-vs-bulk-landscaping-materials",
    title: "Bags vs Bulk Landscaping Materials",
    description:
      "Choose bagged or bulk with a simple volume-and-logistics checklist.",
  },
];

export function FeaturedGuides() {
  return (
    <section className="border-y border-border bg-subtle/50 py-16 md:py-20">
      <div className="container-yardwise">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-3xl text-deep-green md:text-4xl">
              Plan Your Next Garden Project
            </h2>
            <p className="mt-3 text-text-secondary">
              Short, practical guides that answer the questions behind the calculator —
              written for projects worldwide.
            </p>
          </div>
          <Link
            href="/guides"
            className="text-sm font-semibold text-forest hover:text-deep-green"
          >
            Browse all guides →
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-[14px] border border-border bg-card p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-[var(--shadow-md)]"
            >
              <h3 className="text-lg text-deep-green group-hover:text-forest">
                {guide.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {guide.description}
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-clay">
                Read guide
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
