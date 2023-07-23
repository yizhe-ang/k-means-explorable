import adapter from "@sveltejs/adapter-auto";
import autoprefixer from "autoprefixer";
import { readFileSync } from "fs";
import sveltePreprocess from "svelte-preprocess";

const { subdirectory } = JSON.parse(readFileSync("package.json", "utf8"));
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
    trailingSlash: "always"
  },
  paths: {
    base
  }
};

export default config;
