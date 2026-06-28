// @ts-check
import nextra from 'nextra';
import nxPlugin from '@nx/next/plugins/with-nx.js';

const { withNx } = nxPlugin;

const withNextra = nextra({
    // Nextra 4 reads MDX from the `content/` directory by default.
});

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 */
const nextConfig = {
    nx: {},
    // Screenshots are plain files in /public; no Image Optimization server on
    // GitHub Pages, so keep images unoptimized. Static `output: 'export'` and
    // basePath for Pages are configured in the deploy work (#249).
    images: { unoptimized: true },
};

// Nextra inner (registers the MDX pipeline), Nx outer (Nx build wiring).
export default withNx(withNextra(nextConfig));
