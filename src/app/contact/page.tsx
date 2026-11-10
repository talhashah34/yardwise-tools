import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Contact Yardwise",
  description:
    "Get in touch with Yardwise about calculator feedback, content corrections, or partnership inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-yardwise py-10 md:py-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />

      <article className="mx-auto max-w-2xl">
        <h1 className="text-4xl text-deep-green md:text-5xl">Contact</h1>
        <p className="mt-6 text-lg text-text-secondary">
          Have feedback on a calculator, spotted a content issue, or want to discuss
          a relevant partnership? We welcome practical notes that help improve the product.
        </p>

        <div className="mt-8 rounded-[20px] border border-border bg-card p-6 shadow-[var(--shadow-sm)]">
          <h2 className="text-xl text-deep-green">Email</h2>
          <p className="mt-3 text-text-secondary">
            Reach us at{" "}
            <a
              href="mailto:hello@yardwise.app"
              className="font-medium text-forest hover:underline"
            >
              hello@yardwise.app
            </a>
            .
          </p>
          <p className="mt-4 text-sm text-text-muted">
            This inbox is monitored for product feedback and corrections. We cannot
            provide personalized landscaping design advice or supplier quotes.
          </p>
        </div>
      </article>
    </div>
  );
}
