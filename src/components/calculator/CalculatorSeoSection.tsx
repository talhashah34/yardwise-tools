import { AffiliateProducts } from "@/components/affiliates/AffiliateProducts";
import { AdUnit } from "@/components/ads/AdUnit";
import type { CalculatorSeoContent } from "@/config/calculator-seo";
import Link from "next/link";

interface CalculatorSeoSectionProps {
  content: CalculatorSeoContent;
}

export function CalculatorSeoSection({ content }: CalculatorSeoSectionProps) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="no-print mt-14 max-w-3xl space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div>
        <h2 className="text-2xl text-deep-green">
          How to calculate {content.materialLabel} (U.S.)
        </h2>
        <p className="mt-4 text-text-secondary">{content.depthNote}</p>
        <ol className="mt-5 list-decimal space-y-2 pl-5 text-text-secondary">
          {content.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-2xl text-deep-green">Volume formulas</h2>
        <div className="mt-4 rounded-[14px] border border-border bg-card p-4 text-sm text-text">
          <ul className="list-disc space-y-1 pl-5 text-text-secondary">
            <li>
              Imperial: area (sq ft) × depth (inches) ÷ <strong>324</strong> = cubic yards
            </li>
            <li>Metric: area (m²) × depth (metres) = cubic metres</li>
            <li>Bags = cubic feet ÷ bag size, rounded up to whole bags</li>
            {content.extraNotes?.includes("weight") ? (
              <li>Approximate weight uses typical material density — confirm with your supplier</li>
            ) : null}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl text-deep-green">
          Coverage per cubic yard of {content.materialLabel}
        </h2>
        <div className="mt-4 overflow-x-auto rounded-[14px] border border-border">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-subtle text-deep-green">
              <tr>
                <th className="px-4 py-3 font-semibold">Depth</th>
                <th className="px-4 py-3 font-semibold">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {content.coverageRows.map((row) => (
                <tr key={row.depth} className="border-t border-border">
                  <td className="px-4 py-3">{row.depth}</td>
                  <td className="px-4 py-3 text-text-secondary">{row.coverage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl text-deep-green">Frequently asked questions</h2>
        <div className="mt-4 space-y-4">
          {content.faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-[14px] border border-border bg-card px-4 py-3"
            >
              <summary className="cursor-pointer font-semibold text-deep-green">
                {faq.question}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl text-deep-green">Related calculators & guides</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {content.related.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[14px] border border-border bg-card p-4 transition-colors hover:border-forest/40"
            >
              <p className="font-semibold text-deep-green">{item.label}</p>
              <p className="mt-1 text-sm text-text-secondary">{item.blurb}</p>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm text-text-secondary">
          Want the longer walkthrough? Read{" "}
          <Link href={content.guideHref} className="font-medium text-forest hover:underline">
            {content.guideLabel}
          </Link>
          .
        </p>
      </div>

      <div className="rounded-[20px] border border-border bg-soft-sage/50 p-6">
        <h2 className="text-xl text-deep-green">Get a precise estimate now</h2>
        <p className="mt-2 text-text-secondary">
          Use the {content.calculatorName.toLowerCase()} above for cubic yards, bags, and buying
          guidance — then order with confidence.
        </p>
        <a href="#main-content" className="mt-4 inline-flex font-semibold text-forest hover:underline">
          Back to calculator ↑
        </a>
      </div>

      <AffiliateProducts
        collection={content.affiliateCollection}
        title={`Helpful tools for ${content.materialLabel} projects`}
      />

      <AdUnit slot="calculator" className="mt-2" />
    </section>
  );
}
