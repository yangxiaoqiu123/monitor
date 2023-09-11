import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import requireTransform from "vite-plugin-require-transform";

import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // requireTransform({
    //   fileRegex: /.js$|.vue$/,
    // }),
  ],
  resolve: {
    //设置路径别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "*": path.resolve(""),
    },
  },
  base: "./",
});
