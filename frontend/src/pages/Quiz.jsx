import { useState, useEffect, useRef } from "react";

const questionBank = [
  // EARTHQUAKE
  { id: 1, category: "Earthquake", level: "Easy", region: "General", q: "What is the safest action to take when an earthquake starts?", options: ["Run outside immediately", "Drop, Cover, and Hold On", "Jump out of a window", "Stand in a doorway"], answer: 1, explain: "Drop, Cover, and Hold On protects you from falling debris—the leading cause of earthquake injuries." },
  { id: 2, category: "Earthquake", level: "Easy", region: "General", q: "Where should you shelter during an earthquake indoors?", options: ["Near windows", "Under a sturdy table or desk", "In a lift/elevator", "On the top floor"], answer: 1, explain: "A sturdy table shields you from falling objects. Windows can shatter, and elevators can malfunction." },
  { id: 3, category: "Earthquake", level: "Medium", region: "Urban", q: "What should you avoid using after an earthquake in a high-rise building?", options: ["Staircases", "Elevators/lifts", "Emergency exits", "Fire escape ladders"], answer: 1, explain: "Elevators can be damaged or lose power during and after earthquakes—always use stairs." },
  { id: 4, category: "Earthquake", level: "Medium", region: "Urban", q: "How far should you stay from buildings after an earthquake?", options: ["1 meter", "At least 1.5x the building height", "5 meters", "No distance needed"], answer: 1, explain: "Aftershocks can cause damaged buildings to collapse. Maintain distance proportional to building height." },
  { id: 5, category: "Earthquake", level: "Hard", region: "Himalayan", q: "What is an aftershock?", options: ["The main seismic event", "A smaller quake following the main earthquake", "A weather phenomenon", "A type of tsunami warning"], answer: 1, explain: "Aftershocks are smaller earthquakes that occur in the same area after the main quake, sometimes for weeks." },
  { id: 6, category: "Earthquake", level: "Hard", region: "Himalayan", q: "Which scale measures earthquake magnitude used by NDMA India?", options: ["Fahrenheit Scale", "Richter/Moment Magnitude Scale", "Beaufort Scale", "Saffir-Simpson Scale"], answer: 1, explain: "India uses the Moment Magnitude Scale (Mw), which superseded the Richter scale for measuring quake energy." },
  { id: 7, category: "Earthquake", level: "Easy", region: "General", q: "What should you do if you are outdoors during an earthquake?", options: ["Run into the nearest building", "Move away from buildings and power lines, drop to the ground", "Climb a tree", "Stand still and wait"], answer: 1, explain: "Open areas away from structures are safest outdoors—falling debris and downed power lines are major hazards." },
  { id: 8, category: "Earthquake", level: "Medium", region: "General", q: "Which of these is a sign that a tsunami may follow an offshore earthquake?", options: ["Strong winds pick up", "Ocean water rapidly recedes from shore", "Heavy rainfall begins", "Sky turns orange"], answer: 1, explain: "Rapid withdrawal of ocean water is a natural tsunami warning—immediately move to high ground." },
  { id: 9, category: "Earthquake", level: "Hard", region: "Urban", q: "What is liquefaction during an earthquake?", options: ["Water flooding streets", "Saturated soil temporarily behaves like liquid", "Buildings catching fire", "Gas pipe ruptures"], answer: 1, explain: "Liquefaction occurs when earthquake shaking causes water-saturated soil to lose strength, causing buildings to sink." },
  { id: 10, category: "Earthquake", level: "Easy", region: "General", q: "What item is most critical in an earthquake preparedness kit?", options: ["Television", "Water and non-perishable food (72-hour supply)", "Luxury clothing", "Gaming console"], answer: 1, explain: "Water (1 liter/person/day minimum) and food for 72 hours sustains survival before rescue teams arrive." },

  // FLOOD
  { id: 11, category: "Flood", level: "Easy", region: "Coastal", q: "What is the first action when a flood warning is issued?", options: ["Continue normal activities", "Move to higher ground immediately", "Swim to safety", "Stay in the basement"], answer: 1, explain: "Moving to higher ground immediately before floodwaters arrive is the most critical life-saving action." },
  { id: 12, category: "Flood", level: "Easy", region: "General", q: "Why should you never walk through moving floodwater?", options: ["It smells bad", "Just 15 cm of fast-moving water can knock an adult down", "It is too cold", "It takes too long"], answer: 1, explain: "Floodwater force is deceptive—even shallow, fast-moving water can carry a person or vehicle away." },
  { id: 13, category: "Flood", level: "Medium", region: "General", q: "Why is contact with floodwater dangerous even after it recedes?", options: ["It makes skin dry", "It contains sewage, chemicals, and electrical hazards", "It is too warm", "It causes sunburn"], answer: 1, explain: "Floodwater mixes with sewage, chemical spills, and can conduct electricity from downed power lines." },
  { id: 14, category: "Flood", level: "Medium", region: "Coastal", q: "What is a 'storm surge'?", options: ["Heavy rainfall", "Abnormal rise in coastal sea level driven by storm winds", "A surge of wind only", "Fog over the sea"], answer: 1, explain: "Storm surge is the deadliest part of a cyclone—water pushed ashore by winds can reach 6+ meters." },
  { id: 15, category: "Flood", level: "Hard", region: "Coastal", q: "Which Indian states are most vulnerable to coastal flooding and cyclones?", options: ["Rajasthan and Punjab", "Odisha, Andhra Pradesh, West Bengal, Tamil Nadu", "Himachal Pradesh and Uttarakhand", "Delhi and Haryana"], answer: 1, explain: "The Bay of Bengal coastline (Odisha, AP, WB, TN) is one of the world's most cyclone-prone regions." },
  { id: 16, category: "Flood", level: "Hard", region: "General", q: "What is the role of an early warning system in flood management?", options: ["It prevents floods from occurring", "It gives advance notice enabling evacuation and preparation", "It controls river water levels", "It is only useful for earthquakes"], answer: 1, explain: "Early warning systems can cut flood deaths by up to 40%—India's Flood Forecasting and Warning System (FFWS) is managed by CWC." },
  { id: 17, category: "Flood", level: "Easy", region: "General", q: "Should you drive through a flooded road?", options: ["Yes, if you drive fast", "No, turn around and find alternate route", "Yes, if the car is large", "Only at night"], answer: 1, explain: "'Turn Around, Don't Drown'—60% of flood deaths occur in vehicles. Water depth is impossible to judge visually." },
  { id: 18, category: "Flood", level: "Medium", region: "Urban", q: "What should you do with electrical appliances before floodwater enters your home?", options: ["Leave them plugged in", "Turn off at the mains and unplug all appliances", "Move them to the basement", "Fill them with water"], answer: 1, explain: "Electrical appliances in contact with floodwater create deadly electrocution hazards. Isolate power at the mains." },
  { id: 19, category: "Flood", level: "Hard", region: "General", q: "What does NDRF stand for in India?", options: ["National Disaster Relief Fund", "National Disaster Response Force", "National Department of River Forecasting", "None of these"], answer: 1, explain: "NDRF (National Disaster Response Force) is India's specialized force for disaster rescue and relief operations." },
  { id: 20, category: "Flood", level: "Easy", region: "General", q: "After a flood, which water source is safest to drink?", options: ["River water", "Collected rainwater", "Sealed bottled water or boiled water", "Tap water without checking"], answer: 2, explain: "Only use sealed bottled water or boil water for at least 1 minute after a flood to prevent waterborne diseases." },

  // FIRE
  { id: 21, category: "Fire", level: "Easy", region: "Urban", q: "What should you use to evacuate a building on fire?", options: ["Elevator/lift", "Stairs only", "Jump from windows", "Stay and wait for help"], answer: 1, explain: "Elevators can trap occupants when fire damages electrical systems or creates smoke-filled shafts. Always use stairs." },
  { id: 22, category: "Fire", level: "Easy", region: "General", q: "Which direction does smoke travel in a burning building?", options: ["Downward only", "Upward (hot air rises)", "Horizontally only", "It stays in one place"], answer: 1, explain: "Smoke and hot gases rise. Stay low to the floor where air is cooler and cleaner during evacuation." },
  { id: 23, category: "Fire", level: "Medium", region: "Urban", q: "What does PASS stand for for fire extinguisher use?", options: ["Pull, Aim, Squeeze, Sweep", "Push, Activate, Spray, Stop", "Point, Apply, Stand, Spray", "Prepare, Activate, Spray, Secure"], answer: 0, explain: "PASS: Pull the pin, Aim at the base of fire, Squeeze the handle, Sweep side to side at the fire base." },
  { id: 24, category: "Fire", level: "Medium", region: "Urban", q: "If your clothes catch fire, what should you do?", options: ["Run to find water", "Stop, Drop, and Roll", "Fan the flames away", "Remove all clothing"], answer: 1, explain: "Running fans the flames. Stop, Drop to the ground, and Roll to smother the fire and protect your face." },
  { id: 25, category: "Fire", level: "Hard", region: "General", q: "At what temperature does a typical house fire reach in 5 minutes?", options: ["100°C", "200°C", "500-600°C", "50°C"], answer: 2, explain: "House fires can reach 500-600°C within minutes—superheated gases and smoke kill faster than flames." },
  { id: 26, category: "Fire", level: "Hard", region: "General", q: "What class of fire involves electrical equipment?", options: ["Class A", "Class B", "Class C", "Class D"], answer: 2, explain: "Class C fires involve energized electrical equipment. Use CO2 or dry powder extinguishers—never water." },
  { id: 27, category: "Fire", level: "Easy", region: "General", q: "If a room is filled with smoke and you cannot see, how should you move?", options: ["Stand upright and run", "Crawl low to the floor toward an exit", "Sit and wait", "Climb to the ceiling level"], answer: 1, explain: "Crawl below the smoke layer—cleaner air stays near the floor. Smoke inhalation is the leading cause of fire deaths." },
  { id: 28, category: "Fire", level: "Medium", region: "Urban", q: "Before opening a door during a fire, what should you check?", options: ["The lock", "The color of the door", "Feel the door and handle for heat", "Check for the door number"], answer: 2, explain: "A hot door means fire is on the other side. Use the back of your hand to test—never open a hot door." },
  { id: 29, category: "Fire", level: "Hard", region: "Urban", q: "What is a fire muster point?", options: ["Fire extinguisher location", "Designated safe assembly area outside a building", "Fire hose cabinet", "Emergency exit sign"], answer: 1, explain: "Muster/assembly points are pre-designated safe areas outside buildings where occupants gather after evacuation for roll call." },
  { id: 30, category: "Fire", level: "Easy", region: "General", q: "How often should smoke detectors be tested?", options: ["Once a year", "Every 6 months", "Monthly", "Only when purchased"], answer: 2, explain: "Test smoke detectors monthly, replace batteries annually, and replace the entire unit every 10 years per safety standards." },

  // CYCLONE
  { id: 31, category: "Cyclone", level: "Easy", region: "Coastal", q: "Where is the safest place to shelter during a cyclone?", options: ["On a rooftop", "In a field", "In a designated cyclone shelter or strong building", "Near glass windows"], answer: 2, explain: "Designated cyclone shelters are reinforced structures designed to withstand extreme winds and storm surge." },
  { id: 32, category: "Cyclone", level: "Easy", region: "Coastal", q: "What should you do during the 'eye' of a cyclone when winds suddenly calm?", options: ["Go outside—it's safe now", "Stay indoors—violent winds will return", "Start cooking", "Open all windows"], answer: 1, explain: "The eye of a cyclone is deceptively calm. The most intense winds hit when the eyewall passes—stay indoors." },
  { id: 33, category: "Cyclone", level: "Medium", region: "Coastal", q: "What wind speed defines a cyclone as a 'Very Severe Cyclonic Storm' per IMD?", options: ["63-88 km/h", "89-117 km/h", "118-167 km/h", "Above 220 km/h"], answer: 2, explain: "India Meteorological Department classifies 118-167 km/h as Very Severe Cyclonic Storm (VSCS)." },
  { id: 34, category: "Cyclone", level: "Medium", region: "General", q: "In which ocean do most cyclones affecting India form?", options: ["Arabian Sea only", "Pacific Ocean", "Bay of Bengal (and some in Arabian Sea)", "Indian Ocean south of equator"], answer: 2, explain: "About 70% of Bay of Bengal cyclones hit India's east coast; the Arabian Sea generates fewer but increasingly intense cyclones." },
  { id: 35, category: "Cyclone", level: "Hard", region: "Coastal", q: "What is the Saffir-Simpson scale used for?", options: ["Measuring earthquake intensity", "Classifying hurricane/cyclone intensity by wind speed", "Measuring flood levels", "Forecasting rainfall"], answer: 1, explain: "The Saffir-Simpson scale (Cat 1-5) classifies tropical cyclone intensity by maximum sustained wind speeds." },
  { id: 36, category: "Cyclone", level: "Hard", region: "Coastal", q: "Which Indian agency issues cyclone warnings?", options: ["NDRF", "India Meteorological Department (IMD)", "Central Water Commission", "ISRO"], answer: 1, explain: "IMD operates the Cyclone Warning Division and issues bulletins 5+ days before landfall through its specialized centers." },
  { id: 37, category: "Cyclone", level: "Easy", region: "Coastal", q: "Which of these items should be secured before a cyclone?", options: ["Indoor furniture only", "Outdoor furniture, vehicles, and loose objects", "Only expensive items", "Nothing—storms won't affect objects"], answer: 1, explain: "High winds can turn loose objects into deadly projectiles. Secure or bring indoors all outdoor items before a cyclone." },
  { id: 38, category: "Cyclone", level: "Medium", region: "Coastal", q: "How long before a predicted cyclone landfall should coastal residents evacuate?", options: ["After landfall", "1 hour before", "At least 24-48 hours before", "12 hours after warnings"], answer: 2, explain: "Evacuation should begin 24-48 hours before landfall. Roads flood and become impassable as cyclones approach." },
  { id: 39, category: "Cyclone", level: "Hard", region: "Coastal", q: "What percentage of cyclone deaths are caused by storm surge globally?", options: ["10%", "30%", "Around 90%", "50%"], answer: 2, explain: "Approximately 90% of tropical cyclone fatalities are caused by storm surge—massive walls of ocean water pushed ashore." },
  { id: 40, category: "Cyclone", level: "Easy", region: "General", q: "What battery-powered device is essential to receive cyclone updates during power outages?", options: ["Television", "Battery-operated radio", "Mobile phone only", "Laptop"], answer: 1, explain: "A battery-powered or hand-crank radio receives emergency broadcasts when power and mobile networks fail during cyclones." },

  // GENERAL
  { id: 41, category: "General", level: "Easy", region: "General", q: "What is India's unified national emergency helpline number?", options: ["100", "101", "112", "108"], answer: 2, explain: "112 is India's single emergency number (like 911 in the US) for police, fire, and medical emergencies." },
  { id: 42, category: "General", level: "Easy", region: "General", q: "What does NDMA stand for?", options: ["National Disaster Management Authority", "National Department of Meteorological Affairs", "National Data Management Agency", "None of these"], answer: 0, explain: "NDMA (National Disaster Management Authority) is India's apex body for disaster management policy and coordination." },
  { id: 43, category: "General", level: "Medium", region: "General", q: "What is the first principle of first aid?", options: ["Give water immediately", "Ensure safety of yourself, bystanders, and the casualty", "Call family first", "Move the injured person"], answer: 1, explain: "Safety first—never approach a casualty in a dangerous environment without ensuring the scene is safe for rescuers." },
  { id: 44, category: "General", level: "Medium", region: "General", q: "What does the ABC in emergency first aid stand for?", options: ["Assess, Breathe, Compress", "Airway, Breathing, Circulation", "Alert, Bandage, Call", "Analyse, Bandage, Compress"], answer: 1, explain: "ABC (Airway, Breathing, Circulation) is the primary survey protocol to identify life-threatening conditions." },
  { id: 45, category: "General", level: "Hard", region: "General", q: "Which Sendai Framework target aims to reduce global disaster mortality?", options: ["A", "B", "C", "D"], answer: 0, explain: "Sendai Framework Target A: Substantially reduce global disaster mortality by 2030 compared to 2005-2015 figures." },
  { id: 46, category: "General", level: "Hard", region: "General", q: "What is India's Disaster Risk Index (DRI) ranking among South Asian nations?", options: ["Lowest risk", "Moderate risk", "One of the highest risk countries", "No ranked data"], answer: 2, explain: "India is highly disaster-prone—58% of its land is earthquake-prone and 75% of its coastline is at cyclone/erosion risk." },
  { id: 47, category: "General", level: "Easy", region: "General", q: "How many liters of water per person per day should an emergency kit contain?", options: ["0.5 liters", "1 liter minimum", "5 liters", "10 liters"], answer: 1, explain: "NDMA recommends at least 1 liter/person/day for drinking; 3+ liters including sanitation needs, for a 72-hour kit." },
  { id: 48, category: "General", level: "Medium", region: "General", q: "What is the 'Golden Hour' in emergency medicine?", options: ["The hour after sunset", "The first hour after a traumatic injury when treatment is most critical", "Morning hospital visiting time", "60 minutes of CPR"], answer: 1, explain: "The Golden Hour refers to the time period where rapid medical treatment dramatically improves survival from serious trauma." },
  { id: 49, category: "General", level: "Hard", region: "Urban", q: "Which Indian law governs disaster management and established NDMA?", options: ["Disaster Protection Act 2001", "Disaster Management Act 2005", "Civil Defence Act 1968", "Emergency Powers Act 1986"], answer: 1, explain: "The Disaster Management Act 2005 is India's comprehensive legislation establishing NDMA, SDMAs, and the disaster management framework." },
  { id: 50, category: "General", level: "Easy", region: "General", q: "What does 'evacuation' mean in disaster management?", options: ["Returning home after a disaster", "Moving people from danger zones to safe areas", "Cleaning up after a disaster", "Distributing relief supplies"], answer: 1, explain: "Evacuation is the organized movement of people away from a threatened or affected area to ensure their safety." },
];

