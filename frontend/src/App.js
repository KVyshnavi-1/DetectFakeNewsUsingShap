import React, { useState } from "react";
import Prediction from "./components/Prediction";
import History from "./components/History";
import Dashboard from "./components/Dashboard";
import "./style.css";

function App() {
  const [activeTab, setActiveTab] = useState("prediction");
  const [history, setHistory] = useState([]);

  const addToHistory = (data) => {
    setHistory((prev) => [data, ...prev]);
  };

  const tabs = [
    { id: "prediction", label: "Prediction" },
    { id: "history",    label: "History" },
    { id: "dashboard",  label: "Dashboard" },
  ];

  return (
    <>
      {/* ── TOP NAVBAR ── */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-dot" />
          Fake News Detector
        </div>

        <div className="navbar-nav">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={activeTab === t.id ? "active" : ""}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="navbar-badge">SVM · Naïve Bayes</div>
      </nav>

      {/* ── PAGE CONTENT ── */}
      {activeTab === "prediction" && <Prediction addToHistory={addToHistory} />}
      {activeTab === "history"    && <History history={history} />}
      {activeTab === "dashboard"  && <Dashboard history={history} />
}
    </>
  );
}

export default App;