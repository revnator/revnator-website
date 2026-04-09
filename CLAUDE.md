# CLAUDE.md — Revnator Website

**Project owner:** Sabareesh S R (GitHub: sabareeshsr)
**Repository:** github.com/revnator/revnator-website
**Project path:** `D:\9. Developments\6. Revnator Website\revnator-website`
**Reference project:** `D:\9. Developments\6. Revnator Website\Revnator Website Figma` (read-only, do not modify)

This file is the single source of truth for how the Revnator website is built.
Read this completely before starting any task. Every rule here is non-negotiable
unless Sabareesh explicitly says otherwise in the current conversation.

---

## 1. Project Purpose

This is the **marketing website** for Revnator — a B2B Sales OS SaaS platform.
It is separate from the main Revnator app (which lives at `E:\7. Revnator\sales-os`).

**Website goals:**
- Convert visitors into free trial signups
- Educate prospects about Revnator's 9 modules
- Provide documentation for self-serve users
- Publish blog content, case studies, and resources for SEO
- Handle lead capture through forms and gated content

**Website is NOT:**
- A place to build app features
- A user dashboard
- Connected to the app database (uses its own Neon Postgres project)

---

## 2. Stack — Non-Negotiable

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, TypeScript strict mode) | 15.x |
| CMS | Payload CMS (integrated with Next.js) | 3.x |
| Database | Neon PostgreSQL (Singapore region) | 17 |
| Storage | Cloudflare R2 via @payloadcms/storage-s3 | latest |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion | latest |
| Icons | Lucide React | latest |
| Forms | React Hook Form + Zod | latest |
| Email | Resend (for form notifications) | latest |
| Analytics | Plausible (privacy-first) | self-hosted or cloud |
| Hosting | Netlify (free tier) | — |
| DNS/CDN | Cloudflare | — |

**Do NOT install:**
- MUI, Chakra UI, Ant Design, or any other UI framework
- Redux, Zustand, Jotai, or any state management library (React Query or Payload hooks handle everything)
- Styled-components, Emotion, or CSS-in-JS beyond what Next.js provides
- React Router (Next.js App Router handles all routing)
- Any package that duplicates existing functionality

**Do NOT use:**
- JavaScript (TypeScript only, strict mode always on)
- `any` type (use `unknown` or proper types)
- Client components by default (server components first, `"use client"` only when needed)
- Inline styles (Tailwind classes and CSS variables only)
- Default exports for components (named exports only — easier to refactor)

---

## 3. Design System — The Only Source of Truth

### 3.1 Colors (CSS variables, Tailwind tokens)

```css
--color-primary:        #6E33B1    /* Brand purple — buttons, links, active states */
--color-primary-dark:   #5A2A94    /* Button hover, pressed states */
--color-accent:         #34D399    /* Emerald green — success, positive metrics */
--color-light:          #E4DBFF    /* Light purple — borders, tags, hover bg */
--color-dark:           #130F1E    /* Branded dark — hero, footer, headings */
--color-bg:             #F5F3FA    /* Off-white — page background */
--color-white:          #FFFFFF    /* Cards, modals, dropdowns */
--color-muted:          #9b8fad    /* Secondary text, placeholders */
--color-body:           #2D2640    /* Body paragraph text */
--color-error:          #e05555    /* Danger states */
--color-warning:        #F59E0B    /* Warning states */
```

**Color usage rules (enforced):**
- `#130F1E` → Hero sections, footer, heading text only
- `#6E33B1` → Primary buttons, links, active nav, focus rings, badges
- `#34D399` → Success indicators, positive stats, CTA accents
- `#E4DBFF` → Borders, hover backgrounds, tag backgrounds, dividers
- `#F5F3FA` → Page background, alternating light sections
- `#FFFFFF` → Cards, modals, dropdown menus
- `#2D2640` → Body paragraph text

**NEVER:**
- Use pure black `#000000`
- Use colors outside the official palette
- Use Tailwind's default palette (red-500, blue-500, etc.) — only custom tokens
- Apply colors via inline styles (use Tailwind classes or CSS variables)

### 3.1.1 Tailwind v4 Token Convention (CRITICAL)

All color tokens are defined ONLY in `src/app/(frontend)/globals.css` inside the `@theme inline` block as hardcoded hex values:

```css
@theme inline {
  --color-primary: #6E33B1;
  --color-primary-dark: #5A2A94;
  --color-accent: #34D399;
  --color-light: #E4DBFF;
  --color-dark: #130F1E;
  --color-bg: #F5F3FA;
  --color-muted: #9b8fad;
  --color-body: #2D2640;
  --color-error: #e05555;
  --color-warning: #F59E0B;
}
```

