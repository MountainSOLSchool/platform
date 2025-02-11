//@ts-check

const { withNx } = require('@nx/next/plugins/with-nx');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    nx: {
        // Set this to true if you would like to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false,
    },

    output: 'standalone',

    redirects: async () => {
        return [
            {
                source: '/',
                destination: `/units`,
                permanent: false,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.mountainsol.org',
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
};

module.exports = withNx(nextConfig);
