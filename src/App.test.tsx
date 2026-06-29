import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// App은 자체적으로 RecoilRoot를 포함하므로 Router만 감싼다.
describe("App 라우팅 (코드 스플리팅)", () => {
  it("lazy 라우트(/login)가 Suspense 후 정상 로드된다", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    // lazy 청크 로드 완료 후 로그인 화면 요소가 나타나야 한다.
    expect(await screen.findByAltText("카카오 로그인")).toBeInTheDocument();
  });
});
