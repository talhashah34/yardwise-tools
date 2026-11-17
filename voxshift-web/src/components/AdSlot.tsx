type AdFormat = "leaderboard" | "rectangle" | "infeed" | "rail";

type Props = {
  /** Stable slot id for future AdSense / Cloudflare ad mapping */
  slot: string;
  format?: AdFormat;
  /** Shown in UI until real ads are wired */
  label?: string;
};

/**
 * Reserved ad inventory. Empty frames for now — swap the inner div for
 * AdSense / a script tag later without reshuffling the page layout.
 */
export function AdSlot({
  slot,
  format = "leaderboard",
  label = "Advertisement space",
}: Props) {
  return (
    <aside
      className={`ad-slot ad-${format}`}
      data-ad-slot={slot}
      data-ad-format={format}
      aria-label={label}
    >
      <span className="ad-label">Ad</span>
      <div className="ad-frame" id={`ad-${slot}`}>
        <span className="ad-placeholder">Reserved for ads · {format}</span>
      </div>
    </aside>
  );
}
