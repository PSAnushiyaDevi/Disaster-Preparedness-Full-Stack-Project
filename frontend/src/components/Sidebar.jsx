import { Link, useNavigate } from "react-router-dom";

export default function Sidebar(){
  const user = JSON.parse(localStorage.getItem("user"));
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    nav("/");
  };

  return(
    <div className="sidebar">
      <h2>🌍 Disaster</h2>

      {/* ✅ FIXED PATHS */}
      <Link to="/app/dashboard">📊 Dashboard</Link>
      <Link to="/app/learn">🎓 Learn</Link>
      <Link to="/app/quiz">🎮 Quiz</Link>
      <Link to="/app/report">🚨 Report</Link>
      <Link to="/app/alerts">📢 Alerts</Link>
      <Link to="/app/map">🗺️ Map</Link>
      <Link to="/app/profile">👤 Profile</Link>
      <Link to="/app/emergency">📞 Emergency</Link>

      {/* 🤖 AI */}
      <Link to="/app/prediction">🌦️ Prediction</Link>
      <Link to="/app/chatbot">🤖 AI Chatbot</Link>

      {/* 👑 ADMIN */}
      {user?.role === "Admin User" && (
        <Link to="/app/admin">👑 Admin Panel</Link>
      )}

      <button onClick={logout} style={{marginTop:"20px"}}>
        🚪 Logout
      </button>
    </div>
  );
}