/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tickets',
        permanent: true,
      },
    ]
  }
};

export default nextConfig;