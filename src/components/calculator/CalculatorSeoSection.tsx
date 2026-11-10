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
  return (
    <section className="no-print mt-14 max-w-3xl">
      <h2 className="text-2xl text-deep-green">How this {calculatorName.toLowerCase()} works</h2>
      <div className="mt-4 space-y-4 text-text-secondary">
        <p>
          Enter each area&apos;s shape and size, choose a {materialLabel} depth, and
          optionally add bag or bulk prices in your local currency. Yardwise converts
          those inputs into cubic yards or cubic metres, cubic feet, whole-bag counts
          {extraNotes.includes("weight") ? ", and approximate weight" : ""}.
        </p>
        <div className="rounded-[14px] border border-border bg-card p-4 text-sm text-text">
          <p className="font-semibold text-deep-green">Volume formulas</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-text-secondary">
            <li>
              Imperial: area (sq ft) × depth (inches) ÷ <strong>324</strong> = cubic yards
            </li>
            <li>
              Metric: area (m²) × depth (metres) = cubic metres
            </li>
            <li>Bags = cubic feet ÷ bag size, rounded up to whole bags</li>
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
              <Link href={guideHref} className="font-medium text-forest hover:underline">
                {guideLabel}
              </Link>
              .
            </>
          ) : null}
        </p>
        {related.length > 0 ? (
          <p className="text-sm">
            Related tools:{" "}
            {related.map((item, index) => (
              <span key={item.href}>
                {index > 0 ? " · " : null}
                <Link href={item.href} className="font-medium text-forest hover:underline">
                  {item.label}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
      </div>
    </section>
  );
}
