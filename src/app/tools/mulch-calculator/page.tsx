import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { MulchCalculator } from "@/components/calculator/MulchCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Mulch Calculator – How Much Mulch Do You Need? | Yardwise",
  description:
    "Free global mulch calculator. Estimate cubic yards or cubic metres, bag counts, and bagged vs bulk options for garden beds in imperial or metric units.",
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
    "Calculate how much mulch your garden beds need in cubic yards, cubic metres, cubic feet, and bags.",
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

      <CalculatorSeoSection
        materialLabel="mulch"
        calculatorName="Mulch Calculator"
        guideHref="/guides/how-much-mulch-do-i-need"
        guideLabel="How Much Mulch Do I Need?"
        related={[
          { href: "/tools/topsoil-calculator", label: "Topsoil Calculator" },
          { href: "/tools/compost-calculator", label: "Compost Calculator" },
          { href: "/guides/mulch-bags-vs-bulk", label: "Mulch Bags vs Bulk" },
        ]}
      />
    </div>
  );
}
