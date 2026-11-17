import { Logo } from "@/components/brand/Logo";
import { nav, site } from "@/lib/site";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="on-dark border-t border-papel/10 bg-tinta text-papel">
      <div className="container-lp py-14 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Logo tone="dark" symbolClassName="h-7 w-auto" />
            <p className="mt-4 font-display text-xl font-bold tracking-[-0.02em] text-papel/90">
              {site.slogan}
            </p>
          </div>

          <nav aria-label="Rodapé">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-[0.95rem] sm:flex sm:gap-8">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-papel/70 transition-colors hover:text-papel"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contato"
                  className="text-papel/70 transition-colors hover:text-papel"
                >
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-papel/10 pt-6 text-[0.85rem] text-papel/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> Domina.ai
          </p>
          {site.contactEmail ? (
            <a
              href={`mailto:${site.contactEmail}`}
              className="transition-colors hover:text-papel"
            >
              {site.contactEmail}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
