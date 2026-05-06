import { useState } from "react";

const CONTACTS = [
  {
    id: "ambulance",
    label: "Medical Emergency",
    name: "Ambulance",
    number: "108",
    desc: "EMRI — Emergency Medical Response India",
    color: "#E24B4A",
    bg: "#FCEBEB",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#E24B4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92V19.92C22 20.48 21.7 21 21.22 21.28C19.04 22.42 16.52 23 14 23C7.37 23 2 17.63 2 11C2 8.48 2.58 5.96 3.72 3.78C4 3.3 4.52 3 5.08 3H8.08C8.58 3 9.02 3.32 9.16 3.8L10.36 7.8C10.52 8.32 10.3 8.88 9.84 9.18L8.26 10.18C9.64 13.26 12.74 16.36 15.82 17.74L16.82 16.16C17.12 15.7 17.68 15.48 18.2 15.64L22.2 16.84C22.68 16.98 23 17.42 22 17.92Z" />
      </svg>
    ),
  },
  {
    id: "police",
    label: "Law Enforcement",
    name: "Police",
    number: "100",
    desc: "National emergency police response",
    color: "#185FA5",
    bg: "#E6F1FB",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C9 2 7 4 7 7v3H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-2V7c0-3-2-5-5-5z" />
        <line x1="12" y1="14" x2="12" y2="17" />
        <circle cx="12" cy="13" r="0.5" fill="#185FA5" />
      </svg>
    ),
  },
  {
    id: "fire",
    label: "Fire & Rescue",
    name: "Fire Brigade",
    number: "101",
    desc: "Fire, rescue & hazardous material response",
    color: "#D85A30",
    bg: "#FAECE7",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#D85A30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C9.5 4 7 8 7 12a5 5 0 0 0 10 0c0-2-1-4-2.5-5.5C14 8 13 10 12 10c-1 0-1.5-1-1.5-2.5C10.5 5 11 3 12 2z" />
        <path d="M9 17a3 3 0 0 0 6 0" />
      </svg>
    ),
  },
  {
    id: "disaster",
    label: "Disaster Management",
    name: "NDMA Helpline",
    number: "1078",
    desc: "Earthquakes, floods, cyclones & all disasters",
    color: "#1D9E75",
    bg: "#E1F5EE",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "women",
    label: "Women's Safety",
    name: "Women Helpline",
    number: "1091",
    desc: "National women safety & distress support",
    color: "#7F77DD",
    bg: "#EEEDFE",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M12 12v8" />
        <path d="M9 18h6" />
      </svg>
    ),
  },
  {
    id: "child",
    label: "Child Safety",
    name: "Child Helpline",
    number: "1098",
    desc: "Childline India — support for children in need",
    color: "#BA7517",
    bg: "#FAEEDA",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#BA7517" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
];

const TIPS = [
  { color: "#E24B4A", number: "108", text: "Injury, unconsciousness, breathing difficulty, or any life-threatening condition" },
  { color: "#185FA5", number: "100", text: "Crime in progress, theft, violence, missing person, or civil unrest" },
  { color: "#D85A30", number: "101", text: "Fire, gas leak, entrapment, building collapse, or chemical hazard" },
  { color: "#1D9E75", number: "1078", text: "Earthquakes, floods, cyclones, landslides or any natural disaster event" },
];

export default function Emergency() {
  const [hovered, setHovered] = useState(null);

  return (
    <div style={styles.container}>

      {/* ── CSS scope reset: stop App.css button/a styles bleeding in ── */}
      <style>{`
        .em-scope a {
          text-decoration: none;
          color: inherit;
        }
        .em-scope * {
          box-sizing: border-box;
        }
      `}</style>

      <div className="em-scope">

        {/* Header */}
        <div style={styles.headerBar}>
          <div>
            <h2 style={styles.title}>📞 Emergency Contacts</h2>
            <div style={styles.subtitle}>India — National helplines & disaster response</div>
          </div>
          <div style={styles.liveBadge}>
            <span style={styles.pulse} />
            Available 24/7
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div style={styles.grid}>
          {CONTACTS.map((c) => (
            <a
              key={c.id}
              href={`tel:${c.number}`}
              style={{
                ...styles.card,
                transform: hovered === c.id ? "translateY(-3px)" : "none",
                boxShadow:
                  hovered === c.id
                    ? "0 6px 20px rgba(0,0,0,0.12)"
                    : "0 2px 8px rgba(0,0,0,0.07)",
              }}
              onMouseEnter={() => setHovered(c.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Left accent bar */}
              <div style={{ ...styles.accentBar, background: c.color }} />

              {/* Icon box */}
              <div style={{ ...styles.iconBox, background: c.bg }}>
                {c.icon}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div style={styles.cardLabel}>{c.label}</div>
                <div style={styles.cardName}>{c.name}</div>
                <div style={styles.cardDesc}>{c.desc}</div>
              </div>

              {/* Number */}
              <div style={{ ...styles.number, color: c.color }}>{c.number}</div>
            </a>
          ))}
        </div>

        {/* When to call section */}
        <div style={styles.sectionLabel}>When to call — quick guide</div>
        <div style={styles.tipsGrid}>
          {TIPS.map((t) => (
            <div key={t.number} style={styles.tip}>
              <div style={{ ...styles.tipDot, background: t.color }} />
              <div style={styles.tipText}>
                <strong style={{ color: "#1a1a2e" }}>{t.number}</strong> — {t.text}
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={styles.footer}>
          <span style={{ ...styles.pulse, background: "#1D9E75", marginTop: "4px" }} />
          <div style={styles.footerText}>
            All numbers are <strong>toll-free</strong> and available 24 hours, 7 days a week
            across India. In disaster scenarios, call <strong>1078</strong> first — they
            coordinate across all emergency services.
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  container: {
    padding: "24px 20px",
    fontFamily: "'Poppins', Arial, sans-serif",
  },
  headerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e8edf3",
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1a1a2e",
    margin: 0,
  },
  subtitle: {
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "3px",
  },
  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#6b7280",
    background: "#f4f7fb",
    padding: "5px 10px",
    borderRadius: "20px",
  },
  pulse: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#E24B4A",
    flexShrink: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
    gap: "12px",
    marginBottom: "24px",
  },
  card: {
    background: "white",
    borderRadius: "12px",
    padding: "16px 18px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    border: "1px solid #eef1f6",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.2s, box-shadow 0.2s",
    textDecoration: "none",
    color: "inherit",
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px",
  },
  iconBox: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardLabel: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: "2px",
  },
  cardName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#1a1a2e",
    marginBottom: "3px",
  },
  cardDesc: {
    fontSize: "12px",
    color: "#6b7280",
    lineHeight: "1.5",
  },
  number: {
    fontFamily: "'Courier New', monospace",
    fontSize: "28px",
    fontWeight: "700",
    flexShrink: 0,
    letterSpacing: "-0.01em",
  },
  sectionLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: "10px",
  },
  tipsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px",
    marginBottom: "20px",
  },
  tip: {
    background: "#f8fafc",
    borderRadius: "10px",
    padding: "12px 14px",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  tipDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginTop: "5px",
    flexShrink: 0,
  },
  tipText: {
    fontSize: "12px",
    color: "#4b5563",
    lineHeight: "1.55",
  },
  footer: {
    background: "#f0faf6",
    borderRadius: "10px",
    padding: "13px 16px",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    border: "1px solid #d1fae5",
  },
  footerText: {
    fontSize: "12px",
    color: "#374151",
    lineHeight: "1.6",
  },
};