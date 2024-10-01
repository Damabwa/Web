import { Routes, Route } from "react-router-dom";
import Auth from "./auth";
import NavigationBar from "./components/NavigationBar";
import MainHome from "./pages/MainHome";
import "./App.css";

function App() {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_JS_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <div className="pb-20 App">
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <NavigationBar />
      {/* <button onClick={handleLogin}>카카오 로그인</button> */}
    </div>
  );
}

export default App;
