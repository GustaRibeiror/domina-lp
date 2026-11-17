/** Abertura do bloco escuro: a proposta em uma frase, seguida do passo a passo. */
export function Solution() {
  return (
    <section
      id="solucao"
      aria-labelledby="solucao-title"
      className="relative pt-24 sm:pt-32"
    >
      <div className="container-lp grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2
          id="solucao-title"
          className="display text-[clamp(2.4rem,5.6vw,4.8rem)] text-papel lg:col-span-8"
        >
          A IA sugere. O professor decide. O aluno entende como evoluir.
        </h2>
        <p className="lede text-[1.05rem] leading-relaxed text-papel/70 lg:col-span-4">
          Correção de redações e atividades com inteligência artificial, sempre
          revisada pelo professor antes de chegar ao aluno.
        </p>
      </div>
    </section>
  );
}
