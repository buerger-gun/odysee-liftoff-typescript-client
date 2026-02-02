import { defineConfig } from "vite";
import fs from "fs/promises";

/*
  This override allows us to use .js files instead of exclusively .jsx.
  We should remove as soon as video updates can be prioritized.
*/
export default defineConfig(() => ({
  test: {
    globals: true,
    environment: "happy-dom",
  },
  server: {
    host: "0.0.0.0", // Erlaubt Zugriff von außen (WICHTIG für Railway)
    port: Number(process.env.PORT) || 3000, // Nutzt den von Railway zugewiesenen Port
  },
  // Falls du 'npm run build' und dann 'npm run preview' nutzt:
  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT) || 3000,
  },
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
}));
