import { useNavigate } from "react-router-dom";

// ✅ user is passed as prop from App.jsx — no direct localStorage read
export default function Profile({ user, onLogout }) {
  const nav = useNavigate();

  const logout = () => {
    onLogout();           // clears localStorage + App state
    nav("/login");        // redirect to login
  };

  const getRoleIcon = (role) => {
    if (role === "Admin User") return "👑";
    if (role === "Teacher") return "🎓";
    return "🧑‍🎓";
  };

  const getRoleBadgeColor = (role) => {
    if (role === "Admin User") return "#dc2626";
    if (role === "Teacher")    return "#7c3aed";
    return "#2563eb";
  };

  if (!user) {
    nav("/login");
    return null;
  }

  return (
    <div className="profile-page">

      {/* Profile Header Card */}
      <div className="card profile-header-card">
        <div className="profile-avatar">
          {getRoleIcon(user.role)}
        </div>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <span
            className="role-badge"
            style={{ background: getRoleBadgeColor(user.role) }}
          >
            {user.role}
          </span>
          <p className="profile-email">📧 {user.email}</p>
          <p className="profile-school">🏫 {user.school}</p>
        </div>
      </div>

      {/* Details */}
      <div className="profile-grid">

        <div className="card profile-detail-card">
          <h3>📋 Account Details</h3>
          <div className="detail-row">
            <span className="detail-label">Full Name</span>
            <span className="detail-value">{user.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Role</span>
            <span className="detail-value">{user.role}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Institution</span>
            <span className="detail-value">{user.school}</span>
          </div>
        </div>

        <div className="card profile-detail-card">
          <h3>📈 Learning Progress</h3>
          <div className="progress-item">
            <div className="progress-label">
              <span>Modules Completed</span>
              <strong>2 / 8</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "25%", background: "#3b82f6" }} />
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">
              <span>Preparedness Score</span>
              <strong>80%</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "80%", background: "#10b981" }} />
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">
              <span>Quizzes Passed</span>
              <strong>3 / 5</strong>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "60%", background: "#f59e0b" }} />
            </div>
          </div>
        </div>

      </div>

      {/* Logout */}
      <div className="card profile-logout-card">
        <p>Want to switch accounts or end your session?</p>
        <button
          className="logout-btn"
          onClick={logout}
          type="button"
        >
          🚪 Logout
        </button>
      </div>

    </div>
  );
}