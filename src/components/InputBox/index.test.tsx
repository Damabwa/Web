import {
  renderWithProviders,
  screen,
  fireEvent,
} from "../../test-utils/renderWithProviders";
import InputBox from ".";

const baseProps = {
  isRequired: false,
  title: "닉네임",
  description: "",
  placeholder: "닉네임을 입력하세요",
  onChange: () => {},
  bottomText: "",
  value: "",
};

describe("InputBox", () => {
  it("제목/placeholder/값을 렌더한다", () => {
    renderWithProviders(<InputBox {...baseProps} value="길동" />);
    expect(screen.getByText("닉네임")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("닉네임을 입력하세요");
    expect(input).toHaveValue("길동");
  });

  it("isRequired=true이면 필수 표시(*)를 보여준다", () => {
    renderWithProviders(<InputBox {...baseProps} isRequired />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("isRequired=false이면 필수 표시(*)가 없다", () => {
    renderWithProviders(<InputBox {...baseProps} isRequired={false} />);
    expect(screen.queryByText("*")).not.toBeInTheDocument();
  });

  it("description과 bottomText는 비어있지 않을 때만 렌더한다", () => {
    const { rerender } = renderWithProviders(
      <InputBox {...baseProps} description="" bottomText="" />
    );
    expect(screen.queryByText("2~7자")).not.toBeInTheDocument();
    expect(screen.queryByText("이미 사용 중입니다")).not.toBeInTheDocument();

    rerender(
      <InputBox {...baseProps} description="2~7자" bottomText="이미 사용 중입니다" />
    );
    expect(screen.getByText("2~7자")).toBeInTheDocument();
    expect(screen.getByText("이미 사용 중입니다")).toBeInTheDocument();
  });

  it("입력 변경 시 onChange를 호출한다", () => {
    const onChange = jest.fn();
    renderWithProviders(<InputBox {...baseProps} onChange={onChange} />);
    fireEvent.change(screen.getByPlaceholderText("닉네임을 입력하세요"), {
      target: { value: "새값" },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
