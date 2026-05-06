import { useState, useEffect, useRef, useCallback } from "react";
import { getWeather } from "../services/api";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ─── Map recenter helper ────────────────────────────────────────────────────
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 8, { duration: 1.4 });
  }, [position]);
  return null;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const INDIA_HIGH_RISK_ZONES = [
  { name: "Odisha Coast", lat: 20.2961, lon: 85.8245, risk: "Cyclone", level: "Extreme" },
  { name: "Uttarakhand", lat: 30.0668, lon: 79.0193, risk: "Earthquake", level: "High" },
  { name: "Assam Valley", lat: 26.2006, lon: 92.9376, risk: "Flood", level: "High" },
  { name: "Mumbai Coast", lat: 19.076, lon: 72.8777, risk: "Flood", level: "High" },
  { name: "Andaman Islands", lat: 11.7401, lon: 92.6586, risk: "Tsunami", level: "Extreme" },
  { name: "Rajasthan Desert", lat: 27.0238, lon: 74.2179, risk: "Heatwave", level: "High" },
  { name: "Chennai Coast", lat: 13.0827, lon: 80.2707, risk: "Cyclone", level: "High" },
];

const DRILL_SCENARIOS = [
  {
    id: "earthquake",
    title: "Earthquake Drill",
    color: "#c84b31",
    bg: "#fff5f2",
    steps: [
      { time: 0, action: "ALERT: Seismic activity detected!", type: "alert" },
      { time: 3, action: "DROP to the ground immediately. Protect your head and neck.", type: "action" },
      { time: 8, action: "COVER under a sturdy desk or table. Hold on tightly.", type: "action" },
      { time: 15, action: "HOLD ON until shaking stops. Do not run.", type: "action" },
      { time: 25, action: "Shaking has stopped. Check for injuries around you.", type: "check" },
      { time: 32, action: "Evacuate building using STAIRS ONLY. No elevators.", type: "evacuate" },
      { time: 40, action: "Move to designated Assembly Point. Report to coordinator.", type: "assembly" },
      { time: 50, action: "Drill Complete. Await all-clear from NDRF team.", type: "complete" },
    ],
    emergencyNumber: "112",
    ndmaGuideline: "Drop, Cover, Hold On — NDMA Protocol EQ-1"
  },
  {
    id: "flood",
    title: "Flood Evacuation Drill",
    color: "#1565c0",
    bg: "#f0f7ff",
    steps: [
      { time: 0, action: "ALERT: Flood warning issued by CWC. Water rising.", type: "alert" },
      { time: 3, action: "Shut off electricity at main switch immediately.", type: "action" },
      { time: 8, action: "Collect emergency kit: water, food, medicines, documents.", type: "action" },
      { time: 15, action: "Move to upper floors or roof. Do NOT enter floodwater.", type: "action" },
      { time: 22, action: "Signal rescue teams using flashlight or bright cloth.", type: "check" },
      { time: 30, action: "Await NDRF rescue boats. Do not attempt to swim.", type: "evacuate" },
      { time: 45, action: "Evacuate to designated flood shelter. Register with coordinator.", type: "assembly" },
      { time: 55, action: "Drill Complete. Review flood safety protocols.", type: "complete" },
    ],
    emergencyNumber: "112",
    ndmaGuideline: "NDMA Flood Protocol FL-3 — Never walk in moving water"
  },
  {
    id: "fire",
    title: "Fire Evacuation Drill",
    color: "#e65100",
    bg: "#fff8f0",
    steps: [
      { time: 0, action: "ALERT: Fire alarm activated! Smoke detected in building.", type: "alert" },
      { time: 3, action: "Alert others. Do NOT use elevators under any circumstance.", type: "action" },
      { time: 7, action: "Feel doors before opening. Hot door = fire behind it.", type: "action" },
      { time: 12, action: "CRAWL LOW below smoke. Air is cleaner near the floor.", type: "action" },
      { time: 18, action: "Exit using nearest staircase. Close doors behind you.", type: "evacuate" },
      { time: 26, action: "Move to Assembly Point. Do NOT re-enter the building.", type: "assembly" },
      { time: 35, action: "Report all persons to coordinator. Call 101.", type: "check" },
      { time: 45, action: "Drill Complete. All staff accounted for.", type: "complete" },
    ],
    emergencyNumber: "101",
    ndmaGuideline: "NDMA Fire Protocol FR-2 — RACE: Rescue, Alarm, Contain, Evacuate"
  },
  {
    id: "cyclone",
    title: "Cyclone Shelter Drill",
    color: "#4527a0",
    bg: "#f5f2ff",
    steps: [
      { time: 0, action: "ALERT: IMD issues Cyclone Warning. Category 3 approaching.", type: "alert" },
      { time: 4, action: "Secure all outdoor equipment and loose objects immediately.", type: "action" },
      { time: 10, action: "Disconnect electrical appliances. Fill water containers.", type: "action" },
      { time: 18, action: "Move to designated cyclone shelter. Bring emergency kit.", type: "evacuate" },
      { time: 28, action: "Stay away from windows. Lie flat if roof lifted.", type: "action" },
      { time: 40, action: "Beware: eye of cyclone is calm but storm WILL resume.", type: "check" },
      { time: 52, action: "Wait for ALL-CLEAR from IMD before emerging.", type: "assembly" },
      { time: 60, action: "Drill Complete. Cyclone preparedness confirmed.", type: "complete" },
    ],
    emergencyNumber: "112",
    ndmaGuideline: "IMD Cyclone Protocol CY-1 — Stay indoors through entire event"
  },
];

