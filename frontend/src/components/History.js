import React from "react";

function History({ history }) {
  return (
    <div className="page">
      <p className="page-eyebrow">Log</p>
      <h1 className="page-title">Analysis History</h1>
      <p className="page-subtitle">
        Every article you've run through the classifier, in reverse chronological order.
      </p>

      {history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-glyph">◷</div>
          <p>No analyses yet. Run your first prediction to see results here.</p>
        </div>
      ) : (
        <div className="history-list">
          {history.map((item, i) => {
            const vClass = item.verdict === "FAKE" ? "fake" : "real";
            return (
              <div className="history-card" key={i}>
                <div>
                  <div className="hc-text">{item.text}</div>
                  <div className="hc-meta">
                    <span>{item.model === "svm" ? "SVM" : "Naïve Bayes"}</span>
                    <span className="dot" />
                    <span>{item.confidence}% confidence</span>
                    <span className="dot" />
                    <span>{item.timestamp}</span>
                  </div>
                </div>
                <span className={`verdict-pill ${vClass}`}>{item.verdict}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;