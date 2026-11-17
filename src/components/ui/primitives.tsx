import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost-dark" | "primary-dark";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold tracking-[-0.005em] transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.98] select-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-dominio-ink text-papel shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_10px_24px_-12px_rgba(31,122,87,0.7)] hover:bg-dominio-deep hover:shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_14px_30px_-12px_rgba(31,122,87,0.85)]",
  secondary:
    "border border-tinta/15 bg-papel-3/70 text-tinta hover:border-tinta/30 hover:bg-papel-3",
  "primary-dark":
    "bg-dominio text-tinta shadow-[0_10px_30px_-12px_rgba(46,158,115,0.8)] hover:bg-[#3BB98A]",
  "ghost-dark":
    "border border-papel/20 text-papel hover:border-papel/45 hover:bg-papel/5",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow ? (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5"
        />
      ) : null}
    </a>
  );
}

export const buttonClass = (variant: ButtonVariant = "primary", extra = "") =>
  `${base} ${variants[variant]} ${extra}`;

type Status = "prototipo" | "desenvolvimento" | "ilustrativo";

const statusMap: Record<Status, { label: string; cls: string; dot: string }> = {
  prototipo: {
    label: "No protótipo",
    cls: "bg-dominio-soft text-dominio-deep",
    dot: "bg-dominio",
  },
  desenvolvimento: {
    label: "Em desenvolvimento",
    cls: "bg-caneta-soft text-caneta-ink",
    dot: "bg-caneta",
  },
  ilustrativo: {
    label: "Representação ilustrativa",
    cls: "bg-papel-2 text-grafite",
    dot: "bg-nevoa",
  },
};

export function StatusTag({
  status,
  label,
  className = "",
}: {
  status: Status;
  label?: string;
  className?: string;
}) {
  const s = statusMap[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-medium whitespace-nowrap ${s.cls} ${className}`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${s.dot}`} />
      {label ?? s.label}
    </span>
  );
}

/** Traço de caneta desenhado à mão, usado para sublinhar palavras-chave. */
export function PenStroke({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      data-draw=""
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      className={className}
      fill="none"
    >
      <path
        d="M3 9.5C42 5.2 88 4.4 131 5.6c40 1.1 84 3.7 120 2.6 17-.5 31-1.9 46-3.6"
        stroke="#E5A23A"
        strokeWidth="5"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}

/** Moldura de navegador para screenshots reais do produto. */
export function BrowserFrame({
  children,
  label = "Domina",
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  label?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`overflow-hidden rounded-[1.1rem] border ${
        dark
          ? "border-papel/10 bg-tinta-2 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
          : "border-tinta/10 bg-papel-3 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_30px_70px_-35px_rgba(20,26,46,0.45),0_8px_20px_-12px_rgba(20,26,46,0.18)]"
      } ${className}`}
    >
      <div
        className={`flex h-9 items-center gap-3 border-b px-3.5 ${
          dark ? "border-papel/10" : "border-tinta/[0.07] bg-papel-2/60"
        }`}
      >
        <div className="flex gap-1.5" aria-hidden>
          <span
            className={`size-2.5 rounded-full ${dark ? "bg-papel/15" : "bg-tinta/15"}`}
          />
          <span
            className={`size-2.5 rounded-full ${dark ? "bg-papel/15" : "bg-tinta/15"}`}
          />
          <span
            className={`size-2.5 rounded-full ${dark ? "bg-papel/15" : "bg-tinta/15"}`}
          />
        </div>
        <div
          className={`mx-auto max-w-[60%] truncate rounded-md px-3 py-0.5 text-[0.68rem] ${
            dark ? "bg-papel/5 text-nevoa" : "bg-papel-3 text-grafite-2"
          }`}
          aria-hidden
        >
          {label}
        </div>
        <div className="w-[42px]" aria-hidden />
      </div>
      {children}
    </div>
  );
}

/** Barra de domínio (nunca 100%). */
export function MasteryBar({
  value,
  tone = "light",
  color = "dominio",
  delay = 150,
  className = "",
}: {
  value: number;
  tone?: "light" | "dark";
  color?: "dominio" | "caneta" | "papel";
  delay?: number;
  className?: string;
}) {
  const v = Math.min(value, 96);
  return (
    <div
      className={`h-2 overflow-hidden rounded-full ${tone === "dark" ? "bg-tinta-3" : "bg-lacuna"} ${className}`}
      role="presentation"
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${v}%`, ["--fill-delay" as string]: `${delay}ms` }}
      >
        <div
          data-fill=""
          className={`h-full w-full rounded-full ${color === "caneta" ? "bg-caneta" : color === "papel" ? "bg-papel" : "bg-dominio"}`}
        />
      </div>
    </div>
  );
}
