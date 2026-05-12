import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const nextDir = join(process.cwd(), ".next");
const source = join(nextDir, "routes-manifest.json");
const target = join(nextDir, "routes-manifest-deterministic.json");

if (!existsSync(source)) {
  throw new Error(`Next build did not create ${source}`);
}

if (!existsSync(target)) {
  copyFileSync(source, target);
  console.log("Created .next/routes-manifest-deterministic.json for Vercel deployment packaging.");
}
