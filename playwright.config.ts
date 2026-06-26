import { defineConfig, devices } from "@playwright/test";

/**
 * E2E 설정.
 * - 로컬 dev 서버(npm start, 실제 API 프록시)를 자동 기동해 테스트한다.
 * - 앱이 모바일 전용(max-width 430px)이므로 모바일 뷰포트를 사용한다.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: "npm start",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      // CRA dev 서버가 브라우저를 자동으로 열지 않도록 한다.
      BROWSER: "none",
    },
  },
});
