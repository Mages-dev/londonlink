# Roadmap de Migração — Next.js → Vite + React

**Projeto:** LondonLink
**Versão atual:** Next.js 16.1.6 + React 19.2
**Alvo:** Vite 5 + React 19 (SPA estática)
**Motivação:** Eliminar superfície de CVEs recorrentes do Next.js e reduzir custo operacional de monitorar/bumpar o framework.
**Esforço estimado:** 8–13h (1–2 dias-pessoa)
**Risco:** Baixo — acoplamento raso com Next.js, sem API/middleware/SSR.

---

## Princípios de execução

1. **Branch isolada** (`migration/vite`) — `main` nunca para.
2. **Paridade visual 1:1** antes de otimizar — nada de refactor "de brinde" durante a migração.
3. **Cada fase termina com build verde + smoke test manual** antes de seguir.
4. **Rollback trivial** — `main` fica intocada até o último passo.

---

## Fase 0 — Preparação (30min)

- [ ] Criar branch `migration/vite` a partir de `develop`
- [ ] Congelar features novas no escopo do projeto durante a migração
- [ ] Tirar screenshots da página atual em desktop + mobile (baseline visual)
- [ ] Documentar URLs de assets externos (GA, WhatsApp, imagens em CDN se houver)
- [ ] Verificar se `next.config.ts` vazio tem algum efeito implícito (não tem, mas confirmar)

**Critério de saída:** branch criada, baseline visual salvo.

---

## Fase 1 — Scaffold Vite (1h)

- [ ] `npm create vite@latest . -- --template react-ts` (em pasta temporária, migrar manualmente)
- [ ] Instalar deps principais:
  ```
  react@19 react-dom@19 lucide-react
  ```
- [ ] Instalar devDeps:
  ```
  vite @vitejs/plugin-react typescript @types/react @types/react-dom
  tailwindcss@4 @tailwindcss/vite postcss autoprefixer
  eslint
  ```
- [ ] Configurar `vite.config.ts` com plugin React + Tailwind + alias `@/` → `src/`
- [ ] Criar `tsconfig.json` compatível (copiar paths do atual)
- [ ] Portar scripts do `package.json`:
  ```json
  "dev": "vite --port 3302",
  "build": "tsc -b && vite build",
  "preview": "vite preview --port 3302"
  ```

**Critério de saída:** `npm run dev` sobe página "Hello Vite" na porta 3302.

---

## Fase 2 — HTML raiz e bootstrapping (1h)

- [ ] Criar `index.html` na raiz (substitui [src/app/layout.tsx](src/app/layout.tsx)):
  - `<html lang>` — tratado dinamicamente via `LanguageSync` existente
  - `<meta>` SEO estáticos (título, description, OG tags)
  - Preconnect/link de fontes (ver Fase 4)
  - Script do Google Analytics inline no `<head>`
- [ ] Criar `src/main.tsx` com `createRoot` + providers (Language, Theme)
- [ ] Criar `src/App.tsx` com o conteúdo atual de [src/app/page.tsx](src/app/page.tsx)
- [ ] Deletar `src/app/` após confirmação

**Critério de saída:** página renderiza estrutura básica, providers ativos.

---

## Fase 3 — Substituir imports do Next.js (2–3h)

### 3.1 `next/image` → `<img>` nativo + otimização no build
- [ ] Identificar todos os usos (grep `from "next/image"`)
- [ ] Criar componente `OptimizedImage` wrapper que mantém a API atual mas usa `<img>` com `loading="lazy"`, `decoding="async"`, `srcSet`
- [ ] Adicionar `vite-imagetools` (opcional) se precisar de resize/WebP automático
- [ ] Verificar que [src/domain/shared/OptimizedImage](src/domain/shared/) já é wrapper — só trocar implementação interna

### 3.2 `next/font/google` (Geist) → Fontsource
- [ ] Instalar `@fontsource-variable/geist` e `@fontsource-variable/geist-mono`
- [ ] Importar em `src/main.tsx` ou CSS global
- [ ] Ajustar `font-family` no Tailwind config

### 3.3 `next/script` → `<script>` em `index.html`
- [ ] Mover snippet do GA do layout.tsx para `<head>` do `index.html`
- [ ] Garantir que `strategy="afterInteractive"` vira `defer` ou carregamento manual

