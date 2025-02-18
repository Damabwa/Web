import { Routes, Route } from "react-router-dom";
import Auth from "./auth";
import MainHome from "./pages/MainHome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import EditUserProfile from "./pages/EditUserProfile";
import EditPhotographerProfile from "./pages/EditPhotographerProfile";
import EditPhotographerPage from "./pages/EditPhotographerPage";
import EventHome from "./pages/EventHome";
import EventDetail from "./pages/EventDetail";
import PhotographersHome from "./pages/PhotographersHome";
import PhotographerDetail from "./pages/PhotographerDetail";
import NewEvent from "./pages/NewEvent";
import "./App.css";

function App() {
  return (
    <div className="text-black select-none App">
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
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
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
