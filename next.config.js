/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/gpt/:path*',
        destination: 'https://api.openai.com/:path*',
      },
    ]
  },
  // reactStrictMode: true,
}
