# Project Overview (In Depth) — 6Pistons Media — Publication Website (upstream)

| Field | Value |
|---|---|
| Document ID | 6PMU-PROJECT |
| Project | 6Pistons Media — Publication Website (upstream) |
| Repository | [`yashd-dev/6pistons-Media`](https://github.com/yashd-dev/6pistons-Media) |
| Version | 1.0 |
| Status | Approved — living document |
| Owner | Hirav Kadikar |
| Classification | Public |
| Last updated | 2026-09-25 |

> **Purpose:** The complete, plain-English explanation of this project: why it exists, what it does, how every part works, how it evolved, its quality, security, risks and vocabulary.


## 1. The project in one paragraph

**6pistons-Media** is the original codebase for [6Pistons Media](https://www.6pistons.com), an independent automotive
publication ("Brand Led by Enthusiasts"), created by Yash in December 2024 and maintained with Hirav Kadikar. It is a
Next.js 15 App Router site that reads articles, authors and categories from the **Sanity** headless CMS and renders fast,
SEO-rich review pages. The same deployment also hosts **Sanity Studio**, the editors' writing tool, at `/studio` and on
the `cms.6pistons.com` subdomain.

Beyond a normal blog, the site is engineered for discoverability: per-article Schema.org structured data (Article,
Review with a 1–10 score, FAQPage, VideoObject, BreadcrumbList), a dynamic XML sitemap, an RSS 2.0 feed, an `llms.txt`
guide for AI assistants, explicit crawler rules for search and AI bots, and instant re-indexing through IndexNow
whenever an editor publishes.


## 2. Background and why it exists

Automotive enthusiasts in India and abroad want honest, detailed reviews, but independent publishers struggle to be
found next to large media houses. 6Pistons needed a site that (a) editors with no coding skills can update in minutes,
(b) loads fast on phones, and (c) ranks in Google and is cited by AI search engines (ChatGPT, Perplexity, Claude,
Gemini). Earlier versions (built Dec 2024 – Jan 2026) had working content but weak indexing, broken canonical URLs,
sitemap issues and poor mobile layout.


## 3. Fact sheet

|  |  |
|---|---|
| Repository | Public — `yashd-dev/6pistons-Media` |
| Status | Active — upstream source of the production site |
| Live URL | https://www.6pistons.com  (editors: https://cms.6pistons.com) |
| Hosting | Vercel project `6pistons-website` (deployed by GitHub Actions on push to master/main); Cloudflare DNS; Sanity Content Lake |
| Primary language | TypeScript |
| Default branch | `master` |
| History | 41 commits from 2024-12-03 to 2026-09-08 |
| Contributors | Yash (27 commits), Hirav K (12 commits), hiravk (2 commits) |
| Upstream / related | Original repository by Yash (yashd-dev). A private continuation with later fixes lives at HiravK/6pm. |


## 4. Features explained


### Review pages

Hero image, verdict box (score out of 10, pros, cons), rich body, YouTube review embed, FAQs, reading time, author byline, related and previous/next articles


### Embedded CMS

Sanity Studio at /studio and cms.6pistons.com so editors publish without developers


### Instant publishing

Signed Sanity webhook revalidates pages and pings IndexNow within seconds of Publish


### Search and browsing

Keyword search across titles, descriptions and body text; category filters; pagination and infinite scroll


### SEO and AI-search optimisation

JSON-LD (Article, Review, FAQPage, VideoObject, BreadcrumbList, CollectionPage, ProfilePage), sitemap.xml, feed.xml, llms.txt, AI-crawler-friendly robots.txt


### Trust pages

About, Editorial Guidelines, Contact (press, pitch, advertising channels), Privacy and Terms


### Responsive dark design

Magazine layout tuned for phones, tablets, laptops and 4K displays


### Analytics

Umami (cookieless) and Ahrefs Web Analytics


## 5. How it works end to end

A single Next.js 15 (App Router) application deployed to Vercel serves two audiences from one codebase:
**readers** (public site, server-rendered React with incremental static regeneration) and **editors** (Sanity Studio
mounted at `/studio`, or at the root of `cms.6pistons.com` via middleware rewrite). All content is stored in the Sanity
Content Lake and read through the Sanity CDN with GROQ queries from server components and server actions. When an
editor publishes, a signed Sanity webhook tells the site to revalidate cached pages and pings IndexNow.


### Publish a review

1. Editor opens https://cms.6pistons.com (redirects to Posts list)
1. Creates a Post and fills title → slug → description → author → main image → categories → publishedAt → body
1. Optionally adds YouTube URL / rating / pros / cons / FAQs
1. Clicks Publish
1. Sanity fires the webhook to /api/sanity/webhook
1. Site revalidates home + sitemap + the article and pings IndexNow
1. Article is live and discoverable


### Read a review

1. Reader lands from Google / social / RSS on /article/<slug>
1. Page renders hero image + verdict box + body + video + FAQs
1. Reader uses previous/next or related links to continue

Diagrams and component detail: [ARCHITECTURE.md](ARCHITECTURE.md).


## 6. Technology choices

| Layer | Technology | Why it is used |
|---|---|---|
| Framework | Next.js 15.0.7 (App Router, Turbopack dev) | SSR/ISR pages, route handlers, server actions |
| UI | React 18.3 + Tailwind CSS 3.4 + @tailwindcss/typography | Styling and article typography |
| Motion | Framer Motion 11, Lenis | Animations and smooth scrolling |
| CMS | Sanity v3 + next-sanity 9 (Studio, Vision) | Headless content + embedded editor |
| Rich text | @portabletext/react | Render Sanity block content |
| Icons | lucide-react | UI icons |
| Language | TypeScript 5 | Type safety |
| Hosting / CI | Vercel + GitHub Actions (pnpm, Vercel CLI) | Build and production deploys |
| Analytics | Umami Cloud, Ahrefs Web Analytics | Privacy-friendly traffic stats |


## 7. Codebase tour

```text
6pm/
├── .github/workflows/main.yml   # Vercel production deploy
├── public/                      # robots.txt, llms.txt, IndexNow key, logos, OG image
├── sanity.config.ts             # Studio configuration
├── sanity.cli.ts                # Sanity CLI (studioHost: sixpistons)
├── next.config.ts               # images, redirects, security headers
└── src/
    ├── middleware.ts            # cms subdomain routing
    ├── lib/slugs.ts             # slug + YouTube helpers
    ├── sanity/                  # env, client, image, live, queries, schemaTypes, structure
    └── app/
        ├── page.tsx             # home (paginated list)
        ├── article/[slug]/      # review pages
        ├── category/[category]/ # category listings
        ├── author/[slug]/       # author profiles
        ├── actions/             # server actions (GROQ)
        ├── api/sanity/webhook/  # revalidate + IndexNow
        ├── feed.xml/ sitemap.ts # discovery feeds
        ├── studio/[[...tool]]/  # embedded Sanity Studio
        ├── components/          # navbar, footer, search, etc.
        └── about|contact|editorial-guidelines|privacy|terms/
```

| Component | Location | What it does |
|---|---|---|
| Middleware | `src/middleware.ts` | Detects `cms.` host or `/studio`, sets `x-is-cms`, redirects cms root to `/structure/post`, rewrites cms paths to `/studio/*` |
| Root layout | `src/app/layout.tsx` | Fonts, global metadata, Organization/WebSite JSON-LD, analytics scripts, hides navbar/footer on CMS pages |
| Home page | `src/app/page.tsx` | Paginated + category-filtered post list (AllBlogs component) |
| Article page | `src/app/article/[slug]/page.tsx` | Article render, metadata, Article/Review/FAQ/Video/Breadcrumb JSON-LD, related posts, prev/next |
| Category page | `src/app/category/[category]/page.tsx` | Category listing with CollectionPage + BreadcrumbList schema |
| Author page | `src/app/author/[slug]/page.tsx` | Author profile with ProfilePage/Person schema |
| Static pages | `src/app/{about,contact,editorial-guidelines,privacy,terms}` | Trust / E-E-A-T and legal pages |
| Server actions | `src/app/actions/` | GROQ data access: pagination, categories, search, adjacent/more posts |
| Webhook handler | `src/app/api/sanity/webhook/route.ts` | Verifies Sanity signature, revalidates paths, pings IndexNow |
| Sitemap / RSS | `src/app/sitemap.ts, src/app/feed.xml/route.ts` | Machine-readable discovery feeds |
| Sanity config & schemas | `sanity.config.ts, src/sanity/` | Studio config, content model, client, image URL builder |
| UI components | `src/app/components/` | Navbar, footer, search dialog, infinite scroll, YouTube embed, post navigation, hero |
| Slug helpers | `src/lib/slugs.ts` | Accent-insensitive category slugs; YouTube ID extraction |


## 8. Project timeline

| Phase | Scope | Status |
|---|---|---|
| v0 (Dec 2024) | Next.js scaffold, coming-soon page, Sanity blog schema, GitHub Actions → Vercel | Done |
| v1 (Dec 2024 – Jun 2025) | Articles, authors, SEO basics, sitemap, Ahrefs/GTM, footer links | Done |
| v1.1 (Oct 2025 – Jan 2026) | Google indexing fixes, UI refresh | Done |
| v2 (Sep 2026) | Studio + cms subdomain restored, technical SEO & AI-GEO overhaul (llms.txt, RSS, structured data, IndexNow), responsive overhaul | Done |
| v2.1 (next) | Automated tests, remove duplicate analytics scripts, fix empty-home redirect loop, add `keywords` field to schema, Next.js security upgrade | Planned |
| v3 (later) | Newsletter signup, comparison pages, image optimisation via Sanity CDN params | Proposed |

Recent commits:

```text
2026-09-08  fix(sanity): sanitize projectId and dataset to prevent build failure on vercel
2026-09-08  ci: enable manual dispatch for vercel deployment
2026-09-08  fix(seo): fix extractYouTubeId server-client import boundary, navbar category links, sitemap filters, and llms.txt
2026-09-08  fix(seo): comprehensive technical SEO audit overhaul, canonical fix, category routes, and youtube integration
2026-09-08  fix(responsive): full responsive layout overhaul for phones, tablets, laptops, and large 4K displays
2026-09-08  feat(ai-geo): add llms.txt standard and dynamic feed.xml RSS feed for AI search engines
2026-09-08  fix(seo): move robots.txt to static public/ directory and enable workflow on both master and main
2026-09-08  fix(seo): comprehensive technical SEO and Google indexing overhaul
2026-09-08  feat(seo): comprehensive technical SEO, E-E-A-T policies, and navigation overhaul
2026-09-08  fix: move contact to small footer text and remove homepage block
2026-09-08  fix: update footer slogan to 'Brand Led by Enthusiasts'
2026-09-08  feat: restore Sanity Studio schemas, configuration and subdomain routing
```


## 9. Team and ownership

| Person / group | Role | Interest |
|---|---|---|
| Yash (yashd-dev) | Repository owner and original developer | Code ownership, original design, Sanity setup |
| Hirav Kadikar | Collaborator and maintainer (SEO, Studio, responsive overhaul) | Site health, SEO, deployments |
| 6Pistons editorial team | Content authors | Easy publishing |
| Readers | End users | Fast, trustworthy reviews |


## Quality and testing

No automated test suite exists yet. Quality is checked by `npm run lint`, a successful `next build`, and the manual smoke tests below.

Acceptance checks to run before every release:

| # | Area | Check | Expected result |
|---|---|---|---|
| 1 | Home | Open / | 10 newest posts, pagination works, category chips filter |
| 2 | Home | Open /?page=999 | Should show an empty state; today it redirects to / (verify no loop) |
| 3 | Article | Open an article with rating, pros/cons, FAQs, YouTube | All blocks render; JSON-LD validates in Google Rich Results Test |
| 4 | Article | Open /article/does-not-exist | 404 page |
| 5 | Category | Open /category/cars and /category/Cars | Same content; canonical is lowercase slug |
| 6 | Search | Search for a model name | Matching posts appear; category filter narrows results |
| 7 | CMS | Open cms.6pistons.com | Redirects to /structure/post, no site navbar |
| 8 | Webhook | POST to /api/sanity/webhook with an invalid signature | 401 Invalid Signature |
| 9 | Webhook | Publish a post in Studio | Page updates within ~1 min; response lists IndexNow URLs |
| 10 | SEO | GET /sitemap.xml, /feed.xml, /robots.txt, /llms.txt | 200 with correct content types |
| 11 | SEO | GET /post-sitemap.xml and /sitemap_index.xml | 301 to /sitemap.xml |
| 12 | Responsive | Check 375 px, 768 px, 1440 px, 3840 px widths | No horizontal scroll, dark background to page bottom |

Recommended improvements:

- Add Playwright smoke tests for the cases above and run them in CI before deploy.
- Add unit tests for `categoryToSlug` and `extractYouTubeId`.
- Validate JSON-LD automatically (schema-dts types or a structured-data linter).


## Security and privacy

| Area | Current state |
|---|---|
| Authentication | Public site has no login. Sanity Studio uses Sanity's own authentication (Google/GitHub/email SSO managed by Sanity). |
| Authorisation | Editor permissions are managed in Sanity project roles. |
| Data handled | Public editorial content. No reader personal data is stored; contact uses the visitor's mail client. |
| Secrets | SANITY_WEBHOOK_SECRET and Vercel tokens live in Vercel/GitHub secrets. `.env*` is git-ignored except `.env.example`. |
| Transport | HTTPS via Vercel; security headers set in next.config.ts. |

Controls in place:

- Webhook signature verification with next-sanity `parseBody`
- Security headers: nosniff, X-Frame-Options DENY, Referrer-Policy
- robots.txt blocks /api/ and /studio/ from crawlers
- Sanitised Sanity env values prevent build-time injection of bad config

| Threat | Scenario | Mitigation | Status |
|---|---|---|---|
| Spoofing | Forged webhook calls to force revalidation | Signature verification (401 on mismatch) | Mitigated |
| Tampering | Unauthorised content edits | Sanity SSO + roles; enable 2FA for all editors | Partly mitigated |
| Information disclosure | Webhook secret exposed via NEXT_PUBLIC fallback | Remove fallback | Open |
| Denial of service | Search server action spammed with wildcard queries | Vercel edge; add rate limiting / minimum query length | Open |
| Elevation of privilege | Framework CVE in old Next.js | Upgrade Next.js | Open |
| XSS | Rich text or JSON-LD injection | Portable Text escapes HTML; JSON-LD built with JSON.stringify | Mitigated |

Findings from this review:

| Finding | Severity | Recommendation |
|---|---|---|
| Next.js 15.0.7 is outdated | High | Upgrade to latest patched 15.x |
| Webhook response echoes the full request body | Low | Return only status fields |
| No Content-Security-Policy header | Low | Add a CSP allowing Sanity, Umami, Ahrefs, YouTube |

Analytics use Umami (cookieless) and Ahrefs Web Analytics. A privacy policy is published at /privacy. If a newsletter is added, record consent and retention in line with India's DPDP Act 2023 and GDPR.


## Risks and technical debt

| ID | Category | Risk | Score (L×I) | Mitigation |
|---|---|---|---|---|
| R-01 | Security | Outdated Next.js with known CVEs | 15 (High) | Upgrade and add Dependabot |
| R-02 | Operational | Home redirect loop if no posts are returned | 8 (Medium) | Replace redirect with empty state |
| R-03 | Cost | Vercel/Sanity free-tier limits exceeded during traffic spikes | 6 (Low) | Keep CDN reads, remove force-dynamic, monitor usage |
| R-04 | Quality | No automated tests; regressions reach production | 9 (Medium) | Playwright smoke tests in CI |
| R-05 | SEO | Category rename changes URLs and loses rankings | 6 (Low) | Add redirects when renaming categories |
| R-06 | People | Single maintainer (bus factor 1) | 12 (Medium) | This documentation set + shared access |
| R-07 | Data | Accidental content deletion in Sanity | 8 (Medium) | Scheduled dataset exports |

| Tech debt | Severity | Fix |
|---|---|---|
| Duplicate `env.example` and `.env.example` | Low | Delete `env.example` |
| Two lockfiles (package-lock.json and pnpm-lock.yaml) | Medium | Standardise on one package manager |
| `any` types in pages and actions | Medium | Generate types with Sanity TypeGen |
| Unused queries/live helpers (`src/sanity/lib/queries.ts`, `live.ts`) | Low | Remove or adopt |
| Category slug logic duplicated in sitemap.ts and lib/slugs.ts | Low | Import categoryToSlug |
| `next-seo` and `next-sitemap` dependencies unused (App Router metadata used instead) | Low | Remove packages |
| `styled-components` only needed by Studio | Low | Keep but document |


## How to use it


### For readers

1. Open https://www.6pistons.com
1. Use the category chips (Cars, Bikes, Aviation) or the search icon to find reviews
1. Open a review to see the score, pros/cons, video and FAQs
1. Use the previous/next links at the bottom to keep reading
1. Subscribe via RSS at https://www.6pistons.com/feed.xml


### For editors — publishing a review

1. Go to https://cms.6pistons.com and sign in with your Sanity account
1. Click Posts → + (new)
1. Fill Title, click Generate next to Slug, write a one-line Description
1. Pick the Author, upload the Main image and type its alt text
1. Choose Categories and set Published at (required for ordering)
1. Write the Body; use H2/H3 headings and add images with alt text
1. Optional: YouTube URL, Rating (1–10), Pros, Cons, FAQs
1. Click Publish — the article is live in about a minute


### For editors — authors and categories

1. Authors → + to add a writer with name, slug, photo and bio
1. Categories → + to add a category; avoid renaming existing categories (URL changes)


## Glossary

| Term | Meaning |
|---|---|
| **6Pistons / 6PM** | 6Pistons Media — the automotive publication this site serves |
| **AI-GEO** | Generative Engine Optimisation — making content easy for AI assistants to find and cite |
| **Canonical URL** | The single preferred URL for a page |
| **E-E-A-T** | Google's Experience, Expertise, Authoritativeness, Trustworthiness guidelines |
| **GROQ** | Sanity's query language (Graph-Relational Object Queries) |
| **IndexNow** | Protocol to notify search engines immediately of new or changed URLs |
| **ISR** | Incremental Static Regeneration — cached pages re-rendered after a time window or on demand |
| **JSON-LD** | Structured data embedded in pages so search engines understand content |
| **llms.txt** | A Markdown file at the site root describing the site for large language models |
| **Portable Text** | Sanity's JSON format for rich text |
| **Revalidation** | Telling Next.js to rebuild a cached page |
| **Sanity Studio** | The editors' web app for writing content, mounted at /studio and cms.6pistons.com |
| **Sanity** | Hosted headless CMS that stores all content |
| **Webhook** | An HTTP call Sanity makes to the site when content changes |
