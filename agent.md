# 6Pistons Media — System Architecture & Agent Handbook

> **Last Updated:** September 2026  
> **Repository:** `yashd-dev/6pistons-Media`  
> **Brand Name:** 6Pistons  
> **Purpose:** Automotive media publication platform featuring vehicle news, reviews, and editorial content.

---

## 1. Infrastructure & Service Map: "What is Running With Who"

| Component | Provider / Platform | Location / Identifier | Role & Functionality | Operational Status |
| :--- | :--- | :--- | :--- | :--- |
| **Domain Registrar** | **Cloudflare, Inc.** | `6pistons.com` | Domain ownership, WHOIS privacy, and TLD registration. | **Active** (Renews Dec 2026) |
| **DNS & Edge CDN** | **Cloudflare** | Nameservers:<br>• `harley.ns.cloudflare.com`<br>• `ximena.ns.cloudflare.com` | Authoritative DNS resolution, SSL/TLS termination, edge caching, and redirect rules. | **Active & Healthy** |
| **Web Frontend** | **Vercel** | Project: `6pistons-website`<br>Production Domain: `www.6pistons.com` | Hosts and serves the Next.js 15 App Router application with SSR and ISR. | **Active & Live** |
| **Domain Routing** | **Cloudflare + Vercel** | • Apex: `6pistons.com`<br>• Subdomain: `www.6pistons.com` | `6pistons.com` redirects (308) to `www.6pistons.com` via Vercel edge. | **Active & Live** |
| **Headless CMS** | **Sanity.io** | • Org: `ohjEEaF7i`<br>• Project ID: `2tb1r00m`<br>• Dataset: `production`<br>• API: `2024-12-04` | Stores structured editorial data (247+ articles, authors, categories) and handles asset storage. | **Active & Healthy** |
| **Media CDN** | **Sanity CDN** | `cdn.sanity.io` | Global image asset delivery and real-time transformations (`@sanity/image-url`). | **Active** |
| **CMS Studio UI** | **Sanity Hosting** *(Option 2)* | • Hosted URL: `https://6pistons.sanity.studio`<br>• Custom Alias: `https://cms.6pistons.com` | Content authoring workspace. Deployed via `sanity deploy` with Cloudflare proxy/redirect. | **Configured & Tested** (Ready for deploy) |
| **Analytics & SEO** | **Google & Ahrefs** | • Google Tag Manager (`GTM-5F47N9H2`)<br>• Ahrefs verification | Traffic tracking, crawl optimization, and ranking analytics. | **Active** |

---

## 2. Subdomains & URL Mapping

* **`https://www.6pistons.com/`**: Main production web application.
* **`https://6pistons.com/`**: 308 permanent redirect to `https://www.6pistons.com/`.
* **`https://cms.6pistons.com/`**: Proxied through Cloudflare redirecting to Sanity Studio.
* **`https://cms.6pistons.com/structure/post`**: Opens the Post management desk in Sanity Studio.
* **`https://cms.6pistons.com/intent/create/type=post/`**: Opens a **blank new post draft** directly in Sanity Studio.

---

## 3. Codebase Directory Structure

```text
6pistons-Media/
├── .env                                # Local environment variables
├── .env.example                        # Template for environment configuration
├── .eslintrc.json                      # ESLint configuration
├── .gitignore                          # Git ignore list (includes node_modules, .next, .sanity)
├── agent.md                            # Complete system architecture and operations guide
├── next.config.ts                      # Next.js config (image domains, redirects, security headers)
├── package.json                        # Project dependencies and npm scripts
├── pnpm-lock.yaml                      # PNPM lockfile
├── postcss.config.mjs                  # PostCSS configuration for Tailwind
├── sanity.cli.ts                       # Sanity CLI config (project ID, dataset for CLI commands)
├── sanity.config.ts                    # Sanity Studio definition, desk structure & plugins
├── tailwind.config.ts                  # Tailwind CSS styling and theme definitions
├── tsconfig.json                       # TypeScript compiler options
├── public/                             # Static assets
│   ├── bg.mp4                          # Background video asset
│   ├── logo.svg                        # 6Pistons vector logo
│   └── noise.png                       # Noise texture for background styling
└── src/
    ├── app/                            # Next.js 15 App Router
    │   ├── layout.tsx                  # Root layout (fonts, GTM, Lenis smooth scroll, Navbar, Footer)
    │   ├── page.tsx                    # Homepage: Hero section + infinite article feed
    │   ├── not-found.tsx               # Custom 404 page
    │   ├── sitemap.ts                  # Dynamic sitemap generator fetching posts from Sanity
    │   ├── robots.txt                  # Search crawler directives
    │   ├── about/
    │   │   └── page.tsx                # About 6Pistons editorial page
    │   ├── actions/                    # Server Actions (Groq queries to Sanity)
    │   │   ├── fetchPosts.ts           # Paginated article fetching & category counts
    │   │   ├── fetchAdjacentPosts.ts   # Next/Previous article navigation
    │   │   └── searchPosts.ts          # Instant keyword search across titles & bodies
    │   ├── api/
    │   │   └── sanity/webhook/route.ts # Webhook listener for on-demand revalidation
    │   ├── article/[slug]/
    │   │   └── page.tsx                # Individual article page (PortableText, author, share links)
    │   ├── author/[slug]/
    │   │   └── page.tsx                # Author profile and associated posts list
    │   └── components/                 # React UI Components
    │       ├── AllBlogs.tsx            # Category-filtered post catalog
    │       ├── blogSection.tsx         # Curated articles section
    │       ├── footer.tsx              # Site footer with brand and category links
    │       ├── heroClient.tsx          # Interactive hero component with featured carousels
    │       ├── infinite-scroll.tsx     # Client-side infinite scroll pagination
    │       ├── navbar.tsx              # Main navigation header
    │       ├── post-navigation.tsx     # Next/Prev article links
    │       ├── search.tsx              # Search modal and live search trigger
    │       └── video.tsx               # Video player wrapper
    └── sanity/                         # Sanity Configuration & Schemas
        ├── env.ts                      # Sanity environment helpers (projectId, dataset, apiVersion)
        ├── structure.ts                # Desk tool structure (Posts, Categories, Authors)
        ├── lib/
        │   ├── client.ts               # Authenticated / unauthenticated Sanity client instance
        │   ├── image.ts                # Image URL builder (`urlFor`)
        │   ├── live.ts                 # Sanity Live Content API listener
        │   └── queries.ts              # Predefined GROQ queries
        └── schemaTypes/                # Content models
            ├── authorType.ts           # Author schema (name, slug, avatar, bio)
            ├── blockContentType.ts     # PortableText rich text schema (headings, images, quotes)
            ├── categoryType.ts         # Category taxonomy schema (title, description)
            ├── postType.ts             # Article schema (title, slug, image, body, publishedAt)
            └── index.ts                # Schema registry export
```

