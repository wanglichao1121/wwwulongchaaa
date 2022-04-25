import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'
import prism from 'markdown-it-prism'
import tasklist from 'markdown-it-task-lists'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'docs'
  },
  plugins: [
    vue({
      include: [/\.vue$/,/\.md$/]
    }),
    Markdown({
      markdownItUses: [
        prism, tasklist
      ]
    })
  ]
})
