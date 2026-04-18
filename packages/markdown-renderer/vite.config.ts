import path from "path"

import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [react(), tailwindcss(), dts({ rollupTypes: true })],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "markdown-renderer",
      fileName: () => "index.js",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "index.css"
          return "assets/[name]-[hash][extname]"
        },
      },
    },
  },
})
