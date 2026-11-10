/**
 * AdSense stays off until NEXT_PUBLIC_ADSENSE_CLIENT is set (ca-pub-…).
 * Optional slot IDs enable specific display units after you create them in AdSense.
 */
export const adsConfig = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  slots: {
    calculator: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CALCULATOR ?? "",
    guide: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDE ?? "",
  },
} as const;

export function isAdSenseEnabled() {
  return /^ca-pub-\d+$/.test(adsConfig.client);
}
