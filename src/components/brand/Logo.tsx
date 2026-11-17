import { useId } from "react";

type Tone = "light" | "dark";

const palette: Record<
  Tone,
  { bar: string; gap: string; text: string; ai: string }
> = {
  // sobre fundo claro (Papel)
  light: { bar: "#141A2E", gap: "#DCD8CC", text: "#141A2E", ai: "#1F7A57" },
  // sobre fundo escuro (Tinta)
  dark: { bar: "#F5F3EC", gap: "#2A3150", text: "#F5F3EC", ai: "#3BB98A" },
};

/**
 * Símbolo "D": uma barra de progresso parcialmente preenchida.
 * `progress` é limitado a 92 — o símbolo nunca aparece 100% cheio.
 */
export function LogoSymbol({
  tone = "light",
  progress = 67,
  className,
  title,
  animated = false,
}: {
  tone?: Tone;
  progress?: number;
  className?: string;
  title?: string;
  animated?: boolean;
}) {
  const c = palette[tone];
  const p = Math.min(Math.max(progress, 0), 92);
  const titleId = useId();
  return (
    <svg
      viewBox="0 0 112 120"
      className={className}
      role={title ? "img" : undefined}
      aria-labelledby={title ? titleId : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M10 10H50A50 50 0 0 1 50 110H10"
        fill="none"
        stroke={c.gap}
        strokeWidth="20"
        strokeLinecap="round"
      />
      <path
        d="M10 10H50A50 50 0 0 1 50 110H10"
        fill="none"
        stroke="#2E9E73"
        strokeWidth="20"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={`${p} 200`}
        data-symbol-fill={animated ? "" : undefined}
        style={
          animated
            ? ({ ["--p" as string]: p } as React.CSSProperties)
            : undefined
        }
      />
      <rect x="0" y="0" width="20" height="120" rx="10" fill={c.bar} />
    </svg>
  );
}

export function Logo({
  tone = "light",
  className = "",
  symbolClassName = "h-7 w-auto",
  showSuffix = true,
}: {
  tone?: Tone;
  className?: string;
  symbolClassName?: string;
  showSuffix?: boolean;
}) {
  const c = palette[tone];
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoSymbol tone={tone} className={symbolClassName} />
      <span
        className="font-display text-[1.6rem] leading-none font-bold tracking-[-0.045em]"
        style={{ color: c.text }}
      >
        domina
        {showSuffix ? (
          <span
            className="ml-0.5 font-mono text-[0.95rem] font-medium tracking-normal"
            style={{ color: c.ai }}
          >
            .ai
          </span>
        ) : null}
      </span>
    </span>
  );
}
