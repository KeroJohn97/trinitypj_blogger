import withBundleAnalyzer from "@next/bundle-analyzer"
import { type NextConfig } from "next"

import { env } from "./env.mjs"

const config: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: async () => [
    { source: "/healthz", destination: "/api/health" },
    { source: "/api/healthz", destination: "/api/health" },
    { source: "/health", destination: "/api/health" },
    { source: "/ping", destination: "/api/health" },
  ],
  // TODO remove this if not needed
  images: {
    remotePatterns: [
      new URL("https://bearcreek.camp/wp-content/uploads/**"),
      new URL("https://img.youtube.com/**"),
      new URL("https://trinitypj.com/wp-content/uploads/**"),
      {
        protocol: 'https',
        hostname: 'anenlmpxuwzvicwypbat.supabase.co',
        port: '',
        // This allows all public buckets; you can restrict this to /brand-assets/** for more security
        pathname: '/storage/v1/object/public/**', 
      },
    ],
  },
}

export default env.ANALYZE ? withBundleAnalyzer({ enabled: env.ANALYZE })(config) : config
