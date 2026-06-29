import { render, screen } from "@testing-library/react";
import ErrorBoundary from ".";

const Boom = (): JSX.Element => {
  throw new Error("boom");
};

describe("ErrorBoundary", () => {
  it("자식이 에러를 던지면 폴백(새로고침) UI를 보여준다", () => {
    // React가 잡힌 에러를 console.error로 출력하므로 억제
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole("button", { name: "새로고침" })
    ).toBeInTheDocument();

    spy.mockRestore();
  });

  it("에러가 없으면 자식을 그대로 렌더한다", () => {
    render(
      <ErrorBoundary>
        <div>정상 콘텐츠</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("정상 콘텐츠")).toBeInTheDocument();
  });
});
