import { Logo } from "@/components/brand/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-[#F8F8F4]/95 backdrop-blur-md no-print">
      <div className="container-yardwise flex h-[var(--header-height)] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[8px] px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-soft-sage hover:text-deep-green"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/tools">
            <Button size="sm">Explore Tools</Button>
          </Link>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
