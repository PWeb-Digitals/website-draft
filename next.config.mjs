/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  experimental: { optimizePackageImports: ['react-icons', 'react-icons/si', 'react-icons/fa6', 'lucide-react'] },
  // Old URLs keep their Google ranking. Netlify has the same list in netlify.toml.
  async redirects() {
    const r = (source, destination) => ({ source, destination, permanent: true });
    return [
      r('/showcase', '/work'),
      r('/media', '/ai-video'),
      r('/work/multi-cam-broadcast-rig', '/work'),
      r('/capabilities', '/services'),
      r('/capabilities/web-design', '/web-design'),
      r('/capabilities/digital-experience', '/web-design'),
      r('/capabilities/seo', '/seo'),
      r('/capabilities/lead-generation', '/lead-generation'),
      r('/capabilities/growth-systems', '/lead-generation'),
      r('/capabilities/crm-automation', '/crm-automation'),
      r('/capabilities/customer-systems', '/crm-automation'),
      r('/capabilities/ai-automation', '/ai-automation'),
      r('/capabilities/product-engineering', '/mvp-development'),
      r('/capabilities/custom-solutions', '/mvp-development'),
      r('/capabilities/mvp-development', '/mvp-development'),
      r('/capabilities/ai-video', '/ai-video'),
      r('/capabilities/media-production', '/ai-video'),
      r('/capabilities/media', '/ai-video'),
      r('/capabilities/:slug', '/services'),
    ];
  },
};

export default nextConfig;
