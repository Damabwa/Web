interface Props {
  content: string[];
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalComfirm({ content, setShowModal }: Props) {
  return (
    <div className="z-20 fixed top-0 w-screen max-w-[430px] h-screen bg-black bg-opacity-40 flex items-center justify-center">
      <div className={`flex flex-col w-[17.125rem] rounded-[1.25rem] bg-white`}>
        <div className="pt-[1.87rem] pb-[1.38rem] justify-center text-center">
          <div className="flex flex-col font-semibold text-gray900">
            {content.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
        <div
          className="flex w-full text-sm font-medium border-t items-center  border-gray100 h-[2.875rem] justify-center text-violet300 cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          확인
        </div>
      </div>
    </div>
  );
}
