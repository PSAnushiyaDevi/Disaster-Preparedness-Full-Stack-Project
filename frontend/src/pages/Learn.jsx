import { useState, useEffect, useRef } from "react";

// ─── MODULE DATA ──────────────────────────────────────────────────────────────
const modules = [
  {
    id: "flood",
    title: "Flood Preparedness",
    icon: "🌊",
    color: "#1565c0",
    bg: "#e8f4fd",
    accent: "#1976d2",
    tag: "Most Common in India",
    tagColor: "#1565c0",
    level: "Coastal · River Regions · Urban Low-lying Areas",
    readTime: "8 min read",
    difficulty: "Intermediate",
    ndmaRef: "NDMA Flood Protocol FL-1 to FL-5",
    riskStates: ["Assam", "Bihar", "Odisha", "West Bengal", "Kerala", "Uttarakhand"],
    overview: "Floods account for nearly 50% of all disaster-related deaths in India. Advance preparation and knowing when to act can be the difference between life and death.",
    sections: [
      {
        heading: "Before a Flood",
        icon: "📋",
        items: [
          "Monitor CWC (Central Water Commission) and IMD flood bulletins daily during monsoon",
          "Prepare a 72-hour emergency kit: 3 litres water/person/day, dry food, medicines, torch, power bank, cash",
          "Know your nearest flood shelter and the evacuation route to reach it",
          "Keep all important documents (Aadhaar, insurance, bank papers) in a waterproof bag",
          "Move valuable items and electronics to higher floors before water rises",
          "Identify which neighbours need assistance: elderly, disabled, children",
        ]
      },
      {
        heading: "During a Flood",
        icon: "⚡",
        items: [
          "Respond immediately to official evacuation orders — do not delay or wait to see",
          "NEVER walk through moving water — just 15 cm of fast-moving water can knock an adult down",
          "NEVER drive through flooded roads — 30 cm of water can float most vehicles",
          "Switch off electricity at the mains and unplug all appliances before leaving",
          "Move to the highest floor if trapped; signal rescuers with a bright cloth or torch",
          "Do not touch floodwater — it carries sewage, chemicals, and electrical current",
        ]
      },
      {
        heading: "After a Flood",
        icon: "✅",
        items: [
          "Wait for official all-clear before returning home",
          "Boil all water or use sealed bottles — waterborne disease risk is extreme",
          "Document all damage with photos for insurance and government relief claims",
          "Wear rubber boots and gloves when cleaning flood-damaged areas",
          "Watch for signs of structural damage before entering any building",
          "Report missing persons to NDRF helpline: 011-24363260",
        ]
      }
    ],
    drill: {
      title: "5-Minute Flood Evacuation Drill",
      steps: [
        "Teacher announces flood alert — stop all activity immediately",
        "Students collect bags and move in single file to staircase",
        "Exit through ground floor emergency doors (NOT main entrance if waterlogged)",
        "Assemble at designated high-ground muster point on school map",
        "Coordinator takes roll call and accounts for all students and staff",
        "Identify and assist any student who needs support",
      ],
      target: "Complete evacuation in under 5 minutes",
      frequency: "Once per semester — mandatory per NDMA School Safety Programme",
    },
    quiz: [
      { q: "How much fast-moving water can knock down an adult?", options: ["30 cm", "15 cm", "60 cm", "1 metre"], answer: 1 },
      { q: "What should you do first when leaving home during a flood?", options: ["Pack electronics", "Switch off electricity at mains", "Call friends", "Take photos"], answer: 1 },
      { q: "Which water is safe to drink after a flood?", options: ["River water", "Tap water", "Sealed bottled or boiled water", "Rainwater in containers"], answer: 2 },
    ],
    stats: [
      { value: "50%", label: "of disaster deaths in India", color: "#1565c0" },
      { value: "4Mn+", label: "people displaced annually", color: "#1976d2" },
      { value: "72hrs", label: "kit survival window", color: "#1565c0" },
    ]
  },
  {
    id: "fire",
    title: "Fire Emergency Response",
    icon: "🔥",
    color: "#c84b31",
    bg: "#fff5f2",
    accent: "#e64a19",
    tag: "Schools & Labs",
    tagColor: "#c84b31",
    level: "All Educational Institutions · Labs · Hostels",
    readTime: "7 min read",
    difficulty: "Beginner",
    ndmaRef: "National Fire Safety Guidelines · NBC 2016",
    riskStates: ["All States — Urban campuses highest risk"],
    overview: "Fire accidents in schools cause mass casualties primarily due to panic and unfamiliarity with exits. A practiced evacuation drill reduces evacuation time by up to 60%.",
    sections: [
      {
        heading: "Fire Prevention",
        icon: "🛡️",
        items: [
          "Know the location of every fire extinguisher, alarm, and exit in your building",
          "Never block fire exits with furniture, bags, or equipment — even temporarily",
          "Do not overload electrical sockets; report damaged wires to administration immediately",
          "Chemistry labs: store flammable materials in approved cabinets, never near heat",
          "Ensure fire alarms are tested monthly and batteries replaced annually",
          "Check that smoke detectors are installed in labs, kitchens, and server rooms",
        ]
      },
      {
        heading: "During a Fire",
        icon: "⚡",
        items: [
          "Activate the nearest fire alarm pull station immediately upon seeing fire or smoke",
          "Call 101 (Fire Services) — give exact address, floor, and nature of fire",
          "Use PASS method for extinguisher: Pull pin · Aim at base · Squeeze handle · Sweep side to side",
          "If clothes catch fire: STOP moving, DROP to ground, ROLL to smother flames",
          "Crawl LOW below smoke — cleaner air stays within 30 cm of the floor",
          "Feel doors before opening with the BACK of your hand — hot door = fire behind it",
          "NEVER use lifts/elevators — use stairs only, close doors behind you",
        ]
      },
      {
        heading: "Evacuation Protocol",
        icon: "🚪",
        items: [
          "Follow the green 'EXIT' signs — they are illuminated and battery-backed",
          "Walk quickly but do not run — running causes falls and blocks other evacuees",
          "Assemble at your designated muster point and STAY there for roll call",
          "Do not re-enter the building for any reason — report missing persons to coordinator",
          "If trapped: seal gap under door with clothing, signal from window",
          "Cooperate fully with fire brigade — do not interfere with their operations",
        ]
      }
    ],
    drill: {
      title: "3-Minute Fire Evacuation Drill",
      steps: [
        "Fire alarm sounds — teacher shouts 'Fire drill, evacuate now!'",
        "Students leave bags, exit in single file from nearest marked exit",
        "Designated student closes classroom door (slows fire spread)",
        "Move briskly through corridor, descend staircase without crowding",
        "Exit building and walk to muster point — do not block driveways",
        "Teacher marks register — report all present/missing to principal",
      ],
      target: "Full building evacuation in under 3 minutes",
      frequency: "Every term — mandated by National Building Code 2016",
    },
    quiz: [
      { q: "What does PASS stand for in fire extinguisher use?", options: ["Push Aim Spray Stop", "Pull Aim Squeeze Sweep", "Point Apply Squeeze Spray", "Pull Apply Stop Spray"], answer: 1 },
      { q: "Which floor level has the cleanest air during a fire?", options: ["Ceiling level", "Mid-room level", "Near the floor (crawl)", "Outside windows"], answer: 2 },
      { q: "What should you do if a door feels hot before opening?", options: ["Open it quickly", "Break it down", "Do not open it — use another exit", "Pour water on it"], answer: 2 },
    ],
    stats: [
      { value: "3 min", label: "target evacuation time", color: "#c84b31" },
      { value: "60%", label: "faster with practiced drills", color: "#e64a19" },
      { value: "101", label: "Fire Services helpline", color: "#c84b31" },
    ]
  },
  {
    id: "earthquake",
    title: "Earthquake Safety",
    icon: "🌋",
    color: "#6d4c41",
    bg: "#fdf3ef",
    accent: "#795548",
    tag: "Seismic Zones III–V",
    tagColor: "#6d4c41",
    level: "Seismic Zone III · IV · V — 59% of India",
    readTime: "9 min read",
    difficulty: "Intermediate",
    ndmaRef: "NDMA Earthquake Guidelines · IS 1893:2016",
    riskStates: ["J&K", "Himachal Pradesh", "Uttarakhand", "Northeast India", "Gujarat", "Andaman Islands"],
    overview: "59% of India's land area is in moderate-to-severe seismic zones. Unlike floods, earthquakes give zero warning — only practiced muscle memory saves lives.",
    sections: [
      {
        heading: "Before an Earthquake",
        icon: "📋",
        items: [
          "Identify safe spots in every room: under sturdy tables, against interior walls away from windows",
          "Know all exits and practice reaching them in the dark (power cuts during quakes are common)",
          "Secure heavy objects: bookshelves, water heaters, and lab equipment must be wall-anchored",
          "Keep emergency kit accessible at ground level — not in a locked cabinet",
          "Learn to shut off gas, electricity, and water at their main valves",
          "Check if your school building has a BIS-compliant seismic safety certificate",
        ]
      },
      {
        heading: "During Shaking",
        icon: "⚡",
        items: [
          "DROP to hands and knees immediately — this prevents being knocked down",
          "COVER your head and neck with both arms; get under a sturdy table if within reach",
          "HOLD ON until shaking stops completely — average quake lasts 10–30 seconds",
          "If no table: move to an interior wall, away from windows and exterior walls",
          "If outdoors: move to open ground away from buildings, power lines, and trees",
          "If in a vehicle: pull over away from bridges and overpasses, stay inside",
          "NEVER run for exits during shaking — falling is the biggest hazard",
        ]
      },
      {
        heading: "After Shaking Stops",
        icon: "✅",
        items: [
          "Check yourself for injuries before helping others",
          "Evacuate building carefully — watch for falling debris and cracks underfoot",
          "Do NOT use elevators — structural damage may cause them to fail mid-journey",
          "Check for gas leaks (smell), broken wires, and fire before entering rooms",
          "Expect and prepare for aftershocks — sometimes stronger than the main event",
          "Stay away from damaged buildings — call NDRF at 011-24363260 for rescue",
        ]
      }
    ],
    drill: {
      title: "Duck-Cover-Hold + Evacuation Drill",
      steps: [
        "Instructor shouts 'Earthquake!' — all students drop immediately under desks",
        "Hold position for 60 seconds covering head and neck with arms",
        "Instructor signals 'All clear' — students stand and check for injuries",
        "Form single-file line and exit through designated staircase (ground floor first)",
        "Move to open assembly area — minimum 15m from any building",
        "Coordinator takes full roll call; principal contacts district NDMA office",
      ],
      target: "Under desk in 3 seconds · Full evacuation in 4 minutes",
      frequency: "Twice per year — aligned with National School Safety Programme",
    },
    quiz: [
      { q: "What is the correct sequence during an earthquake?", options: ["Run, Hide, Cover", "Drop, Cover, Hold On", "Stand, Cover, Wait", "Jump, Roll, Run"], answer: 1 },
      { q: "After an earthquake stops, which should you use to exit a building?", options: ["Elevator for speed", "Stairs only", "Windows", "Ropes"], answer: 1 },
      { q: "How long does the average earthquake last?", options: ["2–3 minutes", "10–30 seconds", "5 minutes", "Less than 1 second"], answer: 1 },
    ],
    stats: [
      { value: "59%", label: "of India in seismic zones", color: "#6d4c41" },
      { value: "0 sec", label: "warning time — drill matters", color: "#795548" },
      { value: "Zone V", label: "highest risk in Northeast/J&K", color: "#6d4c41" },
    ]
  },
  {
    id: "cyclone",
    title: "Cyclone Preparedness",
    icon: "🌀",
    color: "#4527a0",
    bg: "#f5f2ff",
    accent: "#512da8",
    tag: "Coastal India",
    tagColor: "#4527a0",
    level: "Bay of Bengal Coast · Arabian Sea Coast",
    readTime: "8 min read",
    difficulty: "Advanced",
    ndmaRef: "IMD Cyclone Warning System · NDMA CY Protocol",
    riskStates: ["Odisha", "Andhra Pradesh", "West Bengal", "Tamil Nadu", "Gujarat", "Maharashtra"],
    overview: "India's coastline faces 5–6 cyclones per year on average. Storm surge — not wind — causes 90% of cyclone fatalities. Early evacuation is the only effective defence.",
    sections: [
      {
        heading: "Before a Cyclone",
        icon: "📋",
        items: [
          "Track IMD cyclone bulletins from 5 days out — heed Yellow, Orange, and Red alerts",
          "Evacuate coastal areas at least 24–48 hours before predicted landfall",
          "Secure all outdoor items — furniture, signboards, equipment become lethal projectiles",
          "Fill water containers — water supply will be cut before and during the storm",
          "Charge all devices; prepare battery-powered radio for updates without mobile network",
          "Inform school administration if you are in the predicted impact zone",
        ]
      },
      {
        heading: "During a Cyclone",
        icon: "⚡",
        items: [
          "Stay inside a designated cyclone shelter or the most interior room of a strong building",
          "Keep away from all windows and glass — wind-borne glass is a leading injury cause",
          "Do NOT go outside during the calm eye of the storm — violent winds resume within minutes",
          "Lie flat on the floor if the roof is being lifted — reduces wind resistance on your body",
          "Do not use candles — carry battery torches or chemical glow sticks only",
          "Listen only to official All India Radio / DD broadcasts — social media spreads false news",
        ]
      },
      {
        heading: "After a Cyclone",
        icon: "✅",
        items: [
          "Wait for the IMD all-clear before stepping outside — secondary surge and bands are common",
          "Do not touch fallen power lines — assume all wires are live until utility confirms otherwise",
          "Avoid coastal areas for 48+ hours — delayed storm surge can still occur",
          "Report damage and request relief via District Collector's office or 1070",
          "Watch for contaminated water and ensure only sealed/boiled water is consumed",
          "Document structural damage — submit to state government for relief assessment",
        ]
      }
    ],
    drill: {
      title: "Cyclone Shelter & Lockdown Drill",
      steps: [
        "IMD Orange alert announced — principal activates school cyclone response plan",
        "Students move to designated interior rooms (away from windows) in orderly groups",
        "All windows and external doors secured by designated staff teams",
        "Emergency kit distributed: water, biscuits, torch, first aid, radio",
        "Roll call taken and parents notified via SMS alert system",
        "Students shelter in place until all-clear — practice remaining calm for 30 minutes",
      ],
      target: "Full lockdown within 10 minutes of alert",
      frequency: "Once per year before monsoon season — June recommended",
    },
    quiz: [
      { q: "What causes 90% of cyclone fatalities?", options: ["Wind speed", "Storm surge (sea water rise)", "Lightning", "Heavy rain"], answer: 1 },
      { q: "What should you do during the calm 'eye' of a cyclone?", options: ["Go outside — it's safe", "Stay inside — violent winds will return", "Open windows for fresh air", "Start cleaning"], answer: 1 },
      { q: "How early should coastal residents evacuate before cyclone landfall?", options: ["After it hits", "1 hour before", "24–48 hours before", "12 hours after warnings"], answer: 2 },
    ],
    stats: [
      { value: "5–6", label: "cyclones hit India per year", color: "#4527a0" },
      { value: "90%", label: "deaths from storm surge", color: "#512da8" },
      { value: "48hr", label: "evacuation lead time needed", color: "#4527a0" },
    ]
  },
  {
    id: "heatwave",
    title: "Heatwave & Heat Stroke",
    icon: "☀️",
    color: "#c62828",
    bg: "#fff8f0",
    accent: "#e53935",
    tag: "Worsening Annually",
    tagColor: "#c62828",
    level: "Rajasthan · Vidarbha · Telangana · UP · Bihar",
    readTime: "6 min read",
    difficulty: "Beginner",
    ndmaRef: "NDMA Heat Action Plan Guidelines 2022",
    riskStates: ["Rajasthan", "Andhra Pradesh", "Telangana", "Vidarbha (Maharashtra)", "UP", "Bihar"],
    overview: "Heatwaves kill more people in India than any other weather event. Between 2010–2019, over 6,000 people died in heat-related events. Students and outdoor workers are most vulnerable.",
    sections: [
      {
        heading: "Prevention at School",
        icon: "🛡️",
        items: [
          "Reschedule outdoor activities and sports to before 9am or after 5pm during peak summer",
          "Ensure adequate drinking water is available at all times — schools must provide this",
          "Wear light, loose-fitting, light-coloured cotton clothing — it reflects heat",
          "Never leave children or animals in parked vehicles — car interiors reach 60°C within minutes",
          "Inform administration if school buildings lack adequate ventilation or cooling",
          "Monitor weather forecasts — IMD issues heatwave warnings 48 hours in advance",
        ]
      },
      {
        heading: "Recognizing Heat Emergencies",
        icon: "⚡",
        items: [
          "Heat Cramps: painful muscle spasms — move to shade, drink ORS or salted water",
          "Heat Exhaustion: heavy sweating, weakness, cold pale skin — move indoors, cool with wet cloth",
          "Heat Stroke (EMERGENCY): hot dry skin, confusion, no sweating, temp above 40°C — call 108 IMMEDIATELY",
          "For heat stroke: cool person rapidly with ice packs to neck, armpits, groin while awaiting ambulance",
          "Do NOT give water to an unconscious person — risk of choking",
          "Fan the person while keeping skin moist — evaporation cools faster than ice alone",
        ]
      },
      {
        heading: "Recovery & Return to School",
        icon: "✅",
        items: [
          "Recover in a cool, shaded environment for minimum 24 hours after heat exhaustion",
          "Continue drinking ORS or electrolyte drinks — not plain water alone",
          "Avoid strenuous activity for 3–4 days after a heat illness episode",
          "Report all heat-related incidents to school nurse and district health officer",
          "Schools in heatwave-prone districts should have a Heat Action Plan displayed publicly",
          "Know your nearest government hospital with emergency cooling facilities",
        ]
      }
    ],
    drill: {
      title: "Heat Emergency Response Drill",
      steps: [
        "Teacher identifies a student showing signs of heat exhaustion during assembly",
        "Student is moved immediately to the coolest available indoor space",
        "School nurse / first aider applies cool wet cloths to neck, wrists, forehead",
        "ORS solution prepared and offered if student is conscious and able to swallow",
        "If temperature above 40°C or confusion present: call 108 ambulance immediately",
        "Incident documented and parents informed within 30 minutes",
      ],
      target: "First aid initiated within 2 minutes of identifying heat emergency",
      frequency: "Before summer break — April to May recommended",
    },
    quiz: [
      { q: "What is the key sign distinguishing heat stroke from heat exhaustion?", options: ["Sweating heavily", "Hot dry skin with no sweating and confusion", "Mild headache", "Feeling thirsty"], answer: 1 },
      { q: "What should you give a conscious heat exhaustion patient?", options: ["Coffee", "Cold soft drink", "ORS or salted water", "Nothing"], answer: 2 },
      { q: "When should outdoor school activities be scheduled during heatwaves?", options: ["12 noon to 3pm", "Before 9am or after 5pm", "Anytime with water", "Only evenings"], answer: 1 },
    ],
    stats: [
      { value: "6000+", label: "heat deaths 2010–2019 India", color: "#c62828" },
      { value: "40°C", label: "heat stroke threshold temp", color: "#e53935" },
      { value: "108", label: "Medical emergency helpline", color: "#c62828" },
    ]
  },
];

