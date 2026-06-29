import userEvent from "@testing-library/user-event";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import ModalCheck from ".";

const baseProps = {
  title: ["로그인이 필요해요"],
  content: ["로그인 후 이용해 주세요"],
  btnMsg: "로그인 하기",
  align: "center" as const,
  setShowModal: jest.fn(),
  onClick: jest.fn(),
};

describe("ModalCheck", () => {
  afterEach(() => {
    document.body.style.overflow = "";
  });

  it("제목/내용/버튼을 렌더하고 등장 애니메이션(popIn)을 적용한다", () => {
    renderWithProviders(<ModalCheck {...baseProps} />);
    expect(screen.getByText("로그인이 필요해요")).toBeInTheDocument();
    expect(screen.getByText("로그인 후 이용해 주세요")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "로그인 하기" })
    ).toBeInTheDocument();
    expect(screen.getByRole("dialog")).toHaveClass("animate-popIn");
  });

  it("메인 버튼 클릭 시 onClick을 호출한다", async () => {
    const onClick = jest.fn();
    renderWithProviders(<ModalCheck {...baseProps} onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "로그인 하기" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
