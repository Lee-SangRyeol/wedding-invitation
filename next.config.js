/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // 정적 이미지 최적화 비활성화 (선택사항)
  },
}

module.exports = nextConfig
