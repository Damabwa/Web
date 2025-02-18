interface Props {
  eventType: string;
  setEventType: React.Dispatch<React.SetStateAction<string>>;
}

export default function EventType({ eventType, setEventType }: Props) {
  return (
    <div className="flex flex-col w-full text-sm font-medium">
      <div className="mb-[0.62rem]">
        <span className="text-red mr-[0.12rem]">*</span>
        <span>이벤트 종류</span>
      </div>
      <div className="flex items-center w-full gap-2">
        <button
          className={`min-w-fit outline-none flex items-center justify-center h-10 w-[3.875rem] rounded-3xl border ${eventType === "free" ? "bg-violet400 bg-opacity-15 border-violet400 text-violet400" : "border-black border-opacity-10"}`}
          onClick={() => setEventType("free")}
        >
          무료
        </button>
        <button
          className={`min-w-fit outline-none flex items-center justify-center h-10 w-[3.875rem] rounded-3xl border ${eventType === "discount" ? "bg-violet400 bg-opacity-15 border-violet400 text-violet400" : "border-black border-opacity-10"}`}
          onClick={() => setEventType("discount")}
        >
          할인
        </button>
      </div>
    </div>
  );
}
