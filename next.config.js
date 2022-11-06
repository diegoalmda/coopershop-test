/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'imgnike-a.akamaihd.net',
      'artwalk.vteximg.com.br',
      'static.netshoes.com.br',
      'static.lojanba.com'
    ],
  },
}

module.exports = nextConfig