**DO NOT:**
- Define colors in `tailwind.config.mjs` (Tailwind v4 reads from CSS, not the config file)
- Use `var()` indirection like `--color-primary: var(--primary)` — this breaks Tailwind v4's internal `color-mix()` handling
- Duplicate tokens in `:root` and `@theme inline`

This was the source of a hard-to-debug issue where `bg-primary` rendered as a washed-out lighter shade instead of solid `#6E33B1`.

### 3.2 Typography (all sans-serif, no exceptions)

```
Heading Font:  Plus Jakarta Sans (next/font/google)
               Weights: 400, 500, 600, 700, 800
Body Font:     Inter (next/font/google)
               Weights: 300, 400, 500, 600, 700
Mono Font:     DM Mono (next/font/google)
               Weights: 400, 500
```

**Type scale:**

| Element | Font | Size | Line-height | Weight | Color |
|---------|------|------|-------------|--------|-------|
| Hero display | Plus Jakarta Sans | 52px | 1.12 | 800 | #FFFFFF on dark |
| H1 | Plus Jakarta Sans | 40px | 48px | 700 | #130F1E |
| H2 | Plus Jakarta Sans | 32px | 40px | 700 | #130F1E |
| H3 | Plus Jakarta Sans | 24px | 32px | 600 | #130F1E |
| H4 | Plus Jakarta Sans | 20px | 28px | 600 | #130F1E |
| Body large | Inter | 18px | 28px | 400 | #2D2640 |
| Body | Inter | 16px | 24px | 400 | #2D2640 |
| Body small | Inter | 14px | 20px | 400 | #2D2640 |
| Caption | Inter | 12px | 16px | 500 | #9b8fad |
| Button | Inter | 13-15px | — | 600 | — |
| Code | DM Mono | 14px | 22px | 400 | #E4DBFF on dark |
| Section label | Plus Jakarta Sans | 12px uppercase | — | 600 | #6E33B1 |

**Typography rules:**
- NEVER use serif fonts anywhere
- NEVER use italic on headings (body italic is fine for emphasis)
- NEVER use font weights other than those listed above
- Section labels always uppercase with `letter-spacing: 0.15em`
- Heading letter-spacing: `-0.02em` for hero, `-0.01em` for H2

### 3.3 Spacing Scale

```
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128 (pixels)
```

- Section vertical padding: 96px desktop, 64px tablet, 48px mobile
- Container max-width: 1280px
- Container side padding: 24px mobile, 48px desktop
- Card internal padding: 24px standard, 32px large
- Component gap: 16px small, 24px medium, 32px large

### 3.4 Component Patterns

**Buttons:**
- Primary: #6E33B1 bg, white text, 8px radius, 48px height, 24px h-padding
- Secondary: transparent bg, 1.5px #6E33B1 border + text
- Ghost (on dark): transparent bg, 1.5px rgba(255,255,255,0.25) border, white text
- Sizes: sm (36px), md (44px), lg (52px)
- Hover: slight scale(1.02) + subtle shadow
- Always include focus ring: `focus:ring-2 focus:ring-primary focus:ring-offset-2`

**Cards:**
- White bg, 1px #E4DBFF border, 16px radius, 24px padding
- Hover: translate-y(-4px) + subtle shadow
- Glass cards (on dark): rgba(255,255,255,0.08) bg, backdrop-blur(16px), 1px rgba(255,255,255,0.15) border

**Tags/Badges:**
- #E4DBFF bg, #6E33B1 text, 20px pill radius, 4px 12px padding
- Success variant: rgba(52,211,153,0.12) bg, #065F46 text

**Inputs:**
- #F5F3FA bg, 1px #E4DBFF border, 8px radius, 44px height
- Focus: 1px #6E33B1 border, subtle ring

---

## 4. CMS Architecture — Payload 3.0

### 4.1 Globals (Single-Instance Pages)

| Slug | Purpose |
|------|---------|
| `site-settings` | Logo, favicon, social links, analytics IDs, SEO defaults |
| `header` | Nav config, mega-menu items, CTA buttons |
| `footer` | Footer columns, social links, newsletter config |
| `home-page` | Homepage content (all sections as blocks) |
| `platform-page` | Platform overview page |
| `why-revnator` | Why Revnator page |
| `pricing-page` | Pricing plans, toggle config, FAQ |
| `support-page` | Support channels, knowledge base, FAQ |

