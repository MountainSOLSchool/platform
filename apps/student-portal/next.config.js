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
    redirects: async () => {
        return [
            {
                source: '/',
                destination: `/units`,
                permanent: false,
            },
        ];
    },
};

module.exports = withNx(nextConfig);
