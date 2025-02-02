import Bottom from "./Bottom";
import Profile from "./Profile";
import SavedContent from "./SavedContent";

export default function MyPage() {
  return (
    <div className="relative flex flex-col gap-4 px-4 ">
      <Profile />
      <SavedContent />
      <Bottom />
    </div>
  );
}
