import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      reporter: ["text", "html", "json", "lcov"],
      include: ["**/packages/**/src/**/*.{js,jsx,ts,tsx}"],
      exclude: ["**/packages/**/src/**/*.d.ts"]
    }
  }
});
