# Examples, real artefacts from the demo run

Produced by `npm run render` on the sample term in
`src/data/classes.ts` (KILN HOUSE Pottery Studio, Term 3, Autumn
Term 2026). Nothing here is hand-made: if it is in this folder, the
library rendered it.

- `student-email.html` / `student-email.txt`, the student email and its
  plain-text twin (the greeting shows `{{first_name}}` because the
  template uses a MergeTag, which the sending platform fills per
  recipient; the batch personalises the student itself: class, teacher,
  firing slot, glaze, fee and student number).
- `class-page.html`, the public class page.
- `firing-schedule.pdf`, the printed firing schedule: four A4 pages.
- `glaze-card.png`, the studio cover card (1080×1080); the batch makes
  one card per glaze plus this cover.

Regenerate everything with `npm run check && npm run render`.
