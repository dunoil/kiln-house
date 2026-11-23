import {
  Canvas,
  Column,
  Heading,
  Row,
  Text,
} from "@hyper-elements/react";
import { studio, classes, glazes } from "../src/data/classes";
import type { Glaze, Studio } from "../src/data/classes";
import {
  countByStatus,
  firingSlots,
  termFees,
  totalEnrolled,
  totalSeats,
} from "../src/data/classes";
import { kilnTheme } from "../src/theme";
import { KilnStrip } from "../src/components/shared";

/**
 * OUTPUT 4, The glaze card (Canvas root, 1080 x 1080 -> PNG).
 *
 * A square social card rendered on the server with renderImage().
 * The batch makes nine cards: the studio cover, plus one per
 * glaze. Fonts are passed in as bytes by the scripts; nothing is
 * fetched. The theme's canvas format forces Inter here, satori
 * only has the Inter bytes we give it. The Canvas root takes no
 * tokens prop; colours are set on the elements directly.
 */
export function GlazeCard({
  studio: s = studio,
  glaze,
}: {
  studio?: Studio;
  glaze?: Glaze;
}) {
  const isCover = !glaze;
  return (
    <Canvas
      theme={kilnTheme}
      width={1080}
      height={1080}
      title={
        isCover
          ? `${s.name}, Term ${s.termNo} cover`
          : `${glaze.name} glaze, ${glaze.code}`
      }
      lang="en"
      style={{
        padding: 72,
        gap: 28,
        justifyContent: "space-between",
        backgroundColor: "#292524",
      }}
    >
      <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
        <KilnStrip classes={classes.slice(0, 6)} cell={16} />
        <Column style={{ gap: 0 }}>
          <Text
            style={{ fontWeight: 700, fontSize: 30, letterSpacing: 2, color: "#fff7ed" }}
          >
            {s.name.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 20, color: "#e8dcc0" }}>
            Term {s.termNo} · {s.termLabel}
          </Text>
        </Column>
      </Row>

      <Column style={{ gap: 24 }}>
        <Column style={{ backgroundColor: "#b4552d", height: 18, borderRadius: 4 }} />
        {isCover ? (
          <>
            <Text style={{ apply: ["eyebrow"], fontSize: 20, color: "#e8dcc0" }}>
              {`Term ${s.termNo} · ${s.termLabel}`}
            </Text>
            <Heading
              level={1}
              style={{
                fontSize: 96,
                lineHeight: 1.1,
                color: "#fff7ed",
              }}
            >
              Eight classes. One kiln room. No two pots alike.
            </Heading>
            <Text style={{ fontSize: 28, color: "#fff7ed" }}>
              {classes.length} classes · {totalSeats()} seats ·{" "}
              {totalEnrolled()} students · {countByStatus("full")}{" "}
              already full.
            </Text>
          </>
        ) : (
          <>
            <Row style={{ gap: 24, alignItems: "center" }} stackOnMobile={false}>
              <Column
                style={{
                  backgroundColor: glaze.color,
                  border: { width: 2, style: "solid", color: "#fff7ed" },
                  width: 180,
                  height: 180,
                  borderRadius: 8,
                }}
              />
              <Column style={{ gap: 8 }}>
                <Text style={{ apply: ["eyebrow"], fontSize: 20, color: "#e8dcc0" }}>
                  {`${glaze.code} · ${glaze.cone} · ${glaze.finish}`}
                </Text>
                <Heading
                  level={1}
                  style={{
                    fontSize: 88,
                    lineHeight: 1.1,
                    color: "#fff7ed",
                  }}
                >
                  {glaze.name}
                </Heading>
              </Column>
            </Row>
            <Text style={{ fontSize: 28, color: "#fff7ed" }}>
              {glaze.blurb}
            </Text>
            <Text style={{ fontSize: 28, color: "#e8dcc0" }}>
              {glaze.cone} · {glaze.finish} · Mixed in the studio
            </Text>
          </>
        )}
      </Column>

      <Column style={{ gap: 14 }}>
        <Text style={{ apply: ["mono"], fontSize: 22, color: "#e8dcc0" }}>
          {`${classes.length} classes · ${totalSeats()} seats · ${totalEnrolled()} students · ${glazes.length} glazes`}
        </Text>
        <Text style={{ apply: ["mono"], fontSize: 22, color: "#e8dcc0" }}>
          {`${countByStatus("full")} full · ${countByStatus("places-left")} with places left · ${firingSlots.length} firings · £${termFees()} in term fees`}
        </Text>
        <Text style={{ fontSize: 20, color: "#e8dcc0" }}>
          {s.name} · {s.owner} · {s.contact}
        </Text>
      </Column>
    </Canvas>
  );
}

GlazeCard.PreviewProps = { studio };
export default GlazeCard;
