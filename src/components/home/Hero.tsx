import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[linear-gradient(165deg,#F8F8F4_0%,#E8EFE7_48%,#F0F2EC_100%)]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-sage/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
      </div>

      <div className="container-yardwise relative grid items-center gap-10 py-14 md:grid-cols-2 md:gap-12 md:py-20 lg:py-24">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-clay">
            Smarter landscaping starts here
          </p>
          <h1 className="text-balance text-4xl text-deep-green md:text-5xl lg:text-[3.25rem]">
            Get Your Garden Project Right. Before You Buy.
          </h1>
          <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-text-secondary md:text-lg md:leading-relaxed">
            Calculate mulch, soil, compost and gravel in imperial or metric units —
            practical tools for outdoor projects anywhere in the world.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/tools/mulch-calculator">
              <Button size="lg" className="w-full sm:w-auto">
                Try Mulch Calculator
              </Button>
            </Link>
            <Link href="/tools">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Explore All Tools
              </Button>
            </Link>
          </div>

          <ul className="mt-8 grid gap-2.5 sm:grid-cols-3 sm:gap-3">
            {[
              "Easy-to-use calculators",
              "Imperial and metric units",
              "Practical material estimates",
            ].map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-3 rounded-[12px] border border-border/80 bg-card/80 px-3.5 py-3 shadow-[var(--shadow-sm)] backdrop-blur-sm"
              >
                <TrustCheck />
                <span className="text-sm font-medium leading-snug text-deep-green">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] shadow-[var(--shadow-lg)]">
            <Image
              src="/images/hero-garden.jpg"
              alt="Freshly mulched garden beds bordering a manicured lawn"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-green/35 via-transparent to-transparent" />
          </div>

          <aside
            className="absolute bottom-4 left-4 right-4 rounded-[14px] border border-white/40 bg-card/95 p-4 shadow-[var(--shadow-md)] backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-auto sm:w-[280px]"
            aria-label="Illustrative calculation example"
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">
              Example preview
            </p>
            <dl className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-secondary">Garden Area</dt>
                <dd className="font-semibold text-text">100 sq ft</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-text-secondary">Mulch Depth</dt>
                <dd className="font-semibold text-text">3 inches</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-border pt-2">
                <dt className="text-text-secondary">Estimated Volume</dt>
                <dd className="font-semibold text-forest">0.93 cu yd</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

function TrustCheck() {
  return (
    <span
      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] bg-soft-sage text-forest"
      aria-hidden="true"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M3 7.2 5.8 10 11 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
