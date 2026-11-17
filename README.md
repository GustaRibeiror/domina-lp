# Domina.ai — landing page

Site institucional do Domina.ai (Next.js 16 · App Router · TypeScript · Tailwind CSS 4).

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Configuração

Sem variáveis de ambiente. Os valores ficam no código:

- `src/lib/site.ts` — endereço do site, e-mail comercial (vazio = não aparece), link do vídeo.
- `src/app/api/contato/route.ts` — `LEAD_WEBHOOK_URL`, destino dos pedidos de demonstração (vazio = o formulário avisa que o envio não está disponível).

## Estrutura

- `src/app` — layout, metadados, ícones e a rota `api/contato` (encaminha leads ao webhook).
- `src/components/sections` — uma seção da página por arquivo, na ordem de `src/app/page.tsx`.
- `src/components/product/mocks.tsx` — interfaces ilustrativas (dados fictícios), sempre rotuladas como tal.
- `src/assets` — telas reais do protótipo e foto da equipe.
- `public/media` — vídeo de 1 minuto com as telas do protótipo.
- `src/lib/analytics.ts` — ponto único de eventos (`cta_click`, `lead_submit`, `lead_success`, `lead_error`), publicado em `window.dataLayer` quando existir.

## Regras de conteúdo

- Nada de clientes, depoimentos, métricas de uso ou parcerias sem comprovação.
- Interfaces que não são screenshots reais levam o selo "Interface ilustrativa".
- O símbolo "D" nunca aparece 100% preenchido (`LogoSymbol` limita o progresso).
