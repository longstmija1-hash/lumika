import { subjectsData } from "../data/subjectsData";

export const YANDEX_COUNTER_ID = 113078891;
export const YANDEX_SCRIPT_URL = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_COUNTER_ID}`;
const knownPaths = new Set([
  "/", "/school", "/privacy",
  ...Object.keys(subjectsData).map((slug) => `/subject/${slug}`),
]);

// URLs can contain contact details. Send only known public paths, never query/hash.
export function metrikaPageUrl(pathname, origin) {
  const path = pathname.replace(/\/$/, "") || "/";
  return new URL(knownPaths.has(path) ? path : "/404", origin).href;
}

export function metrikaReferrer(raw, origin) {
  if (!raw) return "";
  try {
    const url = new URL(raw);
    if (!["https:", "http:"].includes(url.protocol)) return "";
    return url.origin === origin
      ? metrikaPageUrl(url.pathname, origin)
      : `${url.origin}/`;
  } catch {
    return "";
  }
}

// The queue is available before tag.js loads, so slow loading loses no pageviews.
// Window state also survives Strict Mode remounts and App Router transitions.
function ensureCounter() {
  if (typeof window === "undefined") return null;
  if (!window.ym) {
    window.ym = function () {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = Date.now();
  }
  if (!window.__lumikaMetrika) {
    window.__lumikaMetrika = { initialized: false, lastRoute: null, lastUrl: null };
  }
  const state = window.__lumikaMetrika;
  if (!state.initialized) {
    window.dataLayer = window.dataLayer || [];
    window.ym(YANDEX_COUNTER_ID, "init", {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: metrikaReferrer(document.referrer, window.location.origin),
      url: metrikaPageUrl(window.location.pathname, window.location.origin),
      accurateTrackBounce: true,
      trackLinks: true,
      // Yandex's SPA mode: all pageviews, including the first, use explicit hit.
      defer: true,
    });
    state.initialized = true;
  }
  return state;
}

export function trackMetrikaPage(pathname, search) {
  if (!pathname || typeof window === "undefined") return;
  try {
    const state = ensureCounter();
    // Raw query stays only in memory for navigation deduplication; never sent.
    const route = JSON.stringify([pathname, search]);
    if (state.lastRoute === route) return;
    const url = metrikaPageUrl(pathname, window.location.origin);
    const referer = state.lastUrl ?? metrikaReferrer(document.referrer, window.location.origin);
    window.ym(YANDEX_COUNTER_ID, "hit", url, { title: document.title, referer });
    state.lastRoute = route;
    state.lastUrl = url;
  } catch {
    // Analytics (including blockers) must never interrupt navigation or a form.
  }
}

export function trackMetrikaGoal(event, properties) {
  if (typeof window === "undefined") return;
  try {
    ensureCounter();
    window.ym(YANDEX_COUNTER_ID, "reachGoal", event, properties);
  } catch {}
}
