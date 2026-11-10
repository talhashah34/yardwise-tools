import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { PeaGravelCalculator } from "@/components/calculator/PeaGravelCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { calculatorSeoContent } from "@/config/calculator-seo";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Pea Gravel Calculator – How Much Pea Gravel Do You Need? | Yardwise",
  description:
    "Free U.S. pea gravel calculator. Estimate cubic yards, bags, and approximate weight for walkways, patios, and decorative fills.",
  path: "/tools/pea-gravel-calculator",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Yardwise Pea Gravel Calculator",
  url: `${siteConfig.url}/tools/pea-gravel-calculator`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  inLanguage: ["en"],
  description:
    "Calculate how much pea gravel you need in cubic yards, bags, and approximate weight.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PeaGravelCalculatorPage() {
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
            { label: "Pea Gravel Calculator" },
          ]}
        />
      </div>

      <PeaGravelCalculator />
      <CalculatorSeoSection content={calculatorSeoContent["pea-gravel"]} />
    </div>
  );
}
