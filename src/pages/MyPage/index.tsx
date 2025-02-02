import Bottom from "./Bottom";
import ProfileUser from "./ProfileUser";
import SavedContent from "./SavedContent";

export default function MyPage() {
  return (
    <div className="relative flex flex-col gap-4 px-4 ">
      <ProfileUser />
      <SavedContent />
      <Bottom />
    </div>
  );
}