### 4.2 Collections (Repeatable Content)

| Slug | Purpose |
|------|---------|
| `modules` | 9 platform module pages (Contacts, Accounts, Email, etc.) |
| `use-cases` | 5 use case pages |
| `resources` | Resource hub listing pages |
| `resource-items` | Individual resources (ebooks, case studies, webinars, etc.) |
| `blog-posts` | Blog articles |
| `blog-categories` | Blog category taxonomy |
| `doc-sections` | Docs top-level modules |
| `doc-categories` | Docs feature categories (L2) |
| `doc-pages` | Individual documentation pages |
| `testimonials` | Customer testimonials |
| `form-submissions` | Lead capture data |
| `media` | All images and files (via R2) |
| `users` | CMS admin users |

### 4.3 Block System (Reusable Across All Pages)

All page content uses a flexible `pageBlocks` array field with these block types:

- `hero-block`
- `feature-grid-block`
- `feature-showcase-block`
- `stats-block`
- `testimonials-block`
- `cta-block`
- `faq-block`
- `logo-cloud-block`
- `comparison-table-block`
- `rich-text-block`
- `embed-block`
- `form-block`
- `integration-grid-block`
- `pricing-table-block`
- `case-study-block`

Each block has its own TypeScript interface, React component, and Payload field definition. Blocks are the building blocks — adding a new block type requires creating all three.

### 4.4 CMS Rules

- **Every page is CMS-editable.** No hardcoded marketing content in React components.
- **Schema changes require approval.** Always ask Sabareesh before modifying a collection or global field.
- **New fields are always `required: false`.** Never break existing content by making a field mandatory.
- **SEO fields on every collection and global.** Use the Payload SEO plugin for metaTitle, metaDescription, ogImage.
- **Slugs are auto-generated from title but editable.** Always validate uniqueness.
- **Soft delete only.** Add a `status` field (draft/published/archived) — never hard delete content.

---

## 5. File Structure Conventions

```
revnator-website/
├── src/
│   ├── app/
│   │   ├── (frontend)/             # Public website routes
│   │   │   ├── page.tsx            # Homepage
│   │   │   ├── platform/
│   │   │   │   ├── page.tsx        # Platform overview
│   │   │   │   └── [slug]/page.tsx # Module pages
│   │   │   ├── use-cases/[slug]/page.tsx
│   │   │   ├── pricing/page.tsx
│   │   │   ├── why-revnator/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── resources/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [type]/[slug]/page.tsx
│   │   │   ├── docs/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [...slug]/page.tsx
│   │   │   ├── support/page.tsx
│   │   │   └── layout.tsx          # Header + Footer wrapper
│   │   ├── (payload)/              # Payload admin
│   │   │   └── admin/[[...segments]]/page.tsx
│   │   ├── api/                    # API routes (forms, revalidation)
│   │   └── layout.tsx              # Root layout (html, body, fonts)
│   ├── blocks/                     # Block components (one folder per block)
│   │   ├── HeroBlock/
│   │   ├── FeatureGridBlock/
│   │   └── ...
│   ├── components/                 # Shared UI components
│   │   ├── ui/                     # Base primitives (Button, Card, Input)
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Navigation/
│   │   └── ...
│   ├── collections/                # Payload collection definitions
│   │   ├── Modules.ts
│   │   ├── BlogPosts.ts
│   │   └── ...
│   ├── globals/                    # Payload global definitions
│   │   ├── SiteSettings.ts
│   │   ├── HomePage.ts
│   │   └── ...
│   ├── lib/
│   │   ├── payload.ts              # Payload client helpers
│   │   ├── seo.ts                  # SEO utilities
│   │   └── utils.ts                # cn(), formatDate(), etc.
│   └── styles/
│       └── globals.css
├── public/
│   ├── images/                     # Static assets (logo, favicon, OG defaults)
│   └── fonts/                      # Not used — fonts via next/font/google
├── payload.config.ts
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── .env.local                      # Never committed
├── .gitignore
└── CLAUDE.md                       # This file
```

**File naming:**
- React components: PascalCase (`HeroSection.tsx`)
- Utilities/hooks: camelCase (`usePayload.ts`, `formatDate.ts`)
- Payload configs: PascalCase matching the collection/global name
- CSS files: kebab-case (`globals.css`)

---

## 6. Git Workflow — Strict

### 6.1 Branches

```
main      ← production (deploys to revnator.com)
  ↑
qual      ← staging/QA environment
  ↑
dev       ← active development (feature branches merge here first)
  ↑
feature/* ← individual features
fix/*     ← bug fixes
chore/*   ← tooling, refactors, non-feature work
```

