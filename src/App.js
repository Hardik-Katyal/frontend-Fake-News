import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [region, setRegion] = useState("global");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [explanation, setExplanation] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Timer management
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      window.location.href = "/login";
    } else {
      setIsAuthenticated(true);
    }
    setIsCheckingAuth(false);
  }, []);

  const suspiciousWords = [
    "breaking", "exclusive", "shocking", "miracle", "cure", "urgent", "scandal", "alert", "viral", "banned",  
    "unbelievable", "mind-blowing", "jaw-dropping", "explosive", "secret", "hidden truth", "they don’t want you to know",  
    "leaked", "forbidden", "censored", "cover-up", "mainstream media won’t tell you", "no one is talking about",  

    // Fear/Outrage Triggers  
    "warning", "danger", "emergency", "crisis", "panic", "chaos", "disaster", "terrifying", "horrifying",  
    "evil", "corrupt", "treason", "betrayal", "hoax", "fake", "fraud", "lies", "propaganda",  

    // Clickbait & Overpromising  
    "you won’t believe", "what happens next will shock you", "this one trick", "doctors hate this",  
    "instantly", "overnight", "guaranteed", "proven", "scientific breakthrough", "life-changing",  
    "never before seen", "the truth about", "exposed", "finally revealed",  

    // Conspiracy-Language  
    "deep state", "global elite", "agenda", "sheeple", "wake up", "false flag", "controlled opposition",  
    "mainstream media lies", "fact-checkers are hiding", "big pharma", "big tech", "the establishment",  

    // Political/Divisive Manipulation  
    "liberal meltdown", "conservative nightmare", "leftist agenda", "right-wing extremist",  
    "socialist takeover", "fascist regime", "deepfake news", "brainwashed masses",  

    // Health/Wealth Scams  
    "lose weight fast", "cures cancer", "ancient remedy", "big pharma doesn’t want you to know",  
    "earn money from home", "get rich quick", "government is hiding", "secret diet",  
    "magic pill", "one weird trick", "scientifically proven", "doctors baffled"  
  ];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict/", {
        title,
        text,
        region,
      });

      setPrediction(response.data.prediction);
      setConfidence(response.data.confidence);
      setExplanation(""); // Reset explanation on new analysis
    } catch (error) {
      console.error("Error during API request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const highlightText = (inputText) => {
    if (!inputText) return null;
    
    let highlightedText = inputText;
    
    suspiciousWords.forEach((phrase) => {
      const escapedPhrase = phrase.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(${escapedPhrase})`, "gi");
      highlightedText = highlightedText.replace(regex, '<mark class="suspicious">$1</mark>');
    });
    
    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const handleGeminiVerify = async () => {
    if (cooldown > 0) return;
    
    try {
      setCooldown(2); // 2-second cooldown
      const response = await axios.post(
        "http://127.0.0.1:8000/gemini-explain/",
        { 
          title,
          text,
          prediction,
          confidence 
        }
      );
      
      setExplanation(response.data.explanation);
    } catch (error) {
      console.error("Gemini explanation failed:", error);
      setExplanation("Could not get explanation. Try again later.");
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container">
      <h1 className="main-title">Fake News Detection</h1>

      <div className="dropdown-container">
        <label htmlFor="region-select" className="dropdown-label">
          Select Region:
        </label>
        <select
          id="region-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="dropdown"
          disabled={isLoading}
        >
          <option value="global">Global</option>
          <option value="india">India</option>
          <option value="us">United States</option>
        </select>
      </div>

      <div className="content-wrapper">
        <form className="prediction-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setPrediction("");  // Reset prediction when title changes
                setConfidence(0);   // Reset confidence score
                setExplanation(""); // Clear previous explanation
              }}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label>Text:</label>
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setPrediction("");  // Reset prediction when text changes
                setConfidence(0);   // Reset confidence score
                setExplanation(""); // Clear previous explanation
              }}
              required
              disabled={isLoading}
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Analyzing...
              </>
            ) : (
              "Submit for Analysis"
            )}
          </button>

          {prediction && (
            <div className="result-container">
              <div className="result-section">
                <h3>Analyzed Text:</h3>
                <div className="highlighted-text">
                  {highlightText(text)}
                </div>
                  <button 
                    className="gemini-verify-btn"
                    onClick={handleGeminiVerify}
                    type="button"
                    disabled={cooldown > 0}
                  >
                    Explain Prediction
                    {cooldown > 0 && (
                      <span className="cooldown-timer">
                        ({cooldown}s cooldown)
                      </span>
                    )}
                  </button>

              </div>

              <div className="prediction-section">
                <h2 className={prediction.toLowerCase() === "fake" ? "prediction-fake" : "prediction-real"}>
                  Prediction: {prediction}
                </h2>
                <p>Confidence: {(confidence * 100).toFixed(2)}%</p>
              </div>

              {explanation && (
                <div className="explanation-box">
                  <h4>Model Behavior Analysis:</h4>
                  {explanation.split('\n').map((line, index) => (
                    <div key={index} className="explanation-line">
                      {line}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;