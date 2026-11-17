/**
 * Recebe pedidos de demonstração e encaminha para um webhook configurável
 * (ex.: Formspree, Make, Zapier, n8n, Slack, CRM).
 *
 * Preencha `LEAD_WEBHOOK_URL` abaixo com o destino (Formspree, Make, Zapier…).
 * Vazio, a rota responde 503 e o formulário informa que o envio ainda não
 * está disponível — nunca simula um envio bem-sucedido.
 */

/** Destino dos pedidos de demonstração. Vazio = envio desativado. */
const LEAD_WEBHOOK_URL = "";

const MAX = {
  nome: 120,
  instituicao: 160,
  tipo: 60,
  email: 160,
  mensagem: 2000,
} as const;
const TIPOS = new Set([
  "Escola particular",
  "Escola pública",
  "Cursinho ou preparatório",
  "Rede ou secretaria de educação",
  "Outro",
]);

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ code: "invalid" }, { status: 400 });
  }

  // Honeypot: bots preenchem o campo escondido. Responde 200 sem encaminhar.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const lead = {
    nome: clean(body.nome, MAX.nome),
    instituicao: clean(body.instituicao, MAX.instituicao),
    tipo: clean(body.tipo, MAX.tipo),
    email: clean(body.email, MAX.email),
    mensagem: clean(body.mensagem, MAX.mensagem),
  };

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email);
  if (
    !lead.nome ||
    !lead.instituicao ||
    !emailOk ||
    (lead.tipo && !TIPOS.has(lead.tipo))
  ) {
    return Response.json({ code: "invalid" }, { status: 400 });
  }

  const webhook = LEAD_WEBHOOK_URL;
  if (!webhook) {
    return Response.json({ code: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...lead,
        origem: "landing-page",
        recebidoEm: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return Response.json({ code: "failed" }, { status: 502 });
  } catch {
    return Response.json({ code: "failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
