import {
  Button,
  Column,
  Grid,
  Heading,
  Page,
  Row,
  Section,
  Span,
  Text,
  token,
} from "@hyper-elements/react";
import { studio, classes, glazes } from "../src/data/classes";
import type { Studio } from "../src/data/classes";
import {
  classStatus,
  countByStatus,
  glazeFor,
  totalEnrolled,
  totalSeats,
} from "../src/data/classes";
import { kilnTheme } from "../src/theme";
import {
  StudioLine,
  KilnStrip,
  KitFooter,
  FiringList,
} from "../src/components/shared";
import { ClassCard } from "../src/components/class-card";
import { STATUS_LABELS } from "../src/data/classes";

/**
 * OUTPUT 2, The public class page (Page root -> responsive web
 * HTML, no client-side JavaScript).
 *
 * The email's public twin. Where the email must survive Outlook,
 * the page gets the full earthy treatment: a dark clay hero, the
 * eight-class kiln strip, every class as a typed kiln.ClassCard
 * grouped by level, the glaze shelf and the firing schedule.
 */
export function ClassPage({ studio: s = studio }: { studio?: Studio }) {
  const beginners = classes.filter((c) => c.level === "Beginner");
  const intermediate = classes.filter((c) => c.level === "Intermediate");
  const advanced = classes.filter((c) => c.level === "Advanced");
  return (
    <Page
      theme={kilnTheme}
      width={1100}
      title={`KILN HOUSE, Term ${s.termNo} · ${s.termLabel}`}
      description={s.pitch}
      lang="en"
      style={{ gap: 0 }}
    >
      <Section
        style={{
          backgroundColor: "#292524",
          padding: [48, 40],
          gap: 20,
          mobile: { padding: [32, 20] },
        }}
        tokens={{
          colors: {
            foreground: "#fff7ed",
            muted: "#e8dcc0",
            primary: "#f3ddb8",
          },
        }}
      >
        <Row style={{ gap: 32, alignItems: "start" }}>
          <Column style={{ gap: 14 }}>
            <Text
              style={{
                color: "#e8dcc0",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {`${s.name} · Term ${s.termNo}`}
            </Text>
            <Heading
              level={1}
              style={{ fontSize: 46, mobile: { fontSize: 32 } }}
            >
              KILN HOUSE, eight classes, one kiln room, no two pots
              alike
            </Heading>
            <Text style={{ fontSize: 17 }}>
              {s.termLabel} · {s.datesLabel} · {s.hours} · {s.address}
              · {s.owner}
            </Text>
            <Text style={{ fontSize: 17 }}>{s.pitch}</Text>
            <StudioLine studio={s} />
            <Row style={{ gap: 12 }}>
              <Button href="https://kilnhouse.example/terms/3/enrol">
                Enrol for the term
              </Button>
              <Button
                href="https://kilnhouse.example/terms/3"
                variant="secondary"
                style={{ color: "#292524" }}
              >
                Visit the studio
              </Button>
            </Row>
          </Column>
          <Column style={{ gap: 10 }}>
            <KilnStrip classes={classes.slice(0, 6)} cell={14} />
            <Text style={{ apply: ["quiet"], color: "#e8dcc0" }}>
              The shelf mark: one square per class, clay and the
              class's status colour, the same mark your email and
              firing schedule carry.
            </Text>
          </Column>
        </Row>
      </Section>

      <Section style={{ padding: [36, 40], gap: 24, mobile: { padding: [24, 20] } }}>
        <Heading level={2}>The term in numbers</Heading>
        <Text style={{ fontSize: 17 }}>
          {classes.length} classes · {totalSeats()} seats ·{" "}
          {totalEnrolled()} students enrolled ·{" "}
          {countByStatus("full")} full ·{" "}
          {countByStatus("places-left")} with places left ·{" "}
          {glazes.length} glazes on the shelf.
        </Text>
        <KilnStrip classes={classes} cell={12} perRow={8} />
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          The kiln strip: one square per class, clay and the class's
          status colour, in class code order.
        </Text>

        <Heading level={2}>Beginner ({beginners.length})</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {beginners.map((c) => (
            <ClassCard
              key={c.code}
              code={c.code}
              title={c.title}
              teacher={c.teacher}
              level={c.level}
              day={`${c.day} ${c.time}`}
              firing={c.firing}
              glaze={glazeFor(c.glaze).name}
              seats={String(c.seats)}
              enrolled={String(c.enrolled)}
              price={String(c.price)}
              status={STATUS_LABELS[classStatus(c)]}
            />
          ))}
        </Grid>

        <Heading level={2}>Intermediate ({intermediate.length})</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {intermediate.map((c) => (
            <ClassCard
              key={c.code}
              code={c.code}
              title={c.title}
              teacher={c.teacher}
              level={c.level}
              day={`${c.day} ${c.time}`}
              firing={c.firing}
              glaze={glazeFor(c.glaze).name}
              seats={String(c.seats)}
              enrolled={String(c.enrolled)}
              price={String(c.price)}
              status={STATUS_LABELS[classStatus(c)]}
            />
          ))}
        </Grid>

        <Heading level={2}>Advanced ({advanced.length})</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {advanced.map((c) => (
            <ClassCard
              key={c.code}
              code={c.code}
              title={c.title}
              teacher={c.teacher}
              level={c.level}
              day={`${c.day} ${c.time}`}
              firing={c.firing}
              glaze={glazeFor(c.glaze).name}
              seats={String(c.seats)}
              enrolled={String(c.enrolled)}
              price={String(c.price)}
              status={STATUS_LABELS[classStatus(c)]}
            />
          ))}
        </Grid>

        <Heading level={2}>The glaze shelf ({glazes.length})</Heading>
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          Every glaze is mixed in the studio and tested on the same
          clay your hands are learning. One card per glaze, in the
          batch.
        </Text>
        <Column style={{ gap: 6 }}>
          {glazes.map((g) => (
            <Text key={g.code}>
              <Span style={{ fontWeight: 700 }}>
                {g.name} ({g.code})
              </Span>
              {` · ${g.cone} · ${g.finish} · ${g.blurb}`}
            </Text>
          ))}
        </Column>

        <Heading level={2}>Firing schedule</Heading>
        <FiringList />
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          Questions: {s.contact}. Term {s.termNo} runs{" "}
          {s.datesLabel}, {s.hours}, at {s.address}.
        </Text>
      </Section>

      <Section style={{ padding: [28, 40], mobile: { padding: [20, 20] } }}>
        <KitFooter />
      </Section>
    </Page>
  );
}

ClassPage.PreviewProps = { studio };
export default ClassPage;
