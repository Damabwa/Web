import { useState } from "react";
import InputBox from "../../components/InputBox";
import SubHeader from "../../components/SubHeader";
import GetImagesBox from "../../components/GetImagesBox";

export default function NewEvent() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [types, setTypes] = useState([""]);
  const [locs, setLocs] = useState([""]);
  const [eventType, setEventType] = useState("");
  const [url, setUrl] = useState("");
  const [images, setImages] = useState([""]);
  const [keywords, setKeywords] = useState([""]);
  const [detail, setDetail] = useState("");

  const handleTitleInput = (e: any) => {
    setTitle(e.target.value);
  };

  const handleNameInput = (e: any) => {
    setName(e.target.value);
  };

  const handleEventTypeInput = (e: any) => {
    setName(e.target.value);
  };

  const handleUrlInput = (e: any) => {
    setName(e.target.value);
  };

  const handleDetailInput = (e: any) => {
    setName(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4">
        <SubHeader title="이벤트 등록" />
      </div>
      <div className="flex flex-col gap-10 px-4 mt-6">
        <div className="-mb-3">
          <InputBox
            isRequired={true}
            title="이벤트 제목"
            description=""
            placeholder="이벤트 제목을 입력해주세요."
            onChange={handleTitleInput}
            bottomText="공백 포함 30자 이내"
          />
        </div>
        <InputBox
          isRequired={true}
          title="상호/활동명"
          description=""
          placeholder="초록 스튜디오"
          onChange={handleNameInput}
          bottomText=""
        />
        <InputBox
          isRequired={true}
          title="이벤트 게시물 링크"
          description="신청하기 버튼으로 바로 연결됩니다"
          placeholder="게시물 링크를 입력해주세요."
          onChange={handleUrlInput}
          bottomText=""
        />
      </div>
      <div className="py-10 pl-4">
        <GetImagesBox
          isRequired={true}
          title="배너 사진"
          description="첫 번째 사진이 메인에 보이는 사진입니다"
          maxLength={10}
        />
      </div>
    </div>
  );
}