// ─── QUIZ COMPONENT ───────────────────────────────────────────────────────────
function ModuleQuiz({ questions, color }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const score = Object.entries(answers).filter(([i, a]) => questions[+i].answer === a).length;

  return (
    <div style={{ marginTop: "20px" }}>
      {questions.map((q, i) => (
        <div key={i} style={{
          background: submitted
            ? answers[i] === q.answer ? "#f0fbf2" : "#fff5f5"
            : "#f8f9fa",
          border: `1px solid ${submitted ? (answers[i] === q.answer ? "#a5d6a7" : "#ffcdd2") : "#e0e0e0"}`,
          borderRadius: "10px",
          padding: "14px 16px",
          marginBottom: "10px",
        }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#1a1a1a", marginBottom: "10px" }}>
            Q{i + 1}. {q.q}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            {q.options.map((opt, j) => {
              let bg = "#fff";
              let border = "1px solid #e0e0e0";
              let textColor = "#333";
              if (submitted) {
                if (j === q.answer) { bg = "#e8f5e9"; border = "1.5px solid #2e7d32"; textColor = "#1b5e20"; }
                else if (j === answers[i]) { bg = "#ffebee"; border = "1.5px solid #c62828"; textColor = "#c62828"; }
              } else if (answers[i] === j) {
                bg = `${color}11`; border = `1.5px solid ${color}`; textColor = color;
              }
              return (
                <button key={j} disabled={submitted} onClick={() => setAnswers(a => ({ ...a, [i]: j }))}
                  style={{ padding: "8px 10px", borderRadius: "7px", border, background: bg, color: textColor, fontSize: "12px", fontWeight: "500", cursor: submitted ? "default" : "pointer", textAlign: "left", transition: "all 0.15s" }}>
                  {["A", "B", "C", "D"][j]}. {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < questions.length}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", background: Object.keys(answers).length < questions.length ? "#e0e0e0" : color, color: "#fff", fontWeight: "700", fontSize: "14px", border: "none", cursor: Object.keys(answers).length < questions.length ? "not-allowed" : "pointer" }}>
          Submit Answers
        </button>
      ) : (
        <div style={{ background: score === questions.length ? "#e8f5e9" : score >= 2 ? "#fff8e1" : "#ffebee", border: `1px solid ${score === questions.length ? "#a5d6a7" : score >= 2 ? "#ffe082" : "#ffcdd2"}`, borderRadius: "10px", padding: "14px", textAlign: "center" }}>
          <div style={{ fontSize: "22px", fontWeight: "800", color: score === questions.length ? "#2e7d32" : score >= 2 ? "#f57f17" : "#c62828" }}>
            {score}/{questions.length} correct
          </div>
          <div style={{ fontSize: "13px", color: "#555", marginTop: "4px" }}>
            {score === questions.length ? "🏆 Perfect score! Module mastered." : score >= 2 ? "✅ Good effort. Review the guidelines above." : "📚 Please re-read the module and try again."}
          </div>
          <button onClick={() => { setAnswers({}); setSubmitted(false); }} style={{ marginTop: "10px", padding: "8px 20px", borderRadius: "7px", background: "#f5f5f5", border: "1px solid #e0e0e0", fontSize: "13px", cursor: "pointer", fontWeight: "600" }}>
            Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
}

// ─── DRILL TIMER COMPONENT ────────────────────────────────────────────────────
function DrillTimer({ drill, color }) {
  const [running, setRunning] = useState(false);
  const [stepIdx, setStepIdx] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    setRunning(true);
    setStepIdx(0);
    setElapsed(0);
    let sec = 0;
    let step = 0;
    const stepDuration = 8;
    intervalRef.current = setInterval(() => {
      sec++;
      setElapsed(sec);
      const newStep = Math.min(Math.floor(sec / stepDuration), drill.steps.length - 1);
      if (newStep !== step) { step = newStep; setStepIdx(newStep); }
      if (sec >= drill.steps.length * stepDuration) { clearInterval(intervalRef.current); setRunning(false); }
    }, 1000);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setStepIdx(-1);
    setElapsed(0);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <div>
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        {!running && stepIdx === -1 ? (
          <button onClick={start} style={{ padding: "10px 20px", borderRadius: "8px", background: color, color: "#fff", fontWeight: "700", fontSize: "13px", border: "none", cursor: "pointer" }}>
            ▶ Start Drill Simulation
          </button>
        ) : (
          <button onClick={reset} style={{ padding: "10px 20px", borderRadius: "8px", background: "#455a64", color: "#fff", fontWeight: "700", fontSize: "13px", border: "none", cursor: "pointer" }}>
            ↺ Reset
          </button>
        )}
        {running && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#c62828", fontWeight: "700" }}>
            <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#c62828", animation: "pulse 1s infinite" }} />
            LIVE — {elapsed}s elapsed
          </div>
        )}
      </div>
      {drill.steps.map((step, i) => (
        <div key={i} style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          padding: "10px 12px",
          borderRadius: "8px",
          marginBottom: "6px",
          background: i === stepIdx ? `${color}15` : i < stepIdx ? "#f8f9fa" : "#fff",
          border: `1px solid ${i === stepIdx ? color : i < stepIdx ? "#e0e0e0" : "#f0f0f0"}`,
          transition: "all 0.3s",
          opacity: stepIdx === -1 ? 1 : i > stepIdx ? 0.4 : 1,
        }}>
          <div style={{
            width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
            background: i < stepIdx ? "#2e7d32" : i === stepIdx ? color : "#e0e0e0",
            color: i <= stepIdx ? "#fff" : "#999",
            fontSize: "11px", fontWeight: "700",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {i < stepIdx ? "✓" : i + 1}
          </div>
          <div style={{ fontSize: "13px", color: i === stepIdx ? "#1a1a1a" : "#555", fontWeight: i === stepIdx ? "600" : "400", lineHeight: "1.45" }}>
            {step}
          </div>
        </div>
      ))}
      <div style={{ marginTop: "12px", padding: "10px 12px", background: "#f5f5f5", borderRadius: "8px", fontSize: "12px", color: "#666" }}>
        🎯 Target: {drill.target} · 📅 {drill.frequency}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Learn() {
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [activeSection, setActiveSection] = useState("guidelines");
  const [completedModules, setCompletedModules] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const detailRef = useRef(null);

  const activeModule = modules.find(m => m.id === activeModuleId);

  const openModule = (id) => {
    setActiveModuleId(id);
    setActiveSection("guidelines");
    setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const closeModule = () => setActiveModuleId(null);

  const markComplete = (id) => setCompletedModules(prev => new Set([...prev, id]));

  const filtered = modules.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completionPct = Math.round((completedModules.size / modules.length) * 100);

  const S = {
    root: {
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#f4f6f8",
      minHeight: "100vh",
      padding: "0",
    },
    hero: {
      background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      padding: "48px 32px 40px",
      textAlign: "center",
    },
    heroTitle: {
      fontSize: "30px",
      fontWeight: "800",
      color: "#ffffff",
      letterSpacing: "-0.5px",
      marginBottom: "10px",
    },
    heroSub: {
      fontSize: "15px",
      color: "rgba(255,255,255,0.7)",
      maxWidth: "560px",
      margin: "0 auto 24px",
      lineHeight: "1.6",
    },
    progressWrap: {
      maxWidth: "400px",
      margin: "0 auto",
      background: "rgba(255,255,255,0.1)",
      borderRadius: "12px",
      padding: "14px 18px",
    },
    progressRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "8px",
    },
    progressLabel: { fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: "600" },
    progressPct: { fontSize: "14px", fontWeight: "800", color: "#fff" },
    progressBar: {
      height: "6px",
      background: "rgba(255,255,255,0.2)",
      borderRadius: "3px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      width: `${completionPct}%`,
      background: "linear-gradient(90deg, #43a047, #66bb6a)",
      borderRadius: "3px",
      transition: "width 0.5s ease",
    },
    body: {
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "32px 20px",
    },
    searchRow: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      marginBottom: "24px",
    },
    searchInput: {
      flex: 1,
      padding: "12px 16px",
      borderRadius: "10px",
      border: "1.5px solid #e0e0e0",
      background: "#fff",
      fontSize: "14px",
      color: "#1a1a1a",
      outline: "none",
      boxSizing: "border-box",
    },
    sectionTitle: {
      fontSize: "13px",
      fontWeight: "700",
      color: "#9e9e9e",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginBottom: "16px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "16px",
      marginBottom: "32px",
    },
    moduleCard: (m, isActive) => ({
      background: "#ffffff",
      borderRadius: "16px",
      border: isActive ? `2px solid ${m.color}` : "1.5px solid #e8e8e8",
      padding: "22px",
      cursor: "pointer",
      transition: "all 0.2s",
      boxShadow: isActive ? `0 4px 20px ${m.color}22` : "0 2px 8px rgba(0,0,0,0.05)",
      position: "relative",
      overflow: "hidden",
    }),
    cardAccent: (color) => ({
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: color,
    }),
    cardIcon: { fontSize: "32px", marginBottom: "10px", display: "block" },
    cardTitle: (color) => ({
      fontSize: "16px",
      fontWeight: "800",
      color: "#1a1a1a",
      marginBottom: "5px",
    }),
    cardLevel: {
      fontSize: "11px",
      color: "#9e9e9e",
      marginBottom: "10px",
      lineHeight: "1.4",
    },
    cardTag: (color) => ({
      display: "inline-block",
      fontSize: "10px",
      fontWeight: "700",
      padding: "3px 8px",
      borderRadius: "10px",
      background: `${color}15`,
      color: color,
      letterSpacing: "0.5px",
      marginBottom: "8px",
    }),
    cardFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "12px",
      paddingTop: "12px",
      borderTop: "1px solid #f5f5f5",
    },
    cardMeta: { fontSize: "11px", color: "#bbb" },
    completeBadge: {
      fontSize: "11px",
      fontWeight: "700",
      color: "#2e7d32",
      background: "#e8f5e9",
      padding: "3px 8px",
      borderRadius: "8px",
    },
    openBtn: (color) => ({
      fontSize: "11px",
      fontWeight: "700",
      color: color,
    }),
    // Detail panel
    detailPanel: {
      background: "#fff",
      borderRadius: "20px",
      border: "1.5px solid #e8e8e8",
      overflow: "hidden",
      marginBottom: "32px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    },
    detailHeader: (color, bg) => ({
      background: `linear-gradient(135deg, ${color}f0, ${color}cc)`,
      padding: "28px 28px 24px",
    }),
    detailTitle: {
      fontSize: "24px",
      fontWeight: "800",
      color: "#fff",
      marginBottom: "6px",
    },
    detailMeta: {
      display: "flex",
      gap: "14px",
      flexWrap: "wrap",
      alignItems: "center",
    },
    detailChip: {
      fontSize: "12px",
      color: "rgba(255,255,255,0.85)",
      background: "rgba(255,255,255,0.15)",
      padding: "4px 10px",
      borderRadius: "10px",
    },
    statRow: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "0",
      borderTop: "1px solid rgba(255,255,255,0.2)",
      marginTop: "18px",
    },
    statItem: {
      padding: "14px 16px",
      textAlign: "center",
      borderRight: "1px solid rgba(255,255,255,0.2)",
    },
    statValue: {
      fontSize: "20px",
      fontWeight: "800",
      color: "#fff",
    },
    statLabel: {
      fontSize: "10px",
      color: "rgba(255,255,255,0.7)",
      marginTop: "2px",
      lineHeight: "1.3",
    },
    tabRow: {
      display: "flex",
      gap: "2px",
      padding: "16px 20px 0",
      borderBottom: "1px solid #f0f0f0",
    },
    tab: (active, color) => ({
      padding: "9px 18px",
      borderRadius: "8px 8px 0 0",
      border: "none",
      background: active ? "#fff" : "transparent",
      color: active ? color : "#9e9e9e",
      fontWeight: active ? "700" : "500",
      fontSize: "13px",
      cursor: "pointer",
      borderBottom: active ? `3px solid ${color}` : "3px solid transparent",
      transition: "all 0.15s",
    }),
    detailBody: {
      padding: "24px 28px",
    },
    overviewBox: (color, bg) => ({
      background: bg,
      border: `1px solid ${color}33`,
      borderLeft: `4px solid ${color}`,
      borderRadius: "0 10px 10px 0",
      padding: "14px 16px",
      marginBottom: "20px",
      fontSize: "14px",
      color: "#1a1a1a",
      lineHeight: "1.6",
    }),
    sectionBlock: {
      marginBottom: "20px",
    },
    sectionHeading: (color) => ({
      fontSize: "14px",
      fontWeight: "700",
      color: "#1a1a1a",
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    guideItem: {
      display: "flex",
      gap: "10px",
      fontSize: "13px",
      color: "#333",
      lineHeight: "1.55",
      marginBottom: "7px",
    },
    ndmaRef: (color) => ({
      marginTop: "16px",
      background: `${color}0d`,
      border: `1px solid ${color}33`,
      borderRadius: "8px",
      padding: "10px 14px",
      fontSize: "12px",
      color: color,
      fontWeight: "600",
    }),
    riskStatesRow: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      marginTop: "12px",
    },
    stateChip: (color) => ({
      background: `${color}12`,
      border: `1px solid ${color}33`,
      color: color,
      borderRadius: "20px",
      padding: "4px 10px",
      fontSize: "11px",
      fontWeight: "600",
    }),
    actionRow: {
      display: "flex",
      gap: "10px",
      padding: "16px 28px 24px",
      borderTop: "1px solid #f0f0f0",
    },
    markDoneBtn: (color, done) => ({
      flex: 1,
      padding: "12px",
      borderRadius: "10px",
      background: done ? "#e8f5e9" : color,
      color: done ? "#2e7d32" : "#fff",
      fontWeight: "700",
      fontSize: "14px",
      border: done ? "1px solid #a5d6a7" : "none",
      cursor: "pointer",
      transition: "all 0.2s",
    }),
    closeBtn: {
      padding: "12px 20px",
      borderRadius: "10px",
      background: "#f5f5f5",
      color: "#555",
      fontWeight: "700",
      fontSize: "14px",
      border: "1px solid #e0e0e0",
      cursor: "pointer",
    },
    // Bottom info section
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginTop: "8px",
    },
    infoCard: (color) => ({
      background: "#fff",
      borderRadius: "16px",
      border: "1.5px solid #e8e8e8",
      padding: "22px",
    }),
    infoCardTitle: {
      fontSize: "15px",
      fontWeight: "700",
      color: "#1a1a1a",
      marginBottom: "12px",
    },
    infoItem: {
      display: "flex",
      gap: "10px",
      fontSize: "13px",
      color: "#444",
      lineHeight: "1.5",
      marginBottom: "8px",
    },
  };

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        button { font-family: inherit; }
        input { font-family: inherit; }
      `}</style>

      {/* HERO */}
      <div style={S.hero}>
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>🎓</div>
        <div style={S.heroTitle}>Disaster Preparedness Training System</div>
        <div style={S.heroSub}>
          India-specific interactive learning modules aligned with NDMA protocols, UNDRR Sendai Framework, and National School Safety Programme guidelines.
        </div>
        <div style={S.progressWrap}>
          <div style={S.progressRow}>
            <span style={S.progressLabel}>Your Learning Progress</span>
            <span style={S.progressPct}>{completedModules.size} / {modules.length} modules · {completionPct}%</span>
          </div>
          <div style={S.progressBar}><div style={S.progressFill} /></div>
        </div>
      </div>

      <div style={S.body}>

        {/* SEARCH */}
        <div style={S.searchRow}>
          <input
            style={S.searchInput}
            placeholder="🔍  Search modules by disaster type or region..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <div style={{ fontSize: "13px", color: "#9e9e9e", whiteSpace: "nowrap" }}>
            {filtered.length} of {modules.length} modules
          </div>
        </div>

        {/* MODULE GRID */}
        <div style={S.sectionTitle}>Learning Modules</div>
        <div style={S.grid}>
          {filtered.map(m => (
            <div key={m.id} style={S.moduleCard(m, activeModuleId === m.id)} onClick={() => openModule(m.id)}>
              <div style={S.cardAccent(m.color)} />
              <span style={S.cardIcon}>{m.icon}</span>
              <span style={S.cardTag(m.color)}>{m.tag}</span>
              <div style={S.cardTitle(m.color)}>{m.title}</div>
              <div style={S.cardLevel}>{m.level}</div>
              <div style={S.cardFooter}>
                <span style={S.cardMeta}>{m.readTime} · {m.difficulty}</span>
                {completedModules.has(m.id)
                  ? <span style={S.completeBadge}>✓ Completed</span>
                  : <span style={S.openBtn(m.color)}>Open →</span>
                }
              </div>
            </div>
          ))}
        </div>

        {/* DETAIL PANEL */}
        {activeModule && (
          <div style={S.detailPanel} ref={detailRef}>
            {/* Header */}
            <div style={S.detailHeader(activeModule.color, activeModule.bg)}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>{activeModule.icon}</div>
              <div style={S.detailTitle}>{activeModule.title}</div>
              <div style={S.detailMeta}>
                <span style={S.detailChip}>📍 {activeModule.level}</span>
                <span style={S.detailChip}>📖 {activeModule.readTime}</span>
                <span style={S.detailChip}>🎯 {activeModule.difficulty}</span>
              </div>
              <div style={S.statRow}>
                {activeModule.stats.map((st, i) => (
                  <div key={i} style={{ ...S.statItem, borderRight: i < 2 ? "1px solid rgba(255,255,255,0.2)" : "none" }}>
                    <div style={S.statValue}>{st.value}</div>
                    <div style={S.statLabel}>{st.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div style={S.tabRow}>
              {[
                { key: "guidelines", label: "📘 Guidelines" },
                { key: "drill", label: "🎯 Drill" },
                { key: "quiz", label: "🧠 Quiz" },
              ].map(t => (
                <button key={t.key} style={S.tab(activeSection === t.key, activeModule.color)} onClick={() => setActiveSection(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={S.detailBody}>
              {activeSection === "guidelines" && (
                <>
                  <div style={S.overviewBox(activeModule.color, activeModule.bg)}>
                    {activeModule.overview}
                  </div>
                  {activeModule.sections.map((sec, si) => (
                    <div key={si} style={S.sectionBlock}>
                      <div style={S.sectionHeading(activeModule.color)}>
                        <span>{sec.icon}</span> {sec.heading}
                      </div>
                      {sec.items.map((item, ii) => (
                        <div key={ii} style={S.guideItem}>
                          <span style={{ color: activeModule.color, flexShrink: 0, marginTop: "2px" }}>▸</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div style={S.ndmaRef(activeModule.color)}>
                    📋 Authority Reference: {activeModule.ndmaRef}
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <div style={{ fontSize: "11px", color: "#9e9e9e", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>High-Risk States</div>
                    <div style={S.riskStatesRow}>
                      {activeModule.riskStates.map((st, i) => (
                        <span key={i} style={S.stateChip(activeModule.color)}>{st}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeSection === "drill" && (
                <DrillTimer drill={activeModule.drill} color={activeModule.color} />
              )}

              {activeSection === "quiz" && (
                <ModuleQuiz questions={activeModule.quiz} color={activeModule.color} />
              )}
            </div>

            {/* Action row */}
            <div style={S.actionRow}>
              <button
                style={S.markDoneBtn(activeModule.color, completedModules.has(activeModule.id))}
                onClick={() => { markComplete(activeModule.id); }}
              >
                {completedModules.has(activeModule.id) ? "✓ Module Completed" : "Mark as Complete"}
              </button>
              <button style={S.closeBtn} onClick={closeModule}>Close</button>
            </div>
          </div>
        )}

        {/* BOTTOM INFO */}
        <div style={S.sectionTitle}>Platform Overview</div>
        <div style={S.infoGrid}>
          <div style={S.infoCard()}>
            <div style={S.infoCardTitle}>🇮🇳 Why This Matters in India</div>
            {[
              "58% of India's land is earthquake-prone (Zones III–V)",
              "India faces 5–6 cyclones and thousands of flood events annually",
              "NDMA reports critically low disaster awareness in schools",
              "Structured drills reduce evacuation time by up to 60%",
              "UNDRR Sendai Framework mandates DRR integration in education",
            ].map((t, i) => (
              <div key={i} style={S.infoItem}>
                <span style={{ color: "#1565c0", flexShrink: 0 }}>▸</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <div style={S.infoCard()}>
            <div style={S.infoCardTitle}>🎯 Learning Outcomes</div>
            {[
              "Know the correct response for 5 major disaster types",
              "Understand and practice NDMA-aligned evacuation protocols",
              "Complete virtual drills before official school drills",
              "Earn module completion badges to track your preparedness",
              "Emergency contact directory accessible at all times",
            ].map((t, i) => (
              <div key={i} style={S.infoItem}>
                <span style={{ color: "#2e7d32", flexShrink: 0 }}>✓</span>
                <span>{t}</span>
              </div>
            ))}
            <div style={{ marginTop: "14px", padding: "10px 12px", background: "#f8f9fa", borderRadius: "8px", fontSize: "12px", color: "#666" }}>
              🚨 Emergency: <strong>112</strong> · Fire: <strong>101</strong> · Ambulance: <strong>108</strong> · NDRF: <strong>011-24363260</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}