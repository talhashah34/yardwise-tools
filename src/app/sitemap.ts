import { guides } from "@/content/guides";
import { siteConfig } from "@/config/site";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/tools",
    "/tools/mulch-calculator",
    "/tools/topsoil-calculator",
    "/tools/compost-calculator",
    "/tools/gravel-calculator",
    "/tools/pea-gravel-calculator",
    "/tools/gravel-driveway-calculator",
    "/guides",
    "/about",
    "/contact",
    "/affiliate-disclosure",
    "/privacy-policy",
    "/terms",
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: now,
      changeFrequency: path.includes("calculator") ? ("weekly" as const) : ("monthly" as const),
      priority:
        path === ""
          ? 1
          : path.includes("-calculator")
            ? 0.9
            : 0.7,
    })),
    ...guides.map((guide) => ({
      url: `${siteConfig.url}/guides/${guide.slug}`,
      lastModified: new Date(guide.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
