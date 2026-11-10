import Link from "next/link";

interface CalculatorSeoSectionProps {
  materialLabel: string;
  calculatorName: string;
  guideHref?: string;
  guideLabel?: string;
  related?: Array<{ href: string; label: string }>;
  extraNotes?: string[];
}

export function CalculatorSeoSection({
  materialLabel,
  calculatorName,
  guideHref,
  guideLabel,
  related = [],
  extraNotes = [],
}: CalculatorSeoSectionProps) {
  const formulas = [
    {
      label: "Imperial",
      detail: (
        <>
          area (sq ft) × depth (inches) ÷ <strong className="text-deep-green">324</strong> =
          cubic yards
        </>
      ),
    },
    {
      label: "Metric",
      detail: <>area (m²) × depth (metres) = cubic metres</>,
    },
    {
      label: "Bags",
      detail: <>cubic feet ÷ bag size, rounded up to whole bags</>,
    },
  ];

  return (
    <section className="no-print mt-14 max-w-3xl">
      <h2 className="text-[1.5rem] leading-snug text-deep-green sm:text-2xl">
        How this {calculatorName.toLowerCase()} works
      </h2>
      <div className="mt-4 space-y-5 text-[1.02rem] leading-relaxed text-text-secondary">
        <p>
          Enter each area&apos;s shape and size, choose a {materialLabel} depth, and
          optionally add bag or bulk prices in your local currency. Yardwise converts
          those inputs into cubic yards or cubic metres, cubic feet, whole-bag counts
          {extraNotes.includes("weight") ? ", and approximate weight" : ""}.
        </p>

        <div className="overflow-hidden rounded-[16px] border border-border bg-card shadow-[var(--shadow-sm)]">
          <div className="border-b border-border bg-soft-sage/60 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-forest">
              Volume formulas
            </p>
          </div>
          <ul className="divide-y divide-border">
            {formulas.map((formula) => (
              <li
                key={formula.label}
                className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <span className="inline-flex w-fit shrink-0 rounded-[7px] bg-subtle px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-clay">
                  {formula.label}
                </span>
                <span className="text-sm leading-relaxed text-text sm:text-[0.95rem]">
                  {formula.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p>
          Estimates are for planning worldwide — product density, moisture, and spreading
          technique can change coverage. Confirm quantities with your local supplier
          before you buy.
          {guideHref && guideLabel ? (
            <>
              {" "}
              For a fuller walkthrough, read{" "}
              <Link href={guideHref} className="font-semibold text-forest underline-offset-2 hover:underline">
                {guideLabel}
              </Link>
              .
            </>
          ) : null}
        </p>

        {related.length > 0 ? (
          <div>
            <p className="mb-2.5 text-sm font-semibold text-deep-green">Related tools</p>
            <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              {related.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex w-full items-center justify-between gap-2 rounded-[10px] border border-border bg-card px-3.5 py-2.5 text-sm font-medium text-forest shadow-[var(--shadow-sm)] transition-colors hover:border-forest/30 hover:bg-soft-sage/50 sm:w-auto"
                  >
                    {item.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
