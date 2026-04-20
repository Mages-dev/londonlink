# Roadmap de Migração — Next.js → Vite + React

**Status:** ✅ **CONCLUÍDA** (branch `migration/vite`)
**Projeto:** LondonLink
**De:** Next.js 16.1.6 + React 19.2 · **Para:** Vite 8 + React 19.2 (SPA estática)
**Motivação:** Eliminar superfície de CVEs recorrentes do Next.js e reduzir custo operacional de monitorar/bumpar o framework.
**Risco observado:** Baixo, conforme previsto — acoplamento raso com Next.js.

Este documento fica como registro histórico da migração. Para orientação de desenvolvimento no projeto atual, use [CLAUDE.md](CLAUDE.md).

---

## O que foi feito

- [x] **Fase 0 — Preparação:** branch `migration/vite` criada a partir de `main`, baseline visual capturado.
- [x] **Fase 1 — Scaffold Vite:** `vite.config.ts` com plugin React + Tailwind 4 + alias `@/` → `src/`. Scripts migrados (`dev`/`build`/`preview`). Porta **3000**.
- [x] **Fase 2 — HTML raiz e bootstrapping:** `index.html` na raiz, `src/main.tsx` com providers (Theme, Language), `src/App.tsx` com o conteúdo antes em `src/app/page.tsx`. `src/app/` deletado.
- [x] **Fase 3 — Substituição de imports Next.js:**
  - `next/image` → `<img>` via `OptimizedImage` wrapper (API preservada).
  - `next/font/google` (Geist) → `@fontsource-variable/geist*`.
  - `next/script` (GA) → `<script>` inline em `index.html`.
  - `next/metadata` → `<meta>` estáticas em `index.html`.
  - `next/navigation` / `next/headers` / `next/cache` → não havia uso.
- [x] **Fase 4 — Tailwind 4 e assets:** `globals.css` → `index.css`. Os 7 CSS temáticos sazonais em `src/lib/themes/` funcionaram sem mudanças. `public/` servido nativamente pelo Vite.
- [x] **Fase 5 — QA:** smoke test visual, troca EN↔PT, temas sazonais, galeria, WhatsApp float — paridade 1:1.
- [x] **Fase 6 — Corte:** branch mergeada, `package.json` bumpado para `v3.0.0`.
- [x] **Fase 7 — Limpeza pós-migração:**
  - Removidos do `package.json`: `next`, `eslint-config-next`, `@next/*`.
  - Deletados: `next.config.ts`, `next.config.js`, `next-env.d.ts`, `postcss.config.mjs`.
  - README atualizado.

---

## Atualizações de tooling feitas em seguida

Aproveitando o corte, o tooling também foi modernizado:

- **pnpm** substituiu npm (`pnpm-lock.yaml`).
- **Prettier 3** adicionado (`.prettierrc.mjs`) com integração via `eslint-config-prettier`.
- Flat ESLint 10 + `typescript-eslint` 8 + `eslint-plugin-react-hooks` 7.
- Vite **8** e `@vitejs/plugin-react` **6**.
- Refatoração para compatibilidade com regras estritas de React 19 (ver CLAUDE.md): `react-hooks/set-state-in-effect`, `react-hooks/purity`. Remoção de guards de SSR obsoletos (`mounted` state), extração de `Math.random` para escopo de módulo, adoção do padrão "derive state from props".

---

## Critério final de sucesso — atingido

- ✅ Zero imports `next/*` no código
- ✅ `package.json` sem `next` como dependência
- ✅ Build estático em `dist/` servido por qualquer host
- ✅ Paridade visual/funcional 100% com versão anterior
- ✅ Zero CVEs de Next.js aplicáveis ao projeto a partir do corte
