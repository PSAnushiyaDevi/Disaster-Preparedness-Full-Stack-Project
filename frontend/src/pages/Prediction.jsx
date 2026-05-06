import { useState } from "react";
import { getAdvice } from "../services/api";

const RISK_COLORS = {
  "Low Risk":      { bg: "#e6fff2", border: "#34d399", icon: "✅", label: "Low Risk" },
  "Moderate Risk": { bg: "#fffbeb", border: "#fbbf24", icon: "⚠️", label: "Moderate Risk" },
  "High Risk":     { bg: "#fff1f1", border: "#f87171", icon: "🚨", label: "High Risk" },
};

const getRiskStyle = (disaster = "") => {
  if (disaster.toLowerCase().includes("high"))   return RISK_COLORS["High Risk"];
  if (disaster.toLowerCase().includes("moderate")) return RISK_COLORS["Moderate Risk"];
  return RISK_COLORS["Low Risk"];
};

const QUICK_CITIES = ["Chennai", "Mumbai", "Delhi", "Kolkata", "Bengaluru"];

const fallbackData = (city) => ({
  city,
  condition: "Partly Cloudy",
  disaster: "Moderate Risk",
  advice: "Stay alert and follow local safety guidelines. Monitor weather updates from IMD."
});

export default function Prediction() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");

  const check = async (cityName) => {
    const target = cityName || city;
    if (!target.trim()) return;

    setLoading(true);
    setWarning("");
    setResult(null);
    setCity(target);

    try {
      const res = await getAdvice({ city: target });
      if (res?.data) {
        setResult(res.data);
      } else {
        throw new Error("Invalid response");
      }
    } catch {
      setResult(fallbackData(target));
      setWarning("⚠ Live data unavailable — showing simulated risk analysis.");
    } finally {
      setLoading(false);
    }
  };

  const riskStyle = result ? getRiskStyle(result.disaster) : null;

  return (
    <div className="prediction-page">

      <div className="prediction-header">
        <h1>🌦️ Disaster Risk Prediction</h1>
        <p>Enter a city to get real-time weather conditions and disaster risk analysis.</p>
      </div>

      {/* Search */}
      <div className="card prediction-search">
        <input
          placeholder="Enter city name (e.g. Chennai, Mumbai)"
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={e => e.key === "Enter" && check()}
        />
        <button
          onClick={() => check()}
          disabled={loading}
          className="predict-btn"
          type="button"
        >
          {loading ? "Analyzing..." : "Check Risk →"}
        </button>
      </div>

      {/* Quick cities */}
      <div className="quick-cities">
        <span>Quick check:</span>
        {QUICK_CITIES.map((c, i) => (
          <button
            key={i}
            className="city-pill"
            onClick={() => check(c)}
            type="button"
          >
            📍 {c}
          </button>
        ))}
      </div>

      {warning && <div className="prediction-warning">{warning}</div>}

      {/* Result card */}
      {result && (
        <div
          className="card prediction-result"
          style={{
            borderLeft: `5px solid ${riskStyle.border}`,
            background: riskStyle.bg
          }}
        >
          <div className="result-top">
            <div className="result-city">
              <span className="result-icon">{riskStyle.icon}</span>
              <div>
                <h2>📍 {result.city}</h2>
                <span
                  className="risk-badge"
                  style={{ background: riskStyle.border }}
                >
                  {riskStyle.label}
                </span>
              </div>
            </div>
          </div>

          <div className="result-grid">
            <div className="result-item">
              <label>🌦 Weather Condition</label>
              <p>{result.condition}</p>
            </div>
            <div className="result-item">
              <label>⚠️ Disaster Risk</label>
              <p>{result.disaster}</p>
            </div>
            <div className="result-item full-width">
              <label>🛟 Safety Advice</label>
              <p>{result.advice}</p>
            </div>
          </div>
        </div>
      )}

      {/* Info cards */}
      {!result && !loading && (
        <div className="prediction-info-grid">
          <div className="card info-card">
            <div className="info-icon">🌊</div>
            <h3>Flood Risk</h3>
            <p>Analysis of rainfall and water levels in low-lying areas.</p>
          </div>
          <div className="card info-card">
            <div className="info-icon">🌋</div>
            <h3>Seismic Risk</h3>
            <p>Earthquake probability based on geological fault data.</p>
          </div>
          <div className="card info-card">
            <div className="info-icon">🌀</div>
            <h3>Cyclone Risk</h3>
            <p>Coastal storm tracking with real-time wind speed data.</p>
          </div>
        </div>
      )}

    </div>
  );
}