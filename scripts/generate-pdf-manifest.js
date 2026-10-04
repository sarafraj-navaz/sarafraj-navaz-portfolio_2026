/**
 * generate-pdf-manifest.js
 *
 * Scans public/pdf/bca/<subject>/unit-N.pdf plus the optional main
 * public/pdf/bca/syllabus.pdf and writes a generated data file.
 *
 * Manual workflow:
 *   1. Copy PDFs into public/pdf/bca/<subject>/unit-N.pdf
 *   2. Optionally copy the main syllabus to public/pdf/bca/syllabus.pdf
 *   3. Run npm run dev or npm run build
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SUBJECTS = ["computer-fundamentals", "data-structure", "java-language"];
const UNITS_PER_SUBJECT = 5;
const PDF_ROOT = path.join(ROOT, "public", "pdf", "bca");
const OUT_FILE = path.join(ROOT, "src", "data", "bcaManifest.generated.js");

const manifest = {};

if (!existsSync(PDF_ROOT)) {
  mkdirSync(PDF_ROOT, { recursive: true });
}

for (const subject of SUBJECTS) {
  const subjectDir = path.join(PDF_ROOT, subject);
  if (!existsSync(subjectDir)) {
    mkdirSync(subjectDir, { recursive: true });
  }

  manifest[subject] = [];
  for (let unit = 1; unit <= UNITS_PER_SUBJECT; unit++) {
    const pdfPath = path.join(subjectDir, `unit-${unit}.pdf`);
    manifest[subject].push(existsSync(pdfPath));
  }
}

manifest.syllabusAvailable = existsSync(path.join(PDF_ROOT, "syllabus.pdf"));

const banner = `// AUTO-GENERATED FILE — do not edit by hand.
// Regenerated automatically by scripts/generate-pdf-manifest.js
// every time you run \`npm run dev\` or \`npm run build\`.
//
// It records which BCA unit PDFs and the optional main syllabus currently
// exist on disk. Add files to public/pdf/bca/ and rerun dev/build.
`;

const contents = `${banner}\nexport const BCA_PDF_MANIFEST = ${JSON.stringify(manifest, null, 2)};\n`;
writeFileSync(OUT_FILE, contents, "utf-8");

const availableCount = Object.values(manifest)
  .filter((value) => Array.isArray(value))
  .flat()
  .filter(Boolean).length;

console.log(
  `[bca-notes] Scanned public/pdf/bca — ${availableCount} unit(s) available; main syllabus: ${manifest.syllabusAvailable ? "available" : "coming soon"}. Manifest written to src/data/bcaManifest.generated.js`
);
