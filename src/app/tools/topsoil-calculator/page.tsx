import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { TopsoilCalculator } from "@/components/calculator/TopsoilCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { calculatorSeoContent } from "@/config/calculator-seo";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Topsoil Calculator – How Much Topsoil Do You Need? | Yardwise",
  description:
    "Free U.S. topsoil calculator. Estimate cubic yards and bag counts for lawns, garden beds, and top-dressing projects.",
  path: "/tools/topsoil-calculator",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Yardwise Topsoil Calculator",
  url: `${siteConfig.url}/tools/topsoil-calculator`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  inLanguage: ["en"],
  description:
    "Calculate how much topsoil your garden beds need in cubic yards, cubic feet, and bags.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function TopsoilCalculatorPage() {
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
            { label: "Topsoil Calculator" },
          ]}
        />
      </div>

      <TopsoilCalculator />
      <CalculatorSeoSection content={calculatorSeoContent.topsoil} />
    </div>
  );
}
