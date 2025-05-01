import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPromotionList } from "../../../api/promotion";
import icn_next from "../../../assets/svgs/icn_next.svg";
import icn_camera from "../../../assets/svgs/icn_camera.svg";
import icn_clock from "../../../assets/svgs/icn_clock.svg";

export default function EventBox() {
  const navigation = useNavigate();

  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    getPromotionListFunc();
  }, []);

  const getPromotionListFunc = async () => {
    try {
      const res = await getPromotionList(
        "page=0&pageSize=5&progressStatus=ONGOING"
      );
      setEvents(res.items);
    } catch (e) {
      console.log(e);
    }
  };

  const getDDay = (endedAt: string) => {
    const now = new Date();
    const koreaTimeOffset = 9 * 60 * 60 * 1000;
    const today = new Date(now.getTime() + koreaTimeOffset);

    const targetDate = new Date(endedAt);

    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return "마감된 이벤트";
    } else if (diffDays === 0) {
      return "오늘 마감되는 이벤트";
    } else {
      return `마감까지 D-${diffDays}`;
    }
  };

  const getKorean = (item: string) => {
    switch (item) {
      case "SNAP":
        return "스냅";
      case "PROFILE":
        return "프로필";
      case "CONCEPT":
        return "컨셉";
      case "ID_PHOTO":
        return "증명";
      case "SELF":
        return "셀프";
      default:
        return item;
    }
  };

  const navigateEvent = () => {
    navigation("/events");
  };

  return (
    <div className="flex flex-col py-5">
      <div
        className="flex flex-col px-4 pb-5 cursor-pointer"
        onClick={() => navigateEvent()}
      >
        <span className="text-lg font-bold">Event로 담아봐!</span>
        <div className="flex items-center justify-between text-sm">
          <span>현재 진행 중인 사진 이벤트</span>
          <div className="flex text-xs">
            <button>전체보기</button>
            <img className="w-4 h-4" alt=">" src={icn_next} />
          </div>
        </div>
      </div>
      <div className="flex w-full gap-3 px-4 overflow-x-auto">
        {events.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 cursor-pointer"
            onClick={() => navigation(`/event/${item.id}`)}
          >
            <div className="w-[7.5rem] h-[7.5rem] rounded-lg bg-gray50 overflow-hidden">
              <img
                className="object-cover min-w-full min-h-full rounded-lg"
                src={item.images[0].url}
              />
            </div>
            <div className="flex flex-col text-xs font-medium text-black02">
              <div className="mb-1 text-sm font-semibold text-black">
                {item.title}
              </div>
              <div className="flex items-center pb-[0.1rem]">
                <div className="flex items-center justify-center w-4 h-4 ">
                  <img src={icn_camera} />
                </div>
                <div className="flex gap-1">
                  {item.photographyTypes.map((type: string, index: number) => (
                    <div key={index}>
                      {getKorean(type)}
                      {index + 1 !== item.photographyTypes.length && <>,</>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-4 h-4">
                  <img src={icn_clock} />
                </div>
                {getDDay(item.endedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
