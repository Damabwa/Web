import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/user";
import {
  getPhotographerInfo,
  getSavedPhotographerList,
} from "../../api/photographer";
import BottomBtns from "./BottomBtns";
import ProfileUser from "./ProfileUser";
import SavedContent from "./SavedContent";
import PhotographerInfo from "../../components/PhotographerInfo";
import MorePhotographerInfo from "../../components/MorePhotographerInfo";
import Bottom from "../../components/Bottom";
import { getSavedPromotionList } from "../../api/promotion";

export default function MyPage() {
  const navigation = useNavigate();

  const [userInfo, setUserInfo] = useState<any>();
  const [savedPromotions, setSavedPromotions] = useState<any>([]);
  const [savedPhotographers, setSavedPhotographer] = useState<any>([]);

  useEffect(() => {
    getUserInfoFunc();
  }, []);

  const getUserInfoFunc = async () => {
    try {
      const res = await getUserInfo();
      if (res.type !== "USER") getPhotographerInfoFunc(res.id);
      else {
        setUserInfo(res);
        const promotions = await getSavedPromotionList();
        const photographers = await getSavedPhotographerList();
        setSavedPromotions(promotions.items);
        setSavedPhotographer(photographers.items);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const getPhotographerInfoFunc = async (id: number) => {
    try {
      const res = await getPhotographerInfo(id);
      setUserInfo(res);
    } catch (e: any) {
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
          />
        </>
      ) : (
        <div className="border-gray50">
          <div className="w-full h-40 bg-violet400" />
          <PhotographerInfo isMypage={true} userInfo={userInfo} />
          {userInfo.portfolio.length > 0 && (
            <MorePhotographerInfo userInfo={userInfo} />
          )}
        </div>
      )}
      <BottomBtns />
      <div className="flex-1" />
      <Bottom />
    </div>
  );
}
