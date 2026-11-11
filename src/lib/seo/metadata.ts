import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

const defaultOgImage = "/images/og-default.jpg";

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  image = defaultOgImage,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle =
    title === siteConfig.name
      ? `${siteConfig.name} | Landscaping Calculators & Material Estimators`
      : title;
  const articleAuthors = authors?.length ? authors : [siteConfig.creator];

  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords],
    authors: articleAuthors.map((name) => ({ name })),
    creator: siteConfig.creator,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
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
      ...(type === "article"
        ? {
            publishedTime: publishedTime ?? modifiedTime,
            modifiedTime,
            authors: articleAuthors,
          }
        : {}),
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
