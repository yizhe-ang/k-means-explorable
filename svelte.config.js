import adapter from "@sveltejs/adapter-auto";
import autoprefixer from "autoprefixer";
import dsv from "@rollup/plugin-dsv";
import path from "path";
import { readFileSync } from "fs";
import sveltePreprocess from "svelte-preprocess";
import svg from "vite-plugin-svgstring";

const { version, subdirectory } = JSON.parse(
  readFileSync("package.json", "utf8")
);
const dev = process.env.NODE_ENV === "development";
const dir = subdirectory || "";
const prefix = dir.startsWith("/") ? "" : "/";
const base = dev || !dir ? "" : `${prefix}${dir}`;

const preprocess = sveltePreprocess({
  postcss: {
    plugins: [autoprefixer]
  }
});

const config = {
  preprocess,
  kit: {
    adapter: adapter(),
    // Prerender everything except pages that are explicitly marked as not prerenderable
    prerender: { default: true },
    files: { lib: "./src" },
    trailingSlash: "always",
    vite: {
      define: { __VERSION__: JSON.stringify(version) },
      resolve: {
        alias: {
          $actions: path.resolve("./src/actions"),
          $components: path.resolve("./src/components"),
          $data: path.resolve("./src/data"),
          $stores: path.resolve("./src/stores"),
          $styles: path.resolve("./src/styles"),
          $svg: path.resolve("./src/svg"),
          $utils: path.resolve("./src/utils")
        }
      },
      plugins: [dsv(), svg()],
      ssr: {
        noExternal: ['@sveltejs/vite-plugin-svelte']
      }
    },
    paths: {
      base
    }
  }
};

export default config;
