import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { isMobileDevice } from "../../utils/device";
import { userState } from "../../atom/atom";
import { getUserInfo } from "../../api/user";
import {
  getPhotographerInfo,
  getSavedPhotographerList,
} from "../../api/photographer";
import { getSavedPromotionList } from "../../api/promotion";
import icn_back from "../../assets/svgs/icn_back.svg";
import BottomBtns from "./BottomBtns";
import ProfileUser from "./ProfileUser";
import SavedContent from "./SavedContent";
import PhotographerInfo from "../../components/PhotographerInfo";
import MorePhotographerInfo from "../../components/MorePhotographerInfo";
import Bottom from "../../components/Bottom";
import Loading from "../../components/Loading";

export default function MyPage() {
  const isMobile = isMobileDevice();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const role = user.roles.includes("PHOTOGRAPHER") ? "PHOTOGRAPHER" : "USER";

  // 프로필/저장목록을 각각 독립 useQuery로 조회(allSettled의 개별 실패 허용과 동등).
  // 저장목록은 SavedContents와 동일 키를 써 캐시 공유 + 저장 invalidation 시 카운트도 함께 갱신.
  // 프로필은 역할별 응답 타입(UserInfo|PhotographerDetail)이 달라 any로 둔다(기존 동작 유지).
  const { data: userInfo, isLoading: isProfileLoading } = useQuery<any>({
    queryKey: ["myProfile", role, user.id],
    queryFn: () => (role === "USER" ? getUserInfo() : getPhotographerInfo(user.id)),
  });
  const { data: savedPromotions = [] } = useQuery({
    queryKey: ["savedPromotions"],
    queryFn: () => getSavedPromotionList().then((res) => res.items),
  });
  const { data: savedPhotographers = [] } = useQuery({
    queryKey: ["savedPhotographers"],
    queryFn: () => getSavedPhotographerList().then((res) => res.items),
  });

  // 콜드 진입 시 빈 화면 깜빡임 방지(SavedContents와 일관)
  if (isProfileLoading) return <Loading isLoading={true} />;
  if (!userInfo) return <></>;
  return (
    <div className="relative flex flex-col min-h-dvh-safe gap-4">
      {userInfo.type === "USER" ? (
        <>
          <ProfileUser userInfo={userInfo} />
          <SavedContent
            savedPromotions={savedPromotions}
            savedPhotographers={savedPhotographers}
            role={userInfo.type}
          />
        </>
      ) : (
        <div className="border-b-8 bg-gray50 border-gray50">
          <div className="relative w-full h-40 bg-violet400">
            {isMobile && (
              <img
                className="absolute z-10 w-6 h-6 cursor-pointer top-3 left-4"
                onClick={() => navigate(-1)}
                src={icn_back}
                alt="뒤로가기"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <PhotographerInfo isMypage={true} userInfo={userInfo} />
            <SavedContent
              savedPromotions={savedPromotions}
              savedPhotographers={savedPhotographers}
              role={userInfo.type}
            />
            {userInfo.portfolio && userInfo.portfolio.length > 0 && (
              <MorePhotographerInfo userInfo={userInfo} />
            )}
          </div>
        </div>
      )}
      <BottomBtns />
      <div className="flex-1" />
      <Bottom />
    </div>
  );
}
