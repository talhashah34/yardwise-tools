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
          <p className="mt-5 max-w-lg text-base text-text-secondary md:text-lg">
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

          <ul className="mt-8 flex flex-col gap-2 text-sm text-text-secondary sm:flex-row sm:flex-wrap sm:gap-x-6">
            <li className="inline-flex items-center gap-2">
              <TrustDot />
              Easy-to-use calculators
            </li>
            <li className="inline-flex items-center gap-2">
              <TrustDot />
              Imperial and metric units
            </li>
            <li className="inline-flex items-center gap-2">
              <TrustDot />
              Practical material estimates
            </li>
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

function TrustDot() {
  return (
    <span
      className="inline-block h-1.5 w-1.5 rounded-full bg-forest"
      aria-hidden="true"
    />
  );
}
