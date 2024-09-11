import "./App.css";

function App() {
  const redirect_uri = "http://localhost:3000/auth";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_APP_KEY}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <div className="App">
      <button onClick={handleLogin}>카카오 로그인</button>
    </div>
  );
}

export default App;
