import { Benefits } from "@/components/home/Benefits";
import { FeaturedGuides } from "@/components/home/FeaturedGuides";
import { FeaturedTools } from "@/components/home/FeaturedTools";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Yardwise",
  description:
    "Plan your landscaping projects with practical calculators for mulch and other garden materials. Estimate quantities, compare purchase options and make informed decisions.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedTools />
      <HowItWorks />
      <Benefits />
      <FeaturedGuides />
      <FinalCta />
    </>
  );
}
