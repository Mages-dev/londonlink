---
name: security-audit
description: >
  Security audit and remediation for the LondonLink Next.js marketing SPA,
  targeting OWASP-aligned production-grade HTTP headers and a CSP without
  unsafe-*. Walks a deterministic checklist over security headers, CSP,
  inline-script policy, secrets, the (future) contact form, dependency CVEs, and
  third-party integrations, then applies minimal fixes. Use when auditing
  security, hardening headers/CSP, reviewing a dependency bump, or before
  committing input-handling/form/config changes.
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
[Next.js CSP with nonces](https://nextjs.org/docs/app/guides/content-security-policy).

Scope reality: a fully client-rendered Next.js 16 App Router marketing SPA — no
auth, no DB (yet). The real attack surface is **headers / CSP, the inline
bootstrap scripts, third-party scripts (GA + Maps embed), the future contact
form, and dependency CVEs**.

## When to use

- Auditing the site (or a touched surface) for security.
- Hardening headers / CSP, or migrating the CSP off `unsafe-*`.
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
   `securityheaders.com` / CSP Evaluator scan of a deployed preview and a browser
   console check (no CSP violations across themes/langs). A change is done only
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
- [ ] `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` set in CSP.

### CSP `script-src` (OWASP A03/A05)

- [ ] No `'unsafe-inline'` / `'unsafe-eval'` (open item — nonce migration).
- [ ] Third-party origins scoped to what's actually used (GA loader; Maps is an
      iframe embed, so Maps JS origins aren't needed in `script-src`).
- [ ] **Nonce migration** (the hard one): generate a per-request nonce in
      `middleware.ts`, propagate to the framework's own inline flight scripts +
      the `layout.tsx` bootstraps + GA `<Script>`. This **forces dynamic
      rendering** — confirm that tradeoff is acceptable and document it; isolate
      in its own PR. Hash-based CSP is not a clean fit (Next emits per-render
      inline scripts that can't be hashed ahead of time). Validate with CSP
      Evaluator + a real browser console.

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
- [ ] Transitive CVEs pinned via `overrides:` in `pnpm-workspace.yaml`
      (pnpm 11 ignores `pnpm.overrides` in `package.json`). Range-scope each
      override so a major line is patched without an API-breaking bump.
- [ ] Re-run `pnpm audit` after every dependency change; prune overrides once
      parents pull the fixes.

### Third-party (OWASP A08)

- [ ] GA loaded via `next/script` `afterInteractive`; Maps via iframe embed only.
- [ ] SRI used where assets are served from a CDN.

## Verification

- [ ] `pnpm lint`, `pnpm format:check`, `pnpm build` pass.
- [ ] `pnpm audit` — no high/critical.
- [ ] External scan of a deployed preview: `securityheaders.com` grade **A**,
      CSP Evaluator no high-severity, Mozilla Observatory pass.
- [ ] Browser console: zero CSP violations across themes and languages.
