/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.nettruyenca.com',
            },
        ],
    },
    experimental: {
        forceSwcTransforms: true,
    },
}

export default nextConfig
