/**
 * Ponto único para eventos de analytics.
 * Hoje só publica em `window.dataLayer` (compatível com GTM) quando ele existe.
 * Para plugar outra ferramenta, adapte apenas esta função.
 */
type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: string, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...payload });
}
