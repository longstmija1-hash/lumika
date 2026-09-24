import { track } from "@vercel/analytics";

const events = new Set([
  "pricing_view",
  "course_select",
  "lead_start",
  "lead_success",
]);
const courses = [
  "Scratch",
  "JavaScript",
  "Go",
  "Математика",
  "Физика",
  "Русский язык",
  "История",
  "Обществознание",
  "Английский язык",
];

// Only fixed categories leave the page. Never pass form values, URLs or contact details.
export function trackFunnel(event, program = "") {
  if (typeof window === "undefined" || !events.has(event)) return;
  const properties = {
    direction: window.location.pathname.startsWith("/school") ? "school" : "it",
    course:
      courses.find(
        (name) =>
          program === name ||
          program.startsWith(`${name} ·`) ||
          program.includes(`· ${name} ·`),
      ) || "undecided",
  };
  window.dispatchEvent(
    new CustomEvent("lumika:funnel", { detail: { event, ...properties } }),
  );
  // Analytics must never interrupt a form or navigation, including with blockers.
  try {
    track(event, properties);
  } catch {}
  const counter = Number(process.env.NEXT_PUBLIC_YM_ID);
  if (counter && typeof window.ym === "function") {
    try {
      window.ym(counter, "reachGoal", event, properties);
    } catch {}
  }
}
