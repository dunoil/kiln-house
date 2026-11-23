import {
  Column,
  Document,
  Heading,
  PageFooter,
  PageHeader,
  PageNumber,
  Row,
  Text,
} from "@hyper-elements/react";
import { studio, classes, glazes, students } from "../src/data/classes";
import type { Studio } from "../src/data/classes";
import {
  countByStatus,
  firingSlots,
  studentsFor,
  termFees,
  totalEnrolled,
  totalSeats,
} from "../src/data/classes";
import { kilnTheme } from "../src/theme";
import { KilnStrip, ClassTable, FiringList } from "../src/components/shared";

/**
 * OUTPUT 3, The printed firing schedule (Document root ->
 * print HTML via render(), PDF via renderPdf() from
 * @hyper-elements/react/pdf).
 *
 * The formal record pinned by the kiln room door: page one is the
 * term itself (pitch, numbers, how to read a class); pages two
 * and three are the eight classes, four to a page; page four is
 * the firing schedule, the glaze shelf and the owner's note. Each
 * page carries the same kiln strip the email sent, and the footer
 * counts the pages, written for a human holding paper, not a
 * browser print button. Four classes per class page, so no table
 * row is ever cut off at a page edge: a Document page clips what
 * does not fit, it never flows it onto the next page.
 */
export function FiringDocument({ studio: s = studio }: { studio?: Studio }) {
  const pages: (typeof classes)[] = [];
  for (let i = 0; i < classes.length; i += 4) {
    pages.push(classes.slice(i, i + 4));
  }
  return (
    <Document
      theme={kilnTheme}
      size="A4"
      margin={42}
      title={`${s.name}, Term ${s.termNo} firing schedule`}
      lang="en"
      style={{ gap: 20 }}
    >
      <PageHeader style={{ padding: { bottom: 10 } }}>
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <KilnStrip classes={classes.slice(0, 6)} cell={8} />
          <Text style={{ fontWeight: 700, fontSize: 11 }}>
            {s.name} · Term {s.termNo} · {s.termLabel} · Firing
            schedule
          </Text>
        </Row>
      </PageHeader>
      <PageFooter style={{ padding: { top: 10 } }}>
        <Text style={{ fontSize: 10, color: "#57534e" }}>
          Page <PageNumber /> of <PageNumber total /> · One class
          list file rendered this schedule · {s.name} ·{" "}
          {s.termLabel}
        </Text>
      </PageFooter>

      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Text style={{ apply: ["eyebrow"] }}>
            {s.name} presents
          </Text>
          <Heading level={1} style={{ fontSize: 28 }}>
            KILN HOUSE, eight classes, one kiln room, no two pots
            alike
          </Heading>
          <Text>
            Term {s.termNo} · {s.termLabel} · {s.datesLabel} ·{" "}
            {s.hours} · {s.address} · {s.owner}
          </Text>
        </Column>

        <Text>{s.pitch}</Text>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>The term in numbers</Heading>
          <Text>
            {classes.length} classes · {totalSeats()} seats ·{" "}
            {totalEnrolled()} students enrolled ·{" "}
            {countByStatus("full")} full ·{" "}
            {countByStatus("places-left")} with places left ·{" "}
            {glazes.length} glazes on the shelf · £{termFees()} in
            term fees · {students.length} student emails in the
            batch.
          </Text>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>How to read a class</Heading>
          <Text>
            Every class carries its code, the title and teacher, the
            day and time, the kiln firing slot, the glaze and the
            fee. Full means every seat is taken; cancelled places go
            back on the board on the first day of term, first come
            first served. Places left means seats are still open.
            Pick up fired work from the Tuesday after your firing,
            {s.hours}.
          </Text>
        </Column>
      </Document.Page>

      {pages.map((pageClasses, i) => (
        <Document.Page key={i} style={{ gap: 16 }}>
          <Column style={{ gap: 4 }}>
            <Heading level={1} style={{ fontSize: 28 }}>
              Classes {pageClasses[0].code}-
              {pageClasses[pageClasses.length - 1].code}
            </Heading>
            <Text>
              {pageClasses.length} classes, in class code order.
            </Text>
          </Column>
          <ClassTable classes={pageClasses} />
        </Document.Page>
      ))}

      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Heading level={1} style={{ fontSize: 28 }}>
            Firing schedule, glazes, and a note from the owner
          </Heading>
          <Text>
            When each kiln runs, what goes in it, what the glazes
            are, and what Ruth wants every student to know.
          </Text>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>Firing schedule ({firingSlots.length} firings)</Heading>
          <FiringList />
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>The glaze shelf ({glazes.length})</Heading>
          <Column style={{ gap: 6 }}>
            {glazes.map((g) => (
              <Text key={g.code}>
                {g.name} ({g.code}) · {g.cone} · {g.finish}
              </Text>
            ))}
          </Column>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>Who is in each class</Heading>
          <Column style={{ gap: 6 }}>
            {classes.map((c) => (
              <Text key={c.code}>
                {c.code} {c.title}:{" "}
                {studentsFor(c.code).map((st) => st.name).join(", ")}
              </Text>
            ))}
          </Column>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>A note from the owner</Heading>
          <Text>{s.ownersNote}</Text>
        </Column>

        <Column
          style={{
            gap: 6,
            padding: { top: 12 },
            border: { top: "1px dashed #57534e" },
          }}
        >
          <Text style={{ fontWeight: 700 }}>
            Eight classes, one kiln room, no two pots alike, keep
            this schedule.
          </Text>
          <Text>
            It is the record of the term: the same class codes,
            firing slots and fees your email carried and the page
            still shows.
          </Text>
        </Column>
      </Document.Page>
    </Document>
  );
}

FiringDocument.PreviewProps = { studio };
export default FiringDocument;
