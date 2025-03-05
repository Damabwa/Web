import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/user";
import { getPhotographerInfo } from "../../api/photographer";
import Bottom from "./Bottom";
import ProfileUser from "./ProfileUser";
import SavedContent from "./SavedContent";
import PhotographerInfo from "../../components/PhotographerInfo";
import MorePhotographerInfo from "../../components/MorePhotographerInfo";

export default function MyPage() {
  const navigation = useNavigate();

  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    getUserInfoFunc();
  }, []);

  const getUserInfoFunc = async () => {
    try {
      const res = await getUserInfo();
      if (res.type !== "USER") getPhotographerInfoFunc(res.id);
      else setUserInfo(res);
    } catch (e: any) {
      if (e.response.status === 401) navigation(`/login`);
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
    <div className="relative flex flex-col gap-4">
      {userInfo.type === "USER" ? (
        <>
          <ProfileUser userInfo={userInfo} />
          <SavedContent />
        </>
      ) : (
        <div className="border-b-8 border-gray50">
          <div className="w-full h-40 bg-violet400" />
          <PhotographerInfo
            isMypage={true}
            profileImage={userInfo.profileImage.url}
            nickname={userInfo.nickname}
            activeRegions={userInfo.activeRegions}
            instagramId={userInfo.instagramId}
            contactLink={userInfo.contactLink}
          />
          <MorePhotographerInfo
            portfolio={userInfo.portfolio}
            address={userInfo.address.roadAddress}
            description={userInfo.description}
          />
        </div>
      )}
      <Bottom />
    </div>
  );
}
