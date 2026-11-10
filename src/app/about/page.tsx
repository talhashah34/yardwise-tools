import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";
import Link from "next/link";

export const metadata = createMetadata({
  title: "About Yardwise | Smarter Landscaping Planning",
  description:
    "Yardwise builds practical landscaping calculators that help homeowners estimate materials before they buy.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container-yardwise py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl text-deep-green md:text-5xl">About Yardwise</h1>
        <p className="mt-6 text-lg text-text-secondary">
          Yardwise helps homeowners calculate landscaping materials accurately before
          purchasing them. Our positioning is simple: smarter planning for better
          outdoor spaces.
        </p>

        <div className="mt-8 space-y-5 text-text-secondary">
          <p>
            Too many outdoor projects start with a guess at the garden center. Buy too
            little and the job stalls. Buy too much and unused bags sit in the garage.
            Yardwise exists to replace that guesswork with clear, editable estimates.
          </p>
          <p>
            We start with a thorough{" "}
            <Link href="/tools/mulch-calculator" className="font-medium text-forest hover:underline">
              mulch calculator
            </Link>{" "}
            because mulch is one of the most common materials homeowners need to
            quantify. Additional tools will follow when they can meet the same bar for
            usefulness, clarity, and testing.
          </p>
          <p>
            Yardwise is designed as a lightweight, SEO-focused product: fast pages,
            original guides, and calculators that work entirely in your browser. We do
            not require accounts, and we do not invent market prices for materials.
          </p>
        </div>
      </article>
    </div>
  );
}
