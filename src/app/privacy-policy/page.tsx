import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy | Yardwise",
  description:
    "Learn how Yardwise handles privacy for calculator usage, local preferences, and optional analytics.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="container-yardwise py-10 md:py-14">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      />

      <article className="prose-yardwise mx-auto max-w-3xl space-y-5 text-text-secondary">
        <h1 className="text-4xl text-deep-green">Privacy Policy</h1>
        <p className="text-sm text-text-muted">Last updated: March 20, 2026</p>

        <p>
          Yardwise is a landscaping calculator website. This policy describes the
          limited information involved when you use the site.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Calculator data</h2>
        <p>
          The mulch calculator runs in your browser. Garden measurements, depths,
          prices, and results are processed locally on your device for the purpose of
          showing estimates. Yardwise does not require an account and does not ask you
          to submit calculator inputs to a server for the core calculation experience.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Local preferences</h2>
        <p>
          Unit system preference (imperial or metric) may be stored in your browser’s
          local storage so the calculator can remember your choice on that device. You
          can clear this data through your browser settings.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Analytics</h2>
        <p>
          Google Analytics 4 may be enabled only when a genuine measurement ID is
          configured for the deployment. If analytics is not configured, no GA4 scripts
          are loaded. When enabled, analytics providers may collect standard usage data
          such as pages visited, approximate location derived from IP address, device
          and browser information, and referral sources.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Affiliate links</h2>
        <p>
          Yardwise may include Amazon Associates and other affiliate links. If you buy
          through those links, we may earn a commission at no extra cost to you. See our{" "}
          <a href="/affiliate-disclosure" className="font-medium text-forest hover:underline">
            Affiliate Disclosure
          </a>{" "}
          for details.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Cookies and advertising</h2>
        <p>
          Yardwise may show Google AdSense display ads when a publisher ID is configured
          for the deployment. AdSense and related Google services may use cookies or
          similar technologies to serve and measure ads. You can manage ad personalization
          through Google&apos;s ad settings. If AdSense is not configured, no ad scripts are
          loaded. Additional consent tooling may be added later for applicable jurisdictions.
        </p>

        <h2 className="pt-4 text-2xl text-deep-green">Contact</h2>
        <p>
          Privacy questions can be sent to{" "}
          <a href="mailto:hello@yardwise.app" className="font-medium text-forest hover:underline">
            hello@yardwise.app
          </a>
          .
        </p>
      </article>
    </div>
  );
}
