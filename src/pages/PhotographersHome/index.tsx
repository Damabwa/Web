import { useNavigate, useSearchParams } from "react-router-dom";
import { usePhotographerList } from "../../hooks/usePhotographerList";
import icn_back from "../../assets/svgs/icn_back_white.svg";
import icn_noList from "../../assets/svgs/icn_no_photogrpher.svg";
import icn_search from "../../assets/svgs/icn_search_white.svg";
import Header from "../../components/Header";
import PhotographerBox from "../../components/PhotographerBox";
import FilterBar from "../../components/FilterBar";
import ListNotFound from "../../components/ListNotFound";

export default function PhotographersHome() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { photographers } = usePhotographerList(searchParams.toString());

  return (
    <div className="flex flex-col w-full min-h-dvh">
      <div className="h-12">
        <Header>
          <Header.Left>
            <img
              className="px-4 cursor-pointer"
              alt="<"
              src={icn_back}
              onClick={() => navigate(`/`)}
            />
          </Header.Left>
          <Header.Center>
            <div className="font-semibold text-white cursor-pointer">
              작가님을 만나봐
            </div>
          </Header.Center>
          <Header.Right>
            <img
              className="px-4 cursor-pointer"
              src={icn_search}
              alt="검색"
              onClick={() => navigate(`/search`)}
            />
          </Header.Right>
        </Header>
      </div>
      <div className="border-b-[0.375rem] border-gray50">
        <FilterBar isEvent={false} setSearchParams={setSearchParams} />
      </div>
      {photographers.length > 0 ? (
        <div className="relative grid grid-cols-2 gap-5 m-4">
          {photographers.map((item) => (
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
