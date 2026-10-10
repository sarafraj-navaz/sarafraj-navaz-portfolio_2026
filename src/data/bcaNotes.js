// BCA Notes — Google Drive hosted study material.
//
// FUTURE UPDATE WORKFLOW:
// 1. Upload a PDF to Google Drive.
// 2. Set General access to "Anyone with the link" and permission to Viewer.
// 3. Paste its share URL into the matching unit's driveUrl below.
// 4. Commit/deploy the website. No PDF needs to be added to this repository.
//
// Keep up to five units per subject. Use null until a unit is published.

export const UNITS_PER_SUBJECT = 5;

export const BCA_SUBJECTS = [
  {
    slug: "computer-fundamentals",
    title: "Computer Fundamentals",
    units: [
      { unitNumber: 1, driveUrl: "https://drive.google.com/file/d/1u_54i4CZ1JfZ_fb1etYUFT-_hGyrnlIj/view?usp=sharing" },
      { unitNumber: 2, driveUrl: "https://drive.google.com/file/d/1whH_4olrilwGfIsxzpcDuBNUdQnW6AT2/view?usp=sharing" },
      { unitNumber: 3, driveUrl: null },
      { unitNumber: 4, driveUrl: null },
      { unitNumber: 5, driveUrl: null },
    ],
  },
  {
    slug: "data-structure",
    title: "Data Structure",
    units: [
      { unitNumber: 1, driveUrl: "https://drive.google.com/file/d/1hmzU_hekoBI18dhGMo22KDLc6-KnEspj/view?usp=sharing" },
      { unitNumber: 2, driveUrl: "https://drive.google.com/file/d/1ZMYOMr968yRAwSj3jCg4O_ao-qfKj4dv/view?usp=sharing" },
      { unitNumber: 3, driveUrl: null },
      { unitNumber: 4, driveUrl: null },
      { unitNumber: 5, driveUrl: null },
    ],
  },
  {
    slug: "java-language",
    title: "Java Language",
    units: [
      { unitNumber: 1, driveUrl: "https://drive.google.com/file/d/19VUSWlZoEA9FJ5_UCA0gUos7ZXnTTCx4/view?usp=sharing" },
      { unitNumber: 2, driveUrl: null },
      { unitNumber: 3, driveUrl: null },
      { unitNumber: 4, driveUrl: "https://drive.google.com/file/d/1ihi3OsrKwB9bpsqssaXQb2OkHjugLiLo/view?usp=sharing" },
      { unitNumber: 5, driveUrl: null },
    ],
  },
];

export const BCA_SYLLABUS_URL =
  "https://drive.google.com/file/d/18klL2pOAnsjfaj5vNEgUhj3N1LMaf332/view?usp=sharing";

export function getBcaNotes() {
  return BCA_SUBJECTS.map((subject) => ({
    ...subject,
    units: subject.units.map((unit) => ({
      ...unit,
      available: Boolean(unit.driveUrl),
      viewUrl: unit.driveUrl || null,
    })),
  }));
}

export function getBcaSyllabus() {
  return {
    available: Boolean(BCA_SYLLABUS_URL),
    viewUrl: BCA_SYLLABUS_URL || null,
  };
}
