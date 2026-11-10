import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public", "ads.txt");

mkdirSync(dirname(outPath), { recursive: true });

if (!client || !/^ca-pub-\d+$/.test(client)) {
  writeFileSync(
    outPath,
    "# Add NEXT_PUBLIC_ADSENSE_CLIENT (ca-pub-…) before build to publish ads.txt\n",
    "utf8",
  );
  console.log("ads.txt: placeholder (no AdSense client configured)");
  process.exit(0);
}

const publisher = client.replace(/^ca-/, "");
const line = `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`;
writeFileSync(outPath, line, "utf8");
console.log(`ads.txt: wrote ${publisher}`);
