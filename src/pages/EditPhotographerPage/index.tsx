import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VALIDATION } from "../../constants/validation";
import { updatePhotographerPage } from "../../api/photographer";
import SubHeader from "../../components/SubHeader";
import InputBox from "../../components/InputBox";
import InputIDBox from "../../components/InputIDBox";
import InputButtonBox from "../../components/InputButtonBox";
import ButtonActive from "../../components/ButtonActive";
import GetImagesBox from "../../components/GetImagesBox";
import InputLongformBox from "../../components/InputLongformBox";
import ModalConfirm from "../../components/ModalConfirm";
import { loadDaumPostcode } from "../../utils/loadDaumPostcode";

declare global {
  interface Window {
    daum?: any;
  }
}

export default function EditPhotographerPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [address, setAddress] = useState<any>({
    sido: "",
    sigungu: "",
    roadAddress: "",
    jibunAddress: "",
  });
  const [instagramId, setInstagramId] = useState("");
  const [contactLink, setContactLink] = useState("");
  const [description, setDescription] = useState("");

  const [isValid, setIsValid] = useState(false);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    if (!location.state) return;
    setPortfolio(location.state.portfolio || []);
    setInstagramId(location.state.instagramId || "");
    setContactLink(location.state.contactLink || "");
    setDescription(location.state.description || "");
    if (location.state.address) setAddress(location.state.address);
    // 마운트 시 location.state에서 수정할 초기값을 1회 설정
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (portfolio.length > 0 && description) setIsValid(true);
    else setIsValid(false);
  }, [portfolio, address, instagramId, contactLink, description]);

  const handleAddressSearch = async () => {
    try {
      await loadDaumPostcode();
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          setAddress({
            sido: data.sido,
            sigungu: data.sigungu,
            roadAddress: data.address,
            jibunAddress: data.jibunAddress,
          });
        },
      }).open();
    } catch {
      alert("주소 검색 서비스를 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  const handleInput = (e: any) => {
    setContactLink(e.target.value);
  };

  const handleIdInput = (e: any) => {
    let { value } = e.target;
    value = value.toLowerCase();
    value = value.replace(VALIDATION.INSTAGRAM_ID.REGEX, "");
    if (value.length > VALIDATION.INSTAGRAM_ID.MAX) {
      value = value.slice(0, VALIDATION.INSTAGRAM_ID.MAX);
    }
    setInstagramId(value);
  };

  const submitPhotographerPage = async () => {
    try {
      await updatePhotographerPage({
        portfolio,
        address,
        instagramId,
        contactLink,
        description,
      });
    } catch (e) {
      console.log(e);
    } finally {
      navigate(`/mypage`, {
        replace: true,
      });
    }
  };

  return (
    <div className="relative flex flex-col min-h-dvh-safe">
      <div>
        <div className="px-4">
          <SubHeader title="작가 페이지 수정" />
        </div>
        <div className="px-3 py-[0.63rem] mt-3 mb-6 text-sm font-medium rounded-lg bg-violet50 text-black02 mx-4">
          이 페이지를 완성하시면, <br />
          '작가님을 만나봐' 페이지에 작가 소개 글이 등록됩니다!
        </div>
        <div className="mb-8">
          <GetImagesBox
            isRequired={true}
            title="포트폴리오"
            description=""
            maxLength={10}
            images={portfolio}
            fileType="PHOTOGRAPHER_PORTFOLIO_IMAGE"
            setImages={setPortfolio}
            setShowModal={setIsImageModalOpen}
          />
        </div>
        <div className="flex flex-col gap-8 px-4 mb-9">
          <InputButtonBox
            isRequired={false}
            title="상세 주소"
            description="(오프라인 사업장이 있는 경우)"
            placeholder="주소를 검색해주세요."
            onChange={() => {}}
            onClick={() => handleAddressSearch()}
            activation={false}
            buttonTitle="주소 검색"
            bottomText=""
            value={address.roadAddress}
            isReadOnly={true}
          />
          <InputIDBox
            title="인스타그램 아이디"
            placeholder="인스타그램 아이디를 입력해주세요."
            onChange={handleIdInput}
            value={instagramId}
          />
          <InputBox
            isRequired={false}
            title="대표 링크"
            description="(홈페이지, 네이버, 카카오톡 등)"
            placeholder="대표 링크를 입력해주세요."
            onChange={handleInput}
            bottomText=""
            value={contactLink}
          />
          <InputLongformBox
            isRequired={true}
            title="상세 소개"
            minHeight="10.5rem"
            maxLength={500}
            value={description}
            setValue={setDescription}
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <ButtonActive
          activation={isValid}
          onClick={() => {
            if (isValid) submitPhotographerPage();
          }}
          text="등록"
        />
      </div>
      {isImageModalOpen && (
        <ModalConfirm
          content={["포트폴리오 이미지는", "최대 10장까지 첨부할 수 있어요"]}
          setShowModal={setIsImageModalOpen}
        />
      )}
    </div>
  );
}
