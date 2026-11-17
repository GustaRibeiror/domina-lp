"use client";

import { useState, type FormEvent } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { buttonClass } from "@/components/ui/primitives";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";

type Status =
  | { s: "idle" }
  | { s: "sending" }
  | { s: "sent" }
  | { s: "error"; code: "invalid" | "not_configured" | "failed" };

const tipos = [
  "Escola particular",
  "Escola pública",
  "Cursinho ou preparatório",
  "Rede ou secretaria de educação",
  "Outro",
];

const field =
  "mt-2 block w-full rounded-xl border border-papel/15 bg-tinta-2 px-4 py-3 text-[0.98rem] text-papel placeholder:text-papel/35 transition-[border-color,box-shadow] duration-200 hover:border-papel/30 focus:border-dominio focus:shadow-[0_0_0_3px_rgba(46,158,115,0.25)] focus:outline-none";

const label = "block text-[0.9rem] font-medium text-papel/85";

export function Contact() {
  const [status, setStatus] = useState<Status>({ s: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ s: "sending" });
    track("lead_submit", { tipo: String(data.tipo || "") });
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus({ s: "sent" });
        track("lead_success");
        form.reset();
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { code?: string };
      const code =
        body.code === "invalid" || body.code === "not_configured"
          ? body.code
          : "failed";
      setStatus({ s: "error", code });
      track("lead_error", { code });
    } catch {
      setStatus({ s: "error", code: "failed" });
    }
  }

  const sending = status.s === "sending";

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="on-dark relative overflow-hidden bg-tinta py-24 text-papel sm:py-32"
    >
      <div className="container-lp relative">
        <h2
          id="contato-title"
          className="display max-w-4xl text-[clamp(2.3rem,5.4vw,4.6rem)]"
        >
          O próximo passo da aprendizagem começa na sua instituição.
        </h2>
      </div>
      <div className="container-lp relative mt-12 grid gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="lede max-w-md text-[1.08rem] leading-relaxed text-papel/75">
            Escolas, cursinhos e redes de ensino: vamos mostrar o Domina
            funcionando com atividades reais e conversar sobre como seria um
            projeto-piloto com a sua equipe.
          </p>
          <ul className="mt-10 space-y-3 text-[0.98rem] text-papel/80">
            {[
              "Demonstração guiada, on-line",
              "Conversa sobre a realidade da sua instituição",
              "Sem compromisso de contratação",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <Check className="size-4 shrink-0 text-[#3BB98A]" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          {site.contactEmail ? (
            <p className="mt-10 text-[0.95rem] text-papel/70">
              Prefere e-mail? Escreva para{" "}
              <a
                href={`mailto:${site.contactEmail}`}
                className="text-papel underline decoration-papel/30 underline-offset-4 hover:decoration-papel"
              >
                {site.contactEmail}
              </a>
              .
            </p>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-[1.75rem] border border-papel/10 bg-tinta-2 p-6 sm:p-9">
            {status.s === "sent" ? (
              <div
                role="status"
                className="flex min-h-[26rem] flex-col items-start justify-center"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-dominio text-tinta">
                  <Check className="size-6" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-[1.9rem] font-bold tracking-[-0.03em]">
                  Pedido enviado.
                </h3>
                <p className="mt-3 max-w-md text-papel/75">
                  Recebemos seus dados e vamos responder pelo e-mail informado
                  para combinar a demonstração.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus({ s: "idle" })}
                  className="mt-8 text-[0.95rem] text-[#3BB98A] underline decoration-[#3BB98A]/40 underline-offset-4 hover:decoration-[#3BB98A]"
                >
                  Enviar outro pedido
                </button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="grid gap-5 sm:grid-cols-2"
              >
                <div>
                  <label htmlFor="f-nome" className={label}>
                    Nome
                  </label>
                  <input
                    id="f-nome"
                    name="nome"
                    required
                    autoComplete="name"
                    maxLength={120}
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="f-email" className={label}>
                    E-mail profissional
                  </label>
                  <input
                    id="f-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    maxLength={160}
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="f-inst" className={label}>
                    Instituição
                  </label>
                  <input
                    id="f-inst"
                    name="instituicao"
                    required
                    autoComplete="organization"
                    maxLength={160}
                    className={field}
                  />
                </div>
                <div>
                  <label htmlFor="f-tipo" className={label}>
                    Tipo de instituição{" "}
                    <span className="font-normal text-papel/50">
                      (opcional)
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      id="f-tipo"
                      name="tipo"
                      defaultValue=""
                      className={`${field} appearance-none pr-10`}
                    >
                      <option value="">Selecione</option>
                      {tipos.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-nevoa"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-msg" className={label}>
                    Mensagem{" "}
                    <span className="font-normal text-papel/50">
                      (opcional)
                    </span>
                  </label>
                  <textarea
                    id="f-msg"
                    name="mensagem"
                    rows={4}
                    maxLength={2000}
                    placeholder="Conte um pouco sobre suas turmas e o que gostaria de ver na demonstração."
                    className={`${field} resize-y`}
                  />
                </div>
                {/* honeypot anti-spam */}
                <div
                  aria-hidden
                  className="absolute -left-[9999px] h-px w-px overflow-hidden"
                >
                  <label htmlFor="f-site">Não preencha este campo</label>
                  <input
                    id="f-site"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.82rem] leading-snug text-papel/55 sm:max-w-xs">
                    Usaremos seus dados apenas para responder a este contato.
                  </p>
                  <button
                    type="submit"
                    disabled={sending}
                    className={buttonClass(
                      "primary-dark",
                      "w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto",
                    )}
                  >
                    {sending ? (
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                    ) : null}
                    {sending ? "Enviando…" : "Quero conhecer o Domina"}
                  </button>
                </div>

                <div aria-live="polite" className="sm:col-span-2">
                  {status.s === "error" ? (
                    <p className="rounded-xl border border-caneta/40 bg-caneta/10 p-4 text-[0.92rem] leading-relaxed text-papel">
                      {status.code === "invalid" &&
                        "Confira nome, instituição e um e-mail válido e tente de novo."}
                      {status.code === "not_configured" &&
                        "O envio pelo site ainda não está disponível."}
                      {status.code === "failed" &&
                        "Não foi possível enviar agora. Tente novamente em alguns minutos."}
                      {status.code !== "invalid" && site.contactEmail ? (
                        <>
                          {" "}
                          Você pode escrever direto para{" "}
                          <a
                            className="underline underline-offset-4"
                            href={`mailto:${site.contactEmail}`}
                          >
                            {site.contactEmail}
                          </a>
                          .
                        </>
                      ) : null}
                    </p>
                  ) : null}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
