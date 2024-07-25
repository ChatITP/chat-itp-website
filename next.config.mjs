import 'dotenv/config';

const nextConfig = {
  reactStrictMode: true,
  env: {
    INSTAGRAM_ACCESS_TOKEN: process.env.INSTAGRAM_ACCESS_TOKEN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent-mad2-1.cdninstagram.com',
        port: '',
        pathname: '/v/t51.29350-15/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent-mad1-1.cdninstagram.com',
        port: '',
        pathname: '/v/t51.29350-15/**',
      },
    ],
  },
};

export default nextConfig;
