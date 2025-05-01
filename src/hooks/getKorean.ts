export const getOrder = (item: string) => {
  switch (item) {
    case "LATEST":
      return "최신순";
    case "POPULAR":
      return "인기순";
    case "ALL":
      return "전체";
    case "UPCOMING":
      return "예정";
    case "ONGOING":
      return "진행중";
    case "ENDED":
      return "마감";
    default:
      return item;
  }
};

export const getPhotoType = (item: string) => {
  switch (item) {
    case "SNAP":
      return "스냅";
    case "PROFILE":
      return "프로필";
    case "CONCEPT":
      return "컨셉";
    case "ID_PHOTO":
      return "증명";
    case "SELF":
      return "셀프";
    default:
      return item;
  }
};
