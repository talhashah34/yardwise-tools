import { AdUnit } from "@/components/ads/AdUnit";
import { AffiliateProducts } from "@/components/affiliates/AffiliateProducts";
import type { Guide } from "@/content/guides";
import Link from "next/link";
import type { ReactNode } from "react";

function affiliateCollectionForGuide(slug: string) {
  if (
    slug.includes("gravel") ||
    slug.includes("driveway") ||
    slug.includes("tons") ||
    slug.includes("patio") ||
    slug.includes("crushed-stone") ||
    slug.includes("pea-gravel")
  ) {
    return "gravel" as const;
  }
  if (
    slug.includes("topsoil") ||
    slug.includes("compost") ||
    slug.includes("soil") ||
    slug.includes("fill-dirt") ||
    slug.includes("raised-bed")
  ) {
    return "soil" as const;
  }
  if (slug.includes("mulch") || slug.includes("bag") || slug.includes("flower-bed")) {
    return "mulch" as const;
  }
  return "general" as const;
}

function calculatorCtaForGuide(slug: string): { href: string; label: string } {
  if (slug.includes("driveway")) {
    return {
      href: "/tools/gravel-driveway-calculator",
      label: "Open the Gravel Driveway Calculator \u2192",
    };
  }
  if (slug.includes("pea-gravel")) {
    return {
      href: "/tools/pea-gravel-calculator",
      label: "Open the Pea Gravel Calculator \u2192",
    };
  }
  if (slug.includes("gravel") || slug.includes("patio") || slug.includes("crushed-stone")) {
    return {
      href: "/tools/gravel-calculator",
      label: "Open the Gravel Calculator \u2192",
    };
  }
  if (slug.includes("compost")) {
    return {
      href: "/tools/compost-calculator",
      label: "Open the Compost Calculator \u2192",
    };
  }
  if (slug.includes("topsoil") || slug.includes("fill-dirt") || slug.includes("raised-bed") || slug.includes("soil")) {
    return {
      href: "/tools/topsoil-calculator",
      label: "Open the Topsoil Calculator \u2192",
    };
  }
  return {
    href: "/tools/mulch-calculator",
    label: "Open the Mulch Calculator \u2192",
  };
}

/**
 * Lightweight Markdown-ish renderer for guide content.
 * Supports ## headings, paragraphs, lists, tables, bold, and links.
 */
export function GuideContent({ guide }: { guide: Guide }) {
  const blocks = parseBlocks(guide.content);
  const cta = calculatorCtaForGuide(guide.slug);

  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-10 border-b border-border pb-8">
        <p className="text-sm text-text-secondary">
          {guide.readingTime} read
        </p>
        <h1 className="mt-3 text-4xl text-deep-green md:text-5xl">{guide.title}</h1>
        <p className="mt-4 text-lg text-text-secondary">{guide.description}</p>
      </header>

      <div className="space-y-5 text-[1.05rem] leading-relaxed text-text">
        {blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>

      <aside className="mt-12 rounded-[20px] border border-border bg-soft-sage/50 p-6">
        <h2 className="text-xl text-deep-green">Ready to calculate?</h2>
        <p className="mt-2 text-text-secondary">
          Put these U.S. planning formulas to work with live cubic-yard, bag, and bulk estimates.
        </p>
        <Link
          href={cta.href}
          className="mt-4 inline-flex font-semibold text-forest hover:text-deep-green"
        >
          {cta.label}
        </Link>
      </aside>

      <AffiliateProducts
        collection={affiliateCollectionForGuide(guide.slug)}
        className="mt-10"
        title="Helpful tools for this project"
      />

      <AdUnit slot="guide" className="mt-10" />
    </article>
  );
}

type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]?.trim() ?? "";

    if (!line) {
      i += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) });
      i += 1;
      continue;
    }

    if (line.startsWith("| ")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i]?.trim().startsWith("|")) {
        tableLines.push(lines[i]!.trim());
        i += 1;
      }
      const parsed = parseTable(tableLines);
      if (parsed) blocks.push(parsed);
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i]?.trim().startsWith("- ")) {
        items.push(lines[i]!.trim().slice(2));
        i += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i]?.trim() ?? "")) {
        items.push(lines[i]!.trim().replace(/^\d+\.\s/, ""));
        i += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    blocks.push({ type: "p", text: line });
    i += 1;
  }

  return blocks;
}

function parseTable(lines: string[]): Block | null {
  if (lines.length < 2) return null;
  const headers = splitRow(lines[0]!);
  const rows = lines.slice(2).map(splitRow).filter((row) => row.length > 0);
  return { type: "table", headers, rows };
}

function splitRow(line: string): string[] {
  return line
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

function Block({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="!mt-10 text-2xl text-deep-green">{block.text}</h2>;
    case "p":
      return <p>{renderInline(block.text)}</p>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5">
          {block.items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-5">
          {block.items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-[14px] border border-border">
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <thead className="bg-subtle">
              <tr>
                {block.headers.map((header) => (
                  <th key={header} className="px-4 py-3 font-semibold text-deep-green">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-border">
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-3">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

function renderInline(text: string): ReactNode[] {
  const parts: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={`${match.index}-b`} className="font-semibold text-deep-green">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const href = linkMatch[2]!;
        const label = linkMatch[1]!;
        const external = /^https?:\/\//i.test(href);
        const amazon = /amazon\.com/i.test(href);
        if (external) {
          parts.push(
            <a
              key={`${match.index}-a`}
              href={href}
              target="_blank"
              rel={amazon ? "nofollow sponsored noopener noreferrer" : "noopener noreferrer"}
              className="font-medium text-forest underline-offset-2 hover:underline"
            >
              {label}
            </a>,
          );
        } else {
          parts.push(
            <Link
              key={`${match.index}-a`}
              href={href}
              className="font-medium text-forest underline-offset-2 hover:underline"
            >
              {label}
            </Link>,
          );
        }
      }
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
