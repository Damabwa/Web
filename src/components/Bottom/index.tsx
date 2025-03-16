import logo_damaba from "../../assets/svgs/logo_damaba_white.svg";
import icn_insta from "../../assets/svgs/icn_instagram_gray.svg";

export default function Bottom() {
  const url_instagram = "https://www.instagram.com/damaba.official";
  const url1 = `https://obtainable-chocolate-d07.notion.site/1b53cdfe884080ef94bcf7e9f55f0bcb?pvs=4`;
  const url2 = `https://obtainable-chocolate-d07.notion.site/1b53cdfe88408032b850cbba8f856532?pvs=4`;
  return (
    <div className="flex flex-col justify-center p-5 w-full max-w-[430px] bg-gray50 gap-3 pb-8 text-nowrap">
      <div className="flex justify-between pb-1 ">
        <img className="w-28" src={logo_damaba} />
        <img
          className="w-6 cursor-pointer"
          onClick={() => window.open(url_instagram)}
          src={icn_insta}
        />
      </div>
      <div className="flex gap-3 text-sm text-black02">
        <button onClick={() => window.open(url1)}>개인정보처리방침</button>
        <button onClick={() => window.open(url2)}>이용약관</button>
      </div>
      <div className="flex flex-col gap-1 text-xs text-black04">
        <div className="flex justify-between">
          <div>대표 정지희</div>
          <div>제휴/협업 문의 damaba2024@gmail.com</div>
        </div>
        <div>대표번호 0502-1933-0034</div>
      </div>
      <div className="text-black04 text-[0.625rem]">
        담아봐는 정보제공중개자로 판매의 당사자가 아닙니다.
        <br />
        따라서 등록된 상품/이벤트의 정보 및 거래에 대한 의무와 책임은 각
        판매자에게 있습니다.
      </div>
    </div>
  );
}
