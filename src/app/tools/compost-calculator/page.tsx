import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { CompostCalculator } from "@/components/calculator/CompostCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Compost Calculator – How Much Compost Do You Need? | Yardwise",
  description:
    "Free global compost calculator. Estimate cubic yards or cubic metres and bag counts for soil amendments and top dressing.",
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
    "Calculate how much compost your garden beds need in cubic yards, cubic metres, cubic feet, and bags.",
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

      <CalculatorSeoSection
        materialLabel="compost"
        calculatorName="Compost Calculator"
        guideHref="/guides/how-much-compost-do-i-need"
        guideLabel="How Much Compost Do I Need?"
        related={[
          { href: "/tools/topsoil-calculator", label: "Topsoil Calculator" },
          { href: "/tools/mulch-calculator", label: "Mulch Calculator" },
        ]}
      />
    </div>
  );
}