/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "1wkalkqhyommja5d.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
