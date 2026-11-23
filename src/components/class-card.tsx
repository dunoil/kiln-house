import { Column, Row, Span, Text, defineElement, prop, token } from "@hyper-elements/react";

/**
 * `kiln.ClassCard`, one class, as a studio card: a clay rule, the
 * class code stamp, the title and teacher, the day and time, the
 * kiln firing slot, the glaze, and the status in its own colour.
 *
 * A custom element because the class is the kit's unit of reuse:
 * the page lists eight of them, and a mistyped class code or a
 * missing fee should be a diagnostic with a path, not a broken
 * page. Props are typed with the prop.* builders, so the checker and
 * the editor both enforce them.
 */
export const ClassCard = defineElement({
  type: "kiln.ClassCard",
  label: "Class card",
  description:
    "One class: code, title, teacher, level, day and time, firing slot, glaze, seats, enrolled, fee and status.",
  props: {
    code: prop.text({ label: "Class code", required: true }),
    title: prop.text({ label: "Title", required: true }),
    teacher: prop.text({ label: "Teacher", required: true }),
    level: prop.text({ label: "Level", required: true }),
    day: prop.text({ label: "Day and time", required: true }),
    firing: prop.text({ label: "Firing slot", required: true }),
    glaze: prop.text({ label: "Glaze", required: true }),
    seats: prop.text({ label: "Seats", required: true }),
    enrolled: prop.text({ label: "Enrolled", required: true }),
    price: prop.text({ label: "Fee", required: true }),
    status: prop.text({ label: "Status", required: true }),
  },
  render: ({ code, title, teacher, level, day, firing, glaze, seats, enrolled, price, status }) => {
    const color =
      status === "Full"
        ? "#991b1b"
        : "#365314";
    return (
      <Column
        style={{
          gap: 8,
          backgroundColor: token("colors.paper"),
          border: { width: 1, style: "solid", color: token("colors.border") },
          borderRadius: 6,
          padding: 18,
        }}
      >
        <Column style={{ apply: ["clayRule"], width: 48 }} />
        <Text
          style={{
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          {title}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 700 }}>
          {teacher} · {level}
        </Text>
        <Text style={{ fontSize: 14 }}>
          {day} · {firing}
        </Text>
        <Text style={{ fontSize: 14 }}>
          Glaze: {glaze} · {enrolled} of {seats} seats · £{price}
        </Text>
        <Row style={{ gap: 0 }} stackOnMobile={false}>
          <Column style={{ flex: "none" }}>
            <Text style={{ apply: ["stamp"], color: "#7c2d12" }}>
              {code.toUpperCase()}
            </Text>
          </Column>
          <Column />
        </Row>
        <Text style={{ fontSize: 14 }}>
          <Span style={{ fontWeight: 700, color }}>{status}</Span>
        </Text>
      </Column>
    );
  },
});
