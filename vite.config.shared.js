import { defineConfig } from "vite";

export function createViteConfig(data, entry) {
  // Create the name parts for root and package names
  const parts = data.name.startsWith("@")
    ? data.name.replace("@", "").split("/")
    : [data.name, data.name];

  // Return a vite config object using the provided data and optional entry
  return defineConfig({
    ...(entry && {
      build: {
        lib: {
          entry,
          formats: ["es"],
          fileName: "index"
        },
        emptyOutDir: false,
        sourcemap: true
      }
    }),
    define: {
      "import.meta.env.VITE_ROOT": JSON.stringify(parts[0]),
      "import.meta.env.VITE_PACKAGE": JSON.stringify(parts[1]),
      "import.meta.env.VITE_NAME": JSON.stringify(data.name),
      "import.meta.env.VITE_DESCRIPTION": JSON.stringify(data.description)
    }
  });
}
