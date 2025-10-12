import { useState } from "react";
import EnlargeImage from "./EnlargeImage";

interface Item {
  portfolio: { name: string; url: string }[];
  address: { jibunAddress: string; roadAddress: string };
  description: string;
}
interface Props {
  userInfo: Item;
}
export default function MorePhotographerInfo({ userInfo }: Props) {
  const [enlargedIdx, setEnlargedIdx] = useState(0);
  const [showEnlargedImg, setShowEnlargedImg] = useState(false);

  if (showEnlargedImg)
    return (
      <div className="absolute top-0 left-0 w-full h-screen">
        <EnlargeImage
          images={userInfo.portfolio}
          startIdx={enlargedIdx}
          setShowEnlargedImg={setShowEnlargedImg}
        />
      </div>
    );
  return (
    <div className="flex flex-col min-w-full py-6 font-bold bg-white gap-7">
      <div className="flex flex-col w-full gap-2 pl-4">
        <div>포트폴리오</div>
        <div className="flex w-full gap-2 overflow-x-scroll">
          {userInfo.portfolio.map((image, index) => (
            <div
              key={index}
              className={`${index === userInfo.portfolio.length - 1 && "mr-4"}`}
            >
              <div className="w-[7.5rem] h-[7.5rem]">
                <img
                  className="object-cover w-full h-full cursor-pointer"
                  onClick={() => {
                    setEnlargedIdx(index);
                    setShowEnlargedImg(true);
                  }}
                  src={image.url}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {userInfo.address.roadAddress && (
        <div className="flex flex-col gap-2 px-4">
          <div>상세 주소</div>
          <div className="text-sm font-medium text-black02">
            {userInfo.address.roadAddress}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 px-4">
        <div>작가님 인사말</div>
        <div className="text-sm font-medium text-black02">
          {userInfo.description.split("\n").map((item: string, index) => (
            <div key={index} className="leading-6">
              {item}
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
