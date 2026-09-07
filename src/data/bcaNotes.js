// BCA Notes — subject/unit configuration.
//
// PDF availability is generated automatically from files inside
// public/pdf/bca/ by scripts/generate-pdf-manifest.js.
//
// Manual workflow:
//   public/pdf/bca/computer-fundamentals/unit-1.pdf
//   public/pdf/bca/data-structure/unit-1.pdf
//   public/pdf/bca/java-language/unit-1.pdf
//   public/pdf/bca/syllabus.pdf  <-- optional main BCA syllabus
import { BCA_PDF_MANIFEST } from "./bcaManifest.generated";

export const UNITS_PER_SUBJECT = 5;
export const MAIN_SYLLABUS_PATH = "/pdf/bca/syllabus.pdf";

export const BCA_SUBJECTS = [
  { slug: "computer-fundamentals", title: "Computer Fundamentals" },
  { slug: "data-structure", title: "Data Structure" },
  { slug: "java-language", title: "Java Language" },
];

export function getBcaNotes() {
  return BCA_SUBJECTS.map((subject) => {
    const availability = BCA_PDF_MANIFEST[subject.slug] ?? [];

    const units = Array.from({ length: UNITS_PER_SUBJECT }, (_, i) => {
      const unitNumber = i + 1;
      const available = Boolean(availability[i]);
      const filePath = `/pdf/bca/${subject.slug}/unit-${unitNumber}.pdf`;

      return {
        unitNumber,
        available,
        viewUrl: available ? filePath : null,
        downloadUrl: available ? filePath : null,
        downloadName: `${subject.slug}-unit-${unitNumber}.pdf`,
      };
    });

    return { ...subject, units };
  });
}

export function getBcaSyllabus() {
  return {
    available: Boolean(BCA_PDF_MANIFEST.syllabusAvailable),
    viewUrl: BCA_PDF_MANIFEST.syllabusAvailable ? MAIN_SYLLABUS_PATH : null,
    downloadUrl: BCA_PDF_MANIFEST.syllabusAvailable ? MAIN_SYLLABUS_PATH : null,
    downloadName: "bca-syllabus.pdf",
  };
}
