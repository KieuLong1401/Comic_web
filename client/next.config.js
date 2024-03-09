/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname:
                    process.env.NEXT_PUBLIC_IMG_HOST || 'www.nettruyenus.net',
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
