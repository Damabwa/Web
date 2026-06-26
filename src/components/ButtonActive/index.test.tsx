import userEvent from "@testing-library/user-event";
import { renderWithProviders, screen } from "../../test-utils/renderWithProviders";
import ButtonActive from ".";

describe("ButtonActive", () => {
  it("전달된 텍스트를 렌더한다", () => {
    renderWithProviders(
      <ButtonActive activation text="다음" onClick={() => {}} />
    );
    expect(screen.getByRole("button", { name: "다음" })).toBeInTheDocument();
  });

  it("activation=true이면 활성 상태이고 클릭 시 onClick을 호출한다", async () => {
    const onClick = jest.fn();
    renderWithProviders(
      <ButtonActive activation text="확인" onClick={onClick} />
    );
    const button = screen.getByRole("button", { name: "확인" });
    expect(button).toBeEnabled();

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("activation=false이면 비활성(disabled)이고 클릭해도 onClick이 호출되지 않는다", async () => {
    const onClick = jest.fn();
    renderWithProviders(
      <ButtonActive activation={false} text="확인" onClick={onClick} />
    );
    const button = screen.getByRole("button", { name: "확인" });
    expect(button).toBeDisabled();

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
