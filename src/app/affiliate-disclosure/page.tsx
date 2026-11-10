import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Affiliate Disclosure | Yardwise",
  description:
    "How Yardwise uses Amazon Associates and other affiliate links, and what that means for you.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <div className="container-yardwise py-10 md:py-14">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Affiliate Disclosure" }]}
      />

      <article className="mx-auto max-w-3xl space-y-5 text-text-secondary">
        <h1 className="text-4xl text-deep-green">Affiliate Disclosure</h1>
        <p className="text-sm text-text-muted">Last updated: November 10, 2026</p>

        <p>
          Some links on Yardwise are affiliate links. That means if you click a link
          and buy something, we may earn a commission at no extra cost to you.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Amazon Associates</h2>
        <p>
          Yardwise is a participant in the Amazon Services LLC Associates Program, an
          affiliate advertising program designed to provide a means for sites to earn
          advertising fees by advertising and linking to Amazon.com. As an Amazon
          Associate, we earn from qualifying purchases.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">How we choose products</h2>
        <p>
          We recommend tools and materials that relate to the calculators and guides on
          this site — for example measuring tools, landscape fabric, and soil testing
          kits. Product availability, pricing, and ratings on Amazon can change.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Your trust</h2>
        <p>
          Calculator results and editorial guidance are written to help you plan outdoor
          projects. Affiliate relationships do not change the math or the planning advice.
        </p>
      </article>
    </div>
  );
}
