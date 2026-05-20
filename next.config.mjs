/** @type {import('next').NextConfig} */

const nextConfig = {

  images: {

    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "brafbuueylnvwosqbwlc.supabase.co",
      },
    ],
  },
};

export default nextConfig;