import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Terms of Use | Yardwise",
  description:
    "Terms of use for Yardwise landscaping calculators and educational content.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="container-yardwise py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} />

      <article className="mx-auto max-w-3xl space-y-5 text-text-secondary">
        <h1 className="text-4xl text-deep-green">Terms of Use</h1>
        <p className="text-sm text-text-muted">Last updated: March 20, 2026</p>

        <p>
          By using Yardwise, you agree to these terms. If you do not agree, please do
          not use the website.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Informational estimates</h2>
        <p>
          Calculators and guides on Yardwise are provided for general planning and
          educational purposes. Results are estimates based on the measurements and
          assumptions you enter. Actual material needs can vary with product density,
          moisture, settling, site conditions, and application technique.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">No professional guarantee</h2>
        <p>
          Yardwise does not provide professional landscaping, engineering, or
          horticultural certification. Content should not be treated as a substitute
          for advice from a qualified local professional or supplier guidance for a
          specific product.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Acceptable use</h2>
        <p>
          You agree not to misuse the site, attempt to disrupt its operation, or use
          automated means in ways that degrade service for others.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Yardwise is not liable for purchases,
          shortages, overages, project delays, or other consequences arising from use
          of the calculators or content.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:hello@yardwise.app" className="font-medium text-forest hover:underline">
            hello@yardwise.app
          </a>
          .
        </p>
      </article>
    </div>
  );
}
