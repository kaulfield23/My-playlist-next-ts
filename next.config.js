/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "mosaic.scdn.co",
            "i.scdn.co"
        ]
    }
}

module.exports = nextConfig