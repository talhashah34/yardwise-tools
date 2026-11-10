import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/config/site";
import Link from "next/link";

const COPYRIGHT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-deep-green text-soft-sage no-print">
      <div className="container-yardwise grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo className="[&_span]:text-white" />
          <p className="max-w-sm text-sm leading-relaxed text-sage">
            {siteConfig.tagline} Practical calculators that help you estimate
            landscaping materials before you buy.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide text-gold">
            Calculators
          </h2>
          <ul className="space-y-2 text-sm">
            {siteConfig.footer.calculators.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-soft-sage/90 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tools" className="text-soft-sage/90 hover:text-white">
                All tools
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide text-gold">
            Guides
          </h2>
          <ul className="space-y-2 text-sm">
            {siteConfig.footer.guides.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-soft-sage/90 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/guides" className="text-soft-sage/90 hover:text-white">
                All guides
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-[family-name:var(--font-manrope)] text-sm font-semibold uppercase tracking-wide text-gold">
            Company
          </h2>
          <ul className="space-y-2 text-sm">
            {siteConfig.footer.company.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-soft-sage/90 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-yardwise flex flex-col gap-2 py-5 text-xs text-sage sm:flex-row sm:items-center sm:justify-between">
          <p>© {COPYRIGHT_YEAR} Yardwise. All rights reserved.</p>
          <p>Material estimates for planning purposes — verify with your supplier.</p>
        </div>
      </div>
    </footer>
  );
}
