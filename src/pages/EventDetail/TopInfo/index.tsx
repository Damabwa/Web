import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePromotion } from "../../../api/promotion";
import icn_time from "../../../assets/svgs/icn_time.svg";
import icn_loc from "../../../assets/svgs/icn_location.svg";
import icn_insta from "../../../assets/svgs/icn_instagram.svg";
import icn_share from "../../../assets/svgs/icn_share.svg";
import icn_more from "../../../assets/svgs/icn_more.svg";
import ModalCheck from "../../../components/ModalCheck";

interface Props {
  promotionData: any;
}

export default function TopInfo({ promotionData }: Props) {
  const navigation = useNavigate();
  const [showHandler, setShowHandler] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const isMyPost =
    promotionData.author &&
    promotionData.author.id.toString() === localStorage.getItem("userId");

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

  const deleteHandler = async () => {
    try {
      await deletePromotion(promotionData.id);
    } catch (e) {
      console.log(e);
    } finally {
      navigation("/events");
    }
  };

  const modifyHandler = () => {
    navigation(`/new/event`, { state: promotionData });
  };

  return (
    <div className="relative flex flex-col w-full py-5 bg-white border-b-8 border-gray50">
      <div className="px-4 text-sm font-medium text-black04 pb-[2px] flex gap-1">
        {promotionData.photographyTypes.map((type: string, index: number) => (
          <div className="flex gap-1" key={index}>
            {getKorean(type)}
            {promotionData.photographyTypes.length > index + 1 && <>,</>}
          </div>
        ))}
      </div>
      <div className="px-4 pb-4 text-xl font-bold ">{promotionData.title}</div>
      <div className="flex flex-col gap-2 px-3 text-sm font-medium text-black02">
        {promotionData.startedAt && promotionData.endedAt && (
          <div className="flex items-center gap-1">
            <img className="p-[0.35rem]" src={icn_time} />
            <div>
              {promotionData.startedAt.replace(/-/g, ".")}
              {" ~ "}
              {promotionData.endedAt.replace(/-/g, ".")}
            </div>
          </div>
        )}
        <div className="flex items-center gap-1">
          <img className="w-6" src={icn_loc} />
          <div className="flex w-full gap-1">
            {promotionData.activeRegions.map((loc: any, index: number) => (
              <div className="flex gap-1" key={index}>
                <p>{loc.category}</p>
                <p>
                  {loc.name}
                  {promotionData.activeRegions.length > index + 1 && <>,</>}
                </p>
              </div>
            ))}
          </div>
        </div>
        {promotionData.author.instagramId && (
          <div className="flex items-center gap-1">
            <img className="p-[0.35rem]" src={icn_insta} />
            <div
              className="cursor-pointer text-[#0068C3]"
              onClick={() =>
                window.open(
                  `https://www.instagram.com/${promotionData.author.instagramId}`
                )
              }
            >
              {promotionData.author.instagramId}
            </div>
          </div>
        )}
      </div>
      <div className="absolute flex gap-2 top-6 right-4">
        {/* <button>
          <img src={icn_share} />
        </button> */}
        {isMyPost && (
          <div
            className="relative -mr-1 cursor-pointer"
            onClick={() => setShowHandler(!showHandler)}
          >
            <img src={icn_more} />
            {showHandler && (
              <div className="absolute right-0 flex flex-col px-4 text-xs bg-white shadow-md whitespace-nowrap top-8 rounded-2xl">
                <button
                  className="py-2 border-b outline-none text-black02 border-gray50"
                  onClick={() => modifyHandler()}
                >
                  수정하기
                </button>
                <button
                  className="py-2 outline-none text-red"
                  onClick={() => setShowDeleteModal(true)}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {showDeleteModal && (
        <ModalCheck
          title="삭제하시겠습니까?"
          content={[]}
          btnMsg="확인"
          align="center"
          setShowModal={setShowDeleteModal}
          onClick={deleteHandler}
        />
      )}
    </div>
  );
}
