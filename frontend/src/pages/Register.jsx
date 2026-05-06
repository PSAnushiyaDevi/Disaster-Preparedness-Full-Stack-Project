import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    school: ""
  });

  const submit = async () => {
    setError("");

    if (!form.name || !form.email || !form.password || !form.role || !form.school) {
      setError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);
    try {
      await register(form);
      alert("✅ Registered successfully! Please login.");
      nav("/login");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed. Email may already be in use."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <div className="login-logo">🌍</div>
          <h2>Create Account</h2>
          <p>Join DisasterSafe and stay prepared.</p>
        </div>

        {error && <div className="login-error">⚠️ {error}</div>}

        <div className="input-group">
          <label>Full Name</label>
          <input
            placeholder="Enter your full name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>Role</label>
          <select
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            {/* ✅ Match DB value exactly */}
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

        <button
          className="login-submit-btn"
          onClick={submit}
          disabled={loading}
          type="button"
        >
          {loading ? "Registering..." : "Create Account →"}
        </button>

        <p className="toggle-text" onClick={() => nav("/login")}>
          Already have an account? Login here
        </p>

      </div>
    </div>
  );
}