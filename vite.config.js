import { defineConfig, loadEnv } from "vite";
import preact from "@preact/preset-vite";
import Pages from "vite-plugin-pages";
import { fileURLToPath, URL } from 'node:url'

// 主入口路由模式（唯一可配）：hash / history。
// 仅主入口 index.html 走此配置；work、zxm 独立入口均恒为 hash（写死在各自 app.jsx）。
// 切换主入口模式只改这里，构建时通过 define 注入 __ROUTER_MODE__。
const ROUTER_MODE = "history";

// 公共别名，抽离出来，所有分支共用，避免每个分支重复写、漏写
const sharedAlias = {
  '@utils': fileURLToPath(new URL('./src/components/_utils', import.meta.url)),
  '@com': fileURLToPath(new URL('./src/components', import.meta.url)),
  // '@supa': fileURLToPath(new URL('./src/components/_supabase', import.meta.url)),
}

// ✅ 修复入参！{command, mode}
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), "VITE_");

	

	return {
		base: "./",
		
		plugins: [
			Pages({
				extensions: ["jsx"],
				dirs: [{
					dir: "src/pages",
					baseRoute: "",
					filePattern: "**/index.jsx",
				}],
				importMode(filepath, options) {
					return filepath.includes("/example") ? "async" : "sync";
				},
			}),
			preact(),
		],
		build: {
			outDir: "./dist",
		},
		resolve: {
			alias: sharedAlias,
		},
	};

	

});
