/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const nextConfig = {
  ...withPWA({
    dest:'public',
    register:true,
    skipwating:true,
  }),
  experimental: {
    serverActions: true,
  },
  images: { domains: ["lh3.googleusercontent.com" ]},
};

module.exports = nextConfig;
