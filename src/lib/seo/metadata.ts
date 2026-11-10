import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const defaultOgImage = "/images/og-default.jpg";

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  image = defaultOgImage,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  image?: string;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    title === siteConfig.name
      ? `${siteConfig.name} | Landscaping Calculators & Material Estimators`
      : title;

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
