import { cn } from "@/lib/utils/cn";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  href?: string;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-9 w-9", className)}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="#214E3D" />
      {/* Geometric garden bed */}
      <path
        d="M10 28.5h20v2.5H10v-2.5Z"
        fill="#EDE4D5"
        opacity="0.9"
      />
      {/* Measurement grid ticks */}
      <path
        d="M12 28.5v-1.5M16 28.5v-2.5M20 28.5v-1.5M24 28.5v-2.5M28 28.5v-1.5"
        stroke="#D8B779"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Leaf */}
      <path
        d="M20 9c5.2 1.8 8.4 6.2 8.2 11.4-.1 2.4-1.1 4.5-2.7 6.1-1.3-4.4-4.1-7.7-7.8-9.6 1.6-2.7 1.9-5.4 2.3-7.9Z"
        fill="#829B83"
      />
      <path
        d="M20 9c-5.2 1.8-8.4 6.2-8.2 11.4.1 2.4 1.1 4.5 2.7 6.1 1.3-4.4 4.1-7.7 7.8-9.6C21 14.2 20.4 11.5 20 9Z"
        fill="#E8EFE7"
      />
      <path
        d="M20 11.5c.1 3.4.4 6.4 1.8 9.2"
        stroke="#214E3D"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, showWordmark = true, href = "/" }: LogoProps) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {showWordmark ? (
        <span className="font-[family-name:var(--font-manrope)] text-xl font-bold tracking-tight text-deep-green">
          Yardwise
        </span>
      ) : (
        <span className="sr-only">Yardwise</span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="inline-flex items-center" aria-label="Yardwise home">
      {content}
    </Link>
  );
}
