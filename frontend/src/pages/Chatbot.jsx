import { useState, useRef, useEffect } from "react";
import { chatBot } from "../services/api";

// ✅ Smart keyword fallback when backend is offline
const fallbackReply = (message) => {
  const m = message.toLowerCase();
  if (m.includes("earthquake"))
    return "🏠 During an earthquake: DROP to hands and knees, take COVER under a sturdy table, and HOLD ON until shaking stops. Stay away from windows.";
  if (m.includes("flood"))
    return "🌊 During a flood: Move immediately to higher ground. Do not walk or drive through floodwater. 6 inches of water can knock you down.";
  if (m.includes("fire") || m.includes("wildfire"))
    return "🔥 During a fire: Evacuate immediately. Use stairs, never lifts. Crawl low under smoke. Alert others and call 112.";
  if (m.includes("cyclone") || m.includes("hurricane") || m.includes("storm"))
    return "🌀 During a cyclone: Stay indoors, away from windows. Secure loose objects. Follow evacuation orders from authorities.";
  if (m.includes("tsunami"))
    return "🌊 Tsunami warning: Move inland and to high ground immediately. Do not wait to see the wave. A tsunami can arrive in minutes.";
  if (m.includes("landslide"))
    return "⛰️ During a landslide: Move away from the path quickly. Avoid valleys and low-lying areas. Listen for rumbling sounds.";
  if (m.includes("hello") || m.includes("hi"))
    return "👋 Hello! I'm your AI Disaster Safety Assistant. Ask me about earthquakes, floods, fires, cyclones, or any disaster safety tips!";
  if (m.includes("help"))
    return "🆘 I can help you with: earthquake safety, flood tips, fire evacuation, cyclone preparedness, tsunami alerts, and first aid basics. What do you need?";
  return "🛡️ Stay calm and follow official safety procedures. For emergencies call 112. Ask me about a specific disaster type for detailed guidance.";
};

const SUGGESTIONS = [
  "Earthquake safety tips",
  "Flood emergency steps",
  "Fire evacuation guide",
  "Cyclone preparedness",
];

export default function Chatbot() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([
    { bot: "👋 Hello! I'm your AI Disaster Safety Assistant. Ask me about earthquakes, floods, fires, cyclones, or any emergency!" }
  ]);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  const send = async (message) => {
    const text = message || msg;
    if (!text.trim()) return;

    setChat(prev => [...prev, { user: text }]);
    setMsg("");
    setTyping(true);

    try {
      const res = await chatBot({ message: text });
      if (res?.data?.reply) {
        setChat(prev => [...prev, { bot: res.data.reply }]);
      } else {
        throw new Error("No reply");
      }
    } catch {
      // Fallback keeps the chatbot working even if backend is down
      setChat(prev => [...prev, { bot: fallbackReply(text) }]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") send();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  return (
    <div className="chatbot-page">

      <div className="chatbot-header">
        <div className="chatbot-avatar">🤖</div>
        <div>
          <h1>AI Disaster Assistant</h1>
          <span className="chatbot-status">● Online</span>
        </div>
      </div>

      {/* Suggestion pills */}
      <div className="chatbot-suggestions">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            className="suggestion-pill"
            onClick={() => send(s)}
            type="button"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Chat messages */}
      <div className="chat-box">
        {chat.map((c, i) => (
          <div key={i} className={`msg ${c.user ? "user" : "bot"}`}>
            {c.bot && <span className="msg-avatar">🤖</span>}
            <span className="msg-text">{c.user || c.bot}</span>
            {c.user && <span className="msg-avatar">🧑</span>}
          </div>
        ))}

        {typing && (
          <div className="msg bot">
            <span className="msg-avatar">🤖</span>
            <span className="msg-text typing-dots">
              <span /><span /><span />
            </span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input-row">
        <input
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about disasters... (e.g. earthquake safety)"
        />
        <button onClick={() => send()} type="button" className="send-btn">
          Send ➤
        </button>
      </div>

    </div>
  );
}