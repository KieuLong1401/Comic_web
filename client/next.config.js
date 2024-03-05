/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.IMG_HOST,
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        forceSwcTransforms: true,
    },
}

export default nextConfig
