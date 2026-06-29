import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";
import ThemeColorSetter from "./components/common/ThemeColorSetter";
import Loading from "./components/Loading";
import "./App.css";

// 라우트별 코드 스플리팅: 진입 시 필요한 페이지 청크만 로드해 초기 번들/로딩을 줄인다.
const Auth = lazy(() => import("./auth/login"));
const MainHome = lazy(() => import("./pages/MainHome"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const CompleteSignUp = lazy(() => import("./pages/CompleteSignUp"));
const MyPage = lazy(() => import("./pages/MyPage"));
const SavedContents = lazy(() => import("./pages/SavedContents"));
const EditUserProfile = lazy(() => import("./pages/EditUserProfile"));
const EditPhotographerProfile = lazy(
  () => import("./pages/EditPhotographerProfile")
);
const EditPhotographerPage = lazy(() => import("./pages/EditPhotographerPage"));
const EventHome = lazy(() => import("./pages/EventHome"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const PhotographersHome = lazy(() => import("./pages/PhotographersHome"));
const PhotographerDetail = lazy(() => import("./pages/PhotographerDetail"));
const NewEvent = lazy(() => import("./pages/NewEvent"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <div className="text-black select-none App">
      <RecoilRoot>
        <RecoilNexus />
        <ThemeColorSetter />
        <Suspense fallback={<Loading isLoading />}>
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
        </Suspense>
      </RecoilRoot>
    </div>
  );
}

export default App;
