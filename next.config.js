/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ["lh3.googleusercontent.com"],
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    }
  },
};
