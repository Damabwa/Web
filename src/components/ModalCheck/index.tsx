interface Props {
  title: string;
  content: string[];
  btnMsg: string;
  align: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}

export default function ModalCheck({
  title,
  content,
  btnMsg,
  align,
  setShowModal,
  onClick,
}: Props) {
  return (
    <div className="fixed top-0 w-screen max-w-[430px] h-screen bg-black bg-opacity-40 flex items-center justify-center">
      <div
        className={`flex flex-col w-[17.125rem] rounded-[1.25rem] bg-white text-${align}`}
      >
        <div className="flex flex-col gap-[0.44rem] p-6 pb-4 min-h-24 justify-center text-gray900 text-nowrap">
          <div className="font-semibold">{title}</div>
          {content && (
            <div className="flex flex-col text-sm">
              {content.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
        </div>
        <div className="flex w-full text-sm font-medium border-t border-gray100 h-[2.875rem] text-center">
          <div
            className="flex items-center justify-center w-1/2 border-r cursor-pointer text-gray900 border-gray100"
            onClick={() => setShowModal(false)}
          >
            취소
          </div>
          <div
            className="flex items-center justify-center w-1/2 cursor-pointer text-violet300"
            onClick={() => {
              onClick();
              setShowModal(false);
            }}
          >
            {btnMsg}
          </div>
        </div>
      </div>
    </div>
  );
}
