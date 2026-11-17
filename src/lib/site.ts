/**
 * Configuração central do site. Edite os valores direto aqui.
 */
export const site = {
  name: "Domina.ai",
  slogan: "Do erro ao domínio.",
  title: "Domina.ai — Do erro ao domínio.",
  description:
    "Correção de atividades com inteligência artificial e revisão do professor. O Domina transforma cada correção em orientação clara de aprendizagem para o aluno.",
  /** Endereço público do site (links de compartilhamento). */
  url: "https://domina-lp.vercel.app",
  locale: "pt_BR",
  /** E-mail comercial. Vazio = nenhum e-mail aparece no site. */
  contactEmail: "",
  videoUrl: "https://www.youtube.com/watch?v=pmRj0nFtO3A",
} as const;

export const nav = [
  { href: "#solucao", label: "Solução" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#sobre", label: "Sobre nós" },
] as const;

export const CTA_HREF = "#contato";
