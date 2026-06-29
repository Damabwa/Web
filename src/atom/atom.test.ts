import { snapshot_UNSTABLE } from "recoil";
import { userState } from "./atom";

describe("userState atom", () => {
  it("초기 roles는 빈 배열이어야 한다 (로그인/로그아웃 경로와 일치)", () => {
    // 의도된 동작: 로그인 전 초기 상태의 roles는 로그아웃 시 리셋값([])과 같아야 한다.
    // (login은 roles ?? [], logout은 [] 로 설정한다)
    const snapshot = snapshot_UNSTABLE();
    const value = snapshot.getLoadable(userState).getValue();

    expect(value).toEqual({ id: -1, roles: [] });
    expect(value.roles).toHaveLength(0);
  });
});
