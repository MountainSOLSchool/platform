//@ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
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

module.exports = nextConfig;
