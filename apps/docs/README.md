# Mountain SOL Staff Help (`apps/docs`)

Help site for Mountain SOL staff. It covers the admin portal (enrollment portal
admin tools) and the public WordPress website (`content/website/`). Built with **Next.js +
[Nextra](https://nextra.site)** — the same React/Next stack as `student-portal`,
wired into Nx via the `@nx/next/plugin` inferred targets. Dependencies live in the **root `package.json`**
(no per-app `node_modules`).

## Run it

```bash
npx nx run docs:serve        # dev server on http://localhost:4202
npx nx run docs:build        # production build (server output in apps/docs/.next)
npx nx run docs:build-pages  # static export → apps/docs/out (for GitHub Pages)
```

## Deploy (GitHub Pages)

On every push to `main` that touches `apps/docs/**`, `.github/workflows/docs-pages.yml`
builds the static export and publishes it to GitHub Pages (also runnable via
**workflow_dispatch**).

- Static export is gated behind `DOCS_EXPORT=1` (set by the `build-pages` target),
  so the regular `build` target keeps producing a server build in `.next/`.
  `build-pages` runs `next build` directly → `apps/docs/out`.
- `DOCS_BASE_PATH` sets the path prefix. The workflow takes it from
  `actions/configure-pages` (`base_path`): `/platform` on the default project
  Pages URL, empty once the custom domain `help.mountainsol.org` is set in
  **Settings → Pages**. Locally it's unset (served at the root).
- `public/CNAME` holds the custom domain.
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

Website (WordPress) pages use `wp-` slugs (e.g. `wp-page-editor`). The portal
screenshot automation doesn't cover WordPress, so these are captured by hand
from the practice copy of the site and committed as
`public/screenshots/wp-<name>.png`.

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
