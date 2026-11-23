import { mkdir, writeFile } from "node:fs/promises";
import { render, validate, formatDiagnostics } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import StudentEmail from "../templates/student-email";
import FiringDocument from "../templates/firing-document";
import { GlazeCard } from "../templates/glaze-card";
import { studio, makeStudents, classes, glazes, students } from "../src/data/classes";
import {
  countByStatus,
  firingSlots,
  termFees,
  totalEnrolled,
  totalSeats,
} from "../src/data/classes";

/**
 * The batch: one class list file -> a personalised student email for
 * every student, the four-page firing-schedule PDF, and nine glaze
 * cards (the studio cover + one per glaze).
 *
 *   npm run make               24 student emails + firing PDF + 9 cards
 *   npm run make:sample        4 emails, for a quick look
 *
 * The gate runs first: the student email is validated before a single
 * file is written, so one bad class entry never becomes 24 bad emails.
 * Student generation is deterministic, a corrections run re-renders
 * only the records that changed.
 */
const arg = process.argv.indexOf("--count");
const count = arg >= 0 ? Number(process.argv[arg + 1]) : 24;
const started = Date.now();

const gate = validate(<StudentEmail />);
if (!gate.valid) {
  console.error(formatDiagnostics(gate.diagnostics));
  process.exit(1);
}

await mkdir("out/students", { recursive: true });
const enrolments = makeStudents(count);
let emails = 0;
for (const student of enrolments) {
  const { html, text } = await render(
    <StudentEmail student={student} />,
  );
  const stem = `out/students/${student.id.toLowerCase()}`;
  await writeFile(`${stem}.html`, html);
  if (text) await writeFile(`${stem}.txt`, text);
  emails++;
}

const pdf = await renderPdf(<FiringDocument />);
await writeFile("out/firing-schedule.pdf", pdf.pdf);
const pdfText = Buffer.from(pdf.pdf).toString("latin1");
const schedulePages = (pdfText.match(/\/Type\s*\/Page[^s]/g) || []).length;

let cards = 0;
const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
if (existsSync(bold) && existsSync(regular)) {
  const fonts = [
    { family: "Inter", src: await readFile(regular), weight: 400 as const },
    { family: "Inter", src: await readFile(bold), weight: 700 as const },
  ];
  const { image: cover } = await renderImage(<GlazeCard />, { fonts });
  await writeFile("out/students/card-cover.png", cover);
  cards++;
  for (const glaze of glazes) {
    const { image } = await renderImage(<GlazeCard glaze={glaze} />, {
      fonts,
    });
    await writeFile(
      `out/students/card-${glaze.code.toLowerCase()}.png`,
      image,
    );
    cards++;
  }
} else {
  console.log("cards skipped: add Inter font files to assets/fonts/ (see its README)");
}

const summary = {
  studio: `${studio.name}, Term ${studio.termNo} (${studio.termLabel})`,
  emails,
  classes: classes.length,
  full: countByStatus("full"),
  placesLeft: countByStatus("places-left"),
  totalSeats: totalSeats(),
  totalEnrolled: totalEnrolled(),
  glazes: glazes.length,
  firings: firingSlots.length,
  termFees: termFees(),
  schedulePages,
  cards,
  seconds: Math.round((Date.now() - started) / 100) / 10,
};
await writeFile("out/batch.json", JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
