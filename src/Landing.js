import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  const navigate = useNavigate();

  
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero">
        <nav className="navbar">
          <div className="logo" onClick={() => window.scrollTo(0, 0)}>
            <span className="logo-icon">🛡️</span>
            <h1>NewsSafe</h1>
          </div>
          <div className="nav-actions">
            <button className="btn-outline" onClick={() => navigate('/login')}>Login</button>
            <button className="btn-primary" onClick={() => navigate('/register')}>Register</button>
          </div>
        </nav>

        <div className="hero-content">
          <div className="hero-text">
            <h2>Fight Misinformation with AI-Powered Verification</h2>
            <p>
              Our advanced detection system analyzes news content in real-time, 
              helping you identify potentially misleading information before you share it!
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => navigate('/register')}>
                Get Started - It's Free
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-placeholder"></div>
          </div>
        </div>
      </header>

      {/* Value Proposition */}
      <section className="value-props">
        <div className="prop-card">
          <div className="prop-icon">🔍</div>
          <h3>Deep Analysis</h3>
          <p>Our AI examines multiple credibility factors beyond simple keyword matching.</p>
        </div>
        <div className="prop-card">
          <div className="prop-icon">⚡</div>
          <h3>Real-Time Results</h3>
          <p>Get instant credibility assessments without waiting for manual reviews.</p>
        </div>
        <div className="prop-card">
          <div className="prop-icon">📊</div>
          <h3>Confidence Scoring</h3>
          <p>See percentage-based reliability ratings for every analysis.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How NewsSafe Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Paste Article Text</h3>
              <p>Copy and paste the news content you want to verify.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>AI Analysis</h3>
              <p>Our system processes the text using multiple detection models.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Get Results</h3>
              <p>Receive a detailed report with highlighted concerns and confidence score.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Verify Your News?</h2>
        <p>Join thousands of users who trust NewsSafe for credible information.</p>
        <div className="cta-buttons">
          <button className="btn-primary" onClick={() => navigate('/register')}>
            Create Free Account
          </button>
          <button className="btn-outline" onClick={() => navigate('/login')}>
            Existing User? Login
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">🛡️</span>
            <h3>NewsSafe</h3>
          </div>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-copy">
            <p>© {new Date().getFullYear()} NewsSafe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;