import { useNavigate } from "react-router-dom";

interface Props {
  savedPromotions: any[];
  savedPhotographers: any[];
  role: string;
}

export default function SavedContent({
  savedPromotions,
  savedPhotographers,
  role,
}: Props) {
  const navigation = useNavigate();
  if (!savedPromotions || !savedPhotographers) return <></>;
  return (
    <div className="bg-white">
      <div
        className={`flex py-6 mx-4 cursor-pointer rounded-xl ${role === "USER" ? "border border-gray100" : ""}`}
      >
        <div
          className="flex flex-col items-center justify-center w-1/2 gap-1"
          onClick={() => {
            if (savedPromotions.length > 0)
              navigation(`/my/saved/promotion`, { state: savedPromotions });
          }}
        >
          <div className="text-sm font-medium">저장한 이벤트</div>
          <div>{savedPromotions.length}</div>
        </div>
        <div className="border border-gray100 h-[3.3125rem]" />
        <div
          className="flex flex-col items-center justify-center w-1/2 gap-1"
          onClick={() => {
            if (savedPhotographers.length > 0)
              navigation(`/my/saved/photographer`, {
                state: savedPhotographers,
              });
          }}
        >
          <div className="text-sm font-medium">저장한 작가님</div>
          <div>{savedPhotographers.length}</div>
        </div>
      </div>
    </div>
  );
}
