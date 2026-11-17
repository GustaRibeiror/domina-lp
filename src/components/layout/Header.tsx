"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { nav, CTA_HREF } from "@/lib/site";
import { buttonClass } from "@/components/ui/primitives";
import { track } from "@/lib/analytics";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Estado "rolado" da barra
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Link ativo conforme a seção visível
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Menu mobile: Esc fecha, trava rolagem, foco preso no painel
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = menuRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>("a, button");
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && focusables && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#conteudo"
        className="sr-only rounded-full bg-tinta px-4 py-2 text-papel focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
      >
        Pular para o conteúdo
      </a>
      <div
        className={`transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-soft)] ${
          solid
            ? "border-b border-tinta/[0.07] bg-papel/85 shadow-[0_10px_30px_-24px_rgba(20,26,46,0.5)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div
          className={`container-lp flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-out-soft)] ${
            scrolled ? "h-16" : "h-[4.5rem] lg:h-20"
          }`}
        >
          <a
            href="#topo"
            aria-label="Domina.ai — voltar ao início"
            className="rounded-md"
          >
            <Logo symbolClassName="h-[1.6rem] w-auto" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active === item.href ? "true" : undefined}
                    className={`relative rounded-full px-4 py-2 text-[0.92rem] transition-colors duration-300 ${
                      active === item.href
                        ? "text-tinta"
                        : "text-grafite hover:text-tinta"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-4 -bottom-0.5 h-[2px] origin-left rounded-full bg-dominio transition-transform duration-500 ease-[var(--ease-out-soft)] ${
                        active === item.href ? "scale-x-[0.72]" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={CTA_HREF}
              onClick={() => track("cta_click", { location: "header" })}
              className={buttonClass(
                "primary",
                "max-sm:hidden !min-h-10 !px-5 text-[0.88rem]",
              )}
            >
              Agendar demonstração
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-tinta/10 bg-papel-3/80 text-tinta transition-colors hover:border-tinta/25 lg:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden />
              ) : (
                <Menu className="size-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Painel mobile */}
      <div
        id="menu-mobile"
        ref={menuRef}
        hidden={!open}
        className={`fixed inset-x-0 bottom-0 overflow-y-auto bg-papel lg:hidden ${
          scrolled ? "top-16" : "top-[4.5rem]"
        }`}
      >
        <nav
          aria-label="Menu"
          className="container-lp flex min-h-full flex-col pt-6 pb-10"
        >
          <ul className="divide-y divide-tinta/[0.08] border-y border-tinta/[0.08]">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className="rise-in"
                style={{ ["--d" as string]: `${i * 50}ms` }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 font-display text-[1.75rem] font-bold tracking-[-0.03em] text-tinta"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <a
              href={CTA_HREF}
              onClick={() => {
                setOpen(false);
                track("cta_click", { location: "menu_mobile" });
              }}
              className={buttonClass("primary", "w-full")}
            >
              Agendar demonstração <ArrowRight className="size-4" aria-hidden />
            </a>
            <p className="mt-5 text-center font-mono text-xs tracking-wide text-grafite-2">
              Do erro ao domínio.
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