const EMERGENCY_CONTACTS = [
  { name: "National Emergency", number: "112", icon: "🚨", color: "#c62828" },
  { name: "Fire Services", number: "101", icon: "🔥", color: "#e65100" },
  { name: "Ambulance", number: "108", icon: "🚑", color: "#1565c0" },
  { name: "Police", number: "100", icon: "👮", color: "#1b5e20" },
  { name: "NDRF Helpline", number: "011-24363260", icon: "🛡️", color: "#4527a0" },
  { name: "Disaster Mgmt", number: "1070", icon: "⚠️", color: "#e65100" },
  { name: "Women Helpline", number: "1091", icon: "👩", color: "#880e4f" },
  { name: "Child Helpline", number: "1098", icon: "🧒", color: "#004d40" },
];

// ─── Disaster detection ───────────────────────────────────────────────────────
const detectDisaster = (d) => {
  const temp = d.temp;
  const cond = (d.condition || "").toLowerCase();
  if (cond.includes("rain") && temp < 30) return { type: "Flood", label: "Flood Risk", icon: "🌊", color: "#1565c0", severity: "High", circleColor: "#1565c0" };
  if (temp > 40) return { type: "Heatwave", label: "Severe Heatwave", icon: "☀️", color: "#c62828", severity: "Extreme", circleColor: "#f44336" };
  if (temp > 37) return { type: "Heatwave", label: "Heatwave Alert", icon: "🌡️", color: "#e65100", severity: "High", circleColor: "#ff7043" };
  if (cond.includes("smoke") || cond.includes("haze")) return { type: "Fire", label: "Fire/Smoke Hazard", icon: "🔥", color: "#e65100", severity: "High", circleColor: "#ff5722" };
  if (cond.includes("storm") || cond.includes("thunder")) return { type: "Cyclone", label: "Storm Warning", icon: "🌀", color: "#4527a0", severity: "High", circleColor: "#7c4dff" };
  if (cond.includes("cyclone") || cond.includes("hurricane")) return { type: "Cyclone", label: "Cyclone Alert", icon: "🌀", color: "#4527a0", severity: "Extreme", circleColor: "#4527a0" };
  if (cond.includes("flood")) return { type: "Flood", label: "Flood Alert", icon: "🌊", color: "#1565c0", severity: "Extreme", circleColor: "#0d47a1" };
  return { type: "Normal", label: "Normal Conditions", color: "#2e7d32", severity: "Low", circleColor: "#43a047" };
};

