/** @type {import('next').NextConfig} */
const nextConfig = {
  // Images are pre-optimized; serve them as-is so the Image Optimization API is never used
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
