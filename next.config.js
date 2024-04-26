/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                'localhost:3000',
                'https://opulent-guide-jpjg9r779442j5p-3000.app.github.dev',
            ],
        }
    }
}

module.exports = nextConfig
