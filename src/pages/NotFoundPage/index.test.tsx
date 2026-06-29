import { Routes, Route } from "react-router-dom";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import NotFoundPage from ".";

describe("NotFoundPage", () => {
  it("매칭되지 않는 경로는 홈('/')으로 리다이렉트한다", () => {
    renderWithProviders(
      <Routes>
        <Route path="/" element={<div>홈 화면</div>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>,
      { initialEntries: ["/does-not-exist"] }
    );

    // Navigate가 즉시 "/"로 보내므로 홈 화면이 렌더된다.
    expect(screen.getByText("홈 화면")).toBeInTheDocument();
  });
});
