import Link from "next/link";

const guides = [
  {
    href: "/guides/how-much-mulch-for-flower-beds",
    title: "How Much Mulch for Flower Beds?",
    description:
      "U.S. cubic-yard formula, bag counts, and depth tips for flower beds.",
  },
  {
    href: "/guides/how-deep-should-a-gravel-driveway-be",
    title: "How Deep Should a Gravel Driveway Be?",
    description:
      "Base and surface depths for American driveways, plus yards-to-tons planning.",
  },
  {
    href: "/guides/fill-dirt-vs-topsoil",
    title: "Fill Dirt vs Topsoil",
    description:
      "Know what to buy for grading vs planting — and calculate cubic yards first.",
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
              Short, practical U.S.-focused guides that answer the questions behind the
              calculator — with clear next steps to estimate materials.
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
