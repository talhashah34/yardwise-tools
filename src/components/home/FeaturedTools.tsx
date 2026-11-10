import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

const tools = [
  {
    href: "/tools/mulch-calculator",
    title: "Mulch Calculator",
    description:
      "Estimate cubic yards or cubic metres and bag quantities for rectangular, circular, and triangular beds — with waste allowance and cost comparison.",
    image: "/images/mulch-beds.jpg",
    imageAlt: "Dark mulch spread evenly across a landscaped garden bed",
    cta: "Calculate Mulch",
  },
  {
    href: "/tools/gravel-calculator",
    title: "Gravel Calculator",
    description:
      "Estimate gravel for paths and decorative beds with volume, bags, and approximate tons or tonnes for bulk ordering worldwide.",
    image: "/images/gravel-path.jpg",
    imageAlt: "Garden path bordered by flowering shrubs leading to a gazebo",
    cta: "Calculate Gravel",
  },
  {
    href: "/tools/pea-gravel-calculator",
    title: "Pea Gravel Calculator",
    description:
      "Plan pea gravel paths and patios with coverage defaults tuned for smaller decorative stone.",
    image: "/images/pea-gravel.jpg",
    imageAlt: "Close-up of smooth beige pea gravel among garden plants",
    cta: "Calculate Pea Gravel",
  },
  {
    href: "/tools/gravel-driveway-calculator",
    title: "Gravel Driveway Calculator",
    description:
      "Estimate driveway gravel with deeper defaults, compaction allowance, and approximate weight.",
    image: "/images/gravel-driveway.jpg",
    imageAlt: "Residential gravel driveway leading to a garage",
    cta: "Calculate Driveway Gravel",
  },
];

export function FeaturedTools() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-yardwise">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl text-deep-green md:text-4xl">
            Tools That Make Planning Easier
          </h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-text-secondary">
            Practical calculators for outdoor projects anywhere — mulch, soil, compost,
            and gravel in imperial or metric units.
          </p>
        </div>

        <div className="space-y-5 md:space-y-6">
          {tools.map((tool) => (
            <article
              key={tool.href}
              className="overflow-hidden rounded-[20px] border border-border bg-card shadow-[var(--shadow-sm)] md:grid md:grid-cols-2"
            >
              <div className="relative min-h-[200px] sm:min-h-[220px]">
                <Image
                  src={tool.image}
                  alt={tool.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">
                  Calculator
                </p>
                <h3 className="mt-2 text-[1.35rem] leading-snug text-deep-green sm:text-2xl">
                  {tool.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary sm:text-[0.95rem]">
                  {tool.description}
                </p>
                <div className="mt-5 sm:mt-6">
                  <Link href={tool.href}>
                    <Button className="w-full sm:w-auto">{tool.cta}</Button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/tools"
            className="text-sm font-semibold text-forest hover:text-deep-green"
          >
            Browse all calculators →
          </Link>
        </div>
      </div>
    </section>
  );
}
