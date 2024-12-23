import { Routes, Route } from "react-router-dom";
import Auth from "./auth";
import MainHome from "./pages/MainHome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventHome from "./pages/EventHome";
import EventDetail from "./pages/EventDetail";
import "./App.css";
function App() {
  return (
    <div className="text-black App">
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/events" element={<EventHome />} />
        <Route path="/event" element={<EventDetail />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
