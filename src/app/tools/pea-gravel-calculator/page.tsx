import { CalculatorSeoSection } from "@/components/calculator/CalculatorSeoSection";
import { PeaGravelCalculator } from "@/components/calculator/PeaGravelCalculator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createMetadata({
  title: "Pea Gravel Calculator – How Much Pea Gravel Do You Need? | Yardwise",
  description:
    "Free pea gravel calculator for paths, patios, and decorative beds. Get cubic yards or cubic metres, bag counts, and approximate tons or tonnes.",
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
    "Calculate how much pea gravel you need in cubic yards, cubic metres, bags, and approximate weight.",
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

      <CalculatorSeoSection
        materialLabel="pea gravel"
        calculatorName="Pea Gravel Calculator"
        guideHref="/guides/how-much-pea-gravel-do-i-need"
        guideLabel="How Much Pea Gravel Do I Need?"
        extraNotes={["weight"]}
        related={[
          { href: "/tools/gravel-calculator", label: "Gravel Calculator" },
          {
            href: "/tools/gravel-driveway-calculator",
            label: "Gravel Driveway Calculator",
          },
        ]}
      />
    </div>
  );
}
