import merge from "deepmerge";
import { createBasicConfig } from "@open-wc/building-rollup";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import * as react from "react";

const baseConfig = createBasicConfig();

export default merge(baseConfig, {
  input: "src/index.ts",
  output: {
    dir: "dist",
  },
  plugins: [
    resolve({ extensions: [".js", ".ts"] }),
    typescript({ tsconfig: "./tsconfig.json" }),
    commonjs({
      namedExports: {
        react: Object.keys(react),
      },
    }),
  ],
});
