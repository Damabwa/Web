import { useState } from "react";
import InputBox from "../../components/InputBox";
import SubHeader from "../../components/SubHeader";

export default function NewEvent() {
  const [title, setTitle] = useState("");

  const handleTitleInput = (e: any) => {
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen px-4">
      <SubHeader title="이벤트 등록" />
      <div className="mt-6">
        <InputBox
          isRequired={true}
          title="이벤트 제목"
          description=""
          placeholder="이벤트 제목을 입력해주세요."
          onChange={handleTitleInput}
          bottomText="공백 포함 30자 이내"
        />
      </div>
    </div>
  );
}
