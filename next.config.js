/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "mosaic.scdn.co",
            "i.scdn.co",
            "platform-lookaside.fbsbx.com",
            "placekitten.com"
        ]
    }
}

module.exports = nextConfig