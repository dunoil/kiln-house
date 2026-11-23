/**
 * The class list file, the kit's single source of truth.
 *
 * One record term renders the student email, the public class page,
 * the printed firing-schedule PDF and the glaze cards. Change
 * `studio`, `classes`, `students` or `glazes` and every artefact
 * agrees, because every artefact reads this file.
 *
 * Everything here is fixed text: no clock, no randomness. A
 * corrections run re-renders only the records that changed.
 */

export type Level = "Beginner" | "Intermediate" | "Advanced";

export type ClassStatus = "full" | "places-left";

export interface PotteryClass {
  /** "KH-101", the class code printed on every artefact. */
  code: string;
  title: string;
  teacher: string;
  level: Level;
  /** "Tuesday" */
  day: string;
  /** "18:00-20:30" */
  time: string;
  /** "Kiln A, Friday 4 December, Cone 6" */
  firing: string;
  /** Glaze code, e.g. "KH-GLZ-01" */
  glaze: string;
  /** Seats in the class. */
  seats: number;
  /** Students enrolled, must equal the students listed for this class. */
  enrolled: number;
  /** Price in pounds. */
  price: number;
  /** One line about the class, for the page and the card. */
  blurb: string;
}

export interface Student {
  /** "KH-STU-01" */
  id: string;
  name: string;
  /** Class code the student is enrolled in. */
  classCode: string;
}

export interface Glaze {
  /** "KH-GLZ-01" */
  code: string;
  name: string;
  /** Swatch colour, a shape colour only, never body text. */
  color: string;
  /** "Cone 6" */
  cone: string;
  /** "Gloss, translucent jade" */
  finish: string;
  /** One line about the glaze, for the page and the card. */
  blurb: string;
}

export interface Studio {
  name: string;
  /** 3 */
  termNo: number;
  /** "Autumn Term 2026" */
  termLabel: string;
  /** "Monday 5 October to Saturday 12 December 2026" */
  datesLabel: string;
  hours: string;
  address: string;
  owner: string;
  /** One-paragraph pitch used by the email and the page hero. */
  pitch: string;
  /** The owner's note, printed in the firing-schedule PDF. */
  ownersNote: string;
  contact: string;
}

export const studio: Studio = {
  name: "KILN HOUSE Pottery Studio",
  termNo: 3,
  termLabel: "Autumn Term 2026",
  datesLabel: "Monday 5 October to Saturday 12 December 2026",
  hours: "10:00-18:00",
  address: "7 Potter's Lane, Stoke-on-Trent",
  owner: "Ruth Calder",
  pitch:
    "Eight classes, one kiln room, no two pots alike. KILN HOUSE is a small pottery studio that teaches one term at a time: every class is capped at six students, every piece is fired in the studio kilns, and every glaze on the shelf is mixed here and tested on the same clay your hands are learning. This term has 24 students across eight classes, three classes already full, and five firings booked between 4 and 13 December. The list below is the whole term, with the teacher, the day, the kiln slot and the glaze of every class.",
  ownersNote:
    "Thank you for signing up, showing up with clay under your nails, and trusting us with your first bowls. A firing is a promise: the kiln slot on your email is the kiln slot your work goes into, and we do not rush a firing to fit a calendar. If your class says full, ask at the counter about the waiting list, cancelled places go back on the board on the first day of term, first come first served. If it says places left, come and see the studio first: the wheel room smells of wet clay and wood smoke, and that is the whole point. Ruth Calder, KILN HOUSE Pottery Studio",
  contact: "hello@kilnhouse.example",
};

