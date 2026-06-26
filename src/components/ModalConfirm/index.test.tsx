import userEvent from "@testing-library/user-event";
import {
  renderWithProviders,
  screen,
} from "../../test-utils/renderWithProviders";
import ModalConfirm from ".";

describe("ModalConfirm", () => {
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
});
