import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    name: "app",
  },
  plugins: [
    svelte({
      include: "src/**/*.svelte",
      // You can pass any of the Svelte compiler options
      compilerOptions: {

        // By default, the client-side compiler is used. You
        // can also use the server-side rendering compiler
        // generate: 'ssr',

        // ensure that extra attributes are added to head
        // elements for hydration (used with generate: 'ssr')
        // hydratable: true,

        // You can optionally set 'customElement' to 'true' to compile
        // your components to custom elements (aka web elements)
        customElement: true,
      },
    }),
    resolve({
      browser: true,
    }),
  ],
};