---

## 4. Sanity Content Models (Schemas)

### `post` Document Type
* `title` (`string`): Headline of the article.
* `slug` (`slug`): URL slug generated from the title.
* `description` (`string`): Excerpt / meta description.
* `author` (`reference` → `author`): Associated writer.
* `mainImage` (`image` with `hotspot: true`): Hero image with optional `alt` text.
* `categories` (`array` of `reference` → `category`): Topics (e.g. EVs, Reviews, Industry).
* `publishedAt` (`datetime`): Publication timestamp used for chronological sorting.
* `body` (`blockContent`): Rich text with formatted headers, lists, external links, and embedded images.

### `author` Document Type
* `name` (`string`): Author's full name.
* `slug` (`slug`): Unique slug for `/author/[slug]`.
* `image` (`image`): Headshot avatar.
* `bio` (`array` of blocks): Short biography.

### `category` Document Type
* `title` (`string`): Display name of the category.
* `description` (`text`): Short description of the topic.

---

## 5. Environment Variables Reference

| Variable Name | Environment | Description | Value / Example |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | All (Client & Server) | Sanity Project ID | `2tb1r00m` |
| `NEXT_PUBLIC_SANITY_DATASET` | All (Client & Server) | Sanity Dataset | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | All (Client & Server) | Sanity API release date | `2024-12-04` |
| `NEXT_PUBLIC_SITE_URL` | All (Client & Server) | Canonical base URL | `https://www.6pistons.com` |
| `SANITY_API_READ_TOKEN` | Server / Vercel | Token for live content & draft previews | *(Optional for public reads)* |
| `SANITY_API_WRITE_TOKEN` | Server / Vercel | Token for mutations / comments | *(Optional)* |
| `SANITY_WEBHOOK_SECRET` | Server / Vercel | Secret for `/api/sanity/webhook` revalidation | Configured in Sanity webhook |

---

## 6. Developer Workflows & Commands

### Development Server
```bash
pnpm dev
# Or: npm run dev
```
Starts Next.js Turbopack at `http://localhost:3000`.

### Production Next.js Build
```bash
npm run build
```
Compiles and generates static/dynamic routes. Verified working with 0 errors.

### Sanity Studio Local Testing & Verification
```bash
npx sanity build scratch/sanity-build
```
Validates and builds the Sanity Studio single-page application bundle.

### Deploying Sanity Studio to Sanity Cloud
```bash
npx sanity login
npx sanity deploy
```
* Studio Hostname: `6pistons`
* Production Studio URL: `https://6pistons.sanity.studio`

---

## 7. Cloudflare DNS & Routing Checklist

1. **`www.6pistons.com`**:
   * CNAME → `cname.vercel-dns.com` (Proxied)
2. **`6pistons.com` (Apex)**:
   * A Record → `76.76.21.21` (Proxied)
3. **`cms.6pistons.com` (Studio Gateway)**:
   * CNAME → `6pistons.com` (Proxied)
   * **Redirect Rule:**
     * If `Hostname eq "cms.6pistons.com"`
     * Redirect to `https://6pistons.sanity.studio` + `http.request.uri.path` (Status 302/301)