export const glazes: Glaze[] = [
  { code: "KH-GLZ-01", name: "Celadon", color: "#7fa88f", cone: "Cone 6", finish: "Gloss, translucent jade", blurb: "The classic green that pools in the throwing rings. Best on porcelain-white stoneware, thin where the clay shows through." },
  { code: "KH-GLZ-02", name: "Shino", color: "#e8dcc8", cone: "Cone 6", finish: "Matte, warm cream with orange flashing", blurb: "A warm cream that flashes orange where the flame touches it. Hand-built work takes it best, thick on the rim." },
  { code: "KH-GLZ-03", name: "Tenmoku", color: "#2e2118", cone: "Cone 6", finish: "Gloss, deep iron brown-black", blurb: "Iron brown so dark it reads black until the light catches it. The glaze of the glazing class, and of every good teabowl." },
  { code: "KH-GLZ-04", name: "Ash Grey", color: "#9a958a", cone: "Cone 6", finish: "Matte, soft wood-ash grey", blurb: "Mixed from the studio's own wood ash. Quiet, grey, a little different on every pot, which is exactly why the large-form class uses it." },
  { code: "KH-GLZ-05", name: "Copper Red", color: "#a83c2a", cone: "Cone 06", finish: "Metallic red, raku only", blurb: "A raku glaze that comes out of the smoke bin a different red every time. Never in the electric kilns, never twice the same." },
  { code: "KH-GLZ-06", name: "Cobalt Blue", color: "#2b4a8f", cone: "Cone 6", finish: "Gloss, deep cobalt blue", blurb: "A strong blue that holds its depth on pouring vessels. One dip, no second coat, or it runs off the spout." },
  { code: "KH-GLZ-07", name: "Oatmeal", color: "#d9c9a3", cone: "Cone 6", finish: "Matte, speckled oatmeal", blurb: "Speckled and soft, the family class glaze: forgiving, food safe, and it hides a wobbly rim better than any other." },
  { code: "KH-GLZ-08", name: "Iron Brown", color: "#6b4226", cone: "Cone 6", finish: "Satin, warm iron brown", blurb: "Warm iron brown with a satin skin. Sculptural work wears it well, it follows every fingerprint instead of hiding it." },
];

export const classes: PotteryClass[] = [
  { code: "KH-101", title: "Wheel Throwing for Beginners", teacher: "Mara Ellison", level: "Beginner", day: "Tuesday", time: "18:00-20:30", firing: "Kiln A, Friday 4 December, Cone 6", glaze: "KH-GLZ-01", seats: 3, enrolled: 3, price: 240, blurb: "First time at the wheel: centre, pull, trim, and leave with three thrown bowls." },
  { code: "KH-102", title: "Hand Building: Pinch, Coil and Slab", teacher: "Tom Okafor", level: "Beginner", day: "Wednesday", time: "18:00-20:30", firing: "Kiln B, Saturday 5 December, Cone 6", glaze: "KH-GLZ-02", seats: 4, enrolled: 3, price: 220, blurb: "No wheel, just hands: pinch pots, coiled jars and slab-built boxes, in that order." },
  { code: "KH-103", title: "Glazing and Surface", teacher: "Ana Sousa", level: "Intermediate", day: "Thursday", time: "18:00-20:30", firing: "Kiln A, Friday 11 December, Cone 6", glaze: "KH-GLZ-03", seats: 3, enrolled: 3, price: 230, blurb: "Wax resist, layering and brushwork, with ten test tiles fired before your real pieces." },
  { code: "KH-104", title: "Throwing Bigger: Large Forms", teacher: "Mara Ellison", level: "Advanced", day: "Saturday", time: "10:00-13:00", firing: "Kiln B, Saturday 12 December, Cone 6", glaze: "KH-GLZ-04", seats: 5, enrolled: 3, price: 260, blurb: "Two-part throwing for planters and storage jars, with a firing slot big enough to hold them." },
  { code: "KH-105", title: "Raku and Smoke Firing", teacher: "Tom Okafor", level: "Intermediate", day: "Sunday", time: "10:00-13:00", firing: "Raku kiln, Sunday 13 December, Cone 06", glaze: "KH-GLZ-05", seats: 4, enrolled: 3, price: 280, blurb: "Hot pots, smoke bins and copper reds: the loudest, fastest firing the studio runs." },
  { code: "KH-106", title: "Teapots and Pouring Vessels", teacher: "Ana Sousa", level: "Advanced", day: "Monday", time: "18:00-20:30", firing: "Kiln A, Friday 4 December, Cone 6", glaze: "KH-GLZ-06", seats: 3, enrolled: 3, price: 250, blurb: "Bodies, lids, spouts and handles that pour clean: a teapot in six weeks, glaze to match." },
  { code: "KH-107", title: "Clay for Families", teacher: "June Park", level: "Beginner", day: "Saturday", time: "14:00-15:30", firing: "Kiln B, Saturday 5 December, Cone 6", glaze: "KH-GLZ-07", seats: 6, enrolled: 3, price: 180, blurb: "One adult, one child, one shared table: animals, mugs and the mess that comes with both." },
  { code: "KH-108", title: "Sculptural Ceramics", teacher: "June Park", level: "Intermediate", day: "Tuesday", time: "10:00-12:30", firing: "Kiln A, Friday 11 December, Cone 6", glaze: "KH-GLZ-08", seats: 5, enrolled: 3, price: 240, blurb: "Figures and forms that were never meant to hold water, built hollow and fired slow." },
];

