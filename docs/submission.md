### Which challenge are you entering?
Hyper Elements Template Challenge (November 2026)

### Project name
KILN HOUSE: Eight classes, one kiln room, no two pots alike, a pottery studio class kit (student email, class page, printed firing-schedule PDF, glaze cards from one class list file)

### Project description

One class list file in → **24 personalised student emails, a 4-page printed firing-schedule PDF, a public class page and 9 glaze cards** out, from one theme and one set of shared components.

A pottery term's paperwork fails in a predictable way: the email says one kiln slot, the wall sheet another, and the student's pot comes out of a third, a different firing, a different glaze, a class code spelled two ways. This kit makes that impossible by construction. Every class code, firing slot and glaze lives in one class list file: the email quotes it, the page's cards carry it, and the printed firing schedule prints it next to the owner's note.

- **Student email** (`Email` → `render()`), the news leads: your place is confirmed, with the day, teacher, kiln firing slot and glaze, the fee and the class stamp. No Svg, no remote images: the KilnStrip (one square per class, clay and the class's status colour) is a `Row` of fixed-width `Column`s, so it survives image-blocking inboxes. The table is the compact five-column form, because a 600px email cannot hold seven columns without squeezing the class names; the firing and glaze are already in the prose. `MergeTag` greeting; plain-text twin from the same render.
- **Class page** (`Page` → `render()`), dark clay hero, the eight-class kiln strip, every class as a typed `kiln.ClassCard` grouped by level (3 Beginner, 3 Intermediate, 2 Advanced), the glaze shelf, the firing schedule, phone styles, no client-side JavaScript.
- **Printed firing schedule** (`Document` → `renderPdf()`), the record pinned by the kiln room door: page one is the term itself (numbers, how to read a class), pages two and three are the eight classes, four to a page, page four is the firing schedule, the glaze shelf, who is in each class, and the owner's note. `PageHeader`/`PageFooter` with `PageNumber`. No browser makes this PDF.
- **Glaze cards** (`Canvas` → `renderImage()`), 1080×1080 PNGs: the studio cover, plus one card per glaze with a swatch in the glaze's own colour, cone, finish and blurb in poster type. Server-rendered; fonts in as bytes; nothing fetched.

**Measured on the demo run (23 Nov 2026):** 24 student emails · 4 firing-schedule pages in one PDF · 9 glaze cards · 8 classes, 33 seats, 24 students enrolled, 3 full, 5 with places left · 8 glazes, 5 firings · £5,700 in term fees · **gate: 0 errors, 0 warnings** · full batch in **1.6s**.

**Corrections pass:** class data is deterministic (no clock, no randomness), so fixing one record re-renders only that record, the other 23 emails are byte-identical.

### Public GitHub repository URL
https://github.com/dunoil/kiln-house

### How did you use Hyper Elements?

- **One `defineTheme()`** carries all four roots, warm cream paper, clay terracotta for shapes only, dark terracotta for text accents, ash glaze green for places left, mono class codes, Inter bold headings with tight letter spacing, per-format overrides: the Document and the Canvas are forced to Inter because satori only draws the font bytes it is given. One deliberate constraint shaped it: phone styles are an error in a Document or a Canvas, so the theme carries no `mobile` blocks, Email/Page templates set their own.
- **Shared components across roots** (`Wordmark`, `KilnStrip`, `StudioLine`, `ClassTable`, `FiringList`) are why the emailed firing slot and the printed one are the same firing slot.
- **The mark is built from layout primitives on purpose.** An Email cannot hold an Svg, so the KilnStrip is Rows of fixed-width Columns, and it recolours automatically per class, because the squares are data on the classes. An 8-cell strip overflows a hero column, so it splits into rows of 8; the gate's layout check caught that before it shipped. The strip also carries its own explicit width, so it hugs its squares instead of taking an equal share of its Row and pushing the next block to the far side, a layout bug the screenshot review caught on the cover card.
- **A custom element with `defineElement()`**: `kiln.ClassCard` with typed props (`prop.text`). A mistyped class code or a missing fee is a diagnostic with a path, before anything renders.
- **`validate()` as a gate, not a linter.** The batch validates before writing a single file. `out/checks.json` makes the verdict a file instead of a claim.
- **`@hyper-elements/email-clients`** for client proof (`npm run clients`): 5 previews of the email as classic Outlook, Gmail and Apple Mail draw it; screenshots in `docs/`.
- **CLI-ready**: `npx hyper-elements check templates/` reports **4 templates: 0 errors, 0 warnings, 0 skipped** (verified 23 Nov 2026).
- **Written for agents too** (`AGENTS.md`): ten invariants an agent must not break.

**Run it:** `npm install && npm run check && npm run render && npm run make` (24 emails) · `npm run make:sample` (4) · `npm run clients`. Node 20+. `examples/` holds one artefact of each kind.

### Live preview URL (optional)
No hosted preview. `examples/` in the repository contains the student email (HTML + plain text), the class page, the printed firing schedule as a PDF and the glaze card PNG, all from the demo run, and `docs/` holds screenshots of every output, including the email as Outlook and Gmail render it.

### Submission confirmation
- [x] I have starred the Hyper Elements repository. (Starred 18 Nov 2026 for the SOWN entry; same account.)
- [x] My repository is public and contains the complete source code and required README.
- [x] My submission meets the requirements of the selected challenge.
