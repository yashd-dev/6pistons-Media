# Product Requirements Document (PRD) — 6Pistons Media — Publication Website (upstream)

| Field | Value |
|---|---|
| Document ID | 6PMU-PRD |
| Project | 6Pistons Media — Publication Website (upstream) |
| Repository | [`yashd-dev/6pistons-Media`](https://github.com/yashd-dev/6pistons-Media) |
| Version | 1.0 |
| Status | Approved — living document |
| Owner | Hirav Kadikar |
| Classification | Public |
| Last updated | 2026-09-25 |

> **Purpose:** Defines what the product must do, for whom, and how success is measured. It is the single source of truth for scope.


## 1. Revision history

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-09-25 | Hirav Kadikar | Full documentation suite generated from a complete review of the repository. |


## 2. Executive summary

**6pistons-Media** is the original codebase for [6Pistons Media](https://www.6pistons.com), an independent automotive
publication ("Brand Led by Enthusiasts"), created by Yash in December 2024 and maintained with Hirav Kadikar. It is a
Next.js 15 App Router site that reads articles, authors and categories from the **Sanity** headless CMS and renders fast,
SEO-rich review pages. The same deployment also hosts **Sanity Studio**, the editors' writing tool, at `/studio` and on
the `cms.6pistons.com` subdomain.

Beyond a normal blog, the site is engineered for discoverability: per-article Schema.org structured data (Article,
Review with a 1–10 score, FAQPage, VideoObject, BreadcrumbList), a dynamic XML sitemap, an RSS 2.0 feed, an `llms.txt`
guide for AI assistants, explicit crawler rules for search and AI bots, and instant re-indexing through IndexNow
whenever an editor publishes.


## 3. Problem statement

Automotive enthusiasts in India and abroad want honest, detailed reviews, but independent publishers struggle to be
found next to large media houses. 6Pistons needed a site that (a) editors with no coding skills can update in minutes,
(b) loads fast on phones, and (c) ranks in Google and is cited by AI search engines (ChatGPT, Perplexity, Claude,
Gemini). Earlier versions (built Dec 2024 – Jan 2026) had working content but weak indexing, broken canonical URLs,
sitemap issues and poor mobile layout.


## 4. Goals and non-goals


### 4.1 Goals

- Publish a review from the CMS to the live site in under 5 minutes, without a developer.
- Achieve full Google indexing of every article, author and category page.
- Be citable by AI search engines (structured data, llms.txt, RSS, permissive AI crawler rules).
- Deliver a fast, dark, magazine-style reading experience on phones, tablets, laptops and 4K screens.
- Keep hosting and CMS costs inside free / hobby tiers.


### 4.2 Non-goals (explicitly out of scope)

- User accounts, comments or paywalls for readers.
- E-commerce or ad-server integration (advertising is sold by email via the contact page).
- A native mobile app.


## 5. Stakeholders (RACI)

| Stakeholder | Role | R/A/C/I | Interest |
|---|---|---|---|
| Yash (yashd-dev) | Repository owner and original developer | A | Code ownership, original design, Sanity setup |
| Hirav Kadikar | Collaborator and maintainer (SEO, Studio, responsive overhaul) | R | Site health, SEO, deployments |
| 6Pistons editorial team | Content authors | C | Easy publishing |
| Readers | End users | I | Fast, trustworthy reviews |


_R = Responsible, A = Accountable, C = Consulted, I = Informed._


## 6. Users and personas


### Arjun — the enthusiast reader

24-year-old car fan who reads reviews on his phone during commutes and watches the YouTube walkthroughs.

**Needs:**
- Fast mobile pages
- Clear verdicts (score, pros, cons)
- Embedded video
- Related articles


**Pain points today:**
- Slow, ad-heavy sites
- Reviews without a clear verdict


### Meera — the editor

Writes and publishes reviews; not technical.

**Needs:**
- A simple editor with images, headings and links
- Fields for rating, pros, cons, FAQs and YouTube
- Instant publish


**Pain points today:**
- Waiting for a developer to publish
- Articles not appearing in Google


### Search and AI crawlers

Googlebot, Bingbot, GPTBot, PerplexityBot, ClaudeBot and similar.

**Needs:**
- Correct canonical URLs
- Sitemap and RSS
- Structured data
- Machine-readable summaries


## 7. User stories

| ID | As a… | I want to… | So that… | Priority |
|---|---|---|---|---|
| US-01 | reader | to browse the latest reviews with pagination and a category filter | I can find what interests me | Must |
| US-02 | reader | to search articles by keyword | I can quickly find a specific vehicle | Must |
| US-03 | reader | to see a score, pros, cons, FAQs and a video on a review | I get the verdict at a glance | Must |
| US-04 | reader | previous/next and related article links | I keep reading | Must |
| US-05 | editor | to write and publish in Sanity Studio on cms.6pistons.com | I never need a developer | Must |
| US-06 | editor | published changes to appear on the site and in search engines automatically | new reviews are discovered fast | Must |
| US-07 | search engine | a sitemap, RSS feed and structured data | every page is indexed with rich results | Must |
| US-08 | advertiser | a contact page with dedicated channels | I can reach the right team | Should |


## 8. Functional requirements

| ID | Area | Requirement | MoSCoW | Status |
|---|---|---|---|---|
| FR-01 | Content | Home page lists posts newest-first, 10 per page, with `?page=` and `?category=` query parameters | Must | Done |
| FR-02 | Content | Article page `/article/[slug]` renders Portable Text body, hero image, author, categories, reading time, rating, pros/cons, FAQs and YouTube embed | Must | Done |
| FR-03 | Content | Category pages `/category/[category]` list up to 30 posts, matching titles by accent-insensitive slug | Must | Done |
| FR-04 | Content | Author pages `/author/[slug]` show profile and ProfilePage schema | Must | Done |
| FR-05 | Content | Previous / next post navigation based on `publishedAt` | Must | Done |
| FR-06 | Search | Full-text search over title, description and body with optional category filter (server action) | Must | Done |
| FR-07 | CMS | Sanity Studio embedded at `/studio`; `cms.` subdomain rewrites to Studio and opens Posts list | Must | Done |
| FR-08 | CMS | Schemas: post, author, category, blockContent (headings, lists, links, images with alt text) | Must | Done |
| FR-09 | Publishing | Signed Sanity webhook revalidates affected pages and pings IndexNow | Must | Done |
| FR-10 | SEO | Dynamic `sitemap.xml` covering static pages, categories, posts and authors; legacy sitemap URLs 301 to it | Must | Done |
| FR-11 | SEO | RSS 2.0 feed at `/feed.xml` (latest 50 posts) | Must | Done |
| FR-12 | SEO | Schema.org JSON-LD: NewsMediaOrganization, WebSite+SearchAction, Article, Review, FAQPage, VideoObject, BreadcrumbList, CollectionPage, ProfilePage | Must | Done |
| FR-13 | SEO | `robots.txt` allowing search + AI crawlers, blocking `/api/`, `/studio/`; `llms.txt` describing the site for LLMs | Must | Done |
| FR-14 | Legal | About, Contact, Editorial Guidelines, Privacy and Terms pages | Must | Done |
| FR-15 | Contact | Contact form composes a `mailto:` to contact@6pistons.com; `/bookings` redirects to Google Calendar booking page | Must | Done |
| FR-16 | Analytics | Umami and Ahrefs web analytics on public pages | Must | Done |


## 9. Non-functional requirements

| ID | Category | Requirement | Current status |
|---|---|---|---|
| NFR-01 | Performance | Pages served from Vercel edge with ISR (article 60 s, home 300 s, sitemap/feed 3600 s); Sanity CDN for reads | Partly met — root layout forces dynamic rendering |
| NFR-02 | Responsiveness | Layouts verified for phones, tablets, laptops and 4K displays | Met |
| NFR-03 | SEO | Every public URL has one canonical URL and appears in the sitemap | Met |
| NFR-04 | Security | Security headers (nosniff, DENY framing, referrer policy); webhook signature verification | Met |
| NFR-05 | Cost | Runs on Vercel Hobby and Sanity free tier; images unoptimised to avoid Vercel image quota (402 errors) | Met |
| NFR-06 | Accessibility | Images carry alt text (editor field with generated fallback) | Partly met |
| NFR-07 | Maintainability | Typed codebase (TypeScript), ESLint | Partly met — no automated tests |


## 10. User experience and key flows


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


## 11. Success metrics (KPIs)

| Metric | Target | How it is measured |
|---|---|---|
| Indexed pages in Google Search Console | 100% of sitemap URLs | GSC coverage report |
| Time from Publish to live | < 5 minutes | Webhook revalidation log |
| Core Web Vitals (mobile) | LCP < 2.5 s, CLS < 0.1, INP < 200 ms | PageSpeed Insights / CrUX |
| Monthly visitors | Growth month-on-month | Umami dashboard |
| AI-search citations / referrals | Tracked and growing | Umami referrers (chatgpt.com, perplexity.ai) |


## 12. Assumptions, constraints and dependencies


### Assumptions

- Sanity project `2tb1r00m`, dataset `production`, remains the content source.
- Editors publish with `publishedAt` set (ordering and prev/next depend on it).


### Constraints

- Free / hobby tiers of Vercel and Sanity; Vercel image optimisation disabled because of quota errors.
- Studio and site ship in the same Next.js deployment.


### External dependencies

| Dependency | Used for | Risk if unavailable |
|---|---|---|
| Sanity Content Lake + CDN | Stores and serves all articles, authors, categories, images | Site renders no content |
| Vercel | Hosting, edge cache, serverless functions | Site offline |
| GitHub Actions | Builds and deploys on push to main/master | No automatic deploys |
| IndexNow API | Instant re-indexing on Bing/Yandex/Seznam | Slower discovery only |
| Umami Cloud & Ahrefs Analytics | Visitor analytics | Loss of analytics only |
| YouTube (nocookie embeds) | Video reviews | Videos not shown |
| Google Calendar booking link | /bookings redirect | Broken booking link |


## 13. Release plan and roadmap

| Phase | Scope | Status |
|---|---|---|
| v0 (Dec 2024) | Next.js scaffold, coming-soon page, Sanity blog schema, GitHub Actions → Vercel | Done |
| v1 (Dec 2024 – Jun 2025) | Articles, authors, SEO basics, sitemap, Ahrefs/GTM, footer links | Done |
| v1.1 (Oct 2025 – Jan 2026) | Google indexing fixes, UI refresh | Done |
| v2 (Sep 2026) | Studio + cms subdomain restored, technical SEO & AI-GEO overhaul (llms.txt, RSS, structured data, IndexNow), responsive overhaul | Done |
| v2.1 (next) | Automated tests, remove duplicate analytics scripts, fix empty-home redirect loop, add `keywords` field to schema, Next.js security upgrade | Planned |
| v3 (later) | Newsletter signup, comparison pages, image optimisation via Sanity CDN params | Proposed |


## 14. Open questions

- Should the second Umami website ID be removed (two trackers load on every page)?
- Is the `/bookings` Google Calendar link still the right destination?
- Should `master` still trigger deployments, or only `main`?


## 15. Acceptance and sign-off

| Role | Name | Decision | Date |
|---|---|---|---|
| Product owner | Hirav Kadikar | Approved (baseline of current build) | 2026-09-25 |
