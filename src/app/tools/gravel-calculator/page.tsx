import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { GravelCalculator } from "@/components/calculator/GravelCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { calculatorSeoContent } from "@/config/calculator-seo";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Gravel Calculator – How Much Gravel Do You Need? | Yardwise",
  description:
    "Free U.S. gravel calculator. Estimate cubic yards, bags, and approximate tons for paths, patios, and decorative beds.",
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
    "Calculate how much gravel your paths and beds need in cubic yards, bags, and approximate weight.",
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
      <CalculatorSeoSection content={calculatorSeoContent.gravel} />
    </div>
  );
}
