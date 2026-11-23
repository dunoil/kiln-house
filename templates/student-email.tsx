import {
  Button,
  Column,
  Email,
  Heading,
  Link,
  MergeTag,
  Span,
  Text,
} from "@hyper-elements/react";
import { studio, sampleStudent, classFor, glazeFor } from "../src/data/classes";
import type { Student, Studio } from "../src/data/classes";
import { STATUS_LABELS, classStatus } from "../src/data/classes";
import { kilnTheme } from "../src/theme";
import {
  StudioLine,
  KitFooter,
  ClassTable,
  Wordmark,
} from "../src/components/shared";

/**
 * OUTPUT 1, The student email (Email root -> email-safe HTML + a
 * plain-text twin from the same render).
 *
 * No Svg, no remote images: the KilnStrip is layout, so the
 * enrolment survives image-blocking inboxes. The news leads, a
 * student email is, first, the verdict on the student's class:
 * enrolled, with the day, the teacher, the kiln firing slot and
 * the glaze, or full before term started, with the waiting list
 * as the honest answer.
 */
export function StudentEmail({
  studio: s = studio,
  student = sampleStudent,
}: {
  studio?: Studio;
  student?: Student;
}) {
  const potteryClass = classFor(student.classCode);
  const glaze = glazeFor(potteryClass.glaze);
  const status = classStatus(potteryClass);
  const news =
    status === "full"
      ? `Good news: your place in ${potteryClass.title} with ${potteryClass.teacher} is confirmed, the class is now full.`
      : `Good news: your place in ${potteryClass.title} with ${potteryClass.teacher} is confirmed, ${potteryClass.seats - potteryClass.enrolled} seat${potteryClass.seats - potteryClass.enrolled === 1 ? "" : "s"} still open.`;
  const firing =
    `Your work fires in ${potteryClass.firing}, glazed in ${glaze.name} (${glaze.finish}). Pick up from the Tuesday after your firing, ${s.hours}, bring this student number.`;
  return (
    <Email
      theme={kilnTheme}
      width={600}
      previewText={`${student.id}, ${news}`}
      title={`${s.name}, Enrolment ${student.id}`}
      lang="en"
      style={{ gap: 20 }}
    >
      <Column style={{ apply: ["card"] }}>
        <Wordmark studio={s} />
        <Heading level={1} style={{ mobile: { fontSize: 26 } }}>
          Your place at the wheel is confirmed, <MergeTag name="first_name" />
        </Heading>
        <Text style={{ fontSize: 17, fontWeight: 700 }}>{news}</Text>
        <Text>{firing}</Text>
        <StudioLine studio={s} />
        <ClassTable classes={[potteryClass]} compact />
        <Text style={{ fontSize: 14 }}>
          <Span style={{ fontWeight: 700 }}>Student: </Span>
          {student.id} ·{" "}
          <Span style={{ fontWeight: 700 }}>Class: </Span>
          {potteryClass.code} ·{" "}
          <Span style={{ fontWeight: 700 }}>Fee: </Span>£
          {potteryClass.price} ·{" "}
          <Span style={{ fontWeight: 700 }}>Status: </Span>
          {STATUS_LABELS[status]}.
        </Text>
        <Text style={{ fontSize: 14 }}>
          {potteryClass.day} {potteryClass.time}, {s.address}.{" "}
          {potteryClass.level} · {potteryClass.blurb}
        </Text>
        <Heading level={2}>The term</Heading>
        <Text>
          Term {s.termNo} runs {s.datesLabel}: eight classes, 24
          students, three classes already full, and five firings
          booked between 4 and 13 December.
        </Text>
        <Button href="https://kilnhouse.example/terms/3">
          See the full term
        </Button>
        <Text style={{ apply: ["quiet"] }}>
          Student {student.id} · {potteryClass.code} ·{" "}
          {potteryClass.title} · {s.name}, term {s.termNo},{" "}
          {s.termLabel}.
        </Text>
      </Column>
      <KitFooter />
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        You receive this email because you enrolled in a class at
        KILN HOUSE Pottery Studio.{" "}
        <Link href="{{unsubscribe_url}}">Unsubscribe</Link>
      </Text>
    </Email>
  );
}

StudentEmail.PreviewProps = { studio, student: sampleStudent };
export default StudentEmail;
