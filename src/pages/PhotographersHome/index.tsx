import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPhotographerList } from "../../api/photographer";
import icn_back from "../../assets/svgs/icn_back_white.svg";
import icn_noList from "../../assets/svgs/icn_no_photogrpher.svg";
import Header from "../../components/Header";
import PhotographerBox from "../../components/PhotographerBox";
import FilterBar from "../../components/FilterBar";
import ListNotFound from "../../components/ListNotFound";

export default function PhotographersHome() {
  const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [photographerList, setPhotographertList] = useState<any>([]);

  useEffect(() => {
    getPhotographerListFunc();
  }, [searchParams]);

  const getPhotographerListFunc = async () => {
    const params = searchParams.toString();
    try {
      const res = await getPhotographerList(params);
      setPhotographertList(res.items);
    } catch (e) {
      console.log(e);
    }
  };

  if (!photographerList) return <></>;
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="h-12">
        <Header
          main={
            <div className="font-semibold text-white cursor-pointer">
              작가님을 만나봐
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
        <FilterBar isEvent={false} setSearchParams={setSearchParams} />
      </div>
      {photographerList.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 p-4">
          {photographerList.map((item: any) => (
            <PhotographerBox key={item.id} data={item} />
          ))}
          <div className="w-full h-20 bg-white" />
        </div>
      ) : (
        <div className="flex items-center flex-1 pb-40">
          <ListNotFound
            icon={icn_noList}
            title="앗! 조건에 맞는 작가님이 없어요."
            content="곧 더 다양한 작가님들을 모셔올게요!"
          />
        </div>
      )}
    </div>
  );
}
