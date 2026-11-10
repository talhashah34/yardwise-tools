import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Prefer env, otherwise the live Yardwise publisher ID. */
const client =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "ca-pub-7233000824379127";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public", "ads.txt");

mkdirSync(dirname(outPath), { recursive: true });

if (!/^ca-pub-\d+$/.test(client)) {
  writeFileSync(
    outPath,
    "# Invalid NEXT_PUBLIC_ADSENSE_CLIENT; expected ca-pub-…\n",
    "utf8",
  );
  console.log("ads.txt: invalid client, wrote placeholder");
  process.exit(0);
}

const publisher = client.replace(/^ca-/, "");
const line = `google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`;
writeFileSync(outPath, line, "utf8");
console.log(`ads.txt: wrote ${publisher}`);