### 6.2 Rules — CRITICAL

**🚫 CLAUDE CODE MUST NEVER RUN ANY GIT COMMANDS. EVER. 🚫**

Sabareesh handles ALL git operations manually. This is non-negotiable.

This includes, but is not limited to:
- `git init`
- `git add`
- `git commit`
- `git push`
- `git pull`
- `git merge`
- `git checkout` (no branch switching, no new branches)
- `git branch`
- `git rebase`
- `git stash`
- `git reset`
- `git tag`
- `git remote`
- Any other git command

**What Claude Code MUST do instead:**

1. **When work is complete**, tell Sabareesh in plain text what commands to run, formatted like this:
   ```
   Ready to commit. From the project root, run:
   git add [files]
   git commit -m "feat: description"
   git checkout dev
   git merge feature/branch-name
   ```
2. **Never execute** those commands yourself — just display them.
3. **Suggest the commit message** using Conventional Commits format:
   - `feat: add homepage hero section`
   - `fix: resolve CMS slug validation bug`
   - `chore: update dependencies`
   - `docs: update CLAUDE.md architecture section`
   - `style: adjust button hover states`
   - `refactor: extract shared form logic`
4. **Suggest which branch to target** but don't execute the switch.
5. **Always remind to verify `.env.local` is ignored** with `git check-ignore -v .env.local` before committing.

