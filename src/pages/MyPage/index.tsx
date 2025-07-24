import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../atom/atom";
import { logout } from "../../hooks/logout";
import { getUserInfo } from "../../api/user";
import {
  getPhotographerInfo,
  getSavedPhotographerList,
} from "../../api/photographer";
import { getSavedPromotionList } from "../../api/promotion";
import BottomBtns from "./BottomBtns";
import ProfileUser from "./ProfileUser";
import SavedContent from "./SavedContent";
import PhotographerInfo from "../../components/PhotographerInfo";
import MorePhotographerInfo from "../../components/MorePhotographerInfo";
import Bottom from "../../components/Bottom";

export default function MyPage() {
  const navigation = useNavigate();
  const [userInfo, setUserInfo] = useState<any>();
  const [savedPromotions, setSavedPromotions] = useState<any>([]);
  const [savedPhotographers, setSavedPhotographer] = useState<any>([]);
  const user = useRecoilValue(userState);
  const role = user.roles.includes("PHOTOGRAPHER") ? "PHOTOGRAPHER" : "USER";

  useEffect(() => {
    getUserInfoFunc();
  }, []);

  const getUserInfoFunc = async () => {
    try {
      const res =
        role === "USER"
          ? await getUserInfo()
          : await getPhotographerInfo(user.id, true);
      setUserInfo(res);
      const promotions = await getSavedPromotionList();
      const photographers = await getSavedPhotographerList();
      setSavedPromotions(promotions.items);
      setSavedPhotographer(photographers.items);
    } catch (e: any) {
      navigation(`/`);
      logout();
      console.log(e);
    }
  };

  if (!userInfo) return <></>;
  return (
    <div className="relative flex flex-col min-h-screen gap-4">
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
          <div className="w-full h-40 bg-violet400" />
          <div className="flex flex-col gap-2">
            <PhotographerInfo isMypage={true} userInfo={userInfo} />
            <SavedContent
              savedPromotions={savedPromotions}
              savedPhotographers={savedPhotographers}
              role={userInfo.type}
            />
            {userInfo.portfolio.length > 0 && (
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
