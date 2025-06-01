import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import ThemeColorSetter from "./components/common/ThemeColorSetter";
import Auth from "./auth/login";
import MainHome from "./pages/MainHome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CompleteSignUp from "./pages/CompleteSignUp";
import MyPage from "./pages/MyPage";
import SavedContents from "./pages/SavedContents";
import EditUserProfile from "./pages/EditUserProfile";
import EditPhotographerProfile from "./pages/EditPhotographerProfile";
import EditPhotographerPage from "./pages/EditPhotographerPage";
import EventHome from "./pages/EventHome";
import EventDetail from "./pages/EventDetail";
import PhotographersHome from "./pages/PhotographersHome";
import PhotographerDetail from "./pages/PhotographerDetail";
import NewEvent from "./pages/NewEvent";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <div className="text-black select-none App">
      <RecoilRoot>
        <RecoilNexus />
        <ThemeColorSetter />
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/success/signup" element={<CompleteSignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/my/saved/:type" element={<SavedContents />} />
          <Route path="/edit/user" element={<EditUserProfile />} />
          <Route
            path="/edit/photographer"
            element={<EditPhotographerProfile />}
          />
          <Route
            path="/edit/photographer/detail"
            element={<EditPhotographerPage />}
          />
          <Route path="/events" element={<EventHome />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/photographers" element={<PhotographersHome />} />
          <Route path="/photographer/:id" element={<PhotographerDetail />} />
          <Route path="/new/event" element={<NewEvent />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