const generateGuidelines = (disasterType) => {
  const map = {
    Flood: ["Move to higher ground immediately", "Avoid flooded roads — 15cm moving water can knock you over", "Shut off electricity at main switchboard", "Keep 72-hour emergency kit ready", "Follow CWC flood alerts on All India Radio"],
    Heatwave: ["Stay hydrated — drink water every 20 minutes", "Avoid outdoor activity between 11am–4pm", "Wear loose, light-coloured cotton clothing", "Use ORS if symptoms of heat exhaustion appear", "Check on elderly neighbours and young children"],
    Fire: ["Use PASS technique for fire extinguisher: Pull, Aim, Squeeze, Sweep", "Crawl low below smoke towards exits", "Feel doors before opening — hot door = fire on other side", "Use stairs only — never elevators", "Call 101 Fire Services immediately"],
    Cyclone: ["Move to designated cyclone shelter 24–48 hrs before landfall", "Secure all outdoor objects — they become projectiles", "Stay away from windows and glass", "Do not go outside during the calm eye — storm will resume", "Wait for IMD all-clear before emerging"],
    Normal: ["Review your school's emergency evacuation plan", "Ensure your emergency contact list is updated", "Participate in the next NDMA school safety drill", "Know your nearest disaster shelter location"],
  };
  return map[disasterType] || map.Normal;
};

const calculatePreparednessScore = (disaster) => {
  const scores = { Flood: 82, Heatwave: 68, Fire: 74, Cyclone: 85, Normal: 45 };
  return scores[disaster.type] || 45;
};

// ─── BADGE SYSTEM ─────────────────────────────────────────────────────────────
const getBadge = (points) => {
  if (points >= 200) return { label: "Disaster Master", icon: "🏆", color: "#f9a825" };
  if (points >= 100) return { label: "NDRF Ally", icon: "🥇", color: "#c62828" };
  if (points >= 60) return { label: "Safety Expert", icon: "⚡", color: "#4527a0" };
  if (points >= 30) return { label: "Responder", icon: "🔵", color: "#1565c0" };
  return { label: "Beginner", icon: "🟢", color: "#2e7d32" };
};

