/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // disable LightningCSS
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tiqr-events.sgp1.cdn.digitaloceanspaces.com',
        port: '',
        pathname: '/**', // This allows any image path from this host
      },
    ],
    domains: ['lh3.googleusercontent.com'], // add other domains if needed
  },
  reactStrictMode: true,
  
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
