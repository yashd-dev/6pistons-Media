# Operations Runbook — 6Pistons Media — Publication Website (upstream)

| Field | Value |
|---|---|
| Document ID | 6PMU-RUNBOOK |
| Project | 6Pistons Media — Publication Website (upstream) |
| Repository | [`yashd-dev/6pistons-Media`](https://github.com/yashd-dev/6pistons-Media) |
| Version | 1.0 |
| Status | Approved — living document |
| Owner | Hirav Kadikar |
| Classification | Public |
| Last updated | 2026-09-25 |

> **Purpose:** Step-by-step instructions to set up, deploy, operate, monitor, recover and support the system.


## 1. Service overview

| Item | Detail |
|---|---|
| Service | 6Pistons Media — Publication Website (upstream) |
| Hosting | Vercel project `6pistons-website` (deployed by GitHub Actions on push to master/main); Cloudflare DNS; Sanity Content Lake |
| Live URL | https://www.6pistons.com  (editors: https://cms.6pistons.com) |
| Owner / on-call | Hirav Kadikar |
| Criticality | Medium — public brand site; no transactions |
| Target availability | 99.9% (inherits Vercel availability) |


## 2. Environments

| Environment | Where | Notes |
|---|---|---|
| Local | http://localhost:3000 (`npm run dev`) | Studio at /studio uses the same Sanity project |
| Production | Vercel project `6pistons-website` → www.6pistons.com | 6pistons.com redirects (308) to www. DNS and registrar: Cloudflare (nameservers harley/ximena.ns.cloudflare.com) |
| Hosted Studio (optional) | https://6pistons.sanity.studio via `sanity deploy` | cms.6pistons.com can proxy/redirect here instead of the embedded Studio |


## 3. Local setup


### Prerequisites

- Node.js 18+ (CI uses 18; 20 LTS recommended)
- npm or pnpm
- Access to Sanity project `2tb1r00m` (for Studio editing)


### Steps

```bash
git clone https://github.com/HiravK/6pm.git
cd 6pm
cp .env.example .env.local      # fill in tokens/secrets if you need the webhook
npm install
npm run dev                     # http://localhost:3000  (Studio: /studio)
```


## 4. Configuration and secrets

| Variable | Required | Purpose | Where to set in production |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No (defaults to 2tb1r00m) | Sanity project ID | Vercel → Project → Settings → Environment Variables (Production) |
| `NEXT_PUBLIC_SANITY_DATASET` | No (defaults to production) | Sanity dataset | Vercel → Project → Settings → Environment Variables (Production) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | No | GROQ API version date | Vercel → Project → Settings → Environment Variables (Production) |
| `SANITY_STUDIO_BASE_PATH` | No | Studio base path during server render | Vercel → Project → Settings → Environment Variables (Production) |
| `SANITY_API_READ_TOKEN` | No | Token for draft/live reads (not used by public pages today) | Vercel → Project → Settings → Environment Variables (Production) |
| `SANITY_API_WRITE_TOKEN` | No | Reserved for scripts that write content | Vercel → Project → Settings → Environment Variables (Production) |
| `SANITY_WEBHOOK_SECRET` | Yes (production) | Secret used to verify Sanity webhook signatures | Vercel → Project → Settings → Environment Variables (Production) |
| `NEXT_PUBLIC_SANITY_HOOK_SECRET` | No | Legacy fallback for the webhook secret — do not use (NEXT_PUBLIC_ values are exposed to browsers) | Vercel → Project → Settings → Environment Variables (Production) |
| `NEXT_PUBLIC_SITE_URL` | No | Site base URL | Vercel → Project → Settings → Environment Variables (Production) |
| `NEXT_PUBLIC_FACEBOOK_APP_ID` | No | Adds fb:app_id meta tag when set | Vercel → Project → Settings → Environment Variables (Production) |


## 5. Build and release

1. Merge the change into `main`.
1. Watch GitHub → Actions → "Vercel Production Deployment" until green.
1. Open https://www.6pistons.com and run the smoke tests in docs/TEST_PLAN.md.
1. In Sanity (manage.sanity.io → project 2tb1r00m → API → Webhooks) confirm the webhook points to https://www.6pistons.com/api/sanity/webhook with the same secret as SANITY_WEBHOOK_SECRET.
1. Deploy Studio-only changes are included automatically (Studio is part of the app).


### CI/CD pipeline

`.github/workflows/main.yml`: checkout → Node 18 → pnpm 7 → `pnpm install` → `vercel pull --environment=production` → `vercel build --prod` → `vercel deploy --prebuilt --prod`. Requires repo secrets VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID.


## 6. Rollback

1. Revert the offending commit on the default branch (`git revert <sha>`) and push; the host redeploys the previous good state.
1. If the host keeps previous deployments (e.g. Vercel/Netlify), promote the last good deployment from the dashboard for an instant rollback.


## 7. Monitoring and logging

| Signal | Where to look |
|---|---|
| Deploy status | GitHub Actions + Vercel dashboard → Deployments |
| Runtime errors / logs | Vercel → Project → Logs (webhook and feed errors are logged with prefixes `[IndexNow]`, `[RSS Feed]`) |
| Traffic | Umami Cloud dashboard; Ahrefs Web Analytics |
| Indexing | Google Search Console; Bing Webmaster Tools |


## 8. Backup and disaster recovery

Content is stored in Sanity, which keeps document history. Export periodically: `npx sanity dataset export production backup.tar.gz`. Code is in Git.

| Metric | Target |
|---|---|
| RPO (max data loss) | 24 h (daily Sanity export recommended) — 0 for code |
| RTO (max downtime) | < 1 h (redeploy / promote previous Vercel deployment) |


## 9. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Build fails with invalid projectId | Vercel injected `[SENSITIVE]` or a bad env value | Fixed by sanitiser in src/sanity/env.ts; check env values in Vercel |
| Published article not showing | Webhook secret mismatch or webhook disabled | Check Sanity webhook log (401 = secret mismatch); redeploy clears cache |
| Studio shows the site navbar | Middleware not matching host | Confirm request host starts with `cms.` and middleware matcher |
| Home page redirect loop | `fetchPosts` returned zero posts and page redirects to / | Ensure at least one published post; replace redirect with empty state |


## 10. Incident response

1. **Detect** — alert, user report or failed check.
1. **Triage** — confirm impact; classify: SEV1 (site down / data exposed), SEV2 (major feature broken), SEV3 (minor).
1. **Mitigate** — roll back (section 6) before debugging if users are affected.
1. **Fix** — reproduce locally, patch on a branch, test, deploy.
1. **Review** — write a short blameless post-mortem: timeline, root cause, actions; add new risks to the risk register.


## 11. Routine maintenance

- Monthly: update dependencies and re-run the test plan.
- Quarterly: rotate secrets and review access.
- Per release: update CHANGELOG.md and the session handover.