**Branch strategy (for Sabareesh's reference, Claude Code executes nothing):**
- Work happens on feature branches: `feature/[name]`, `fix/[name]`, `chore/[name]`
- Feature branches merge into `dev` via PR
- `dev` merges into `qual` when stable
- `qual` merges into `main` after QA approval
- Never push directly to `main` or `qual`
- Never force push
- Always run git commands from the project root:
  `D:\9. Developments\6. Revnator Website\revnator-website`

**If Claude Code ever runs a git command by mistake, immediately stop and alert Sabareesh.** Assume the action was wrong and wait for instructions on how to recover.

### 6.3 Pull Request Flow (Sabareesh executes, Claude Code never)

1. **Claude Code writes code on the local filesystem only** — no git commands
2. **Claude Code reports what changed** when work is complete
3. **Sabareesh reviews the changes** and runs git commands manually:
   - Create feature branch from `dev`: `git checkout -b feature/homepage dev`
   - Stage and commit: `git add .` then `git commit -m "..."`
   - Push to remote: `git push origin feature/homepage`
4. **Sabareesh opens PR** into `dev` on GitHub
5. **Sabareesh reviews and merges** the PR
6. When `dev` is stable, Sabareesh opens PR from `dev` → `qual`
7. QA on qual → when approved, PR from `qual` → `main`
8. `main` auto-deploys to production via Netlify

**Claude Code's role ends at "code written on local filesystem."**
**Everything after that is manual.**

---

## 7. SEO Requirements — Every Page, No Exceptions

- **Meta tags:** Title (max 60 chars), description (max 160 chars), canonical URL
- **Open Graph:** og:title, og:description, og:image (1200×630), og:type
- **Twitter Card:** summary_large_image
- **Structured data:** Organization schema on all pages, Article schema on blog posts, FAQ schema where applicable
- **Sitemap:** Auto-generated via next-sitemap, updates on build
- **Robots.txt:** Proper directives per environment (dev/qual blocked from indexing, prod open)
- **Core Web Vitals targets:**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
  - Lighthouse score ≥ 95 across all categories
- **Images:** Always use next/image, always have alt text, lazy load below the fold
- **Internal linking:** Module pages link to related modules, blog posts link to relevant docs

---

## 8. Performance Rules

- **Server components by default.** Add `"use client"` only when interactivity demands it (forms, toggles, dropdowns).
- **Static generation (SSG)** for marketing pages whenever possible. Use ISR with 60s revalidation for blog and resources.
- **Dynamic rendering** only for the admin panel and form submission endpoints.
- **Code splitting per route.** Next.js handles this — don't fight it.
- **Initial JS bundle < 100KB gzipped.** Check with `@next/bundle-analyzer`.
- **Images optimized at upload time.** Cloudflare R2 serves them; Next.js Image component handles responsive sizing.
- **No client-side data fetching for marketing content.** All content comes from Payload at build/revalidate time.
- **Lazy load heavy components** below the fold (testimonial carousels, video embeds).

---

## 9. Code Quality Rules

### 9.1 TypeScript
- Strict mode ON
- No `any` — use `unknown` and narrow
- Explicit return types on all exported functions
- Use Zod for runtime validation of external data (forms, API responses)

### 9.2 React
- Server components by default
- Named exports only
- Props interfaces co-located with components
- Destructure props in the function signature
- No prop drilling beyond 2 levels — use context or composition

### 9.3 Tailwind
- Use `cn()` utility (from clsx + tailwind-merge) for conditional classes
- No arbitrary values like `w-[347px]` unless absolutely necessary
- Extract repeated class strings into component variants
- Mobile-first responsive classes (`md:`, `lg:` modifiers)

### 9.4 Comments
- Comment WHY, not WHAT
- Document non-obvious business logic
- No commented-out code in commits
- TODO comments must include a GitHub issue link

---

## 10. What Claude Code Should and Should Not Do

### ✅ DO

- Read this CLAUDE.md at the start of every new conversation
- Ask before making architectural decisions
- Show the plan before executing complex changes
- Verify file paths before editing (use absolute paths when possible)
- Run `npm run lint` and `npm run typecheck` before reporting completion
- Test in the browser after changes (or describe what to test)
- Report every file changed at the end of a task
- Use the Figma reference project as a visual guide, not a code source
- Match colors, spacing, and typography exactly to this CLAUDE.md

### ❌ DO NOT

- **🚫 RUN ANY GIT COMMANDS. EVER.** Sabareesh handles all git manually. See Section 6.2.
- Modify files in the Figma reference project (`Revnator Website Figma`)
- Install packages without approval
- Create new collections or globals without approval
- Make schema changes without approval
- Touch `.env.local` in git (not that you're running git anyway)
- Use colors or fonts outside the official palette
- Hardcode marketing content in React components
- Use `any` types
- Default export components
- Add state management libraries
- Fight Next.js patterns (App Router, server components, caching)
- Assume context — always confirm before making assumptions

---

## 11. Known Challenges and Precedents

- **Figma reference is a Vite SPA.** Not reusable as code. Use only as visual reference.
- **App database is separate.** Website has its own Neon Postgres project.
- **Two GitHub accounts.** Repo owned by `revnator`, pushes from `sabareeshsr` (collaborator).
- **Domain not yet configured.** Production URL will eventually be `revnator.com`; dev/qual use Netlify preview URLs.
- **Logo not yet finalized.** Placeholder in use; real logo to be added later.

---

## 12. Environment Variables Required

```
# Database
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=

# Cloudflare R2
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_BUCKET=revnator-website
CLOUDFLARE_R2_ENDPOINT=
CLOUDFLARE_R2_ACCOUNT_ID=

# Next.js
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Future additions
RESEND_API_KEY=           # For form notifications (not yet configured)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=  # For analytics (not yet configured)
REVALIDATION_SECRET=      # For ISR revalidation (generate when needed)
```

---

## 13. Deployment Targets

| Environment | Branch | URL | Purpose |
|-------------|--------|-----|---------|
| Development | dev | dev--revnator.netlify.app | Active work, unstable |
| Quality | qual | qual--revnator.netlify.app | QA testing, pre-production |
| Production | main | revnator.com | Live marketing site |

All three environments deploy automatically via Netlify on push.
Only `main` uses the production Neon database branch.

---

## 14. Useful Commands

### For Claude Code to Run

```bash
# Development
npm run dev                    # Start dev server (localhost:3000)
npm run build                  # Production build
npm run start                  # Start production build locally

# Quality
npm run lint                   # ESLint
npm run typecheck              # TypeScript check

# Payload
npm run payload migrate        # Run pending migrations
npm run payload migrate:create # Create a new migration
npm run payload generate:types # Regenerate payload-types.ts
```

### For Sabareesh to Run Manually (Claude Code: DO NOT RUN THESE)

```bash
# Git — always from project root
git status
git checkout -b feature/name dev
git add .
git commit -m "feat: description"
git push origin feature/name

# Verify .env.local never leaks
git check-ignore -v .env.local
```

**Reminder: Claude Code executes none of the git commands above.**
It only suggests them in plain text when work is complete.

---

## 15. When in Doubt

- **Ask before assuming.**
- **Match the Figma reference visually** but rebuild cleanly.
- **Follow the design system exactly.**
- **Server components first, client components only when necessary.**
- **Every marketing content change goes through the CMS.**
- **Every schema change goes through Sabareesh.**

---

*Last updated: April 9, 2026*
*This file is version-controlled. Update it whenever architecture, design, or workflow decisions change.*
