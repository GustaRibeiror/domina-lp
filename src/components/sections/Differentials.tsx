import { ArrowRight, Check, PenLine, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { MasteryBar } from "@/components/ui/primitives";

const teachers = [
  {
    title: "O professor continua no controle",
    text: "A IA sugere. A nota só chega ao aluno depois da sua aprovação.",
  },
  {
    title: "Menos tempo na primeira leitura",
    text: "Você revisa uma proposta explicada, em vez de começar do zero.",
  },
  {
    title: "A turma inteira em um só lugar",
    text: "Atividades, correções e as habilidades que ainda precisam de reforço.",
  },
];

const students = [
  {
    title: "Muito além de uma nota",
    text: "Cada ponto da correção vem com a explicação do porquê.",
  },
  {
    title: "Sabe o que estudar",
    text: "Orientações e exercícios focados nas próprias dificuldades.",
  },
  {
    title: "Acompanha a própria evolução",
    text: "O domínio de cada habilidade cresce a cada correção aprovada.",
  },
];

/** IA sugere 840 → professor decide 880 */
function ControlDemo() {
  return (
    <div className="flex items-stretch gap-2.5">
      <div className="flex-1 rounded-xl border border-caneta/30 bg-caneta-soft/60 p-3.5">
        <p className="flex items-center gap-1.5 text-[0.75rem] font-medium text-caneta-ink">
          <Sparkles className="size-3" aria-hidden /> Sugestão da IA
        </p>
        <p className="mt-1.5 font-mono text-2xl leading-none text-caneta-ink">
          840
        </p>
      </div>
      <div className="flex items-center text-grafite-2" aria-hidden>
        <ArrowRight className="size-4" />
      </div>
      <div className="flex-1 rounded-xl bg-tinta p-3.5 text-papel">
        <p className="flex items-center gap-1.5 text-[0.75rem] font-medium text-nevoa">
          <PenLine className="size-3 text-caneta" aria-hidden /> Professor
        </p>
        <p className="mt-1.5 flex items-baseline gap-2 font-mono text-2xl leading-none text-[#3BB98A]">
          880
          <Check className="size-4" aria-label="aprovada" />
        </p>
      </div>
    </div>
  );
}

function BenefitList({
  items,
  tone,
}: {
  items: typeof teachers;
  tone: "light" | "dark";
}) {
  return (
    <dl
      className={`mt-7 mb-6 divide-y border-t ${
        tone === "dark"
          ? "divide-papel/15 border-papel/15"
          : "divide-tinta/10 border-tinta/10"
      }`}
    >
      {items.map((t) => (
        <div key={t.title} className="py-4">
          <dt className="font-medium">{t.title}</dt>
          <dd
            className={`mt-1 text-[0.95rem] leading-relaxed ${
              tone === "dark" ? "text-papel/80" : "text-grafite"
            }`}
          >
            {t.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Diferenciais + público: um bloco só, dos dois pontos de vista. */
export function Differentials() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="dif-title"
      className="relative py-24 sm:py-32"
    >
      <div className="container-lp">
        <h2
          id="dif-title"
          className="heading max-w-3xl text-[clamp(2.1rem,4.6vw,3.8rem)]"
        >
          Feito para quem ensina e para quem aprende.
        </h2>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <div className="flex flex-col rounded-[2rem] border border-tinta/10 bg-papel-3 p-7 sm:p-9">
            <h3 className="font-display text-[1.7rem] leading-tight font-bold tracking-[-0.03em]">
              Para professores e instituições
            </h3>
            <BenefitList items={teachers} tone="light" />
            <div className="mt-auto">
              <ControlDemo />
            </div>
          </div>

          <div className="flex flex-col rounded-[2rem] bg-dominio-deep p-7 text-papel sm:p-9">
            <h3 className="font-display text-[1.7rem] leading-tight font-bold tracking-[-0.03em]">
              Para alunos
            </h3>
            <BenefitList items={students} tone="dark" />
            <Reveal className="mt-auto rounded-xl bg-papel/10 p-4">
              <div className="flex items-center justify-between text-[0.88rem]">
                <span>Argumentação</span>
                <span className="font-mono">74%</span>
              </div>
              <MasteryBar
                value={74}
                color="papel"
                delay={250}
                className="mt-2 !bg-tinta/25"
              />
            </Reveal>
          </div>
        </div>

        <p className="mt-12 max-w-3xl border-l-2 border-caneta pl-5 text-[1.1rem] leading-relaxed text-grafite sm:text-[1.2rem]">
          Uma IA genérica dá uma resposta. O Domina dá um caminho: correção no
          padrão da instituição, revisada pelo professor, que vira um mapa do
          que cada aluno ainda precisa dominar.
        </p>
        <p className="mt-6 text-[0.78rem] text-grafite-2">
          Exemplos com dados ilustrativos.
        </p>
      </div>
    </section>
  );
}
