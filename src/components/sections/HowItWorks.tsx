"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  MockAgente,
  MockEnvio,
  MockEvolucao,
  MockRevisao,
} from "@/components/product/mocks";
import { StatusTag } from "@/components/ui/primitives";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Step = {
  n: string;
  actor: string;
  title: string;
  text: string;
  panel: ReactNode;
  accent: "dominio" | "caneta";
};

const steps: Step[] = [
  {
    n: "01",
    actor: "Aluno",
    title: "O aluno envia a atividade.",
    text: "Redação ENEM ou atividade de exatas, digitada ou fotografada, inclusive manuscrita.",
    panel: <MockEnvio />,
    accent: "dominio",
  },
  {
    n: "02",
    actor: "IA",
    title: "A IA analisa e explica.",
    text: "Sugere a correção, justifica cada ponto e sinaliza o que merece atenção.",
    panel: <MockAgente />,
    accent: "dominio",
  },
  {
    n: "03",
    actor: "Professor",
    title: "O professor revisa e aprova.",
    text: "Ajusta o que achar necessário e decide. Nenhuma nota chega ao aluno sem aprovação.",
    panel: <MockRevisao />,
    accent: "caneta",
  },
  {
    n: "04",
    actor: "Aluno",
    title: "O aluno entende como evoluir.",
    text: "Recebe a correção explicada e sabe o que estudar em seguida.",
    panel: <MockEvolucao />,
    accent: "dominio",
  },
];

const STEP_MS = 7000;

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // pausa (hover/foco) congela a animação via `data-paused`, sem reiniciá-la
  const running = auto && inView && !reduced;
  const next = useCallback(() => setActive((a) => (a + 1) % steps.length), []);

  const select = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let to = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight")
      to = (i + 1) % steps.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      to = (i - 1 + steps.length) % steps.length;
    if (e.key === "Home") to = 0;
    if (e.key === "End") to = steps.length - 1;
    if (to >= 0) {
      e.preventDefault();
      select(to);
      tabsRef.current[to]?.focus();
    }
  };

  const current = steps[active];
  const accentBg = (s: Step) =>
    s.accent === "caneta" ? "bg-caneta" : "bg-dominio";
  const accentText = (s: Step) =>
    s.accent === "caneta" ? "text-caneta" : "text-dominio";

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      aria-labelledby="como-title"
      className="relative pt-14 pb-24 sm:pt-20 sm:pb-28"
    >
      <div className="container-lp">
        <h2 id="como-title" className="sr-only">
          Como funciona
        </h2>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Passos: linha de 4 no celular, lista vertical no desktop */}
          <div
            role="tablist"
            aria-label="Etapas do Domina"
            className="grid grid-cols-4 gap-2 lg:col-span-5 lg:flex lg:flex-col lg:gap-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {steps.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.n}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  role="tab"
                  id={`step-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls="step-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`group relative w-full border-t pt-3 pb-2 text-left transition-colors duration-500 lg:py-6 ${
                    isActive
                      ? "border-papel/20"
                      : "border-papel/10 hover:border-papel/20"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -top-px h-0.5 overflow-hidden lg:h-px"
                  >
                    {isActive ? (
                      running ? (
                        <span
                          key={`${active}-run`}
                          className={`step-progress block h-full w-full ${accentBg(s)}`}
                          style={{
                            ["--step-duration" as string]: `${STEP_MS}ms`,
                          }}
                          onAnimationEnd={next}
                          data-paused={paused}
                        />
                      ) : (
                        <span
                          className={`block h-full w-full ${accentBg(s)}`}
                        />
                      )
                    ) : null}
                  </span>
                  <span className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:gap-5">
                    <span
                      className={`font-mono text-sm transition-colors duration-500 ${
                        isActive ? accentText(s) : "text-papel/40"
                      }`}
                    >
                      {s.n}
                    </span>
                    <span className="lg:flex-1">
                      <span
                        className={`block truncate text-[0.78rem] transition-colors duration-500 lg:text-[0.82rem] ${
                          isActive ? "text-nevoa" : "text-papel/40"
                        }`}
                      >
                        {s.actor}
                      </span>
                      <span
                        className={`mt-1.5 hidden font-display text-[1.6rem] leading-tight font-bold tracking-[-0.025em] transition-colors duration-500 lg:block ${
                          isActive
                            ? "text-papel"
                            : "text-papel/45 group-hover:text-papel/70"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span
                        className={`hidden transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-soft)] lg:grid ${
                          isActive
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-3 text-[0.98rem] leading-relaxed text-papel/70">
                            {s.text}
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="step-panel"
            role="tabpanel"
            aria-labelledby={`step-tab-${active}`}
            className="relative lg:col-span-7"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {/* Texto do passo ativo (só no celular; no desktop está na lista) */}
            <div key={`t-${active}`} className="rise-in mb-6 lg:hidden">
              <h3 className="font-display text-[1.6rem] leading-tight font-bold tracking-[-0.025em] text-papel">
                {current.title}
              </h3>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-papel/70">
                {current.text}
              </p>
            </div>

            <div className="relative">
              <div
                aria-hidden
                className="ink-grid absolute inset-0 hidden rounded-[1.75rem] border border-papel/10 bg-tinta-2/60 lg:block"
              />
              <div className="relative flex items-center justify-center lg:min-h-[34rem] lg:p-12">
                <div key={active} className="rise-in w-full max-w-[30rem]">
                  {current.panel}
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between lg:absolute lg:right-5 lg:bottom-4 lg:left-5 lg:mt-0">
              <StatusTag status="ilustrativo" label="Interface ilustrativa" />
              <span className="font-mono text-[0.68rem] text-papel/40">
                {current.n} / 0{steps.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
