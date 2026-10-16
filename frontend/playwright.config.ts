import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  webServer: {
    command: `npm run dev -- --port ${new URL(baseURL).port || "3000"}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  testDir: "./tests",
  fullyParallel: false,
  use: {
    baseURL,
    launchOptions: { executablePath: process.env.CHROMIUM_EXECUTABLE },
    reducedMotion: "reduce",
  },
});
