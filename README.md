# Multi-Category Catalog

A **Next.js** web app that showcases **multiple product categories** (cars, bikes, phones, computers) in one place. Each item has structured **specifications**; the home page groups products by category, and each product has a **dedicated detail route** with gallery and specs.

---

## Tech stack

| Area | Choice |
|------|--------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, RSC where applicable) |
| **UI** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | **CSS Modules** (`.module.css`) per component + **global design tokens** in `src/app/globals.css` |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) (interactive hero / scroll-driven UI) |
| **Tooling** | ESLint (`eslint-config-next`), PostCSS, **Tailwind CSS v4** (in dependencies; can be wired for utilities alongside CSS Modules) |
| **Fonts** | **Poppins** (body/UI) |
| **Data** | Static **JSON** shards merged at build time (no external API) |

### Typography

Fonts load in **`src/app/layout.tsx`** and CSS variables are attached to **`<html>`** so tokens work app-wide.

| Role | Font | Usage |
|------|------|--------|
| **Body / UI** | **Poppins** (weights 400–700) | Default text, nav, buttons, grids, item detail — referenced as **`var(--font-sans)`** in `globals.css` |
| **Display headlines** | **Bebas Neue** | Large hero-style titles (e.g. mega hero, scroll-morph arc headline) — **`var(--font-display)`** |
| **Logo wordmark** | **Orbitron** | Header logo — **`var(--font-wordmark)`** |

Shared aliases live in **`src/app/globals.css`**: `--font-sans`, `--font-display`, `--font-wordmark`. Components should use these variables rather than ad-hoc `font-family` stacks.

---

## Time spent

**Approximately _[2]_ hours** end-to-end (setup, UI, data modeling, routing, polish, and fixes).


---

## Idea & approach

1. **Single catalog, many verticals** — Instead of four separate demos, one **merged catalog** with a stable **`category`** field drives navigation, section anchors (`#catalog`, `#category-…`), and filters in the UI.

2. **Data close to content** — Product data lives in **`src/data/catalog/*.json`** (one file per vertical). `src/lib/catalog.ts` **imports and merges** those arrays, assigns stable **`id`**s, and exposes helpers (`getCategoryGroups`, `getItemById`, `categorySectionHref`, breadcrumbs).

3. **Specs as data** — Each item uses a flexible **`itemprops: { label, value }[]`** list so detail pages can render **different spec rows** per category without separate React components per product type.

4. **Progressive disclosure** — Landing area emphasizes **brand + navigation** and optional **motion-heavy hero** (`ScrollMorphHero`) fed by real catalog image URLs (deduped/padded via `heroProductImages.ts`). Below that, the **fashion-style grid** scans categories quickly; **deep dive** happens on `/item/[id]`.

5. **Accessibility & motion** — Reduced-motion paths where relevant (e.g. hero behavior), semantic landmarks, focus styles, and meaningful labels on interactive regions.

---

## Architecture

The codebase follows a **layered + atomic-ish** structure:

```
src/
├── app/                    # Next.js App Router: layouts, pages, global CSS
│   ├── page.tsx            # Home — composes catalog template
│   ├── layout.tsx          # Root layout, fonts, metadata
│   └── item/[id]/page.tsx  # Dynamic item detail (SSR data resolve)
├── components/
│   ├── atoms/              # Small primitives (Text, AspectImage, links…)
│   ├── molecules/          # Composed chunks (nav links, cards, section titles…)
│   ├── organisms/          # Larger sections (header, grids, galleries…)
│   ├── templates/          # Page-level layouts (home catalog, item detail)
│   └── ui/                 # Cross-cutting UI (e.g. scroll-morph hero)
├── data/catalog/           # JSON sources per category
└── lib/                    # Pure TS: catalog merge, hero image helpers
```

**Flow:**

1. **Routes** — `/` loads grouped categories; `/item/[id]` resolves `id` via `getItemById` or **`notFound()`**.
2. **Templates** — `CatalogHomeTemplate` wires **landing + grid**; `ItemDetailTemplate` wires **gallery + specs + typography**.
3. **State & data** — Mostly **server-derived** from JSON + URL params; client components used only where interaction requires it (hero, galleries, etc.).

This keeps **business rules** (grouping, IDs, URLs) in **`lib/`**, presentation in **`components/`**, and routing in **`app/`**, which matches common Next.js practice and keeps testing and refactors straightforward.

---

## Scripts

```bash
npm install          # Install dependencies
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run start        # Run production server
npm run lint         # ESLint
```

---

