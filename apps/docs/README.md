# Mountain SOL Admin Guide (`apps/docs`)

Internal documentation site for Mountain SOL admins. Built with **Next.js +
[Nextra](https://nextra.site)** — the same React/Next stack as `student-portal`,
wired into Nx via `@nx/next`. Dependencies live in the **root `package.json`**
(no per-app `node_modules`).

## Run it

```bash
npx nx run docs:serve        # dev server on http://localhost:4202
npx nx run docs:build        # production build (server output, via @nx/next)
npx nx run docs:build-pages  # static export → apps/docs/out (for GitHub Pages)
```

## Deploy (GitHub Pages)

On every push to `main` that touches `apps/docs/**`, `.github/workflows/docs-pages.yml`
builds the static export and publishes it to GitHub Pages (also runnable via
**workflow_dispatch**).

- Static export is gated behind `DOCS_EXPORT=1` (set by the `build-pages` target),
  because the `@nx/next:build` executor can't relocate an App-Router static
  export. `build-pages` runs `next build` directly → `apps/docs/out`.
- `DOCS_BASE_PATH` sets the path prefix. The workflow uses `/platform` (project
  Pages serve under `/<repo>`); set it to `''` once the custom domain
  (`docs.mountainsol.org`) is live (#259).
- One-time setup: enable Pages with **Settings → Pages → Source: GitHub Actions**.
- `public/.nojekyll` and committed screenshots under `public/` are force-included
  via a `.gitignore` negation (the repo otherwise ignores all `public/`).

## Authoring

- Content lives in `content/` as `.mdx`. Section order/labels are set by the
  `_meta.js` file in each directory.
- Each page starts with frontmatter: `--- title: ... ---`.

### Screenshots: the `<Shot>` convention

Write pages **text-first**. Where a screenshot belongs, drop:

```mdx
<Shot slug="admin-dashboard" caption="Admin dashboard with the enrollment chart." />
```

- `slug` is the contract with the screenshot automation (#258): it writes
  `public/screenshots/<slug>.png`.
- Until that file exists, `<Shot>` renders a visible **"Screenshot pending"**
  placeholder. Once the PNG lands, the same component renders the image — **no
  prose changes required.**
- `Shot` is registered globally in `mdx-components.js`, so you never import it.

Keep slugs stable and descriptive (`area-screen-detail`), e.g.
`class-form-pricing`, `admin-enrollments`.

## Structure

```
apps/docs/
  app/                     Next.js App Router shell (Nextra layout + catch-all route)
  components/Shot.tsx      screenshot placeholder / image component
  content/                 the docs (.mdx + _meta.js)
  public/screenshots/      generated screenshots (backfilled by #258)
  mdx-components.js         registers <Shot> globally
  next.config.mjs          Nextra + @nx/next composition
```
