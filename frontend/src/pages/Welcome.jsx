import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Welcome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="welcome-container">

      <div className={`welcome-navbar${scrolled ? " scrolled" : ""}`}>
        <h2 className="logo">🌍 DisasterSafe</h2>
        <div>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/register" className="nav-btn primary">Register</Link>
        </div>
      </div>

      <div className="hero">
        <div className="hero-left">
          <div className="hero-badge"> AI-Powered Safety Platform</div>
          <h1>
            Smart Disaster <br />
            <span>Awareness Platform</span>
          </h1>
          <p>
            Empowering students with real-time alerts, AI predictions, and
            interactive learning to stay safe during disasters.
          </p>
          <div className="hero-buttons">
            {/* ✅ Get Started → /login which clears stale session on mount */}
            <Link to="/login" className="btn primary">Get Started </Link>
            <Link to="/login" className="btn secondary">Login</Link>
          </div>
          
        </div>

        <div className="hero-right">
          <div className="hero-img-wrapper">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1684/1684375.png"
              alt="disaster"
            />
            <div className="hero-glow" />
          </div>
        </div>
      </div>

      <div className="features-section">
        
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Interactive Learning</h3>
            <p>Engaging modules with real-world disaster scenarios and simulations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Real-Time Alerts</h3>
            <p>Instant alerts for earthquakes, floods, and emergencies near you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>AI Prediction</h3>
            <p>Predict risks using intelligent data analytics and machine learning.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"></div>
            <h3>Gamified Quizzes</h3>
            <p>Learn safety through fun and interactive gamified quizzes.</p>
          </div>
        </div>
      </div>

      <div className="cta">
        <h2>Be Prepared Before Disaster Strikes </h2>
        <p>Join thousands of students learning to stay safe.</p>
        <Link to="/login" className="btn primary">Join Now — It's Free</Link>
      </div>

      <div className="footer">
        <p>© 2026 DisasterSafe | Built for safer education</p>
      </div>

    </div>
  );
}