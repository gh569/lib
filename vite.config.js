import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import Pages from "vite-plugin-pages";
import { generateScopedName } from "./css-modules.config";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  build: {
    outDir: "./dist/preact",
  },
  plugins: [
    Pages({
      extensions: ["jsx"],
      // exclude: ['**/_*.jsx'],
      // exclude: ['**/example/**'],
      dirs: [
        {
          dir: "src/example",
          baseRoute: "",
          filePattern: "**/page.jsx",
        },
      ],

      importMode(filepath, options) {
        // return filepath.includes("/example") ?
        // 	"async" :
        // 	"sync";
        return "async";
      },
    }),
    preact({
      babel: {
        plugins: [
          [
            "styled-jsx/babel",
            {
              	// optimizeForSpeed: true, // 禁用嵌套编译核心开关
              	// scoped: true, // 强制给所有类加唯一hash（.jsx-xxx.类名）
              	// sourceMaps: false // 可选，uniapp打包优化
            },
          ],
          [
            "@dr.pogodin/babel-plugin-react-css-modules",
            {
              generateScopedName: generateScopedName,
              handleMissingStyleName: "warn",
              attributeNames: {
                styleName: "class",
              },
              context: __dirname,
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      // react: "preact/compat",
      // "react-dom": "preact/compat",
      my: "/public/lib/preact/index.js",
      utils: "/public/lib/utils",
      com: "/src/components",
      xlsx_url: "https://esm.sh/xlsx@0.18.5",
    },
  },
  css: {
    modules: {
      generateScopedName: generateScopedName,
    },
  },
});
