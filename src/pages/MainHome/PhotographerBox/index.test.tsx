import {
  renderWithProviders,
  screen,
} from "../../../test-utils/renderWithProviders";
import PhotographerBox from ".";
import { usePhotographerList } from "../../../hooks/usePhotographerList";

jest.mock("../../../hooks/usePhotographerList", () => ({
  usePhotographerList: jest.fn(),
}));

const mockUse = usePhotographerList as jest.MockedFunction<
  typeof usePhotographerList
>;

const makeItem = (id: number, nickname: string) => ({
  id,
  nickname,
  profileImage: { url: "https://cdn/p.jpg", name: "p" },
  mainPhotographyTypes: ["SNAP"],
});

describe("MainHome PhotographerBox", () => {
  beforeEach(() => jest.clearAllMocks());

  it("닉네임이 같아도 고유 key(id)로 렌더해 중복 key 경고가 없다", () => {
    // 동명이인(닉네임 동일, id 다름) — key가 nickname이면 React가 중복 key 경고를 낸다.
    mockUse.mockReturnValue({
      photographers: [makeItem(1, "작가"), makeItem(2, "작가")],
      isLoading: false,
      error: null,
    } as never);
    const errSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    renderWithProviders(<PhotographerBox />);

    expect(screen.getAllByText("작가")).toHaveLength(2);
    const hasDupKeyWarning = errSpy.mock.calls.some((args) =>
      String(args[0]).includes("same key")
    );
    expect(hasDupKeyWarning).toBe(false);

    errSpy.mockRestore();
  });
});