const CATEGORIES = ["Earthquake", "Flood", "Fire", "Cyclone", "General"];
const LEVELS = ["Easy", "Medium", "Hard"];
const REGIONS = ["General", "Coastal", "Himalayan", "Urban"];

const CATEGORY_META = {
  Earthquake: { icon: "🌋", color: "#c84b31", bg: "#fff5f2", badge: "#ffd4c4" },
  Flood: { icon: "🌊", color: "#1565c0", bg: "#f0f7ff", badge: "#c5e1ff" },
  Fire: { icon: "🔥", color: "#e65100", bg: "#fff8f0", badge: "#ffe0b2" },
  Cyclone: { icon: "🌀", color: "#4527a0", bg: "#f5f2ff", badge: "#d8d0ff" },
  General: { icon: "🛡️", color: "#1b5e20", bg: "#f2fff4", badge: "#c8e6c9" },
};

const LEVEL_COLOR = { Easy: "#2e7d32", Medium: "#e65100", Hard: "#c62828" };

const TIMER_SECONDS = 25;

export default function Quiz() {
  const [stage, setStage] = useState("start");
  const [category, setCategory] = useState("Earthquake");
  const [level, setLevel] = useState("Easy");
  const [region, setRegion] = useState("General");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);
  const [time, setTime] = useState(TIMER_SECONDS);
  const [results, setResults] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (stage !== "quiz") return;
    timerRef.current = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          autoAdvance();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [stage, current]);

  const autoAdvance = () => {
    setLocked(true);
    setResults(prev => [...prev, { q: questions[current], selected: null, correct: false }]);
    setTimeout(() => advance(), 1500);
  };

  const advance = () => {
    clearInterval(timerRef.current);
    setSelected(null);
    setLocked(false);
    setTime(TIMER_SECONDS);
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
    } else {
      setStage("result");
    }
  };

  const startQuiz = () => {
    let pool = questionBank.filter(
      q => q.category === category && q.level === level && (region === "General" || q.region === region || q.region === "General")
    );
    if (pool.length < 5) pool = questionBank.filter(q => q.category === category && q.level === level);
    if (pool.length < 5) pool = questionBank.filter(q => q.category === category);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setLocked(false);
    setTime(TIMER_SECONDS);
    setResults([]);
    setShowSummary(false);
    setStage("quiz");
  };

  const handleAnswer = (i) => {
    if (locked) return;
    clearInterval(timerRef.current);
    setSelected(i);
    setLocked(true);
    const correct = i === questions[current].answer;
    if (correct) setScore(s => s + 1);
    setResults(prev => [...prev, { q: questions[current], selected: i, correct }]);
  };

  const getGrade = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 90) return { label: "Expert Responder", color: "#1b5e20", icon: "🏆" };
    if (pct >= 70) return { label: "Advanced Learner", color: "#1565c0", icon: "🔵" };
    if (pct >= 50) return { label: "Developing Awareness", color: "#e65100", icon: "⚠️" };
    return { label: "Needs Improvement", color: "#c62828", icon: "📚" };
  };

  const meta = CATEGORY_META[category] || CATEGORY_META["General"];
  const timerPct = (time / TIMER_SECONDS) * 100;
  const timerColor = time > 15 ? "#2e7d32" : time > 8 ? "#e65100" : "#c62828";

  const styles = {
    root: {
      fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "24px 16px",
      boxSizing: "border-box",
    },
    container: {
      width: "100%",
      maxWidth: "720px",
    },
    header: {
      textAlign: "center",
      marginBottom: "28px",
    },
    logoRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      marginBottom: "6px",
    },
    logoIcon: { fontSize: "32px" },
    logoTitle: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#ffffff",
      letterSpacing: "-0.3px",
    },
    logoSub: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.6)",
      letterSpacing: "2px",
      textTransform: "uppercase",
      marginTop: "2px",
    },
    card: {
      background: "#ffffff",
      borderRadius: "20px",
      padding: "32px",
      boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
    },
    sectionLabel: {
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: "#9e9e9e",
      marginBottom: "10px",
      marginTop: "20px",
    },
    selectGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
      gap: "10px",
      marginBottom: "4px",
    },
    selectBtn: (active, color, bg, badge) => ({
      padding: "10px 14px",
      borderRadius: "10px",
      border: active ? `2px solid ${color}` : "2px solid #e0e0e0",
      background: active ? bg : "#fafafa",
      color: active ? color : "#555",
      fontWeight: active ? "700" : "500",
      fontSize: "13px",
      cursor: "pointer",
      textAlign: "center",
      transition: "all 0.18s",
      boxShadow: active ? `0 2px 12px ${color}33` : "none",
    }),
    startBtn: {
      width: "100%",
      padding: "16px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #0f2027, #2c5364)",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "700",
      border: "none",
      cursor: "pointer",
      marginTop: "28px",
      letterSpacing: "0.5px",
      boxShadow: "0 8px 24px rgba(15,32,39,0.4)",
      transition: "transform 0.15s, box-shadow 0.15s",
    },
    // Quiz stage
    progressBar: {
      height: "6px",
      background: "#e8e8e8",
      borderRadius: "3px",
      marginBottom: "24px",
      overflow: "hidden",
    },
    progressFill: (pct) => ({
      height: "100%",
      width: `${pct}%`,
      background: "linear-gradient(90deg, #1565c0, #42a5f5)",
      borderRadius: "3px",
      transition: "width 0.4s ease",
    }),
    topRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    categoryPill: {
      background: meta.badge,
      color: meta.color,
      fontSize: "12px",
      fontWeight: "700",
      padding: "5px 12px",
      borderRadius: "20px",
      letterSpacing: "0.5px",
    },
    questionNum: {
      fontSize: "13px",
      color: "#9e9e9e",
      fontWeight: "600",
    },
    timerCircle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    timerNumber: {
      fontSize: "20px",
      fontWeight: "800",
      color: timerColor,
      lineHeight: 1,
      transition: "color 0.3s",
    },
    timerLabel: {
      fontSize: "9px",
      color: "#bbb",
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    timerBar: {
      height: "4px",
      background: "#f0f0f0",
      borderRadius: "2px",
      marginBottom: "20px",
      overflow: "hidden",
    },
    timerFill: {
      height: "100%",
      width: `${timerPct}%`,
      background: timerColor,
      borderRadius: "2px",
      transition: "width 1s linear, background 0.3s",
    },
    question: {
      fontSize: "17px",
      fontWeight: "600",
      color: "#1a1a1a",
      lineHeight: "1.55",
      marginBottom: "24px",
    },
    optionsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "10px",
      marginBottom: "20px",
    },
    option: (i, selected, answer, locked) => {
      let bg = "#f7f8f9";
      let border = "2px solid #e0e0e0";
      let color = "#2c2c2c";
      let shadow = "none";
      if (locked) {
        if (i === answer) {
          bg = "#e8f5e9"; border = "2px solid #2e7d32"; color = "#1b5e20"; shadow = "0 2px 8px #2e7d3222";
        } else if (i === selected) {
          bg = "#ffebee"; border = "2px solid #c62828"; color = "#c62828";
        }
      }
      return {
        padding: "13px 14px",
        borderRadius: "12px",
        border,
        background: bg,
        color,
        fontSize: "14px",
        fontWeight: "500",
        cursor: locked ? "default" : "pointer",
        textAlign: "left",
        lineHeight: "1.4",
        boxShadow: shadow,
        transition: "all 0.18s",
        position: "relative",
      };
    },
    optionLetter: {
      display: "inline-block",
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      background: "#e8e8e8",
      color: "#666",
      fontSize: "11px",
      fontWeight: "700",
      textAlign: "center",
      lineHeight: "22px",
      marginRight: "8px",
      verticalAlign: "middle",
      flexShrink: 0,
    },
    explanationBox: {
      background: "#f0f7ff",
      border: "1px solid #c5e1ff",
      borderRadius: "12px",
      padding: "14px 16px",
      marginBottom: "16px",
    },
    explanationTitle: {
      fontSize: "11px",
      fontWeight: "700",
      letterSpacing: "1.5px",
      color: "#1565c0",
      textTransform: "uppercase",
      marginBottom: "5px",
    },
    explanationText: {
      fontSize: "14px",
      color: "#1a3a5c",
      lineHeight: "1.55",
    },
    nextBtn: {
      width: "100%",
      padding: "14px",
      borderRadius: "12px",
      background: "#1565c0",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "700",
      border: "none",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    // Result
    scoreCircle: {
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #1565c0, #42a5f5)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 20px",
      boxShadow: "0 8px 32px #1565c033",
    },
    scoreNumber: {
      fontSize: "36px",
      fontWeight: "800",
      color: "#fff",
      lineHeight: 1,
    },
    scoreTotal: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.75)",
    },
    resultTitle: {
      textAlign: "center",
      fontSize: "20px",
      fontWeight: "700",
      color: "#1a1a1a",
      marginBottom: "6px",
    },
    gradeRow: {
      textAlign: "center",
      marginBottom: "24px",
    },
    gradeLabel: (color) => ({
      fontSize: "14px",
      fontWeight: "700",
      color,
    }),
    statRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: "10px",
      marginBottom: "24px",
    },
    statCard: (bg, color) => ({
      background: bg,
      borderRadius: "12px",
      padding: "14px",
      textAlign: "center",
    }),
    statNum: (color) => ({
      fontSize: "24px",
      fontWeight: "800",
      color,
      lineHeight: 1,
    }),
    statLbl: {
      fontSize: "11px",
      color: "#9e9e9e",
      marginTop: "3px",
    },
    summaryToggle: {
      background: "none",
      border: "1.5px solid #1565c0",
      color: "#1565c0",
      borderRadius: "10px",
      padding: "11px 20px",
      fontSize: "13px",
      fontWeight: "700",
      cursor: "pointer",
      width: "100%",
      marginBottom: "12px",
    },
    summaryItem: (correct) => ({
      background: correct ? "#f0fbf2" : "#fff5f5",
      border: `1px solid ${correct ? "#a5d6a7" : "#ffcdd2"}`,
      borderRadius: "10px",
      padding: "12px 14px",
      marginBottom: "8px",
    }),
    summaryQ: {
      fontSize: "13px",
      color: "#1a1a1a",
      fontWeight: "600",
      marginBottom: "4px",
    },
    summaryA: (correct) => ({
      fontSize: "12px",
      color: correct ? "#2e7d32" : "#c62828",
    }),
    restartBtn: {
      width: "100%",
      padding: "15px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #0f2027, #2c5364)",
      color: "#fff",
      fontSize: "15px",
      fontWeight: "700",
      border: "none",
      cursor: "pointer",
      marginTop: "6px",
    },
  };

  // START SCREEN
  if (stage === "start") {
    return (
      <div style={styles.root}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.logoRow}>
              <span style={styles.logoIcon}>🛡️</span>
              <span style={styles.logoTitle}>SafeLearn India</span>
            </div>
            <div style={styles.logoSub}>Disaster Preparedness Education Platform</div>
          </div>

          <div style={styles.card}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#1a1a1a" }}>Configure Your Quiz</div>
                <div style={{ fontSize: "13px", color: "#9e9e9e", marginTop: "2px" }}>Select your topic, difficulty, and region to personalize learning</div>
              </div>
            </div>

            <div style={{ height: "1px", background: "#f0f0f0", margin: "18px 0" }} />

            <div style={styles.sectionLabel}>Select Disaster Category</div>
            <div style={styles.selectGrid}>
              {CATEGORIES.map(cat => {
                const m = CATEGORY_META[cat];
                const active = category === cat;
                return (
                  <button key={cat} style={styles.selectBtn(active, m.color, m.bg, m.badge)} onClick={() => setCategory(cat)}>
                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{m.icon}</div>
                    <div>{cat}</div>
                  </button>
                );
              })}
            </div>

            <div style={styles.sectionLabel}>Difficulty Level</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              {LEVELS.map(lv => {
                const c = LEVEL_COLOR[lv];
                const active = level === lv;
                return (
                  <button key={lv} style={styles.selectBtn(active, c, active ? `${c}11` : "#fafafa", c)} onClick={() => setLevel(lv)}>
                    {lv === "Easy" ? "🟢" : lv === "Medium" ? "🟡" : "🔴"} {lv}
                  </button>
                );
              })}
            </div>

            <div style={styles.sectionLabel}>Region / Geography</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {REGIONS.map(r => {
                const active = region === r;
                return (
                  <button key={r} style={styles.selectBtn(active, "#37474f", active ? "#eceff1" : "#fafafa", "#90a4ae")} onClick={() => setRegion(r)}>
                    {r === "General" ? "🌐" : r === "Coastal" ? "🏖️" : r === "Himalayan" ? "🏔️" : "🏙️"} {r}
                  </button>
                );
              })}
            </div>

            <div style={{ background: "#f8f9fa", borderRadius: "12px", padding: "14px 16px", marginTop: "20px", display: "flex", gap: "16px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: "800", color: "#1565c0" }}>10</div>
                <div style={{ fontSize: "11px", color: "#9e9e9e" }}>Questions</div>
              </div>
              <div style={{ width: "1px", background: "#e0e0e0" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: "800", color: "#e65100" }}>25s</div>
                <div style={{ fontSize: "11px", color: "#9e9e9e" }}>Per Question</div>
              </div>
              <div style={{ width: "1px", background: "#e0e0e0" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: "800", color: "#2e7d32" }}>{CATEGORY_META[category].icon}</div>
                <div style={{ fontSize: "11px", color: "#9e9e9e" }}>{category}</div>
              </div>
              <div style={{ width: "1px", background: "#e0e0e0" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: "800", color: "#9c27b0" }}>🇮🇳</div>
                <div style={{ fontSize: "11px", color: "#9e9e9e" }}>NDMA Aligned</div>
              </div>
            </div>

            <button style={styles.startBtn} onClick={startQuiz}>
              Begin Assessment →
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
            Aligned with NDMA Guidelines · UNDRR Sendai Framework
          </div>
        </div>
      </div>
    );
  }

  // RESULT SCREEN
  if (stage === "result") {
    const grade = getGrade();
    const incorrect = results.filter(r => !r.correct).length;
    const skipped = results.filter(r => r.selected === null).length;

    return (
      <div style={styles.root}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.logoRow}>
              <span style={styles.logoIcon}>🛡️</span>
              <span style={styles.logoTitle}>SafeLearn India</span>
            </div>
            <div style={styles.logoSub}>Quiz Results</div>
          </div>

          <div style={styles.card}>
            <div style={styles.scoreCircle}>
              <div style={styles.scoreNumber}>{score}</div>
              <div style={styles.scoreTotal}>out of {questions.length}</div>
            </div>

            <div style={styles.resultTitle}>Assessment Complete</div>
            <div style={styles.gradeRow}>
              <span style={styles.gradeLabel(grade.color)}>{grade.icon} {grade.label}</span>
            </div>

            <div style={styles.statRow}>
              <div style={styles.statCard("#e8f5e9", "#2e7d32")}>
                <div style={styles.statNum("#2e7d32")}>{score}</div>
                <div style={styles.statLbl}>Correct</div>
              </div>
              <div style={styles.statCard("#ffebee", "#c62828")}>
                <div style={styles.statNum("#c62828")}>{incorrect - skipped}</div>
                <div style={styles.statLbl}>Incorrect</div>
              </div>
              <div style={styles.statCard("#fff8e1", "#e65100")}>
                <div style={styles.statNum("#e65100")}>{skipped}</div>
                <div style={styles.statLbl}>Skipped</div>
              </div>
            </div>

            <div style={{ background: "#f0f7ff", borderRadius: "12px", padding: "14px 16px", marginBottom: "20px" }}>
              <div style={{ fontSize: "12px", fontWeight: "700", color: "#1565c0", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "5px" }}>Category Insight</div>
              <div style={{ fontSize: "13px", color: "#1a3a5c" }}>
                {score >= 8 ? `Outstanding! You have strong ${category} preparedness knowledge.` :
                  score >= 5 ? `Good understanding of ${category} safety. Review the explanations to strengthen weak areas.` :
                    `Keep practicing ${category} safety protocols. Every question you review could save a life.`}
              </div>
            </div>

            <button style={styles.summaryToggle} onClick={() => setShowSummary(!showSummary)}>
              {showSummary ? "▲ Hide Answer Review" : "▼ Review All Answers"}
            </button>

            {showSummary && (
              <div style={{ marginBottom: "16px", maxHeight: "320px", overflowY: "auto" }}>
                {results.map((r, i) => (
                  <div key={i} style={styles.summaryItem(r.correct)}>
                    <div style={styles.summaryQ}>Q{i + 1}. {r.q.q}</div>
                    <div style={styles.summaryA(r.correct)}>
                      {r.selected !== null
                        ? `${r.correct ? "✓ Correct:" : "✗ You answered:"} ${r.q.options[r.selected]}`
                        : "⏱ Time expired"}
                      {!r.correct && r.selected !== null && ` — Correct: ${r.q.options[r.q.answer]}`}
                    </div>
                    <div style={{ fontSize: "12px", color: "#555", marginTop: "4px" }}>💡 {r.q.explain}</div>
                  </div>
                ))}
              </div>
            )}

            <button style={styles.restartBtn} onClick={() => setStage("start")}>
              ↩ Start New Quiz
            </button>
          </div>

          <div style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
            SafeLearn India · Powered by NDMA Guidelines
          </div>
        </div>
      </div>
    );
  }

  // QUIZ SCREEN
  const q = questions[current];
  const progressPct = ((current) / questions.length) * 100;
  const letters = ["A", "B", "C", "D"];

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.logoRow}>
            <span style={styles.logoIcon}>🛡️</span>
            <span style={styles.logoTitle}>SafeLearn India</span>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.progressBar}>
            <div style={styles.progressFill(progressPct)} />
          </div>

          <div style={styles.topRow}>
            <span style={styles.categoryPill}>{meta.icon} {category} · {level}</span>
            <div style={styles.timerCircle}>
              <div style={styles.timerNumber}>{time}</div>
              <div style={styles.timerLabel}>sec</div>
            </div>
            <span style={styles.questionNum}>Q {current + 1} / {questions.length}</span>
          </div>

          <div style={styles.timerBar}>
            <div style={styles.timerFill} />
          </div>

          <div style={styles.question}>{q.q}</div>

          <div style={styles.optionsGrid}>
            {q.options.map((opt, i) => (
              <button
                key={i}
                style={styles.option(i, selected, q.answer, locked)}
                onClick={() => handleAnswer(i)}
                disabled={locked}
              >
                <span style={{
                  ...styles.optionLetter,
                  background: locked && i === q.answer ? "#c8e6c9" : locked && i === selected ? "#ffcdd2" : "#e8e8e8",
                  color: locked && i === q.answer ? "#2e7d32" : locked && i === selected ? "#c62828" : "#666",
                }}>
                  {letters[i]}
                </span>
                {opt}
              </button>
            ))}
          </div>

          {locked && (
            <div>
              <div style={styles.explanationBox}>
                <div style={styles.explanationTitle}>📌 Explanation</div>
                <div style={styles.explanationText}>{q.explain}</div>
              </div>
              <button style={styles.nextBtn} onClick={advance}>
                {current + 1 < questions.length ? "Next Question →" : "View Results →"}
              </button>
            </div>
          )}

          {!locked && (
            <div style={{ textAlign: "center", fontSize: "12px", color: "#bbb", marginTop: "4px" }}>
              Score: {score} · Region: {region}
            </div>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
          SafeLearn India · NDMA · Emergency: 112
        </div>
      </div>
    </div>
  );
}