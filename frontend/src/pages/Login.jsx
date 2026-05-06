import { useState, useEffect } from "react";
import { login, register } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    school: ""
  });

  // ✅ THE REAL FIX:
  // When this page mounts, clear any stale localStorage session.
  // This means pressing "Login" or "Get Started" always shows the form fresh.
  useEffect(() => {
    localStorage.removeItem("user");
  }, []);

  const handleSubmit = async () => {
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }
    if (!isLogin && (!form.name || !form.role || !form.school)) {
      setError("All fields are required for registration.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const res = await login({ email: form.email, password: form.password });
        // res.data = { id, name, email, role, school } — password stripped by backend
        onLogin(res.data);        // ← save to App state + localStorage
        nav("/app/dashboard");    // ← navigate in
      } else {
        await register(form);
        alert("✅ Registered successfully! Please login.");
        setIsLogin(true);
        setForm({ name: "", email: "", password: "", role: "", school: "" });
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <div className="login-logo">🌍</div>
          <h2>DisasterSafe</h2>
          <p>{isLogin ? "Welcome back! Please login." : "Create your account below."}</p>
        </div>

        <div className="login-tabs">
          <button
            className={`tab-btn${isLogin ? " active" : ""}`}
            onClick={() => { setIsLogin(true); setError(""); }}
            type="button"
          >
            Login
          </button>
          <button
            className={`tab-btn${!isLogin ? " active" : ""}`}
            onClick={() => { setIsLogin(false); setError(""); }}
            type="button"
          >
            Register
          </button>
        </div>

        {error && <div className="login-error">⚠️ {error}</div>}

        {!isLogin && (
          <div className="input-group">
            <label>Full Name</label>
            <input
              placeholder="Enter your full name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
        )}

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={handleKeyDown}
          />
        </div>

        {!isLogin && (
          <>
            <div className="input-group">
              <label>Role</label>
              <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin User">Admin</option>
              </select>
            </div>

            <div className="input-group">
              <label>School / College</label>
              <input
                placeholder="Enter your institution name"
                value={form.school}
                onChange={e => setForm({ ...form, school: e.target.value })}
              />
            </div>
          </>
        )}

        <button
          className="login-submit-btn"
          onClick={handleSubmit}
          disabled={loading}
          type="button"
        >
          {loading ? "Please wait..." : isLogin ? "Login →" : "Create Account →"}
        </button>

        <p
          className="toggle-text"
          onClick={() => { setIsLogin(!isLogin); setError(""); }}
        >
          {isLogin
            ? "Don't have an account? Register here"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
}