import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import {
  BrowserFrame,
  ButtonLink,
  MasteryBar,
  PenStroke,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import {
  ClassroomFloor,
  WallClock,
  WallWindow,
} from "@/components/brand/ClassroomIllustration";
import { CTA_HREF } from "@/lib/site";
import revisaoRedacao from "@/assets/produto/revisao-redacao-enem.webp";

/**
 * O Hero é uma sala de aula: a lousa mostra o Domina, as carteiras ficam
 * na base e o chão separa o Hero da próxima seção.
 */
export function Hero() {
  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative flex flex-col overflow-x-clip pt-28 sm:pt-32 lg:min-h-[100svh] lg:pt-28"
    >
      {/* Parede: janela e relógio, só em telas largas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 hidden text-tinta/20 xl:block"
      >
        <WallWindow className="absolute top-10 left-4 w-16 2xl:left-12 2xl:w-24" />
        <WallClock className="absolute top-2 right-6 w-10 2xl:right-16 2xl:w-12" />
      </div>

      <div className="container-lp relative grid flex-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h1
            id="hero-title"
            className="display text-[clamp(2.7rem,8.4vw,5.4rem)] text-tinta lg:text-[clamp(2.9rem,4.4vw,4.6rem)]"
          >
            Cada{" "}
            <span className="relative inline-block whitespace-nowrap">
              erro
              <PenStroke className="absolute -bottom-[0.08em] left-[-6%] h-[0.22em] w-[112%]" />
            </span>{" "}
            é uma oportunidade de aprender.
          </h1>

          <div className="rise-in" style={{ ["--d" as string]: "140ms" }}>
            <p className="lede mt-7 max-w-[31rem] text-[1.1rem] leading-relaxed text-grafite sm:text-[1.15rem]">
              O Domina.ai combina inteligência artificial e acompanhamento do
              professor para transformar correções em orientações claras de
              aprendizagem.
            </p>
          </div>

          <div
            className="rise-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ ["--d" as string]: "220ms" }}
          >
            <ButtonLink href={CTA_HREF}>Agendar demonstração</ButtonLink>
            <ButtonLink href="#solucao" variant="secondary">
              Conheça a solução
            </ButtonLink>
          </div>
        </div>

        {/* A lousa: slogan a giz e a tela real do produto */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-6 lg:mr-0 lg:max-w-[31rem] xl:max-w-[34rem]">
          <div
            className="rise-in relative mb-12"
            style={{ ["--d" as string]: "180ms" }}
          >
            <div className="rounded-[1.4rem] bg-[#d6cfbd] p-2 shadow-[0_30px_60px_-34px_rgba(20,26,46,0.55)] sm:p-2.5">
              <div className="rounded-[1rem] bg-[radial-gradient(120%_90%_at_30%_10%,#232b48,#1a2038)] p-3.5 sm:p-5">
                <p className="relative inline-block font-display text-[1.2rem] font-bold tracking-[-0.03em] text-papel/90 sm:text-[1.35rem]">
                  Do erro ao domínio.
                  <PenStroke className="absolute -bottom-2 left-0 h-2.5 w-full" />
                </p>
                <div className="mt-5 sm:mt-6">
                  <BrowserFrame
                    tone="dark"
                    label="Meu espaço / Revisões / Redação ENEM"
                  >
                    {/* No celular, aproxima o trecho da revisão para manter a tela legível */}
                    <div className="overflow-hidden max-sm:aspect-[16/11]">
                      <Image
                        src={revisaoRedacao}
                        alt="Tela real do Domina: revisão de uma redação modelo ENEM com nota sugerida pela IA de 880 pontos, notas por competência de C1 a C5 e o passo a passo do agente."
                        priority
                        placeholder="blur"
                        sizes="(min-width: 1024px) 520px, (min-width: 640px) 520px, 200vw"
                        className="h-auto w-full max-sm:-mt-[19%] max-sm:-ml-[36%] max-sm:w-[200%] max-sm:max-w-none"
                      />
                    </div>
                  </BrowserFrame>
                </div>
              </div>
            </div>
            {/* bandeja da lousa, com giz e apagador */}
            <div
              aria-hidden
              className="relative mx-5 h-2.5 rounded-b-md bg-[#c4bca8]"
            >
              <span className="absolute -top-1.5 left-[14%] h-1.5 w-7 rounded-full bg-papel-3" />
              <span className="absolute -top-1.5 left-[22%] h-1.5 w-4 rounded-full bg-caneta/80" />
              <span className="absolute -top-2.5 right-[16%] h-2.5 w-12 rounded-sm bg-tinta-3" />
            </div>

            {/* Sugestão da IA aguardando o professor */}
            <div className="absolute -bottom-10 -left-2 w-[15rem] sm:-left-8 lg:-left-10">
              <div className="rounded-[1.1rem] bg-tinta p-4 text-papel shadow-[0_30px_60px_-25px_rgba(20,26,46,0.75)] ring-1 ring-papel/10">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[0.78rem] whitespace-nowrap text-nevoa">
                    Sugestão da IA
                  </span>
                  <span className="rounded-full bg-caneta px-2 py-0.5 text-[0.68rem] font-semibold whitespace-nowrap text-tinta">
                    Aguardando revisão
                  </span>
                </div>
                <p className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-mono text-[1.8rem] leading-none text-[#3BB98A]">
                    880
                  </span>
                  <span className="font-mono text-xs text-nevoa">/ 1000</span>
                </p>
                <p className="mt-3 flex items-start gap-1.5 text-[0.8rem] leading-snug text-papel/75">
                  <ShieldCheck
                    aria-hidden
                    className="mt-px size-3.5 shrink-0 text-caneta"
                  />
                  A nota só chega ao aluno depois que você aprova.
                </p>
              </div>
            </div>

            {/* Domínio do aluno */}
            <Reveal className="absolute -top-8 right-4 hidden w-[12.5rem] sm:block lg:top-[44%] lg:-right-8">
              <div className="rounded-xl border border-tinta/10 bg-papel-3 p-3.5 shadow-[0_24px_50px_-28px_rgba(20,26,46,0.55)]">
                <div className="flex items-center justify-between">
                  <span className="text-[0.84rem] font-medium text-tinta">
                    Coesão textual (C4)
                  </span>
                  <span className="font-mono text-[0.84rem] text-dominio-ink">
                    55%
                  </span>
                </div>
                <MasteryBar value={55} delay={1100} className="mt-2.5" />
                <p className="mt-2 text-[0.72rem] text-grafite-2">
                  com base em 7 correções aprovadas
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Carteiras na base e o chão como divisória */}
      <div
        aria-hidden
        className="pointer-events-none relative mt-6 text-tinta/20 lg:mt-2"
      >
        <ClassroomFloor className="mx-auto h-auto w-full max-w-[60rem] px-4" />
      </div>
      <div
        aria-hidden
        className="h-5 border-t-2 border-tinta/15 bg-papel-2 sm:h-7"
      />
    </section>
  );
}
