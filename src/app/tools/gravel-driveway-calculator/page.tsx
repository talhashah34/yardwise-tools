import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { DrivewayGravelCalculator } from "@/components/calculator/DrivewayGravelCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Gravel Driveway Calculator – How Much Gravel for a Driveway? | Yardwise",
  description:
    "Free gravel driveway calculator. Estimate cubic yards or cubic metres, bags for repairs, and approximate tons or tonnes for bulk orders worldwide.",
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
    "Calculate how much gravel a driveway needs in cubic yards, cubic metres, and approximate weight.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function GravelDrivewayCalculatorPage() {
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

      <CalculatorSeoSection
        materialLabel="driveway gravel"
        calculatorName="Gravel Driveway Calculator"
        guideHref="/guides/gravel-driveway-how-much-do-i-need"
        guideLabel="How Much Gravel for a Driveway?"
        extraNotes={["weight"]}
        related={[
          { href: "/tools/gravel-calculator", label: "Gravel Calculator" },
          { href: "/tools/pea-gravel-calculator", label: "Pea Gravel Calculator" },
          {
            href: "/guides/how-many-tons-of-gravel-do-i-need",
            label: "How Many Tons of Gravel Do I Need?",
          },
        ]}
      />
    </div>
  );
}
