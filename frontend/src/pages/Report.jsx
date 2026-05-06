import { useState } from "react";
import { sendReport } from "../services/api";

const DISASTER_TYPES = ["Flood", "Fire", "Earthquake", "Cyclone", "Landslide", "Drought", "Other"];
const SEVERITY_LEVELS = ["Low", "Medium", "High", "Critical"];

export default function Report() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    type: "",
    location: "",
    desc: "",
    severity: "",
    injured: "",
    school: user?.school || ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.type || !form.location || !form.desc || !form.severity) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    setLoading(true);
    try {
      const res = await sendReport(form);
      console.log("✅ Report submitted:", res.data);
      setSubmitted(true);
      setForm({ type: "", location: "", desc: "", severity: "", injured: "", school: user?.school || "" });
    } catch (err) {
      console.error("❌ Report error:", err?.response?.data || err.message);
      alert("❌ Failed to submit report. Check console for details.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div style={{ padding: "20px" }}>
        <div className="card" style={{
          textAlign: "center", padding: "50px",
          background: "linear-gradient(135deg, #28a745, #20c997)",
          color: "white", borderRadius: "16px"
        }}>
          <div style={{ fontSize: "60px" }}>✅</div>
          <h2>Report Submitted Successfully!</h2>
          <p>Your disaster report has been recorded in the system.</p>
          <p>Authorities and administrators have been notified.</p>
          <button
            onClick={() => setSubmitted(false)}
            style={{ marginTop: "20px", background: "white", color: "#28a745", fontWeight: "bold", padding: "12px 30px", borderRadius: "8px" }}
          >
            + Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #dc3545, #ff6b6b)",
        color: "white", borderRadius: "16px",
        padding: "30px", marginBottom: "20px"
      }}>
        <h2 style={{ margin: 0 }}>🚨 Disaster Incident Report</h2>
        <p style={{ margin: "8px 0 0 0", opacity: 0.9 }}>
          Report a disaster or emergency at your institution. All reports are stored and reviewed by administrators.
        </p>
      </div>

      {/* REPORTER INFO */}
      <div className="card" style={{ marginBottom: "15px" }}>
        <h3 style={{ marginTop: 0, color: "#007bff" }}>👤 Reporter Information</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Name</label>
            <input
              value={user?.name || ""}
              disabled
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #2d1e1e", background: "#faf5f5", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Role</label>
            <input
              value={user?.role || ""}
              disabled
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", background: "#f5f5f5", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Email</label>
            <input
              value={user?.email || ""}
              disabled
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", background: "#f5f5f5", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Institution</label>
            <input
              value={form.school}
              onChange={e => setForm({ ...form, school: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", boxSizing: "border-box" }}
            />
          </div>
        </div>
      </div>

      {/* INCIDENT DETAILS */}
      <div className="card" style={{ marginBottom: "15px" }}>
        <h3 style={{ marginTop: 0, color: "#dc3545" }}>🔥 Incident Details</h3>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Disaster Type <span style={{ color: "red" }}>*</span>
            </label>
            <select
              value={form.type}
              onChange={e => setForm({ ...form, type: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", boxSizing: "border-box" }}
            >
              <option value="">-- Select Disaster Type --</option>
              {DISASTER_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Severity Level <span style={{ color: "red" }}>*</span>
            </label>
            <select
              value={form.severity}
              onChange={e => setForm({ ...form, severity: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", boxSizing: "border-box" }}
            >
              <option value="">-- Select Severity --</option>
              {SEVERITY_LEVELS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
            Location / Area <span style={{ color: "red" }}>*</span>
          </label>
          <input
            placeholder="e.g. Chennai, Block-A Campus, Near Library..."
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
            Estimated People Affected / Injured
          </label>
          <input
            placeholder="e.g. 5 injured, 50 evacuated..."
            value={form.injured}
            onChange={e => setForm({ ...form, injured: e.target.value })}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
            Incident Description <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            placeholder="Describe what happened, current situation, immediate needs, actions taken so far..."
            value={form.desc}
            onChange={e => setForm({ ...form, desc: e.target.value })}
            rows={5}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", resize: "vertical", boxSizing: "border-box", fontFamily: "Arial" }}
          />
        </div>
      </div>

      {/* SEVERITY BADGE PREVIEW */}
      {form.severity && (
        <div className="card" style={{ marginBottom: "15px" }}>
          <h3 style={{ marginTop: 0 }}>⚠️ Severity Preview</h3>
          <div style={{
            display: "inline-block",
            padding: "10px 25px",
            borderRadius: "25px",
            fontWeight: "bold",
            fontSize: "16px",
            background:
              form.severity === "Critical" ? "#dc3545" :
              form.severity === "High" ? "#fd7e14" :
              form.severity === "Medium" ? "#ffc107" : "#28a745",
            color: form.severity === "Medium" ? "#333" : "white"
          }}>
            {form.severity === "Critical" ? "🔴" :
             form.severity === "High" ? "🟠" :
             form.severity === "Medium" ? "🟡" : "🟢"} {form.severity} Severity
          </div>
        </div>
      )}

      {/* EMERGENCY CONTACTS */}
      <div className="card" style={{ marginBottom: "15px", background: "#fff3cd", border: "1px solid #ffc107" }}>
        <h3 style={{ marginTop: 0, color: "#856404" }}>📞 Emergency Contacts</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", gap: "10px" }}>
          <div style={{ textAlign: "center" }}>🚑 <b>Ambulance</b><br />108</div>
          <div style={{ textAlign: "center" }}>🚓 <b>Police</b><br />100</div>
          <div style={{ textAlign: "center" }}>🔥 <b>Fire</b><br />101</div>
          <div style={{ textAlign: "center" }}>📢 <b>Disaster</b><br />1078</div>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={submit}
        disabled={loading}
        style={{
          width: "100%",
          padding: "15px",
          fontSize: "18px",
          fontWeight: "bold",
          background: loading ? "#e9dada" : "linear-gradient(135deg, #dc3545, #ff6b6b)",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: loading ? "not-allowed" : "pointer"
        }}
      >
        {loading ? "⏳ Submitting..." : "🚨 Submit Disaster Report"}
      </button>

    </div>
  );
}