import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { MulchCalculator } from "@/components/calculator/MulchCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { calculatorSeoContent } from "@/config/calculator-seo";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Mulch Calculator – How Much Mulch Do You Need? | Yardwise",
  description:
    "Free U.S. mulch calculator. Estimate cubic yards, bag counts, and bagged vs bulk options for flower beds and landscaping projects.",
  path: "/tools/mulch-calculator",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Yardwise Mulch Calculator",
  url: `${siteConfig.url}/tools/mulch-calculator`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  inLanguage: ["en"],
  description:
    "Calculate how much mulch your garden beds need in cubic yards, cubic feet, and bags.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function MulchCalculatorPage() {
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
            { label: "Mulch Calculator" },
          ]}
        />
      </div>

      <MulchCalculator />
      <CalculatorSeoSection content={calculatorSeoContent.mulch} />
    </div>
  );
}
