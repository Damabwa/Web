import icn_next from "../../../assets/svgs/icn_next.svg";
import icn_heart from "../../../assets/svgs/icn_heart.svg";
import icn_comment from "../../../assets/svgs/icn_comment.svg";

interface Props {
  title: string;
  subTitle: string;
}

export default function Posts({ title, subTitle }: Props) {
  const mockdata = [
    {
      image: "",
      title: "글 제목",
      content: "내용 가나다라마바사",
      date: "08.29",
      likes: 12,
      comments: 30,
    },
    {
      image: "",
      title: "글 제목",
      content: "내용 가나다라마바사",
      date: "08.29",
      likes: 12,
      comments: 30,
    },
  ];

  return (
    <div className="flex flex-col border-b borrder-[#777777]">
      <div className="flex justify-between mb-3">
        <span className="text-xl font-bold cursor-pointer font-pre">
          {title}
        </span>
        <div className="flex items-center cursor-pointer">
          <button className="text-[0.625rem] font-medium">더보기</button>
          <img className="w-3 h-3" alt=">" src={icn_next} />
        </div>
      </div>
      <div className="flex flex-col">
        {mockdata.map((item) => (
          <div className="flex items-center justify-between pt-2 mb-2 border-t cursor-pointer border-lineRegular">
            {/* <img alt="image" src={}/> */}
            <div className="flex flex-col font-pre text-[0.625rem] font-medium text-black02">
              <div className="text-sm font-semibold text-black">
                {item.title}
              </div>
              <div className="mb-2">{item.content}</div>
              <div className="flex gap-1">
                <div className="">{item.date}</div>|
                <div className="flex items-center">
                  <img className="w-3 h-3" alt="" src={icn_heart} />
                  {item.likes}
                </div>
                <div className="flex items-center">
                  <img className="w-3 h-3" alt="" src={icn_comment} />
                  {item.comments}
                </div>
              </div>
            </div>
            <div className="w-16 h-16 rounded-lg bg-gray" />
          </div>
        ))}
      </div>
    </div>
  );
}
