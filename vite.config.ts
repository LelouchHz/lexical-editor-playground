import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
	plugins: [react()],
	build: {
		outDir: "dist/build",
		target: "es2018",
		// App mode for dev/preview, IIFE for prod
		lib:
			mode === "production"
				? {
					entry: "./src/main.tsx",
					name: "LexicalEditor",
					fileName: () => "lexical-editor.iife.js",
					formats: ["iife"],
				}
				: undefined,
		rollupOptions: {
			external: id => id.startsWith("katex"),
			output: {
				name: "LexicalEditor",
				globals: {
					katex: "katex",
				},
			},
		}
	},
	optimizeDeps: {
		exclude: ["katex"],
	},
	base: "./",
	define: {
		"process.env.NODE_ENV": JSON.stringify("production"),
	},
}));
