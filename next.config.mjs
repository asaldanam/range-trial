/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        urlImports: ['https://maps.googleapis.com']
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dummyimage.com'
            }
        ]
    }
};

export default nextConfig;
