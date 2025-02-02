export default function Profile() {
  const mockdata = {
    image:
      "https://mblogthumb-phinf.pstatic.net/MjAyNDA4MzBfMTQy/MDAxNzI0OTk1NjM4OTQ5.t5XZIoRPnTy61YVa7afLlac6kgF8RMY3fOPzEvLHI88g.PXk4LOpx-RsO2dia9jNsI1OaUCc2iEtZRAa_6EiWSokg.PNG/%EC%95%84%EC%9D%B4%ED%8C%A8%EB%93%9C.png?type=w800",
    username: "김송이",
    instagram: "its_song2",
  };
  return (
    <div className="flex flex-col gap-6 pt-7">
      <div className="flex items-center gap-4">
        <img
          className="object-cover w-[5.8125rem] h-[5.8125rem] rounded-full border-2 border-lineRegular"
          src={mockdata.image}
        />
        <div className="flex flex-col gap-[0.12rem]">
          <div className="text-lg font-semibold">{mockdata.username}</div>
          {mockdata.instagram && (
            <div className="text-xs text-black04">@{mockdata.instagram}</div>
          )}
        </div>
      </div>
      <div className="w-full h-10 text-sm font-medium items-center flex justify-center bg-gray100 rounded-[0.63rem] cursor-pointer">
        프로필 수정
      </div>
    </div>
  );
}
