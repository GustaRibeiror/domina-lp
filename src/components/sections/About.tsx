import Image from "next/image";
import igorSingapura from "@/assets/equipe/igor-singapura.webp";

const timeline = [
  {
    when: "Singapura",
    what: "Tudo começou em um intercâmbio, olhando de perto quem já corrigia redações com IA.",
  },
  {
    when: "Outubro de 2026",
    what: "Protótipo apresentado no DemoDay, em Goiânia.",
  },
  {
    when: "Agora",
    what: "Buscamos escolas e cursinhos para demonstrações e projetos-piloto.",
  },
];

const team = [
  { name: "Lucas Daniel Ribeiro", role: "Front-end e comercial" },
  { name: "Igor Ferreira", role: "Backend e produto" },
  { name: "João Pedro Pessatto", role: "Backend e IA" },
  { name: "Gustavo Flores", role: "Comercial e marketing" },
];

function initials(name: string) {
  const parts = name.split(" ");
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="relative bg-papel-2 py-20 sm:py-28"
    >
      <div className="container-lp grid gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Foto em estilo polaroid */}
        <div className="lg:col-span-5">
          <figure className="relative mx-auto w-full max-w-[22rem] rotate-[-2.5deg] bg-papel-3 p-3 pb-4 shadow-[0_30px_60px_-30px_rgba(20,26,46,0.55),0_2px_6px_-2px_rgba(20,26,46,0.15)] lg:mx-0 lg:mt-4">
            <span
              aria-hidden
              className="absolute -top-3.5 left-1/2 h-7 w-28 -translate-x-1/2 rotate-[3deg] bg-lacuna/85"
            />
            <Image
              src={igorSingapura}
              alt="Igor Ferreira, da equipe do Domina, em frente ao prédio do College of Computing and Data Science, em Singapura."
              sizes="352px"
              placeholder="blur"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
            <figcaption className="mt-3 px-1 text-[0.95rem] text-grafite">
              Igor, em Singapura, onde a ideia começou.
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-7">
          <h2
            id="sobre-title"
            className="heading text-[clamp(2.1rem,4.6vw,3.8rem)]"
          >
            Uma ideia que atravessou o mundo para chegar à sala de aula.
          </h2>
          <p className="lede mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-grafite">
            Um projeto brasileiro de tecnologia educacional, feito por quem
            acredita que o erro é a parte mais valiosa do aprendizado.
          </p>

          <ol className="mt-10 border-l border-tinta/15">
            {timeline.map((t, i) => (
              <li key={t.when} className="relative pb-6 pl-8 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute top-1.5 -left-[5px] size-2.5 rounded-full ${
                    i === timeline.length - 1
                      ? "bg-dominio ring-4 ring-dominio/20"
                      : "bg-tinta/30"
                  }`}
                />
                <p className="font-medium text-tinta">{t.when}</p>
                <p className="mt-1 max-w-xl text-[0.98rem] leading-relaxed text-grafite">
                  {t.what}
                </p>
              </li>
            ))}
          </ol>

          <h3 className="mt-12 font-display text-[1.5rem] font-bold tracking-[-0.025em]">
            A equipe
          </h3>
          <ul className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {team.map((p) => (
              <li key={p.name} className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-tinta font-display text-[0.95rem] font-bold text-papel"
                >
                  {initials(p.name)}
                </span>
                <span>
                  <span className="block font-medium text-tinta">{p.name}</span>
                  <span className="block text-[0.9rem] text-grafite">
                    {p.role}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
