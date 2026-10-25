// @ts-check
import nextra from 'nextra';

const withNextra = nextra({
    // Nextra 4 reads MDX from the `content/` directory by default.
});

// GitHub Pages serves the site under a path (the repo name) until the custom
// domain is wired up. The Pages workflow sets DOCS_BASE_PATH=/platform; locally
// and on the future custom domain it's empty (served at the root).
const basePath = process.env.DOCS_BASE_PATH ?? '';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // Static HTML export for GitHub Pages (no Node server) — only when building
    // for Pages (the `build-pages` target sets DOCS_EXPORT=1 and runs
    // `next build` directly, which emits the site to `out/`). Gated so the
    // regular `build` target keeps producing a server build in `.next/`.
    output: process.env.DOCS_EXPORT === '1' ? 'export' : undefined,
    // Pages serves each route as a directory/index.html — trailing slashes
    // avoid 404s on nested routes.
    trailingSlash: true,
    basePath: basePath || undefined,
    // Exposed to the client so <Shot> resolves /public image URLs under basePath.
    env: { NEXT_PUBLIC_BASE_PATH: basePath },
    // Screenshots are plain files in /public; no Image Optimization server on
    // GitHub Pages, so keep images unoptimized.
    images: { unoptimized: true },
};

export default withNextra(nextConfig);
