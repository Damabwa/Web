export default function SavedContent() {
  return (
    <div className="flex py-6 mx-4 border cursor-pointer rounded-xl border-gray100 ">
      <div className="flex flex-col items-center justify-center w-1/2 gap-1 ">
        <div className="text-sm font-medium">저장한 이벤트</div>
        <div>1</div>
      </div>
      <div className="border border-gray100 h-[3.3125rem]" />
      <div className="flex flex-col items-center justify-center w-1/2 gap-1 ">
        <div className="text-sm font-medium">저장한 작가님</div>
        <div>10</div>
      </div>
    </div>
  );
}
