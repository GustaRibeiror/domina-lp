/**
 * Elementos de sala de aula em traço simples (line art), usados no Hero.
 * O traço usa `currentColor`; detalhes em Caneta (revisão) e Domínio (progresso).
 */

const CANETA = "#E5A23A";
const DOMINIO = "#2E9E73";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Carteira + cadeira, vista de lado. Origem: pé da cadeira, no chão. */
function Desk({
  x,
  floor,
  scale = 1,
  book = false,
}: {
  x: number;
  floor: number;
  scale?: number;
  book?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${floor}) scale(${scale})`}>
      <rect x="0" y="-118" width="12" height="64" rx="6" />
      <path d="M2 -52 H58 M8 -52 V0 M52 -52 V0" />
      <rect x="74" y="-92" width="124" height="11" rx="4" />
      <path d="M86 -81 V0 M186 -81 V0 M86 -40 H186" />
      {book ? (
        <rect x="104" y="-103" width="44" height="11" rx="2" stroke={CANETA} />
      ) : (
        <path d="M110 -96 l34 -3" stroke={DOMINIO} />
      )}
    </g>
  );
}

/** Fileiras de carteiras e mesa do professor, apoiadas na base do SVG (o chão). */
export function ClassroomFloor({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 172"
      className={className}
      {...stroke}
      aria-hidden
      focusable="false"
      preserveAspectRatio="xMidYMax meet"
    >
      <g opacity="0.55">
        <Desk x={190} floor={134} scale={0.7} book />
        <Desk x={470} floor={134} scale={0.7} />
        <Desk x={750} floor={134} scale={0.7} book />
      </g>
      <Desk x={60} floor={172} />
      <Desk x={340} floor={172} book />
      <Desk x={620} floor={172} />
      <Desk x={900} floor={172} book />

      {/* mesa do professor */}
      <rect x="1170" y="46" width="230" height="14" rx="4" />
      <path d="M1186 60 V172 M1384 60 V172 M1186 102 H1280 V172" />
      <path d="M1200 36 H1270 M1204 26 H1266" />
      <path d="M1320 46 V14 H1352 V46" />
      <path d="M1330 14 l-6 -11 M1342 14 l6 -11" stroke={CANETA} />
    </svg>
  );
}

export function WallClock({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      {...stroke}
      aria-hidden
      focusable="false"
    >
      <circle cx="40" cy="40" r="36" />
      <path d="M40 18 V40 L56 50" />
    </svg>
  );
}

export function WallWindow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 196"
      className={className}
      {...stroke}
      aria-hidden
      focusable="false"
    >
      <rect x="4" y="4" width="192" height="176" rx="8" />
      <path d="M100 4 V180 M4 92 H196" />
      <path d="M28 154 c20 -26 46 -40 70 -40" opacity="0.6" />
      <path d="M0 190 H200" strokeWidth="5" />
    </svg>
  );
}
