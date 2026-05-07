// 메모리 기반 토큰 저장소 (XSS 안전)
// localStorage는 XSS 공격 시 동일 origin JS로 접근 가능하므로, accessToken은 메모리에 보관한다.
// refreshToken은 백엔드에서 HttpOnly 쿠키로 처리해야 하며, 별도 작업 예정 (TODO: TA-205 후속)
let _accessToken: string | null = null;

export const tokenStore = {
  getAccessToken: () => _accessToken,
  setAccessToken: (token: string | null) => { _accessToken = token; },
  clearAccessToken: () => { _accessToken = null; },
};
