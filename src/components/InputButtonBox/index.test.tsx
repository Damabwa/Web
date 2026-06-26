import userEvent from "@testing-library/user-event";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import InputButtonBox from ".";

const baseProps = {
  isRequired: true,
  title: "상호/활동명",
  description: "",
  placeholder: "상호명을 입력해주세요.",
  onChange: () => {},
  onClick: () => {},
  activation: true,
  buttonTitle: "중복 확인",
  bottomText: "",
  value: "",
  isReadOnly: false,
};

describe("InputButtonBox", () => {
  it("제목/필수표시/버튼명/값을 렌더한다", () => {
    renderWithProviders(<InputButtonBox {...baseProps} value="스튜디오" />);
    expect(screen.getByText("상호/활동명")).toBeInTheDocument();
    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByDisplayValue("스튜디오")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "중복 확인" })
    ).toBeInTheDocument();
  });

  it("activation=true이면 버튼이 활성화되고 클릭 시 onClick을 호출한다", async () => {
    const onClick = jest.fn();
    renderWithProviders(
      <InputButtonBox {...baseProps} activation onClick={onClick} />
    );
    const button = screen.getByRole("button", { name: "중복 확인" });
    expect(button).toBeEnabled();
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("activation=false이고 readOnly가 아니면 버튼이 비활성화되어 onClick이 호출되지 않는다", async () => {
    const onClick = jest.fn();
    renderWithProviders(
      <InputButtonBox
        {...baseProps}
        activation={false}
        isReadOnly={false}
        onClick={onClick}
      />
    );
    const button = screen.getByRole("button", { name: "중복 확인" });
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("readOnly 버튼은 activation=false여도 클릭 가능하다(예: 주소 검색)", async () => {
    const onClick = jest.fn();
    renderWithProviders(
      <InputButtonBox
        {...baseProps}
        activation={false}
        isReadOnly={true}
        buttonTitle="주소 검색"
        onClick={onClick}
      />
    );
    const button = screen.getByRole("button", { name: "주소 검색" });
    expect(button).toBeEnabled();
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
