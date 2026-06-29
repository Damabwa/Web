import { render, screen } from "@testing-library/react";
import ListSkeleton from ".";

describe("ListSkeleton", () => {
  it("event variant는 이벤트 로딩 라벨로 렌더된다", () => {
    render(<ListSkeleton variant="event" />);
    expect(screen.getByLabelText("이벤트 목록 불러오는 중")).toBeInTheDocument();
  });

  it("photographer variant는 작가 로딩 라벨로 렌더된다", () => {
    render(<ListSkeleton variant="photographer" />);
    expect(screen.getByLabelText("작가 목록 불러오는 중")).toBeInTheDocument();
  });
});
