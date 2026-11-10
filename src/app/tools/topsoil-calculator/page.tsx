import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { TopsoilCalculator } from "@/components/calculator/TopsoilCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Topsoil Calculator – How Much Topsoil Do You Need? | Yardwise",
  description:
    "Free global topsoil calculator. Estimate cubic yards or cubic metres and bag counts for new beds, fills, and top-dressing projects.",
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
    "Calculate how much topsoil your garden beds need in cubic yards, cubic metres, cubic feet, and bags.",
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

      <CalculatorSeoSection
        materialLabel="topsoil"
        calculatorName="Topsoil Calculator"
        guideHref="/guides/how-much-topsoil-do-i-need"
        guideLabel="How Much Topsoil Do I Need?"
        related={[
          { href: "/tools/compost-calculator", label: "Compost Calculator" },
          { href: "/tools/mulch-calculator", label: "Mulch Calculator" },
          {
            href: "/guides/how-much-soil-for-a-raised-bed",
            label: "Raised bed soil guide",
          },
        ]}
      />
    </div>
  );
}
