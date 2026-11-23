import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { formatDiagnostics, render } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import StudentEmail from "../templates/student-email";
import ClassPage from "../templates/class-page";
import FiringDocument from "../templates/firing-document";
import GlazeCard from "../templates/glaze-card";

/**
 * Render the four committed examples into out/ :
 *   student-email.html + .txt | class-page.html
 *   firing-schedule.html + firing-schedule.pdf
 *   glaze-card.html (+ glaze-card.png when font files are present)
 *
 * renderPdf() and renderImage() fetch nothing: fonts go in as bytes.
 * Drop Inter WOFF files into assets/fonts/ (see assets/fonts/README.md)
 * to enable the PNG; without them the script says so, plainly.
 */
await mkdir("out", { recursive: true });

const email = await render(<StudentEmail />);
await writeFile("out/student-email.html", email.html);
await writeFile("out/student-email.txt", email.text);
console.log("student-email:", formatDiagnostics(email.diagnostics) || "clean");

const page = await render(<ClassPage />);
await writeFile("out/class-page.html", page.html);
console.log("class-page:", formatDiagnostics(page.diagnostics) || "clean");

const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
const hasFonts = existsSync(bold) && existsSync(regular);
const fontFiles = hasFonts
  ? [
      { family: "Inter", src: await readFile(regular), weight: 400 as const },
      { family: "Inter", src: await readFile(bold), weight: 700 as const },
    ]
  : undefined;

const doc = <FiringDocument />;
const printed = await render(doc);
await writeFile("out/firing-schedule.html", printed.html);
// With no font files given, renderPdf() draws in the standard PDF fonts
// (Helvetica/Times) and warns about it in diagnostics, it never fetches.
const pdf = await renderPdf(doc, fontFiles ? { fonts: fontFiles } : undefined);
await writeFile("out/firing-schedule.pdf", pdf.pdf);
console.log(
  "firing-schedule: print HTML + PDF written",
  formatDiagnostics(pdf.diagnostics) || "",
);

const card = <GlazeCard />;
const cardHtml = await render(card);
await writeFile("out/glaze-card.html", cardHtml.html);

if (hasFonts && fontFiles) {
  const { image, diagnostics } = await renderImage(card, {
    fonts: fontFiles,
  });
  await writeFile("out/glaze-card.png", image);
  console.log("glaze-card PNG:", formatDiagnostics(diagnostics) || "clean");
} else {
  console.log(
    "glaze-card: HTML written. PNG skipped, add Inter WOFF files to assets/fonts/ (they are passed to renderImage() as bytes; nothing is fetched).",
  );
}
