import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { DrivewayGravelCalculator } from "@/components/calculator/DrivewayGravelCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { calculatorSeoContent } from "@/config/calculator-seo";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Gravel Driveway Calculator – Tons & Cubic Yards | Yardwise",
  description:
    "Free U.S. gravel driveway calculator. Estimate cubic yards and approximate tons for driveway base and surface layers.",
  path: "/tools/gravel-driveway-calculator",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Yardwise Gravel Driveway Calculator",
  url: `${siteConfig.url}/tools/gravel-driveway-calculator`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  inLanguage: ["en"],
  description:
    "Calculate driveway gravel needs in cubic yards, bags, and approximate tons.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function DrivewayGravelCalculatorPage() {
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
            { label: "Gravel Driveway Calculator" },
          ]}
        />
      </div>

      <DrivewayGravelCalculator />
      <CalculatorSeoSection content={calculatorSeoContent.driveway} />
    </div>
  );
}
