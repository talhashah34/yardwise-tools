import { adsConfig, isAdSenseEnabled } from "@/config/ads";
import Script from "next/script";

/** Loads the AdSense library site-wide when a publisher ID is configured. */
export function AdSenseScript() {
  if (!isAdSenseEnabled()) return null;

  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsConfig.client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
