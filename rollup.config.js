import merge from "deepmerge";
import { createBasicConfig } from "@open-wc/building-rollup";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-import-css";
import pkg from "./package.json" assert { type: "json" };

const pkgdependencies = Object.keys(pkg.dependencies || {});
const baseConfig = createBasicConfig();
const extensions = [".js", ".ts", ".jsx", ".tsx"];

export default merge(baseConfig, {
  input: "src/index.ts",
  plugins: [
    css(),
    resolve({ extensions }),
    typescript({ tsconfig: "./tsconfig.json" }),
    commonjs(),
  ],
  external: (id) => pkgdependencies.includes(id),
});
