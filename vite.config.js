import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import Pages from "vite-plugin-pages";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    Pages({
      dirs: 'src/pages',
      extensions: ["jsx"],
      // exclude: ['**/_*.jsx'],

      importMode(filepath, options) {
        // return filepath.includes('example') ? 'sync' : 'sync'
        return "async";
      },
    }),
    preact({
      balel: {
        plugins: [
          [
            "styled-jsx",
            {
              vendorPrefixes: true,
              optimizeForNext: false,
            },
          ],
        ],
      },
    }),
    /* {
				babel: {
					plugins: [
						[
							"htm",
							{
								pragma: "h",
							},
						],
					],
				},
			} */
  ],
  resolve: {
    alias: {
      // react: "preact/compat",
      // "react-dom": "preact/compat",
      my: "/src/_utils/mylib.js",
      utils: "/src/_utils",
      com: "/src/components",
    },
  },
});
