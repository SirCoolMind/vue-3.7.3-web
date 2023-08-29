import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@helpers": fileURLToPath(new URL("./src/helpers/", import.meta.url)),
      "@forms": fileURLToPath(new URL("./src/components/forms", import.meta.url)),
      "@apis": fileURLToPath(new URL("./src/router/apis", import.meta.url)),
    },
  },
});