### 3.4 `next/metadata` → `<meta>` estáticos + (opcional) `react-helmet-async`
- [ ] Como é 1 página só, meta tags estáticas no `index.html` resolvem
- [ ] Se quiser troca dinâmica (ex: título por idioma), adicionar `react-helmet-async`

### 3.5 `next/navigation`, `next/headers`, `next/cache`
- [ ] Confirmar via grep que **não há uso** (análise inicial confirmou ausência)

**Critério de saída:** `grep -r "from \"next" src/` retorna vazio. Build passa.

---

## Fase 4 — Tailwind 4 + assets estáticos (1h)

- [ ] Migrar `src/app/globals.css` para `src/index.css`
- [ ] Revisar os 7 CSS temáticos sazonais em [src/components/ui/](src/components/ui/) — devem funcionar sem mudanças
- [ ] Mover `public/` raiz (imagens, favicon, OG image) — Vite serve `public/` nativamente
- [ ] Validar caminhos absolutos de assets (`/foo.png` continua funcionando)

**Critério de saída:** todos os temas sazonais renderizam idênticos ao baseline.

---

## Fase 5 — QA e paridade visual (2–3h)

- [ ] Smoke test de cada seção: Hero, About, Goals, Books, Feedback, Gallery, Contact
- [ ] Testar troca de idioma EN ↔ PT e persistência
- [ ] Testar troca de tema sazonal (forçar via `?theme=carnival` etc.)
- [ ] Testar galeria (modal, navegação)
- [ ] Testar botão flutuante WhatsApp
- [ ] Verificar Core Web Vitals com Lighthouse vs. baseline
- [ ] Comparar screenshots desktop + mobile com os da Fase 0
- [ ] Validar SEO tags com [opengraph.xyz](https://www.opengraph.xyz/) (preview)
- [ ] Testar GA disparando `page_view`

**Critério de saída:** paridade visual e funcional 100%.

---

## Fase 6 — Deploy e corte (1–2h)

- [ ] Escolher host estático:
  - **Cloudflare Pages** (recomendado — CDN global, free tier generoso)
  - Netlify, Vercel (static), ou S3+CloudFront
- [ ] Configurar build: `npm run build` → pasta `dist/`
- [ ] Deploy em ambiente de staging primeiro
- [ ] Validar staging com stakeholder
- [ ] Atualizar DNS / apontar produção
- [ ] Merge `migration/vite` → `develop` → `main`
- [ ] Tag `v3.0.0` (breaking: framework change)

**Critério de saída:** produção rodando em Vite, monitoramento 24h sem incidentes.

---

## Fase 7 — Limpeza pós-migração (30min)

- [ ] Remover do `package.json`: `next`, `eslint-config-next`, `@next/*`
- [ ] Deletar `next.config.ts`, `next-env.d.ts`, `.next/` (gitignore), `.vercel/` se existir
- [ ] Atualizar [README.md](README.md) com novas instruções de dev/build
- [ ] Remover workflows de CI específicos de Next (se houver)
- [ ] Atualizar `version.ts` em [src/lib/](src/lib/)
- [ ] Commit: `chore: remove Next.js remnants post-migration`

---

## Riscos e mitigações

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Perda de SEO score por mudança de meta tags | Baixa | Validar com Lighthouse antes do corte; manter URLs/slugs idênticos |
| Regressão visual em tema sazonal pouco testado | Média | Screenshots + testar os 7 temas manualmente na Fase 5 |
| Imagens maiores sem `next/image` | Média | `vite-imagetools` ou CDN com query params (Cloudflare Images) |
| Google Analytics deixar de disparar | Baixa | Validar em Real-Time report do GA |
| Tempo de build maior no CI | Baixa | Vite tende a ser mais rápido que Next em SPAs |

---

## Critério final de sucesso

- ✅ Zero imports `next/*` no código
- ✅ `package.json` sem `next` como dependência
- ✅ Build estático em `dist/` servido por qualquer host
- ✅ Paridade visual/funcional 100% com versão anterior
- ✅ Core Web Vitals iguais ou melhores
- ✅ Zero CVEs de Next.js aplicáveis ao projeto a partir do corte
