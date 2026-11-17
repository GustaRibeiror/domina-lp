/**
 * Interfaces ilustrativas montadas com componentes reais (HTML/CSS),
 * inspiradas nas telas do protótipo. Os dados exibidos são fictícios.
 */
import {
  Check,
  Camera,
  FileText,
  Sparkles,
  PenLine,
  ArrowRight,
  BookOpen,
} from "lucide-react";

const card =
  "rounded-2xl border border-tinta/10 bg-papel-3 text-tinta shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)]";

export function MockEnvio() {
  return (
    <div className={`${card} p-5 sm:p-6`}>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold tracking-[-0.02em]">
          Enviar atividade
        </p>
        <span className="text-[0.75rem] text-grafite-2">Aluno</span>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-[9rem_1fr]">
        {/* "foto" da folha */}
        <div
          aria-hidden
          className="relative h-40 overflow-hidden rounded-xl border border-tinta/10 bg-[repeating-linear-gradient(to_bottom,#fbfaf6_0,#fbfaf6_15px,#d9e3ef_15px,#d9e3ef_16px)] sm:h-full"
        >
          <span className="absolute inset-y-0 left-5 w-px bg-[#e9b4b4]" />
          <div className="absolute top-4 left-7 flex flex-col gap-[9px]">
            {[80, 92, 70, 88, 60, 84, 76].map((w, i) => (
              <span
                key={i}
                className="rise-in block h-[3px] rounded-full bg-[#2b4a8b]/60"
                style={{
                  width: `${w}px`,
                  ["--d" as string]: `${200 + i * 90}ms`,
                }}
              />
            ))}
          </div>
          <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full bg-tinta/80 px-2 py-0.5 text-[0.65rem] text-papel">
            <Camera className="size-3" /> foto
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {[
            {
              icon: FileText,
              name: "Redação ENEM",
              meta: "foto da folha manuscrita",
              p: 100,
            },
            {
              icon: Camera,
              name: "Geometria plana",
              meta: "resolução no caderno",
              p: 72,
            },
          ].map((f, i) => (
            <div
              key={f.name}
              className="rise-in rounded-xl border border-tinta/10 bg-papel p-3"
              style={{ ["--d" as string]: `${i * 160}ms` }}
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex size-8 items-center justify-center rounded-lg bg-dominio-soft text-dominio-deep">
                  <f.icon className="size-4" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{f.name}</p>
                  <p className="truncate text-[0.72rem] text-grafite-2">
                    {f.meta}
                  </p>
                </div>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-lacuna">
                <div
                  className="h-full rounded-full bg-dominio"
                  style={{ width: `${f.p}%` }}
                />
              </div>
            </div>
          ))}
          <p className="flex items-center gap-2 text-[0.75rem] text-grafite-2">
            <span
              aria-hidden
              className="pulse-dot size-1.5 rounded-full bg-dominio"
            />
            Transcrevendo o texto manuscrito…
          </p>
          <span className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-dominio-ink px-4 py-2.5 text-sm font-semibold text-papel">
            <Sparkles className="size-4" aria-hidden /> Gerar correção com IA
          </span>
        </div>
      </div>
    </div>
  );
}

const agentSteps = [
  { t: "Leu o envio", d: "Conferiu a matéria e se o texto está legível." },
  {
    t: "Corrigiu nas 5 competências",
    d: "C1 a C5, com a justificativa de cada nota.",
  },
  {
    t: "Consultou o histórico do aluno",
    d: "Comparou com as correções anteriores.",
  },
  { t: "Gerou exercícios de reforço", d: "Focados no ponto mais fraco: C4." },
  { t: "Sinalizou o que conferir", d: "Pediu atenção do professor em C2." },
];

