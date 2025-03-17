import icn_down from "../../../assets/svgs/icn_down.svg";
import icn_down_purple from "../../../assets/svgs/icn_down_purple.svg";

interface Props {
  activation: boolean;
  onClick: (input: string) => void;
  setFilterName: string;
  title: string;
}

export default function BtnChip({
  activation,
  onClick,
  setFilterName,
  title,
}: Props) {
  const getKorean = (item: string) => {
    switch (item) {
      case "LATEST":
        return "최신순";
      case "POPULAR":
        return "인기순";
      case "ALL":
        return "전체";
      case "UPCOMING":
        return "예정";
      case "ONGOING":
        return "진행중";
      case "ENDED":
        return "마감";
      default:
        return item;
    }
  };

  return (
    <button
      className={`min-w-fit outline-none flex items-center justify-center h-9 gap-1 px-[0.88rem] py-[0.38rem] bg-gray100 rounded-3xl border ${activation ? "border-violet400 bg-violet400 bg-opacity-15 text-violet400" : "border-gray100"}`}
      onClick={() => onClick(setFilterName)}
    >
      {getKorean(title)}
      <img alt="▽" src={activation ? icn_down_purple : icn_down} />
    </button>
  );
}