export const students: Student[] = [
  { id: "KH-STU-01", name: "Priya", classCode: "KH-101" },
  { id: "KH-STU-02", name: "Marcus", classCode: "KH-101" },
  { id: "KH-STU-03", name: "Ines", classCode: "KH-101" },
  { id: "KH-STU-04", name: "Tom", classCode: "KH-102" },
  { id: "KH-STU-05", name: "Aisha", classCode: "KH-102" },
  { id: "KH-STU-06", name: "Leo", classCode: "KH-102" },
  { id: "KH-STU-07", name: "Sofia", classCode: "KH-103" },
  { id: "KH-STU-08", name: "Ben", classCode: "KH-103" },
  { id: "KH-STU-09", name: "Clara", classCode: "KH-103" },
  { id: "KH-STU-10", name: "Noah", classCode: "KH-104" },
  { id: "KH-STU-11", name: "Maya", classCode: "KH-104" },
  { id: "KH-STU-12", name: "Owen", classCode: "KH-104" },
  { id: "KH-STU-13", name: "Hana", classCode: "KH-105" },
  { id: "KH-STU-14", name: "Felix", classCode: "KH-105" },
  { id: "KH-STU-15", name: "Rosa", classCode: "KH-105" },
  { id: "KH-STU-16", name: "Dara", classCode: "KH-106" },
  { id: "KH-STU-17", name: "Ivo", classCode: "KH-106" },
  { id: "KH-STU-18", name: "Nadia", classCode: "KH-106" },
  { id: "KH-STU-19", name: "Sam", classCode: "KH-107" },
  { id: "KH-STU-20", name: "June", classCode: "KH-107" },
  { id: "KH-STU-21", name: "Eli", classCode: "KH-107" },
  { id: "KH-STU-22", name: "Tara", classCode: "KH-108" },
  { id: "KH-STU-23", name: "Kofi", classCode: "KH-108" },
  { id: "KH-STU-24", name: "Lena", classCode: "KH-108" },
];

export const sampleStudent: Student = students[0];

/** The batch takes the first N students, in student number order, deterministic. */
export function makeStudents(count: number): Student[] {
  return students.slice(0, count);
}

export function classFor(code: string): PotteryClass {
  const found = classes.find((c) => c.code === code);
  if (!found) throw new Error(`No class with code ${code}`);
  return found;
}

export function glazeFor(code: string): Glaze {
  const found = glazes.find((g) => g.code === code);
  if (!found) throw new Error(`No glaze with code ${code}`);
  return found;
}

export function classStatus(c: PotteryClass): ClassStatus {
  return c.enrolled >= c.seats ? "full" : "places-left";
}

export const STATUS_LABELS: Record<ClassStatus, string> = {
  full: "Full",
  "places-left": "Places left",
};

export const STATUS_COLORS: Record<ClassStatus, string> = {
  full: "#991b1b",
  "places-left": "#365314",
};

export function countByStatus(status: ClassStatus): number {
  return classes.filter((c) => classStatus(c) === status).length;
}

export function totalSeats(): number {
  return classes.reduce((sum, c) => sum + c.seats, 0);
}

export function totalEnrolled(): number {
  return classes.reduce((sum, c) => sum + c.enrolled, 0);
}

/** Term fees in pounds: every enrolled student, at their class price. */
export function termFees(): number {
  return classes.reduce((sum, c) => sum + c.enrolled * c.price, 0);
}

export function studentsFor(code: string): Student[] {
  return students.filter((s) => s.classCode === code);
}

/** Firing slots in date order, each with the classes loaded into it. */
export interface FiringSlot {
  kiln: string;
  date: string;
  cone: string;
  classCodes: string[];
}

export const firingSlots: FiringSlot[] = [
  { kiln: "Kiln A", date: "Friday 4 December", cone: "Cone 6", classCodes: ["KH-101", "KH-106"] },
  { kiln: "Kiln B", date: "Saturday 5 December", cone: "Cone 6", classCodes: ["KH-102", "KH-107"] },
  { kiln: "Kiln A", date: "Friday 11 December", cone: "Cone 6", classCodes: ["KH-103", "KH-108"] },
  { kiln: "Kiln B", date: "Saturday 12 December", cone: "Cone 6", classCodes: ["KH-104"] },
  { kiln: "Raku kiln", date: "Sunday 13 December", cone: "Cone 06", classCodes: ["KH-105"] },
];

export function classesForSlot(slot: FiringSlot): PotteryClass[] {
  return slot.classCodes.map((code) => classFor(code));
}
