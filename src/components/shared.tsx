import {
  Column,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import type { PotteryClass, Studio } from "../data/classes";
import { STATUS_COLORS, STATUS_LABELS, classStatus, firingSlots, glazeFor } from "../data/classes";

/**
 * Shared components, plain functions returning elements, used under
 * several roots, which is exactly why the emailed firing slot and
 * the printed one can never disagree about a kiln or a date.
 */

/**
 * The KilnStrip: a potter's shelf of alternating clay and ash
 * squares, one per class, coloured by that class's status when
 * given the classes. Built from a Row of fixed-width Columns with
 * an explicit width, never a Grid, never an Svg, never an image,
 * because an Email cannot hold an Svg and inboxes block images.
 * It is the term, drawn as a shelf of pots.
 */
export function KilnStrip({
  classes,
  cell = 12,
  perRow,
}: {
  classes: PotteryClass[];
  cell?: number;
  /** Split the strip into rows of this many squares, so a long strip fits a narrow column. */
  perRow?: number;
}) {
  const rows: PotteryClass[][] = [];
  const size = perRow ?? classes.length;
  for (let i = 0; i < classes.length; i += size) {
    rows.push(classes.slice(i, i + size));
  }
  // The strip hugs its squares: without an explicit width the outer
  // Column takes an equal share of its Row and the next block sits
  // far to the right (seen on the canvas cover card).
  const width = size * cell + (size - 1) * 3;
  return (
    <Column style={{ gap: 3, width }}>
      {rows.map((row, r) => (
        <Row
          key={r}
          style={{ gap: 3, width: row.length * cell + (row.length - 1) * 3 }}
          stackOnMobile={false}
        >
          {row.map((t, i) => (
            <Column
              key={t.code}
              style={{
                backgroundColor:
                  (r * size + i) % 2 === 0
                    ? "#b4552d"
                    : STATUS_COLORS[classStatus(t)],
                border: {
                  width: 1,
                  style: "solid",
                  color:
                    (r * size + i) % 2 === 0
                      ? "#b4552d"
                      : STATUS_COLORS[classStatus(t)],
                },
                width: cell,
                height: cell,
                borderRadius: 2,
              }}
            />
          ))}
        </Row>
      ))}
    </Column>
  );
}

export function Wordmark({ studio }: { studio: Studio }) {
  // Six shelf squares, clay and ash alternating, a Row of
  // fixed-width Columns with an explicit width.
  const cells = [0, 1, 2, 3, 4, 5];
  return (
    <Row style={{ gap: 12, alignItems: "center" }} stackOnMobile={false}>
      <Row
        style={{ gap: 3, width: 6 * 9 + 5 * 3 }}
        stackOnMobile={false}
      >
        {cells.map((i) => (
          <Column
            key={i}
            style={{
              backgroundColor: i % 2 === 0 ? "#b4552d" : "#4d7c0f",
              border: {
                width: 1,
                style: "solid",
                color: i % 2 === 0 ? "#b4552d" : "#4d7c0f",
              },
              width: 9,
              height: 9,
              borderRadius: 2,
            }}
          />
        ))}
      </Row>
      <Column style={{ gap: 0 }}>
        <Text style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1 }}>
          {studio.name.toUpperCase()}
        </Text>
        <Text style={{ apply: ["quiet"] }}>
          Term {studio.termNo} · {studio.termLabel}
        </Text>
      </Column>
    </Row>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <Text style={{ apply: ["eyebrow"] }}>{children}</Text>;
}

/** The term in one line. Used by email, page, canvas. */
export function StudioLine({ studio }: { studio: Studio }) {
  return (
    <Text style={{ apply: ["mono"], color: token("colors.muted") }}>
      {`Term ${studio.termNo} · ${studio.termLabel} · ${studio.hours} · ${studio.address}`}
    </Text>
  );
}

/** The class board, as a table, email, page and firing-schedule PDF.
 *  TableCells hold text and inline Spans directly, never a nested Text.
 *  `compact` drops the Firing and Glaze columns: a 600px email
 *  cannot hold seven columns without squeezing the class names, and
 *  the email already states the firing and the glaze in prose. */
export function ClassTable({
  classes,
  compact = false,
}: {
  classes: PotteryClass[];
  compact?: boolean;
}) {
  return (
    <Table>
      <TableRow header>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Code</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Class</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Day</Span>
        </TableCell>
        {compact ? null : (
          <TableCell>
            <Span style={{ fontWeight: 700 }}>Firing</Span>
          </TableCell>
        )}
        {compact ? null : (
          <TableCell>
            <Span style={{ fontWeight: 700 }}>Glaze</Span>
          </TableCell>
        )}
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Fee</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Status</Span>
        </TableCell>
      </TableRow>
      {classes.map((c) => (
        <TableRow key={c.code}>
          <TableCell>
            <Span style={{ fontWeight: 700 }}>{c.code}</Span>
          </TableCell>
          <TableCell>
            <Span style={{ fontWeight: 700 }}>{c.title}</Span>
            {`, ${c.teacher}`}
          </TableCell>
          <TableCell>
            {c.day} {c.time}
          </TableCell>
          {compact ? null : <TableCell>{c.firing}</TableCell>}
          {compact ? null : <TableCell>{glazeFor(c.glaze).name}</TableCell>}
          <TableCell>£{c.price}</TableCell>
          <TableCell>
            <Span
              style={{
                fontWeight: 700,
                color: STATUS_COLORS[classStatus(c)],
              }}
            >
              {STATUS_LABELS[classStatus(c)]}
            </Span>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

/** The five firing slots, page and firing-schedule PDF. */
export function FiringList() {
  return (
    <Column style={{ gap: 6 }}>
      {firingSlots.map((slot) => (
        <Text key={`${slot.kiln}-${slot.date}`}>
          <Span style={{ fontWeight: 700 }}>
            {slot.kiln}, {slot.date}, {slot.cone}
          </Span>
          {` · ${slot.classCodes.join(", ")}`}
        </Text>
      ))}
    </Column>
  );
}

export function KitFooter() {
  return (
    <Column style={{ gap: 6, alignItems: "center" }}>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        KILN HOUSE Pottery Studio · 7 Potter's Lane, Stoke-on-Trent
        · One term at a time, every piece fired in the studio kilns
      </Text>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        One class list file rendered this, email, page, firing
        schedule, and glaze cards, with Hyper Elements.
      </Text>
    </Column>
  );
}

export function TermHeading({ studio }: { studio: Studio }) {
  return (
    <Column style={{ gap: 8 }}>
      <Eyebrow>{`${studio.name} presents`}</Eyebrow>
      <Text
        style={{
          fontWeight: 700,
          fontSize: 34,
          lineHeight: 1.2,
        }}
      >
        KILN HOUSE, eight classes, one kiln room, no two pots alike
      </Text>
      <Text style={{ fontSize: 17 }}>
        Term {studio.termNo} · {studio.termLabel} · {studio.hours}
      </Text>
    </Column>
  );
}
