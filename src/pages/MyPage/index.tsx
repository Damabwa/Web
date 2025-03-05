import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api/user";
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
      setUserInfo(res);
      console.log(res);
    } catch (e: any) {
      if (e.response.status === 401) navigation(`/login`);
      console.log(e);
    }
  };

  const mockdata = {
    id: 0,
    type: "USER",
    loginType: "KAKAO",
    nickname: "홍길동",
    profileImage: {
      name: "apple.jpg",
      url: "https://i.pinimg.com/236x/b5/35/90/b53590a25445742b56c2bffb68987e11.jpg",
    },
    gender: "MALE",
    instagramId: "damaba.official",
    mainPhotographyTypes: ["SNAP"],
    contactLink: "https://damaba-contact.com",
    description:
      "자유 상세 내용 - 인사말, 작가님 소개, 작업 스타일, 예약 방법 등 최대 500자 자유 상세 내용 - 인사말, 작가님 소개, 작업 스타일, 예약 방법 등 최대 500자자유 상세 내용 - 인사말, 작가님 소개, 작업 스타일, 예약 방법 등 최대 500자자유 상세 내용 - 인사말, 작가님 소개, 작업 스타일, 예약 방법 등 최대 500자자유 상세 내용 - 인사말, 작가님 소개, 작업 스타일, 예약 방법 등 최대 500자",
    address: {
      sido: "경기",
      sigungu: "성남시 분당구",
      roadAddress: "경기 성남시 분당구 판교역로 166",
      jibunAddress: "경기 성남시 분당구 백현동 532",
    },
    businessSchedule: {
      days: ["MONDAY"],
      startTime: {
        hour: 0,
        minute: 0,
        second: 0,
        nano: 0,
      },
      endTime: {
        hour: 0,
        minute: 0,
        second: 0,
        nano: 0,
      },
    },
    portfolio: [
      {
        name: "apple.jpg",
        url: "https://mblogthumb-phinf.pstatic.net/MjAyNDA4MzBfMTQy/MDAxNzI0OTk1NjM4OTQ5.t5XZIoRPnTy61YVa7afLlac6kgF8RMY3fOPzEvLHI88g.PXk4LOpx-RsO2dia9jNsI1OaUCc2iEtZRAa_6EiWSokg.PNG/%EC%95%84%EC%9D%B4%ED%8C%A8%EB%93%9C.png?type=w800",
      },
      {
        name: "apple.jpg",
        url: "https://mblogthumb-phinf.pstatic.net/MjAyNDA0MDFfODMg/MDAxNzExOTQ2MzU2NDE2.IGh91JbATqM2xSLWm-6of-wYyg6YaRvLOwcNIFdPwYkg.LSKOKmZ12ybmqtW1RZ5zKj4OjJVWU1JUP7chTl63kSsg.PNG/3.png?type=w800",
      },
      {
        name: "apple.jpg",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB7B7I-yqBQa0kedLtLq0dsXAx0VUdD6gfeQ&s",
      },
      {
        name: "apple.jpg",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIz5FCfYACrjtHk71sDJROQcKXAlIA7Pv_XA&s",
      },
      {
        name: "apple.jpg",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJIkFhEOslGgNh7GNHgtoSrfhnhAJ0miwj0Q&s",
      },
      {
        name: "apple.jpg",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-rAa4n0XCtzqvvqjS0vBVRXMoaogX6GJTwQ&s",
      },
    ],
    activeRegions: [
      {
        category: "서울",
        name: "강남구",
      },
    ],
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
            profileImage={mockdata.profileImage.url}
            nickname={mockdata.nickname}
            activeRegions={mockdata.activeRegions}
            instagramId={mockdata.instagramId}
            contactLink={mockdata.contactLink}
          />
          <MorePhotographerInfo
            portfolio={mockdata.portfolio}
            address={mockdata.address.roadAddress}
            description={mockdata.description}
          />
        </div>
      )}
      <Bottom />
    </div>
  );
}
