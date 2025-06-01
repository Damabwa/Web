import { useNavigate } from "react-router-dom";

interface Props {
  promotionData: any;
}

export default function BottomInfo({ promotionData }: Props) {
  const navigation = useNavigate();
  return (
    <div className="flex flex-col px-4 py-6 bg-white">
      {promotionData.author &&
        promotionData.author.roles.includes("PHOTOGRAPHER") && (
          <div>
            <div className="pb-3 font-bold">촬영 작가</div>
            <div className="flex items-center gap-2 pb-6">
              <img
                className="object-cover w-10 h-10 rounded-full cursor-pointer"
                src={promotionData.author.profileImage.url}
                onClick={() =>
                  navigation(`/photographer/${promotionData.author.id}`)
                }
              />
              <div
                className="text-sm font-medium cursor-pointer"
                onClick={() =>
                  navigation(`/photographer/${promotionData.author.id}`)
                }
              >
                {promotionData.author.nickname}
              </div>
            </div>
          </div>
        )}
      <div>
        <div className="pb-3 font-bold">상세 설명</div>
        <div className="pb-5 text-sm font-medium text-black02">
          {promotionData.content}
        </div>
      </div>
      <div className="flex gap-2 text-sm font-medium pb-36 text-black02">
        {promotionData.hashtags.map((tag: string) => (
          <div
            key={tag}
            className="px-3 py-1 rounded-2xl bg-violet400 bg-opacity-15 text-violet400"
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
}
