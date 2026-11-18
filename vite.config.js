import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

export default defineConfig({
  // Rutes relatives: funciona a GitHub Pages sigui quin sigui el nom del repo
  base: './',
  build: {
    // Mai incrustar assets com a data: URI: un <a target="_blank"> cap a un
    // PDF incrustat queda bloquejat pel navegador en obrir pestanya nova.
    assetsInlineLimit: 0,
  },
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md)$/ }),
  ],
})
