/**
 * Legacy compatibility script.
 * BCA PDF availability is now configured with Google Drive share URLs in
 * src/data/bcaNotes.js. Local PDF files are no longer required or scanned.
 * This script remains so existing npm predev/prebuild commands keep working.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_FILE = path.join(ROOT, "src", "data", "bcaManifest.generated.js");

// The component now reads availability directly from Google Drive URLs.
// Keep this generated file valid for any other legacy imports.
const manifest = {
  "computer-fundamentals": [true, true, false, false, false],
  "data-structure": [true, true, false, false, false],
  "java-language": [true, false, false, true, false],
  syllabusAvailable: true,
};

writeFileSync(
  OUT_FILE,
  `// LEGACY COMPATIBILITY FILE — BCA availability is configured in bcaNotes.js.\nexport const BCA_PDF_MANIFEST = ${JSON.stringify(manifest, null, 2)};\n`,
  "utf-8"
);
console.log("[bca-notes] Google Drive links are configured in src/data/bcaNotes.js.");
