import icn_back from "../../../assets/svgs/icn_back.svg";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function Route({ setStep }: Props) {
  return (
    <div className="w-full">
      <div className="w-full">
        <img
          className="w-8 cursor-pointer"
          alt="<"
          src={icn_back}
          onClick={() => setStep(0)}
        />
      </div>
      <div className="w-full px-8 pt-12 text-lg font-medium text-start">
        담아봐를 어떻게 알게 되셨나요?
      </div>
      <div className="px-8 py-8 mb-12">
        <span>*중복 선택 가능</span>
        <div className="flex flex-col justify-center gap-2 pt-4">
          <div className="flex gap-2">
            <input type="checkbox" />
            <span>지인 소개</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" />
            <span>인스타그램 릴스</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" />
            <span>인스타그램 게시물</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" />
            <span>인스타그램 스토리</span>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <input type="checkbox" />
              <span>기타 (직접 입력)</span>
            </div>
            <input className="ml-5 border-b outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
