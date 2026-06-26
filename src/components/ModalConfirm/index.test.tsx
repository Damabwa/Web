import userEvent from "@testing-library/user-event";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import ModalConfirm from ".";

describe("ModalConfirm", () => {
  afterEach(() => {
    // 컴포넌트가 body 스타일을 건드리므로 원래 값으로 명시 초기화한다.
    document.body.style.overflow = "";
  });

  it("내용 줄들과 다이얼로그/확인 버튼을 렌더한다", () => {
    renderWithProviders(
      <ModalConfirm content={["저장되었습니다", "확인해주세요"]} setShowModal={() => {}} />
    );
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("저장되었습니다")).toBeInTheDocument();
    expect(screen.getByText("확인해주세요")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });

  it("확인 버튼 클릭 시 setShowModal(false)를 호출한다", async () => {
    const setShowModal = jest.fn();
    renderWithProviders(
      <ModalConfirm content={["내용"]} setShowModal={setShowModal} />
    );
    await userEvent.click(screen.getByRole("button", { name: "확인" }));
    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  it("Escape 키 입력 시 setShowModal(false)를 호출한다", async () => {
    const setShowModal = jest.fn();
    renderWithProviders(
      <ModalConfirm content={["내용"]} setShowModal={setShowModal} />
    );
    await userEvent.keyboard("{Escape}");
    expect(setShowModal).toHaveBeenCalledWith(false);
  });

  it("마운트 시 body 스크롤을 잠그고 언마운트 시 복원한다", () => {
    const { unmount } = renderWithProviders(
      <ModalConfirm content={["내용"]} setShowModal={() => {}} />
    );
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });

  it("오버레이가 동적 뷰포트 높이(h-dvh)로 세로 중앙 정렬된다", () => {
    // 모바일 주소창 영역까지 100vh로 잡으면 모달이 아래로 치우치므로 h-dvh 사용.
    const { container } = renderWithProviders(
      <ModalConfirm content={["내용"]} setShowModal={() => {}} />
    );
    const overlay = container.firstChild as HTMLElement;
    expect(overlay).toHaveClass("h-dvh-safe");
    expect(overlay).toHaveClass("items-center");
  });

  it("content가 빈 배열이어도 다이얼로그와 확인 버튼을 렌더한다", () => {
    const setShowModal = jest.fn();
    renderWithProviders(<ModalConfirm content={[]} setShowModal={setShowModal} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "확인" })).toBeInTheDocument();
  });
});
