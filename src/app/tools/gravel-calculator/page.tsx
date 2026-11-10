import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { GravelCalculator } from "@/components/calculator/GravelCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Gravel Calculator – How Much Gravel Do You Need? | Yardwise",
  description:
    "Free global gravel calculator. Estimate cubic yards or cubic metres, bags, and approximate tons or tonnes for paths and decorative beds.",
  path: "/tools/gravel-calculator",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Yardwise Gravel Calculator",
  url: `${siteConfig.url}/tools/gravel-calculator`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  inLanguage: ["en"],
  description:
    "Calculate how much gravel your paths and beds need in cubic yards, cubic metres, bags, and approximate weight.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function GravelCalculatorPage() {
  return (
    <div className="container-yardwise py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="no-print">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/tools" },
            { label: "Gravel Calculator" },
          ]}
        />
      </div>

      <GravelCalculator />

      <CalculatorSeoSection
        materialLabel="gravel"
        calculatorName="Gravel Calculator"
        guideHref="/guides/how-much-gravel-do-i-need"
        guideLabel="How Much Gravel Do I Need?"
        extraNotes={["weight"]}
        related={[
          { href: "/tools/pea-gravel-calculator", label: "Pea Gravel Calculator" },
          {
            href: "/tools/gravel-driveway-calculator",
            label: "Gravel Driveway Calculator",
          },
          { href: "/guides/how-many-tons-of-gravel-do-i-need", label: "Tons of gravel guide" },
        ]}
      />
    </div>
  );
}
