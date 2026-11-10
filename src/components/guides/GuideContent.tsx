import type { Guide } from "@/content/guides";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Lightweight Markdown-ish renderer for guide content.
 * Supports ## headings, paragraphs, lists, tables, bold, and links.
 */
export function GuideContent({ guide }: { guide: Guide }) {
  const blocks = parseBlocks(guide.content);

  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-10 border-b border-border pb-8">
        <p className="inline-flex items-center rounded-[8px] bg-soft-sage px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-forest">
          {guide.readingTime} read
        </p>
        <h1 className="mt-4 text-[2rem] leading-tight text-deep-green sm:text-4xl md:text-5xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
          {guide.description}
        </p>
      </header>

      <div className="prose-yardwise space-y-5 text-[1.05rem] leading-[1.75] text-text-secondary sm:text-[1.075rem]">
        {blocks.map((block, index) => (
          <Block key={index} block={block} />
        ))}
      </div>

      <aside className="mt-12 overflow-hidden rounded-[20px] border border-border bg-[linear-gradient(145deg,#eef4ef_0%,#f8f8f4_55%,#ede4d5_100%)] p-6 shadow-[var(--shadow-sm)] sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-clay">
          Next step
        </p>
        <h2 className="mt-2 text-xl text-deep-green sm:text-2xl">Ready to calculate?</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
          Put these formulas to work with live estimates for bags and bulk deliveries.
        </p>
        <Link
          href="/tools/mulch-calculator"
          className="mt-5 inline-flex items-center gap-2 rounded-[10px] bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-deep-green"
        >
          Open the Mulch Calculator
          <span aria-hidden="true">→</span>
        </Link>
      </aside>

      {/* Reserved ad slot for long-form guides */}
      <div
        className="mt-10 hidden min-h-[90px] rounded-[14px] border border-dashed border-border/60"
        aria-hidden="true"
        data-ad-slot="guide-content"
      />
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
      return (
        <h2 className="!mt-10 border-l-[3px] border-forest pl-3 text-[1.35rem] leading-snug text-deep-green sm:text-2xl">
          {block.text}
        </h2>
      );
    case "p":
      return <p className="text-pretty">{renderInline(block.text)}</p>;
    case "ul":
      return (
        <ul className="not-prose space-y-2.5 rounded-[14px] border border-border bg-card p-3.5 sm:p-4">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-[10px] bg-subtle/70 px-3 py-2.5 text-[0.98rem] leading-relaxed text-text"
            >
              <span
                className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] bg-soft-sage text-forest"
                aria-hidden="true"
              >
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7.2 5.8 10 11 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="not-prose space-y-2.5 rounded-[14px] border border-border bg-card p-3.5 sm:p-4">
          {block.items.map((item, index) => (
            <li
              key={item}
              className="flex gap-3 rounded-[10px] bg-subtle/70 px-3 py-2.5 text-[0.98rem] leading-relaxed text-text"
            >
              <span
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-forest font-[family-name:var(--font-manrope)] text-xs font-bold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span className="pt-0.5">{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-[14px] border border-border shadow-[var(--shadow-sm)]">
          <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
            <thead className="bg-soft-sage/70">
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
                <tr
                  key={rowIndex}
                  className="border-t border-border odd:bg-card even:bg-subtle/40"
                >
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`} className="px-4 py-3 text-text">
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
        parts.push(
          <Link key={`${match.index}-a`} href={href} className="font-medium text-forest underline-offset-2 hover:underline">
            {label}
          </Link>,
        );
      }
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}