// ─── STYLES ───────────────────────────────────────────────────────────────────
const S = {
  root: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    background: "#d3ddf3",
    minHeight: "100vh",
    color: "#111827",
  },

  topBar: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "14px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logoText: {
    fontSize: "17px",
    fontWeight: "800",
    color: "#2e394f",
  },

  logoSub: {
    fontSize: "11px",
    color: "#68696c",
  },

  badgeChip: (color) => ({
    background: `${color}22`,
    border: `1px solid ${color}55`,
    color: color,
    borderRadius: "20px",
    padding: "4px 12px",
    fontSize: "12px",
    fontWeight: "700",
  }),

  mainGrid: {
    display: "grid",
    gridTemplateColumns: "340px 1fr",
    height: "calc(100vh - 57px)",
  },

  sidebar: {
    background: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    overflowY: "auto",
  },

  sideSection: {
    borderBottom: "1px solid #f1f5f9",
    padding: "18px 20px",
  },

  sideSectionTitle: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#222325",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "12px",
  },

  searchInput: {
    width: "100%",
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
  },

  analyzeBtn: {
    width: "100%",
    padding: "11px",
    borderRadius: "8px",
    background: "#22c55e",
    color: "#fff",
    fontWeight: "700",
    border: "none",
  },

  statGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  },

  statCard: (color) => ({
    background: "#ffffff",
    border: `1px solid ${color}33`,
    borderRadius: "8px",
    padding: "10px",
    textAlign: "center",
  }),

  statNum: (color) => ({
    fontSize: "20px",
    fontWeight: "800",
    color,
  }),

  statLabel: {
    fontSize: "10px",
    color: "#6b7280",
  },

  alertCard: (color) => ({
    background: "#ffffff",
    border: `1px solid ${color}55`,
    borderRadius: "10px",
    padding: "14px",
  }),

  alertTitle: (color) => ({
    display: "flex",
    gap: "6px",
    fontWeight: "700",
    color,
    marginBottom: "8px",
  }),

  guidelineItem: {
    fontSize: "12px",
    color: "#374151",
    marginBottom: "5px",
  },

  drillBtn: (active, color) => ({
    padding: "8px",
    borderRadius: "8px",
    border: `1px solid ${active ? color : "#e5e7eb"}`,
    background: active ? `${color}22` : "#ffffff",
    color: active ? color : "#374151",
    width: "100%",
    marginBottom: "5px",
  }),

  drillStep: () => ({
    padding: "8px",
    borderLeft: "3px solid #ccc",
    marginBottom: "5px",
    background: "#f9fafb",
  }),

  liveStep: () => ({
    padding: "10px",
    border: "1px solid #22c55e",
    background: "#ecfdf5",
    marginBottom: "5px",
  }),

  startDrillBtn: (color) => ({
    width: "100%",
    padding: "10px",
    background: color,
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    marginTop: "10px",
  }),

  stopBtn: {
    width: "100%",
    padding: "10px",
    background: "#ef4444",
    color: "#fff",
    borderRadius: "8px",
    border: "none",
    marginTop: "10px",
  },

  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
  },

  contactCard: (color) => ({
    background: "#ffffff",
    border: `1px solid ${color}55`,
    borderRadius: "8px",
    padding: "10px",
    textDecoration: "none",
  }),

  contactNum: (color) => ({
    color,
    fontWeight: "700",
  }),

  contactName: {
    color: "#6b7280",
    fontSize: "11px",
  },

  mapWrapper: {
    position: "relative",
    height: "100%",
  },

  mapOverlay: {
    position: "absolute",
    top: "12px",
    left: "12px",
    zIndex: 1000,
  },

  mapChip: (bg, color) => ({
    background: bg,
    border: `1px solid ${color}`,
    padding: "6px 10px",
    borderRadius: "6px",
    marginBottom: "5px",
  }),

  mapLegend: {
    position: "absolute",
    bottom: "20px",
    right: "10px",
    background: "#ffffff",
    padding: "10px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
  },

  legendTitle: {
    fontSize: "12px",
    color: "#6b7280",
  },

  legendItem: () => ({
    display: "flex",
    gap: "6px",
    fontSize: "11px",
  }),

  legendDot: (color) => ({
    width: "10px",
    height: "10px",
    background: color,
    borderRadius: "50%",
  }),

  progressBar: {
    height: "5px",
    background: "#e5e7eb",
    borderRadius: "5px",
  },

  progressFill: (pct, color) => ({
    height: "100%",
    width: `${pct}%`,
    background: color,
  }),
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function Map() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [position, setPosition] = useState([20.5937, 78.9629]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Gamification
  const [points, setPoints] = useState(0);
  const [checkins, setCheckins] = useState(0);

  // Drill state
  const [activeDrillId, setActiveDrillId] = useState(null);
  const [drillRunning, setDrillRunning] = useState(false);
  const [drillStepIndex, setDrillStepIndex] = useState(0);
  const [drillTimerDisplay, setDrillTimerDisplay] = useState(0);
  const drillIntervalRef = useRef(null);
  const drillSecondsRef = useRef(0);

  // Active tab for sidebar sections
  const [activeTab, setActiveTab] = useState("intelligence"); // intelligence | drill | contacts

  const badge = getBadge(points);
  const activeDrill = DRILL_SCENARIOS.find(d => d.id === activeDrillId);

  // ── Fetch weather & analyze ──────────────────────────────────────────────
  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await getWeather({ city });
      const d = res.data;
      const disaster = detectDisaster(d);
      const guidelines = generateGuidelines(disaster.type);
      const score = calculatePreparednessScore(disaster);

      const geo = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)},India`
      ).then(r => r.json());

      if (geo && geo.length > 0) {
        setPosition([parseFloat(geo[0].lat), parseFloat(geo[0].lon)]);
      }

      setData({ ...d, disaster, guidelines, score });
      setPoints(p => p + 15);
      setCheckins(c => c + 1);
    } catch (err) {
      setError("Unable to fetch weather data. Please check the city name or API connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  // ── Drill engine ─────────────────────────────────────────────────────────
  const startDrill = useCallback((drillId) => {
    if (drillIntervalRef.current) clearInterval(drillIntervalRef.current);
    setActiveDrillId(drillId);
    setDrillRunning(true);
    setDrillStepIndex(0);
    setDrillTimerDisplay(0);
    drillSecondsRef.current = 0;

    const scenario = DRILL_SCENARIOS.find(d => d.id === drillId);

    drillIntervalRef.current = setInterval(() => {
      drillSecondsRef.current += 1;
      setDrillTimerDisplay(prev => prev + 1);

      const nextStep = scenario.steps.findIndex(s => s.time === drillSecondsRef.current);
      if (nextStep !== -1) {
        setDrillStepIndex(nextStep);
        if (scenario.steps[nextStep].type === "complete") {
          clearInterval(drillIntervalRef.current);
          setDrillRunning(false);
          setPoints(p => p + 30);
        }
      }
    }, 1000);
  }, []);

  const stopDrill = () => {
    if (drillIntervalRef.current) clearInterval(drillIntervalRef.current);
    setDrillRunning(false);
    setDrillStepIndex(0);
    setDrillTimerDisplay(0);
    drillSecondsRef.current = 0;
  };

  useEffect(() => () => clearInterval(drillIntervalRef.current), []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 2px; }
        .leaflet-container { background: #1a2332 !important; }
        .leaflet-tile { filter: brightness(0.7) saturate(0.6); }
        .leaflet-popup-content-wrapper { background: #161b22; border: 1px solid #30363d; color: #e6edf3; border-radius: 8px; }
        .leaflet-popup-tip { background: #161b22; }
        .tab-btn { padding: 7px 14px; border-radius: 6px; border: none; cursor: pointer; font-size: 12px; font-weight: 700; transition: all 0.18s; letter-spacing: 0.3px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .pulse { animation: pulse 1.5s ease-in-out infinite; }
      `}</style>

      {/* ── TOP BAR ── */}
      <div style={S.topBar}>
        <div style={S.logo}>
          <span style={{ fontSize: "22px" }}>🛡️</span>
          <div>
            <div style={S.logoText}>SafeLearn India — Disaster Intelligence</div>
            <div style={S.logoSub}>Real-time Risk · Virtual Drills · NDMA Aligned</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={S.badgeChip(badge.color)}>{badge.icon} {badge.label}</span>
          <span style={{ fontSize: "12px", color: "#8b949e" }}>⭐ {points} pts</span>
          <span style={{ fontSize: "12px", color: "#8b949e" }}>📍 {checkins} areas checked</span>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div style={S.mainGrid}>

        {/* ══ SIDEBAR ══ */}
        <div style={S.sidebar}>

          {/* Tab nav */}
          <div style={{ padding: "12px 14px", borderBottom: "1px solid #21262d", display: "flex", gap: "6px" }}>
            {[
              { key: "intelligence", label: "Intelligence" },
              { key: "drill", label: " Drill" },
              { key: "contacts", label: "Contacts" },
            ].map(t => (
              <button
                key={t.key}
                className="tab-btn"
                style={{
                  background: activeTab === t.key ? "#238636" : "#21262d",
                  color: activeTab === t.key ? "#fff" : "#8b949e",
                  flex: 1,
                }}
                onClick={() => setActiveTab(t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ─── INTELLIGENCE TAB ─── */}
          {activeTab === "intelligence" && (
            <>
              {/* Search */}
              <div style={S.sideSection}>
                <div style={S.sideSectionTitle}>Area Analysis</div>
                <input
                  style={S.searchInput}
                  placeholder="Enter city or district (e.g. Bhubaneswar)"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button style={S.analyzeBtn} onClick={fetchWeather} disabled={loading}>
                  {loading ? "⏳ Analyzing..." : "Analyze Risk Level"}
                </button>
                {error && <div style={{ fontSize: "12px", color: "#f85149", marginTop: "8px" }}>{error}</div>}
              </div>

              {/* Stats */}
              <div style={S.sideSection}>
                <div style={S.sideSectionTitle}>Preparedness Dashboard</div>
                <div style={S.statGrid}>
                  <div style={S.statCard("#2ea043")}>
                    <div style={S.statNum("#2ea043")}>{points}</div>
                    <div style={S.statLabel}>Points Earned</div>
                  </div>
                  <div style={S.statCard("#388bfd")}>
                    <div style={S.statNum("#388bfd")}>{checkins}</div>
                    <div style={S.statLabel}>Areas Checked</div>
                  </div>
                  <div style={S.statCard("#f0883e")}>
                    <div style={S.statNum("#f0883e")}>{data ? data.score : "--"}%</div>
                    <div style={S.statLabel}>Risk Score</div>
                  </div>
                  <div style={S.statCard("#d2a8ff")}>
                    <div style={S.statNum("#d2a8ff")}>{INDIA_HIGH_RISK_ZONES.length}</div>
                    <div style={S.statLabel}>Risk Zones</div>
                  </div>
                </div>
                {data && (
                  <div style={{ marginTop: "12px" }}>
                    <div style={{ fontSize: "11px", color: "#8b949e", marginBottom: "4px" }}>
                      Risk Level: {data.score}%
                    </div>
                    <div style={S.progressBar}>
                      <div style={S.progressFill(data.score, data.disaster.color)} />
                    </div>
                  </div>
                )}
              </div>

              {/* Result */}
              {data && (
                <div style={S.sideSection}>
                  <div style={S.sideSectionTitle}>Current Analysis — {data.city || city}</div>
                  <div style={S.alertCard(data.disaster.color)}>
                    <div style={S.alertTitle(data.disaster.color)}>
                      <span>{data.disaster.icon}</span>
                      <span>{data.disaster.label}</span>
                      <span style={{
                        marginLeft: "auto",
                        fontSize: "10px",
                        background: `${data.disaster.color}33`,
                        padding: "2px 8px",
                        borderRadius: "10px",
                      }}>
                        {data.disaster.severity}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#8b949e", marginBottom: "10px" }}>
                      <span>{data.temp}°C</span>
                      <span>{data.condition}</span>
                    </div>
                    <div style={{ fontSize: "11px", fontWeight: "700", color: "#8b949e", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
                      NDMA Safety Guidelines
                    </div>
                    {data.guidelines.map((g, i) => (
                      <div key={i} style={S.guidelineItem}>
                        <span style={{ color: data.disaster.color, flexShrink: 0, marginTop: "1px" }}>▸</span>
                        <span>{g}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* National Risk Zones */}
              <div style={S.sideSection}>
                <div style={S.sideSectionTitle}>India High-Risk Zones</div>
                {INDIA_HIGH_RISK_ZONES.map((z, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 0",
                      borderBottom: i < INDIA_HIGH_RISK_ZONES.length - 1 ? "1px solid #21262d" : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setPosition([z.lat, z.lon])}
                  >
                    <div>
                      <div style={{ fontSize: "13px", color: "#4de1cb", fontWeight: "600" }}>{z.name}</div>
                      <div style={{ fontSize: "11px", color: "#8b949e" }}>{z.risk}</div>
                    </div>
                    <span style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      padding: "3px 8px",
                      borderRadius: "10px",
                      background: z.level === "Extreme" ? "#c6282822" : "#e6510022",
                      color: z.level === "Extreme" ? "#f85149" : "#f0883e",
                    }}>
                      {z.level}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ─── DRILL TAB ─── */}
          {activeTab === "drill" && (
            <>
              <div style={S.sideSection}>
                <div style={S.sideSectionTitle}>Virtual Emergency Drills</div>
                <div style={{ fontSize: "12px", color: "#8b949e", marginBottom: "12px", lineHeight: "1.5" }}>
                  Select a drill scenario to run a step-by-step virtual simulation aligned with NDMA protocols. Each completed drill earns 30 points.
                </div>

                {DRILL_SCENARIOS.map(scenario => (
                  <button
                    key={scenario.id}
                    style={S.drillBtn(activeDrillId === scenario.id, scenario.color)}
                    onClick={() => {
                      if (activeDrillId !== scenario.id) {
                        stopDrill();
                        setActiveDrillId(scenario.id);
                        setDrillRunning(false);
                        setDrillStepIndex(0);
                      }
                    }}
                  >
                    {scenario.icon} {scenario.title}
                  </button>
                ))}
              </div>

              {activeDrill && (
                <div style={S.sideSection}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: activeDrill.color }}>
                      {activeDrill.icon} {activeDrill.title}
                    </div>
                    {drillRunning && (
                      <span className="pulse" style={{ fontSize: "11px", color: "#f85149", fontWeight: "700" }}>
                        ● LIVE {drillTimerDisplay}s
                      </span>
                    )}
                  </div>

                  <div style={{
                    fontSize: "11px",
                    background: `${activeDrill.color}15`,
                    border: `1px solid ${activeDrill.color}33`,
                    borderRadius: "6px",
                    padding: "6px 10px",
                    color: activeDrill.color,
                    marginBottom: "10px",
                    lineHeight: "1.4",
                  }}>
                    📋 {activeDrill.ndmaGuideline}
                  </div>

                  {/* Steps preview / live */}
                  <div style={{ maxHeight: "260px", overflowY: "auto" }}>
                    {drillRunning
                      ? activeDrill.steps.slice(0, drillStepIndex + 1).map((step, i) => (
                        <div key={i} style={i === drillStepIndex ? S.liveStep(step.type) : { ...S.drillStep(step.type), opacity: 0.5 }}>
                          {i === drillStepIndex ? "▶ " : "✓ "}{step.action}
                        </div>
                      ))
                      : activeDrill.steps.map((step, i) => (
                        <div key={i} style={S.drillStep(step.type)}>
                          <span style={{ color: "#8b949e", fontSize: "10px", marginRight: "6px" }}>+{step.time}s</span>
                          {step.action}
                        </div>
                      ))
                    }
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    {!drillRunning ? (
                      <button style={S.startDrillBtn(activeDrill.color)} onClick={() => startDrill(activeDrill.id)}>
                        ▶ Start Live Drill
                      </button>
                    ) : (
                      <button style={S.stopBtn} onClick={stopDrill}>⏹ Stop Drill</button>
                    )}
                  </div>

                  <div style={{ fontSize: "11px", color: "#8b949e", marginTop: "8px", textAlign: "center" }}>
                    Emergency: {activeDrill.emergencyNumber}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ─── CONTACTS TAB ─── */}
          {activeTab === "contacts" && (
            <div style={S.sideSection}>
              <div style={S.sideSectionTitle}>Emergency Contacts India</div>
              <div style={{ fontSize: "12px", color: "#8b949e", marginBottom: "12px", lineHeight: "1.5" }}>
                Tap any number to call. These are official government helplines operational 24/7.
              </div>
              <div style={S.contactGrid}>
                {EMERGENCY_CONTACTS.map((c, i) => (
                  <a
                    key={i}
                    href={`tel:${c.number}`}
                    style={S.contactCard(c.color)}
                  >
                    <div style={{ fontSize: "18px", marginBottom: "4px" }}>{c.icon}</div>
                    <div style={S.contactNum(c.color)}>{c.number}</div>
                    <div style={S.contactName}>{c.name}</div>
                  </a>
                ))}
              </div>

              <div style={{ marginTop: "16px", background: "#cfdff7", border: "1px solid #30363d", borderRadius: "8px", padding: "12px" }}>
                <div style={{ fontSize: "11px", color: "#ff0000", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>Key Agencies</div>
                {[
                  { name: "NDMA — National Disaster Management Authority", url: "https://ndma.gov.in" },
                  { name: "IMD — India Meteorological Department", url: "https://mausam.imd.gov.in" },
                  { name: "CWC — Central Water Commission (Floods)", url: "https://cwc.gov.in" },
                  { name: "NDRF — National Disaster Response Force", url: "https://ndrf.gov.in" },
                ].map((a, i) => (
                  <div key={i} style={{ fontSize: "12px", color: "#2e0a0a", marginBottom: "5px", lineHeight: "1.4" }}>
                    ↗ {a.name}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ══ MAP ══ */}
        <div style={S.mapWrapper}>
          <MapContainer
            center={position}
            zoom={5}
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RecenterMap position={position} />

            {/* Analyzed city marker */}
            {data && (
              <>
                <Marker position={position}>
                  <Popup>
                    <div style={{ fontFamily: "DM Sans, sans-serif", minWidth: "180px" }}>
                      <div style={{ fontWeight: "800", fontSize: "14px", marginBottom: "6px" }}>
                        {data.disaster.icon} {data.city || city}
                      </div>
                      <div style={{ fontSize: "12px", marginBottom: "3px" }}>🌦 {data.condition}</div>
                      <div style={{ fontSize: "12px", marginBottom: "3px" }}>🌡 {data.temp}°C</div>
                      <div style={{ fontSize: "12px", color: data.disaster.color, fontWeight: "700" }}>⚠ {data.disaster.label}</div>
                      <div style={{ fontSize: "11px", color: "#8b949e", marginTop: "5px" }}>Risk Score: {data.score}%</div>
                    </div>
                  </Popup>
                </Marker>
                <Circle
                  center={position}
                  radius={60000}
                  pathOptions={{ color: data.disaster.circleColor, fillColor: data.disaster.circleColor, fillOpacity: 0.12, weight: 2 }}
                />
              </>
            )}

            {/* India risk zone markers */}
            {INDIA_HIGH_RISK_ZONES.map((z, i) => {
              const riskColors = { Cyclone: "#3104ae", Earthquake: "#f0883e", Flood: "#297ef5", Tsunami: "#f85149", Heatwave: "#c62828" };
              const col = riskColors[z.risk] || "#fd0707";
              return (
                <Circle
                  key={i}
                  center={[z.lat, z.lon]}
                  radius={z.level === "Extreme" ? 80000 : 50000}
                  pathOptions={{ color: col, fillColor: col, fillOpacity: 0.08, weight: 1, dashArray: "4 4" }}
                >
                  <Popup>
                    <div style={{ fontFamily: "DM Sans, sans-serif" }}>
                      <div style={{ fontWeight: "700", marginBottom: "4px" }}>{z.name}</div>
                      <div style={{ fontSize: "12px", color: col }}>⚠ {z.risk} Zone</div>
                      <div style={{ fontSize: "11px", color: "#9a9e8b" }}>Level: {z.level}</div>
                    </div>
                  </Popup>
                </Circle>
              );
            })}
          </MapContainer>

          {/* Map overlay chips */}
          <div style={S.mapOverlay}>
            {data && (
              <div style={S.mapChip("rgba(13,17,23,0.88)", data.disaster.color)}>
                {data.disaster.icon} {data.disaster.label} — {city}
              </div>
            )}
            {drillRunning && (
              <div className="pulse" style={S.mapChip("rgba(198,40,40,0.9)", "#ffcdd2")}>
                DRILL ACTIVE: {activeDrill?.title}
              </div>
            )}
            <div style={S.mapChip("rgba(222, 230, 242, 0.78)", "#8b949e")}>
              India Disaster Risk Map
            </div>
          </div>

          {/* Legend */}
          <div style={S.mapLegend}>
            <div style={S.legendTitle}>Map Legend</div>
            {[
              { color: "#7c4dff", label: "Cyclone Zone" },
              { color: "#f0883e", label: "Earthquake Zone" },
              { color: "#388bfd", label: "Flood Zone" },
              { color: "#f85149", label: "Tsunami Zone" },
              { color: "#c62828", label: "Heatwave Zone" },
            ].map((l, i) => (
              <div key={i} style={S.legendItem(l.color)}>
                <div style={S.legendDot(l.color)} />
                {l.label}
              </div>
            ))}
            <div style={{ marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #30363d", fontSize: "10px", color: "#8b949e" }}>
              Source: NDMA · IMD · CWC
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}