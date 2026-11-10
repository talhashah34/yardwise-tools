import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { CompostCalculator } from "@/components/calculator/CompostCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { calculatorSeoContent } from "@/config/calculator-seo";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Compost Calculator – How Much Compost Do You Need? | Yardwise",
  description:
    "Free U.S. compost calculator. Estimate cubic yards and bags for garden beds, amendments, and top-dressing.",
  path: "/tools/compost-calculator",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Yardwise Compost Calculator",
  url: `${siteConfig.url}/tools/compost-calculator`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  inLanguage: ["en"],
  description:
    "Calculate how much compost your garden beds need in cubic yards, cubic feet, and bags.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function CompostCalculatorPage() {
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
            { label: "Compost Calculator" },
          ]}
        />
      </div>

      <CompostCalculator />
      <CalculatorSeoSection content={calculatorSeoContent.compost} />
    </div>
  );
}
