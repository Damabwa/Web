import { Routes, Route } from "react-router-dom";
import Auth from "./auth";
import MainHome from "./pages/MainHome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventHome from "./pages/EventHome";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/events" element={<EventHome />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
