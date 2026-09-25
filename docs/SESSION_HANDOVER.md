# Session Handover — 6Pistons Media — Publication Website (upstream)

| Field | Value |
|---|---|
| Document ID | 6PMU-HANDOVER |
| Project | 6Pistons Media — Publication Website (upstream) |
| Repository | [`yashd-dev/6pistons-Media`](https://github.com/yashd-dev/6pistons-Media) |
| Version | 1.0 |
| Status | Approved — living document |
| Owner | Hirav Kadikar |
| Classification | Public |
| Last updated | 2026-09-25 |

> **Purpose:** Lets the next person (or AI session) pick up the work cold: what exists, what state it is in, what is unfinished, and exactly what to do next.


## 1. Handover summary

| Item | Detail |
|---|---|
| Handover date | 2026-09-25 |
| Handed over by | Hirav Kadikar |
| Repository state | `master` @ `11cf8e2` — 41 commits, last change 2026-09-08 |
| Overall status | Active — upstream source of the production site |
| Live URL | https://www.6pistons.com  (editors: https://cms.6pistons.com) |
| Health | Green — live; this branch stops at the 2026-09-08 overhaul |


## 2. Current state (plain English)

This is the original, public repository for the 6Pistons Media website (default branch `master`). It contains the full
September 2026 technical-SEO / AI-GEO / responsive overhaul and the restored Sanity Studio (commits up to 2026-09-08).
A private continuation, **HiravK/6pm**, carries ten further fixes made on 2026-09-08 → 2026-09-24 (webhook secret
fallback, Studio dynamic rendering, CMS chrome hiding, cms-root redirect, social-bot rules + fb:app_id, image
optimisation disabled to stop Vercel 402 errors, mobile background fix, legacy sitemap redirects, breadcrumb fix).
Decide which repository is the single source of truth and port the missing commits so the two do not drift.
`agent.md` in the repository root is a detailed infrastructure handbook (Cloudflare, Vercel, Sanity, GTM) and remains valid.


## 3. What is done

- Content model (post, author, category, block content) with review fields (rating, pros, cons, FAQs, YouTube)
- Public site: home, article, category, author, about, contact, editorial guidelines, privacy, terms, 404
- Search dialog, infinite scroll, previous/next navigation, related posts
- Technical SEO + AI-GEO (JSON-LD, sitemap, RSS, llms.txt, robots, IndexNow)
- cms subdomain routing and Studio chrome isolation
- Responsive overhaul (phones → 4K); Vercel image 402 fix


## 4. In progress / partially done

- Consolidation with HiravK/6pm (the ten later fixes listed above are not in this repository yet).


## 5. Known issues and bugs

| # | Issue | Impact | Suggested fix |
|---|---|---|---|
| 1 | Later fixes from HiravK/6pm are missing (image optimisation still on, no cms-root redirect, no legacy-sitemap redirects) | Possible Vercel 402 image errors; editors land on a blank Studio root | Cherry-pick the 2026-09-08 → 09-24 commits from HiravK/6pm |
| 2 | Home page calls `redirect('/')` when a page has no posts | Possible redirect loop on empty dataset / out-of-range page | Render an empty state or 404 |
| 3 | Root layout forces dynamic rendering | Page-level ISR is ignored; more Sanity API calls | Scope the host check to middleware only |
| 4 | Two Umami trackers and two Ahrefs injections | Double-counted analytics | Keep one of each |
| 5 | CI installs with pnpm 7 on Node 18 while the lockfile is pnpm v9 | Non-reproducible builds | Pin CI to Node 20 + pnpm 9 |
| 6 | Next.js 15.0.7 is behind current security releases | Exposure to framework CVEs | Upgrade to latest patched 15.x |


## 6. Next steps (prioritised)

1. Agree with Yash which repository (this one or HiravK/6pm) is the source of truth.
1. Port the ten later fixes from HiravK/6pm into `master`.
1. Upgrade Next.js to the latest patched 15.x release.
1. Fix the home-page redirect and duplicate analytics scripts.
1. Add Playwright smoke tests to CI before the deploy step.


## 7. How to resume work in 10 minutes

```bash
git clone https://github.com/HiravK/6pm.git
cd 6pm
cp .env.example .env.local      # fill in tokens/secrets if you need the webhook
npm install
npm run dev                     # http://localhost:3000  (Studio: /studio)
```


## 8. Access, accounts and secrets

Secrets are **never** stored in this repository. The table lists where each credential lives, not its value.

| System | What you need | Where it lives |
|---|---|---|
| GitHub repo yashd-dev/6pistons-Media | Write access (owner: Yash) | GitHub |
| Vercel project `6pistons-website` | Team membership | vercel.com |
| Sanity project 2tb1r00m (org ohjEEaF7i) | Administrator / Editor role | sanity.io/manage |
| Cloudflare (registrar + DNS for 6pistons.com) | Account access | dash.cloudflare.com |
| GitHub Actions secrets | VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID | Repo → Settings → Secrets |
| Google Tag Manager / Ahrefs / Umami | Dashboard logins | Owner accounts |


## 9. Gotchas and tribal knowledge

- Default branch is `master`; the deploy workflow runs on both `master` and `main`.
- Domain renews in December 2026 at Cloudflare (per agent.md) — make sure auto-renew is on.
- `agent.md` documents the complete infrastructure map; keep it in sync with docs/RUNBOOK.md.
- The IndexNow key file in `public/` must match the key in the webhook route.


## 10. Key files to read first

| File | Why |
|---|---|
| `src/app/article/[slug]/page.tsx` | Most important page; all review schema lives here |
| `src/middleware.ts` | CMS subdomain routing |
| `src/app/api/sanity/webhook/route.ts` | Publish → revalidate → IndexNow |
| `next.config.ts` | Redirects, headers, image config |
| `src/sanity/schemaTypes/postType.ts` | Content model |


## 11. Recent history

```text
2026-09-08  11cf8e2  fix(sanity): sanitize projectId and dataset to prevent build failure on vercel
2026-09-08  21393c6  ci: enable manual dispatch for vercel deployment
2026-09-08  61cfaed  fix(seo): fix extractYouTubeId server-client import boundary, navbar category links, sitemap filters, and llms.txt
2026-09-08  e46b529  fix(seo): comprehensive technical SEO audit overhaul, canonical fix, category routes, and youtube integration
2026-09-08  7228cea  fix(responsive): full responsive layout overhaul for phones, tablets, laptops, and large 4K displays
2026-09-08  be37554  feat(ai-geo): add llms.txt standard and dynamic feed.xml RSS feed for AI search engines
2026-09-08  28b32ab  fix(seo): move robots.txt to static public/ directory and enable workflow on both master and main
2026-09-08  a11f4d0  fix(seo): comprehensive technical SEO and Google indexing overhaul
2026-09-08  28edac6  feat(seo): comprehensive technical SEO, E-E-A-T policies, and navigation overhaul
2026-09-08  2141b0a  fix: move contact to small footer text and remove homepage block
2026-09-08  1cc7dec  fix: update footer slogan to 'Brand Led by Enthusiasts'
2026-09-08  fefa441  feat: restore Sanity Studio schemas, configuration and subdomain routing
2026-01-16  b5d213c  feat: made ui diff
2025-10-24  4fda8e5  Fix build errors: escape apostrophe and replace img with Image component
2025-10-24  c093bab  Fix Google indexing issues and improve SEO
```


## 12. Handover checklist

- [ ] Repository builds from a clean clone using the README steps
- [ ] Environment variables documented in the README / runbook
- [ ] Open risks recorded in the risk register
- [ ] Next steps above agreed with the product owner
- [ ] Access to hosting / third-party accounts transferred or shared
