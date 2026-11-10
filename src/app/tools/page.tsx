import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { createMetadata } from "@/lib/seo/metadata";
import Image from "next/image";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Landscaping Calculators | Yardwise",
  description:
    "Browse Yardwise landscaping calculators for mulch, topsoil, compost, gravel, pea gravel, and driveways. Imperial or metric — estimate before you buy.",
  path: "/tools",
});

const tools = [
  {
    href: "/tools/mulch-calculator",
    title: "Mulch Calculator",
    description:
      "Estimate mulch volume for multiple garden beds worldwide, switch between imperial and metric, and compare bagged versus bulk purchase options.",
    image: "/images/mulch-beds.jpg",
    imageAlt: "Mulched planting beds ready for landscaping work",
    cta: "Open Mulch Calculator",
  },
  {
    href: "/tools/topsoil-calculator",
    title: "Topsoil Calculator",
    description:
      "Plan new beds, grade fills, and top-dressing projects with cubic-yard or cubic-metre estimates and optional settling allowance.",
    image: "/images/hero-garden.jpg",
    imageAlt: "Garden beds and lawn ready for soil and planting work",
    cta: "Open Topsoil Calculator",
  },
  {
    href: "/tools/compost-calculator",
    title: "Compost Calculator",
    description:
      "Estimate compost for bed amendments and top dressing with shallower default depths, bagged or bulk options, and optional cost comparison.",
    image: "/images/compost-soil.jpg",
    imageAlt: "Young plants growing in dark, compost-rich garden soil",
    cta: "Open Compost Calculator",
  },
  {
    href: "/tools/gravel-calculator",
    title: "Gravel Calculator",
    description:
      "Plan paths, borders, and decorative gravel beds with volume estimates, bag counts, and approximate tons or tonnes.",
    image: "/images/gravel-path.jpg",
    imageAlt: "Garden path bordered by flowering shrubs leading to a gazebo",
    cta: "Open Gravel Calculator",
  },
  {
    href: "/tools/pea-gravel-calculator",
    title: "Pea Gravel Calculator",
    description:
      "Estimate pea gravel for patios, paths, and decorative layers — tuned defaults for smaller stone coverage.",
    image: "/images/pea-gravel.jpg",
    imageAlt: "Close-up of smooth beige pea gravel among garden plants",
    cta: "Open Pea Gravel Calculator",
  },
  {
    href: "/tools/gravel-driveway-calculator",
    title: "Gravel Driveway Calculator",
    description:
      "Estimate driveway gravel with deeper defaults, compaction allowance, and approximate weight for bulk ordering.",
    image: "/images/gravel-driveway.jpg",
    imageAlt: "Residential gravel driveway leading to a garage",
    cta: "Open Driveway Calculator",
  },
];

export default function ToolsPage() {
  return (
    <div className="container-yardwise py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Calculators" }]} />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-[2.25rem] leading-tight text-deep-green sm:text-4xl md:text-5xl">
          Calculators
        </h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
          Practical landscaping material calculators for projects anywhere — imperial or
          metric, bags or bulk.
        </p>
      </header>

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
                Available now
              </p>
              <h2 className="mt-2 text-[1.35rem] leading-snug text-deep-green sm:text-2xl">
                {tool.title}
              </h2>
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
    </div>
  );
}
