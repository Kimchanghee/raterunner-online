/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }] }];
  },
  async rewrites() {
    // Preserve the original static article routes; Next does not auto-serve public/*/index.html.
    return [
      { source: '/about', destination: '/about/index.html' },
      { source: '/blog', destination: '/blog/index.html' },
      { source: '/blog/:slug', destination: '/blog/:slug/index.html' },
    ];
  }
};
export default nextConfig;
