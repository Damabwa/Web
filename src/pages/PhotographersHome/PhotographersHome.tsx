import { useNavigate } from "react-router-dom";
import icn_back from "../../assets/svgs/icn_back_white.svg";
import Header from "../../components/Header";
import ContentBox from "./ContentBox";
import FilterBar from "./FilterBar";

export default function PhotographersHome() {
  const mockdata = [
    {
      image: "",
      name: "담아봐작가담아봐작가담아봐작가",
      types: ["프로필"],
    },
    {
      image: "",
      name: "담아봐작가2",
      types: ["프로필", "컨셉"],
    },
    {
      image: "",
      name: "담아봐작가3",
      types: ["스냅", "프로필"],
    },
    {
      image: "",
      name: "담아봐작가4",
      types: ["스냅", "프로필"],
    },
    {
      image: "",
      name: "담아봐작가5",
      types: ["프로필"],
    },
    {
      image: "",
      name: "담아봐작가6",
      types: ["프로필", "컨셉"],
    },
    {
      image: "",
      name: "담아봐작가7",
      types: ["스냅", "프로필"],
    },
    {
      image: "",
      name: "담아봐작가8",
      types: ["스냅", "프로필"],
    },
  ];
  const navigation = useNavigate();

  return (
    <div className="w-full">
      <div className="h-12">
        <Header
          main={
            <div className="font-semibold text-white cursor-pointer">
              작가님을 담아봐
            </div>
          }
          left={
            <img
              className="px-4 cursor-pointer"
              alt="<"
              src={icn_back}
              onClick={() => {
                navigation(-1);
              }}
            />
          }
          right={null}
        />
      </div>
      <div className="border-b-[0.375rem] border-lightgray">
        <FilterBar />
      </div>
      <div className="grid grid-cols-2 gap-5 p-4">
        {mockdata.map((item) => (
          <ContentBox key={item.name} data={item} />
        ))}
        <div className="w-full h-20 bg-white" />
      </div>
    </div>
  );
}
