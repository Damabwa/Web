import { test, expect } from "@playwright/test";

/**
 * 비로그인 공개 플로우 E2E.
 * 실제 dev 서버 + 실 API를 사용하므로, 데이터에 의존하는 단언 대신
 * 페이지가 정상 부팅·렌더되는지(페이지 chrome)를 검증한다.
 */

test.describe("로그인 페이지", () => {
  test("로고/카카오 로그인/약관·정책 버튼이 보인다", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByAltText("담아봐 로고")).toBeVisible();
    await expect(page.getByAltText("카카오 로그인")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "개인정보처리방침" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "이용약관" })).toBeVisible();
  });
});

test.describe("이벤트 홈", () => {
  test("페이지가 정상 부팅되고 헤더가 보인다", async ({ page }) => {
    await page.goto("/events");
    await expect(page.getByText("Event로 담아봐")).toBeVisible();
  });

  test("뒤로가기 클릭 시 홈으로 이동한다", async ({ page }) => {
    await page.goto("/events");
    await expect(page.getByText("Event로 담아봐")).toBeVisible();

    await page.getByAltText("<").click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });

  test("검색 클릭 시 검색 페이지로 이동한다", async ({ page }) => {
    await page.goto("/events");
    // 페이지가 안정화된 뒤 클릭해 타이밍 플레이크를 방지한다.
    await expect(page.getByText("Event로 담아봐")).toBeVisible();
    await page.getByAltText("검색").click();
    await expect(page).toHaveURL(/\/search$/);
  });
});

test.describe("작가 홈", () => {
  test("페이지가 정상 부팅되고 헤더가 보인다", async ({ page }) => {
    await page.goto("/photographers");
    await expect(page.getByText("작가님을 만나봐")).toBeVisible();
  });
});
