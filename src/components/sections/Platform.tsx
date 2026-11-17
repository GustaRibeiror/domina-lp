"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { BrowserFrame, StatusTag } from "@/components/ui/primitives";
import { site } from "@/lib/site";
import revisaoRedacao from "@/assets/produto/revisao-redacao-enem.webp";
import correcaoGeometria from "@/assets/produto/correcao-geometria.webp";

type ViewId = "redacao" | "geometria" | "video";

const capabilities = [
  "Redação ENEM nas cinco competências",
  "Redações manuscritas, a partir de foto",
  "Exatas (geometria), questão por questão",
  "Revisão e aprovação do professor",
  "Orientação e plano de estudo do aluno",
];

const views: Array<{ id: ViewId; tab: string; title: string; text: string }> = [
  {
    id: "redacao",
    tab: "Redação ENEM",
    title: "A revisão do professor, com tudo em uma tela.",
    text: "Nota sugerida pela IA, justificativa por competência e o passo a passo que o agente seguiu. O professor ajusta o que precisar antes de liberar o resultado.",
  },
  {
    id: "geometria",
    tab: "Geometria",
    title: "A mesma lógica, em outra matéria.",
    text: "A IA corrige a resolução no caderno questão por questão e marca acertos e erros direto na foto enviada pelo aluno.",
  },
  {
    id: "video",
    tab: "Em 1 minuto",
    title: "O fluxo completo, do envio à evolução.",
    text: "Um vídeo curto com as telas do protótipo: o professor cria a atividade, a IA corrige, o professor valida e o aluno acompanha o que estudar em seguida.",
  },
];

export function Platform() {
  const [view, setView] = useState<ViewId>("redacao");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = views.find((v) => v.id === view)!;

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const to = (i + dir + views.length) % views.length;
    setView(views[to].id);
    tabs.current[to]?.focus();
  };

  return (
    <section
      id="plataforma"
      aria-labelledby="plataforma-title"
      className="relative py-24 sm:py-32"
    >
      <div className="container-lp">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2
            id="plataforma-title"
            className="heading text-[clamp(2.1rem,4.6vw,3.8rem)] text-papel lg:col-span-7"
          >
            Conheça a plataforma por dentro.
          </h2>
          <p className="lede text-[1.05rem] leading-relaxed text-papel/70 lg:col-span-5">
            Estas são telas reais do protótipo em funcionamento.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Telas do Domina"
          className="mt-12 inline-flex max-w-full gap-1 rounded-full border border-papel/10 bg-tinta-2 p-1"
        >
          {views.map((v, i) => (
            <button
              key={v.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`plat-tab-${v.id}`}
              aria-selected={view === v.id}
              aria-controls="plat-panel"
              tabIndex={view === v.id ? 0 : -1}
              onClick={() => setView(v.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`min-h-10 rounded-full px-3.5 text-[0.88rem] whitespace-nowrap transition-colors duration-300 sm:px-5 ${
                view === v.id
                  ? "bg-papel text-tinta"
                  : "text-papel/65 hover:text-papel"
              }`}
            >
              {v.tab}
            </button>
          ))}
        </div>

        <div
          id="plat-panel"
          role="tabpanel"
          aria-labelledby={`plat-tab-${view}`}
          className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-8">
            <div key={view} className="rise-in">
              {view === "redacao" ? (
                <BrowserFrame
                  tone="dark"
                  label="Meu espaço / Revisões / Redação ENEM"
                >
                  <div
                    className="max-sm:overflow-x-auto max-sm:overscroll-x-contain"
                    tabIndex={0}
                    aria-label="Captura de tela; deslize para ver a tela inteira"
                  >
                    <Image
                      src={revisaoRedacao}
                      alt="Tela de revisão de redação do Domina: tema da redação, nota sugerida de 880 de 1000 pontos, notas e justificativas por competência de C1 a C5 e o passo a passo do agente."
                      sizes="(min-width: 1024px) 760px, 220vw"
                      placeholder="blur"
                      className="h-auto w-full max-sm:w-[220%] max-sm:max-w-none"
                    />
                  </div>
                </BrowserFrame>
              ) : null}
              {view === "geometria" ? (
                <BrowserFrame
                  tone="dark"
                  label="Meu espaço / Minhas atividades / Geometria"
                >
                  <div
                    className="max-sm:overflow-x-auto max-sm:overscroll-x-contain"
                    tabIndex={0}
                    aria-label="Captura de tela; deslize para ver a tela inteira"
                  >
                    <Image
                      src={correcaoGeometria}
                      alt="Tela de correção de geometria do Domina: nota de 5 de 10 pontos, resultado por questão e a foto do caderno do aluno com acertos marcados em verde e erros em vermelho."
                      sizes="(min-width: 1024px) 760px, 220vw"
                      placeholder="blur"
                      className="h-auto w-full max-sm:w-[220%] max-sm:max-w-none"
                    />
                  </div>
                </BrowserFrame>
              ) : null}
              {view === "video" ? (
                <div className="flex justify-center rounded-[1.4rem] border border-papel/10 bg-tinta-2 py-8 sm:py-10">
                  <div className="w-[min(18rem,78vw)] overflow-hidden rounded-[2.2rem] border-[6px] border-[#0d1222] bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
                    <video
                      className="aspect-[9/16] h-auto w-full"
                      controls
                      playsInline
                      preload="none"
                      poster="/media/domina-em-60s-poster.webp"
                    >
                      <source src="/media/domina-em-60s.mp4" type="video/mp4" />
                      Seu navegador não reproduz vídeos.{" "}
                      <a href={site.videoUrl}>Assista no YouTube</a>.
                    </video>
                  </div>
                </div>
              ) : null}
            </div>
            {view !== "video" ? (
              <p className="mt-3 text-[0.8rem] text-papel/50 sm:hidden">
                Deslize a imagem para ver a tela inteira.
              </p>
            ) : null}
          </div>

          <div className="lg:col-span-4 lg:pt-4">
            <div key={`t-${view}`} className="rise-in">
              <h3 className="font-display text-[1.7rem] leading-tight font-bold tracking-[-0.025em] text-papel">
                {current.title}
              </h3>
              <p className="mt-4 text-[1rem] leading-relaxed text-papel/70">
                {current.text}
              </p>
              {view === "video" ? (
                <a
                  href={site.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex text-[0.95rem] font-medium text-[#3BB98A] underline decoration-[#3BB98A]/40 underline-offset-4 transition-colors hover:decoration-[#3BB98A]"
                >
                  Assistir no YouTube
                </a>
              ) : null}
            </div>

            {/* Estado real do produto */}
            <div className="mt-10 border-t border-papel/10 pt-6">
              <p className="text-[0.9rem] font-medium text-papel">
                No protótipo hoje
              </p>
              <ul className="mt-3 space-y-1.5 text-[0.92rem] text-papel/70">
                {capabilities.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-dominio"
                    />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex flex-wrap items-center gap-2 text-[0.92rem] text-papel/70">
                <StatusTag status="desenvolvimento" />
                Outras disciplinas e mapa de domínio multidisciplinar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
