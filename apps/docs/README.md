# Mountain SOL Admin Guide (`apps/docs`)

Internal documentation site for Mountain SOL admins. Built with **Next.js +
[Nextra](https://nextra.site)** — the same React/Next stack as `student-portal`,
wired into Nx via `@nx/next`. Dependencies live in the **root `package.json`**
(no per-app `node_modules`).

## Run it

```bash
npx nx run docs:serve        # dev server on http://localhost:4202
npx nx run docs:build        # production build
npx nx run docs:export       # static export for GitHub Pages (#249)
```

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
