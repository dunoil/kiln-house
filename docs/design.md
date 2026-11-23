# KILN HOUSE, design notes

## Concept

A template kit for a pottery studio's class term. One class list
file renders the student email, the public class page, the printed
firing-schedule PDF and the glaze cards. Domain and style are
deliberately the opposite pole from a black-and-red record store:
warm cream paper `#f3ead9`, clay terracotta `#b4552d` for shapes
only, dark terracotta `#7c2d12` for text accents, ash glaze green
`#365314` for places left, mono class codes, Inter bold headings
with tight letter spacing and uppercase kickers for a hand-made,
studio feel.

Signature: the **KilnStrip**, one square per class, clay
alternating with the class's status colour (full red `#991b1b`,
places left green `#365314`), plus the **class stamp** (KH-101 …
KH-108) that follows every class from the data file into the page
cards, the email table and the firing-schedule PDF, and the
**glaze swatch** on every glaze card, the glaze's own colour as a
solid square beside its name. One file, one term: that is the
product idea and the design idea at once.

## Build lessons (from the gate and the screenshot review, all fixed)

1. Theme element defaults are flat style objects, no `style:`
   wrapper, and no nested `elements` inside a Table entry
   (`TableCell` gets its own top-level entry).
2. Theme defaults reject `padding: {x, y}`, use the array form
   `[vertical, horizontal]` there (and, in this version, in Section
   styles too).
3. `TableCell` holds text and inline `Span`s directly, never a
   nested `Text`. Inline runs inside `Text` are `Span`s, not nested
   `Text`s.
4. An Email has no `subject` prop and a root has no padding.
5. A mark built from a Grid scatters if its columns stretch, the
   KilnStrip is Rows of fixed-width Columns with an explicit width.
   An 8-cell strip overflows a hero column, so the strip splits
   into rows of 8 (`perRow`) and the hero keeps the six-cell shelf
   mark.
6. **A Document page clips what does not fit; it never flows it
   onto the next page.** Four classes per class page, four pages
   in all, and every page verified from the actual PDF with
   `pdfinfo`, not from the print HTML.
7. Inter ships at 400 and 700 only in this kit's font files: a
   heading at 800 draws in the nearest weight and warns in the
   render diagnostics, so headings are 700 throughout.
8. Satori only draws the fonts it is given as bytes: the theme's
   `formats.canvas` forces Inter on Canvas headings and text, while
   the Document keeps Inter too, no serif anywhere in this kit.
9. A stamp `Text` alone in a `Row` stretches to the full width,
   wrap it in a `flex: "none"` Column beside an empty Column so it
   hugs its text.
10. A 600px email cannot hold a seven-column table without squeezing
    the class names to one word per line, so the email uses the
    compact table (five columns, no Firing or Glaze): the email
    already states the firing and the glaze in prose. The full
    seven-column table stays in the firing-schedule PDF, where the
    page is wide enough.
11. **A strip without an explicit width takes an equal share of its
    Row.** On the canvas cover card the KilnStrip's wrapper Column
    took half the row and pushed the studio name to the far side,
    the same layout the reference kit shipped. The fix: the outer
    Column carries the strip's own width
    (`size * cell + (size - 1) * 3`), so it hugs its squares
    everywhere, canvas, document header and page hero alike.
12. Deterministic data is a feature, not a nicety: the eight
    classes, 24 students and eight glazes are fixed arrays, and
    the batch's counts (3 full, 5 with places left, £5,700 in term
    fees) are computed from them, never typed. Read the outline,
    not just the error count.
