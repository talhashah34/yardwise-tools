import {
  amazonProductUrl,
  productsForCollection,
  type AffiliateProduct,
} from "@/config/affiliates";
import Link from "next/link";

type Collection = NonNullable<AffiliateProduct["collections"]>[number];

interface AffiliateProductsProps {
  collection?: Collection;
  title?: string;
  className?: string;
}

export function AffiliateProducts({
  collection = "general",
  title = "Helpful tools on Amazon",
  className = "",
}: AffiliateProductsProps) {
  const products = productsForCollection(collection);
  if (products.length === 0) return null;

  return (
    <aside
      className={`no-print rounded-[20px] border border-border bg-card p-6 shadow-[var(--shadow-sm)] ${className}`}
      aria-label="Affiliate product recommendations"
    >
      <h2 className="text-xl text-deep-green">{title}</h2>
      <p className="mt-2 text-sm text-text-secondary">
        Practical gear that helps with measuring beds and installing materials.
        As an Amazon Associate, Yardwise earns from qualifying purchases.{" "}
        <Link href="/affiliate-disclosure" className="font-medium text-forest hover:underline">
          Affiliate disclosure
        </Link>
        .
      </p>

      <ul className="mt-5 space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
            <a
              href={amazonProductUrl(product.asin)}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="font-semibold text-deep-green hover:text-forest hover:underline"
            >
              {product.name}
            </a>
            <p className="mt-1 text-sm text-text-secondary">{product.blurb}</p>
            <a
              href={amazonProductUrl(product.asin)}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="mt-2 inline-flex text-sm font-medium text-forest hover:underline"
            >
              View on Amazon →
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
