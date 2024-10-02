/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        GROQ_API_KEY: process.env.GROQ_API_KEY,
    },
    env: {
      GROQ_API_KEY: process.env.GROQ_API_KEY,
    },
}

export default nextConfig;
