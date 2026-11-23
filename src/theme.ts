import { defineTheme } from "@hyper-elements/react";

/**
 * KILN HOUSE theme, "earthy craft": warm cream paper, clay
 * terracotta for shapes, dark terracotta for text accents, ash
 * glaze green for places-left, mono class codes, Inter bold
 * headings.
 *
 * One theme serves all four roots, so it carries NO `mobile` blocks
 * (phone styles are an error in a Document or a Canvas); Email and
 * Page templates set their own phone styles.
 *
 * Clay #b4552d is a shape colour only, it never sets body text.
 * Text ink is warm dark #292524 or dark terracotta #7c2d12 (both
 * >= 4.5:1 on the cream paper). Status colours are dark enough to
 * be text: full red #991b1b, places left green #365314. Headings
 * are Inter 700 throughout: the kit ships Inter at 400 and 700
 * only.
 */
export const kilnTheme = defineTheme({
  colors: {
    background: "#f3ead9",
    paper: "#fffaf0",
    foreground: "#292524",
    muted: "#57534e",
    primary: "#7c2d12",
    primaryForeground: "#fff7ed",
    border: "#d9cbb0",
    clay: "#b4552d",
    clayDark: "#7c2d12",
    ash: "#365314",
    ashBright: "#4d7c0f",
    grey: "#4b5563",
    full: "#991b1b",
    placesLeft: "#365314",
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 28, xl: 44 },
  fontSizes: { sm: 12, md: 15, lg: 19, xl: 30 },
  lineHeights: { tight: 1.25, normal: 1.55 },
  fonts: {
    body: "Inter, Helvetica, Arial, sans-serif",
    heading: "Inter, Helvetica, Arial, sans-serif",
    mono: "'Cascadia Code', Consolas, 'Courier New', monospace",
  },
  radii: { sm: 2, md: 6 },
  elements: {
    Heading: {
      fontFamily: "Inter, Helvetica, Arial, sans-serif",
      fontWeight: 700,
      letterSpacing: -0.5,
      by: {
        level: {
          1: { fontSize: 34 },
          2: { fontSize: 23 },
          3: { fontSize: 16 },
        },
      },
    },
    Text: { fontSize: 15, lineHeight: 1.55 },
    Button: {
      backgroundColor: "#7c2d12",
      fontWeight: 700,
      padding: [12, 22],
      borderRadius: 2,
      hover: { backgroundColor: "#5f220e" },
      variants: {
        secondary: {
          backgroundColor: "#fffaf0",
          color: "#292524",
          border: { width: 1, style: "solid", color: "#292524" },
          hover: { backgroundColor: "#f3ead9" },
        },
        small: { fontSize: 13, padding: [8, 14] },
      },
    },
    Table: { border: { bottom: "1px solid #d9cbb0" } },
    TableCell: { padding: [10, 8], fontSize: 13 },
  },
  styles: {
    card: {
      backgroundColor: "#fffaf0",
      padding: 28,
      gap: 16,
      borderRadius: 6,
      border: { width: 1, style: "solid", color: "#d9cbb0" },
    },
    quiet: { color: "#57534e", fontSize: 12 },
    eyebrow: {
      color: "#7c2d12",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    stamp: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 1,
      padding: [5, 10],
      border: { width: 1, style: "dashed", color: "#7c2d12" },
      borderRadius: 4,
    },
    mono: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 13,
    },
    clayRule: {
      backgroundColor: "#b4552d",
      height: 4,
      borderRadius: 2,
    },
    ashRule: {
      backgroundColor: "#4d7c0f",
      height: 4,
      borderRadius: 2,
    },
  },
  formats: {
    email: { elements: { Button: { borderRadius: 2 } } },
    document: {
      styles: { quiet: { fontSize: 10 } },
      elements: {
        Text: { fontSize: 11, lineHeight: 1.45 },
        Heading: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
      },
    },
    canvas: {
      elements: {
        Heading: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
        Text: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
      },
    },
  },
});

declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof kilnTheme;
  }
}
