import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Toggle from "./components/Toggle";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import Report from "./pages/Report";
import Alerts from "./pages/Alerts";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Quiz from "./pages/Quiz";
import Emergency from "./pages/Emergency";
import Chatbot from "./pages/Chatbot";
import Prediction from "./pages/Prediction";

function AppLayout({ dark, setDark }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <Toggle dark={dark} setDark={setDark} />
        <Outlet />
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);

  // ✅ user lives in React STATE — not raw localStorage read on every render
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  // Called from Login after successful API response
  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Called from Navbar / logout button
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className={dark ? "dark" : ""}>
      <BrowserRouter>
        <Routes>

          {/* ✅ Welcome — always visible, never redirects */}
          <Route path="/" element={<Welcome />} />

          {/* ✅ Login — if user already logged in, go to dashboard */}
          <Route
            path="/login"
            element={
              user
                ? <Navigate to="/app/dashboard" replace />
                : <Login onLogin={handleLogin} />
            }
          />

          {/* ✅ Register — same guard */}
          <Route
            path="/register"
            element={
              user
                ? <Navigate to="/app/dashboard" replace />
                : <Register />
            }
          />

          {/* ✅ Protected app routes */}
          <Route
            path="/app"
            element={
              user
                ? <AppLayout dark={dark} setDark={setDark} />
                : <Navigate to="/login" replace />
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard user={user} />} />
            <Route path="learn" element={<Learn />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="report" element={<Report />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="map" element={<Map />} />
            <Route path="profile" element={<Profile user={user} onLogout={handleLogout} />} />
            <Route path="emergency" element={<Emergency />} />
            <Route path="prediction" element={<Prediction />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route
              path="admin"
              element={
                user?.role === "Admin User"
                  ? <Admin onLogout={handleLogout} />
                  : <Navigate to="/app/dashboard" replace />
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}