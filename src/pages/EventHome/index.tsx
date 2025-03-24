import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPromotionList } from "../../api/promotion";
import icn_back from "../../assets/svgs/icn_back_white.svg";
import icn_pencil from "../../assets/svgs/icn_eventhome_pencil.svg";
import icn_noList from "../../assets/svgs/icn_no_promotion.svg";
import Header from "../../components/Header";
import FilterBar from "../../components/FilterBar";
import PromotionBox from "../../components/PromotionBox";
import ListNotFound from "../../components/ListNotFound";

function EventHome() {
  const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [role, setRole] = useState<string[]>([]);
  const [promotionList, setPromotionList] = useState<any[]>([]);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole") || "";
    if (localStorage.getItem("accessToken") && userRole)
      setRole(userRole.split(","));
  }, []);

  useEffect(() => {
    getPromotionListFunc();
  }, [searchParams]);

  const getPromotionListFunc = async () => {
    const params = searchParams.toString();
    try {
      const res = await getPromotionList(params);
      setPromotionList(res.items);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <div className="h-12">
        <Header
          main={
            <div className="font-semibold text-white cursor-pointer">
              Event로 담아봐
            </div>
          }
          left={
            <img
              className="px-4 cursor-pointer"
              alt="<"
              src={icn_back}
              onClick={() => {
                navigation(`/`);
              }}
            />
          }
          right={null}
        />
      </div>
      <div className="border-b-[0.375rem] border-gray50">
        <FilterBar isEvent={true} setSearchParams={setSearchParams} />
      </div>
      {promotionList.length > 0 ? (
        <div className="flex flex-col gap-1 bg-gray50">
          {promotionList.map(
            (item) =>
              item.author && (
                <div key={item.id} className="bg-white">
                  <PromotionBox data={item} />
                </div>
              )
          )}
          <div className="w-full h-20 bg-white" />
        </div>
      ) : (
        <div className="flex items-center flex-1 pb-40">
          <ListNotFound
            icon={icn_noList}
            title="앗! 조건에 맞는 이벤트가 없어요."
            content="곧 더 다양한 이벤트 소식을 준비해올게요!"
          />
        </div>
      )}
      {(role.includes("PHOTOGRAPHER") || role.includes("ADMIN")) && (
        <div className="fixed w-full max-w-[430px] bottom-0">
          <button
            className="outline-none absolute right-4 bottom-3 rounded-3xl bg-violet500 text-white px-4 py-[0.81rem] shadow-btn-shadow flex gap-[0.31rem] font-semibold text-[0.9375rem]"
            onClick={() => navigation(`/new/event`)}
          >
            <img src={icn_pencil} />
            <div>이벤트 게시</div>
          </button>
        </div>
      )}
    </div>
  );
}

export default EventHome;
