---
name: security-audit
description: >
  Use before editing next.config.js (headers/CSP), the inline scripts in
  src/app/layout.tsx, any third-party script or embed (GA, Maps), any form or
  input handling, or package.json / pnpm-workspace.yaml (adding, bumping or
  overriding a dependency) — and when auditing security or reviewing a
  dependency bump. OWASP-aligned checklist for the LondonLink Next.js marketing
  SPA: hardening headers, the CSP and its documented unsafe-* accepted risk,
  inline-script policy, secrets, the future contact form, dependency CVEs and
  third-party integrity, plus the audit → report → fix → verify flow.
version: 1.0.0
metadata:
  author: johnson
  scope: project
---

# LondonLink Security Audit (OWASP-aligned)

Project-scoped security checklist + remediation flow, parallel to `a11y-audit`.
Authoritative sources, not blogs:
[OWASP Top 10](https://owasp.org/www-project-top-ten/),
[OWASP Secure Headers](https://owasp.org/www-project-secure-headers/),
[OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html),
[MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP),
[MDN HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers),
[Next.js CSP with nonces](https://nextjs.org/docs/app/guides/content-security-policy),
[`headers` in next.config](https://nextjs.org/docs/app/api-reference/config/next-config-js/headers).
Scanners: [securityheaders.com](https://securityheaders.com),
[CSP Evaluator](https://csp-evaluator.withgoogle.com),
[Mozilla Observatory](https://developer.mozilla.org/en-US/observatory).
Advisories: `pnpm audit`, GitHub Dependabot,
[Next.js security advisories](https://github.com/vercel/next.js/security/advisories).

Scope reality: a fully client-rendered Next.js 16 App Router marketing SPA — no
auth, no DB (yet). The real attack surface is **headers / CSP, the inline
bootstrap scripts, third-party scripts (GA + Maps embed), the future contact
form, and dependency CVEs**.

## When to use

- Auditing the site (or a touched surface) for security.
- Hardening headers / CSP, or revisiting the CSP `unsafe-*` accepted risk.
- Reviewing a dependency bump (`pnpm audit` after every change).
- Pre-commit pass on config, forms, or any input handling.

## How it runs

1. **Scope.** Whole site, a single touched file, or a new integration.
   Default: whole site.
2. **Audit.** For a deep audit delegate to the `security-reviewer` agent
   (audit-only, no edits); for a quick touched-code pass, walk the checklist
   below directly.
3. **Report.** Group findings by severity (CRITICAL / HIGH / MEDIUM / LOW /
   INFO), each with `file:line` + the OWASP/CWE reference + a concrete fix.
4. **Fix.** Apply minimal, reviewable diffs. Add any user-facing copy (e.g. form
   error strings) to **both** `en.ts` and `pt.ts`.
5. **Verify.** `pnpm build`, `pnpm lint`, `pnpm audit`, plus an external
   `securityheaders.com` / CSP Evaluator scan of a deployed preview, and
   `pnpm csp:check` against `pnpm build && pnpm start` (fails on any CSP
   violation; lists the GA and Maps responses). A change is done only
   when lint + format:check + build pass and audit is clean.

## Severity → action

| Level    | Meaning                           | Action            |
| -------- | --------------------------------- | ----------------- |
| CRITICAL | Exploitable vuln / data-loss risk | BLOCK — fix first |
| HIGH     | Real bug or significant weakness  | Fix before merge  |
| MEDIUM   | Hardening / maintainability gap   | Fix when possible |
| LOW/INFO | Minor / future-gated              | Triage / note     |

## Checklist

### HTTP security headers — `next.config.js` `headers()` (OWASP A05)

- [ ] `Content-Security-Policy` present.
- [ ] `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.
- [ ] `X-Content-Type-Options: nosniff`.
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`.
- [ ] `Permissions-Policy: camera=(), microphone=(), geolocation=()`.
- [ ] `Cross-Origin-Opener-Policy: same-origin`.
- [ ] `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` set in CSP.

### CSP `script-src` (OWASP A03/A05)

**`'unsafe-inline'` + `'unsafe-eval'` are a documented accepted risk.** They
serve the two inline bootstrap scripts in `layout.tsx` (lang/theme no-flash),
the GA inline config, and the framework's own App Router inline flight scripts
(`__NEXT_F`). **Decision (2026-06): keep them.** This is a static, fully
prerendered marketing page with no auth and no user-controlled data rendered
into the DOM, so the reflected/stored-XSS vector `unsafe-inline` guards against
is not present. Dropping them on App Router needs a per-request nonce, which
forces dynamic rendering and gives up the static prerender + CDN cacheability —
not worth it for a brochure site.

- [ ] Accepted risk still holds: no user input, backend form, or auth added. If
      one was, the nonce migration below becomes required.
- [ ] Third-party origins scoped to what's actually used: GA in `script-src`
      and `connect-src`; Maps is an iframe embed, so it needs only
      `frame-src https://www.google.com` (its JS origins were removed from
      `script-src`/`connect-src` 2026-09, verified with `csp:check`).
- [ ] **Cheap tightening, no rendering tradeoff:** `'unsafe-eval'` is the
      droppable half — nothing in _our_ origin uses `eval` (Maps runs in
      Google's origin; GA4 `gtag.js` does not eval). Removable independently
      after a browser smoke-test. Left in for now (keep-it-simple decision).
- [ ] **Nonce migration** (only when the accepted risk is revisited): generate a
      per-request nonce in `middleware.ts`, propagate to the framework's inline
      flight scripts + the `layout.tsx` bootstraps + GA `<Script>`. Forces
      dynamic rendering; isolate in its own PR, verified on a deployed preview.
      Hash-based CSP is not a clean fit (Next emits per-render inline scripts
      that can't be hashed ahead of time). Validate with CSP Evaluator + a real
      browser console.

### Inline scripts / XSS (OWASP A03)

- [ ] `dangerouslySetInnerHTML` only on the trusted bootstrap scripts in
      `src/app/layout.tsx` (language + theme no-flash). Never user-derived.
- [ ] No other unescaped HTML injection; React escaping not bypassed.

### Config drift

- [ ] Exactly one Next config: `next.config.js`. No `next.config.ts` stub.

### Secrets (OWASP A07)

- [ ] Only the public GA measurement id is client-side; nothing sensitive.
- [ ] Any future server secret is an env var, validated at startup, never
      committed.

### Forms — contact section (OWASP A01/A04, gated on a backend)

Currently links + a Maps embed iframe only
(`src/domain/contact/components/ContactSection.tsx`). Before wiring a backend:

- [ ] Schema-based validation (e.g. Zod) on client **and** server.
- [ ] Rate-limit the endpoint; add a honeypot / light anti-abuse control.
- [ ] CSRF protection for any state-changing request.
- [ ] Never log PII; user-friendly errors, detailed server logs.

### Dependencies (OWASP A06)

- [ ] `pnpm audit` clean. Next.js patched within its minor range (CVE history —
      see `CHANGELOG.md`).
- [ ] Transitive CVEs: refresh within the parent's range first (`pnpm update`);
      an `overrides:` entry in `pnpm-workspace.yaml` only for what the parent's
      range cannot reach (pnpm ignores `pnpm.overrides` in `package.json`),
      range-scoped per major line, pruned once the parent pulls the fix
      (`tooling-guide` → pnpm and supply chain).
- [ ] Re-run `pnpm audit` after every dependency change.

### Third-party (OWASP A08)

- [ ] GA loaded via `next/script` `afterInteractive`; Maps via iframe embed only.
- [ ] New third-party service → its origins added to the CSP in
      `next.config.js`, scoped to the directive that needs them.
- [ ] SRI used where assets are served from a CDN.

## Verification

- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.
- [ ] `pnpm audit` — no high/critical.
- [ ] External scan of a deployed preview: `securityheaders.com` grade **A**,
      CSP Evaluator no high-severity, Mozilla Observatory pass.
- [ ] `pnpm csp:check` on the running build: zero CSP violations, GA and Maps
      responses present. The CSP is baked in at build time — rebuild first.
