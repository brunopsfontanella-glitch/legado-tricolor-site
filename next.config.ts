import type { NextConfig } from "next";

// Publicação no GitHub Pages: o site vira arquivos estáticos e é servido em /<repositório>.
// Localmente (npm run dev / next start) nada disso se aplica.
const noPages = !process.env.GITHUB_PAGES;
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(noPages ? {} : { output: "export", trailingSlash: true, images: { unoptimized: true } }),
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
