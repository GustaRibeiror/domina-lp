const problems = [
  {
    title: "Tempo demais corrigindo",
    text: "Pilhas de redações e listas, corrigidas uma a uma.",
  },
  {
    title: "Feedback que não ensina",
    text: "O aluno recebe a nota, mas não sabe onde errou.",
  },
  {
    title: "Lacunas que ninguém vê",
    text: "Difícil saber o que cada aluno ainda não domina.",
  },
  {
    title: "Tudo espalhado",
    text: "Cadernos, planilhas, plataformas e grupos de mensagem.",
  },
];

export function Problem() {
  return (
    <section
      id="problema"
      aria-labelledby="problema-title"
      className="relative py-24 sm:py-28"
    >
      <div className="container-lp">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <h2
              id="problema-title"
              className="heading text-[clamp(2.1rem,4.4vw,3.6rem)]"
            >
              Corrigir bem leva tempo. Enquanto isso, a turma segue em frente.
            </h2>
            <p className="lede mt-6 max-w-xl text-[1.05rem] leading-relaxed text-grafite">
              Quando o retorno demora ou se resume a um número, o erro vira só
              mais uma nota no boletim.
            </p>
          </div>

          {/* Nota de contexto com fonte */}
          <figure className="relative max-w-sm rotate-[-1.2deg] rounded-sm bg-papel-3 p-6 shadow-[0_20px_40px_-24px_rgba(20,26,46,0.5),0_2px_6px_-2px_rgba(20,26,46,0.12)] lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <span
              aria-hidden
              className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[2deg] bg-lacuna/80"
            />
            <p className="text-[0.85rem] text-grafite-2">
              PISA 2022, matemática
            </p>
            <p className="mt-2 font-display text-6xl leading-none font-bold tracking-[-0.04em] text-caneta-ink">
              73%
            </p>
            <blockquote className="mt-3 text-[0.98rem] leading-snug text-tinta">
              dos estudantes brasileiros de 15 anos ficaram abaixo do nível
              básico em matemática.
            </blockquote>
            <figcaption className="mt-4 text-[0.75rem] text-grafite-2">
              Fonte: OCDE / Inep, dez. 2023
            </figcaption>
          </figure>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <li key={p.title} className="border-t border-tinta/15 pt-5">
              <h3 className="font-display text-[1.3rem] leading-tight font-bold tracking-[-0.02em]">
                {p.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-grafite">
                {p.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