export function MockAgente() {
  return (
    <div className={`${card} p-5 sm:p-6`}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-lg font-bold tracking-[-0.02em]">
          Passo a passo do agente
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-dominio-soft px-2.5 py-1 text-[0.7rem] font-medium text-dominio-deep">
          <Sparkles className="size-3" aria-hidden /> IA
        </span>
      </div>
      <ol className="mt-5 space-y-1">
        {agentSteps.map((s, i) => (
          <li
            key={s.t}
            className="rise-in flex gap-3 rounded-xl px-2 py-2.5"
            style={{ ["--d" as string]: `${150 + i * 260}ms` }}
          >
            <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-dominio text-papel">
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
            <span>
              <span className="block text-[0.92rem] font-medium">{s.t}</span>
              <span className="block text-[0.78rem] text-grafite-2">{s.d}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const comps = [
  { c: "C1", v: 160 },
  { c: "C2", v: 200, flag: true },
  { c: "C3", v: 160 },
  { c: "C4", v: 160 },
  { c: "C5", v: 200 },
];

export function MockRevisao({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`${card} p-5 sm:p-6`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-display text-lg font-bold tracking-[-0.02em]">
          Redação de Ana B.
        </p>
        <span className="rounded-full bg-caneta px-2.5 py-1 text-[0.68rem] font-semibold text-tinta">
          Aguardando sua revisão
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-mono text-4xl leading-none text-dominio-ink">
          880
        </span>
        <span className="text-[0.78rem] text-grafite-2">
          <span className="font-mono">/ 1000</span>, sugestão da IA com
          confiança de 60%
        </span>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-1.5 sm:gap-2">
        {comps.map((x, i) => (
          <div
            key={x.c}
            className={`rise-in rounded-lg border p-2 sm:p-2.5 ${
              x.flag
                ? "border-caneta bg-caneta-soft"
                : "border-tinta/10 bg-papel"
            }`}
            style={{ ["--d" as string]: `${i * 80}ms` }}
          >
            <p
              className={`font-mono text-[0.6rem] ${x.flag ? "text-caneta-ink" : "text-grafite-2"}`}
            >
              {x.c}
            </p>
            <p className="mt-1 font-mono text-[0.95rem] sm:text-lg">{x.v}</p>
          </div>
        ))}
      </div>
      {!compact ? (
        <p className="mt-4 flex gap-2 rounded-xl bg-caneta-soft/70 p-3 text-[0.8rem] leading-snug text-caneta-ink">
          <PenLine className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          Conferir C2: repertório citado sem fonte. A IA sinalizou para sua
          decisão.
        </p>
      ) : null}
      <div className="mt-5 grid grid-cols-2 gap-2">
        <span className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-dominio-ink py-2.5 text-sm font-semibold text-papel">
          <Check className="size-4" aria-hidden /> Aprovar
        </span>
        <span className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-caneta py-2.5 text-sm font-semibold text-caneta-ink">
          Editar nota
        </span>
      </div>
    </div>
  );
}

export function MockEvolucao() {
  const skills = [
    { k: "Argumentação", v: 74, d: "+8%" },
    { k: "Geometria plana", v: 71, d: "+19%" },
    { k: "Coesão textual", v: 63, d: "+15%" },
  ];
  return (
    <div className={`${card} p-5 sm:p-6`}>
      <div className="rounded-xl bg-tinta p-4 text-papel">
        <p className="text-[0.8rem] font-medium text-nevoa">
          Orientação ao aluno
        </p>
        <p className="mt-2 text-[0.85rem] leading-relaxed text-papel/90">
          Sua redação tem estrutura clara e uma proposta de intervenção
          completa. Para avançar, revise{" "}
          <mark className="rounded bg-caneta/25 px-0.5 text-papel">
            crase e colocação pronominal
          </mark>{" "}
          e retome o 2º parágrafo com um conectivo.
        </p>
      </div>
      <p className="mt-5 font-display text-base font-bold tracking-[-0.02em]">
        Minha evolução
      </p>
      <ul className="mt-3 space-y-3.5">
        {skills.map((s, i) => (
          <li
            key={s.k}
            className="rise-in"
            style={{ ["--d" as string]: `${200 + i * 120}ms` }}
          >
            <div className="flex items-center justify-between text-[0.85rem]">
              <span>{s.k}</span>
              <span className="flex items-center gap-2">
                <span className="rounded-full bg-dominio-soft px-1.5 font-mono text-[0.6rem] text-dominio-deep">
                  {s.d}
                </span>
                <span className="font-mono text-dominio-ink">{s.v}%</span>
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-lacuna">
              <div
                className="h-full rounded-full bg-dominio"
                style={{ width: `${s.v}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5 flex items-center gap-2 rounded-xl border border-tinta/10 bg-papel p-3 text-[0.8rem]">
        <BookOpen className="size-4 shrink-0 text-dominio-ink" aria-hidden />
        <span className="flex-1">
          Próximo passo: 3 exercícios de conectivos e coesão
        </span>
        <ArrowRight className="size-3.5 text-grafite-2" aria-hidden />
      </p>
    </div>
  );
}
