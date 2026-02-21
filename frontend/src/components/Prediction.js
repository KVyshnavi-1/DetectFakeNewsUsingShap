import React, { useState } from "react";

function Prediction({ addToHistory }) {

  const [text, setText] = useState("");

  const [model, setModel] = useState("svm");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const [explanation, setExplanation] = useState([]);


  // CALL BACKEND
  const analyze = async () => {

    setLoading(true);

    setResult(null);

    setExplanation([]);

    try {

      const response = await fetch("http://127.0.0.1:8000/predict", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          text: text
        })

      });

      const data = await response.json();

      console.log("Backend response:", data);

      const res = {

        verdict: data.verdict,

        confidence: Math.round(data.confidence * 100),

        model,

        timestamp: new Date().toLocaleString()

      };

      setResult(res);

      setExplanation(data.important_words || []);

      addToHistory(res);

    }
    catch (error) {

      console.error(error);

      alert("Backend error. Make sure backend is running.");

    }

    setLoading(false);

  };


  // CLASS FOR COLOR
  const vClass = result
    ? result.verdict === "FAKE" ? "fake" : "real"
    : "";


  // HIGHLIGHT FUNCTION
  const highlightText = () => {

    if (!result || explanation.length === 0) return text;

    let words = text.split(" ");

    return words.map((word, index) => {

      const found = explanation.find(
        item =>
          item.word.toLowerCase() ===
          word.toLowerCase().replace(/[^a-z]/g, "")
      );

      if (found) {

        const color =
          found.impact > 0 ? "#16a34a" : "#dc2626";

        return (
          <span
            key={index}
            style={{
              backgroundColor: color,
              color: "white",
              padding: "3px 6px",
              margin: "2px",
              borderRadius: "4px",
              display: "inline-block"
            }}
          >
            {word + " "}
          </span>
        );

      }

      return word + " ";

    });

  };


  return (

    <div className="page">

      <p className="page-eyebrow">
        AI-Powered Detection
      </p>

      <h1 className="page-title">
        Analyze an Article
      </h1>

      <p className="page-subtitle">
        Paste any news text and let our machine learning classifiers determine its authenticity.
      </p>


      <div className="prediction-grid">


        {/* LEFT PANEL */}

        <div className="panel">

          <div className="panel-title">
            Configure & Input
          </div>


          <label className="form-label">
            Classifier Model
          </label>

          <select
            value={model}
            onChange={(e) =>
              setModel(e.target.value)
            }
          >

            <option value="svm">
              Support Vector Machine (SVM)
            </option>

            <option value="nb">
              Naïve Bayes
            </option>

          </select>


          <label className="form-label">
            Article / Headline
          </label>

          <textarea

            placeholder="Paste news article here..."

            value={text}

            onChange={(e) =>
              setText(e.target.value)
            }

          />

          <div className="char-count">
            {text.length} characters
          </div>


          <button

            className="analyze-btn"

            onClick={analyze}

            disabled={
              loading ||
              !text.trim()
            }

          >

            {loading
              ? "Analyzing..."
              : "Run Classification →"}

          </button>

        </div>



        {/* RIGHT PANEL */}

        <div className="result-panel">

          {!result ? (

            <div className="result-empty">

              <p>
                Result will appear here
              </p>

            </div>

          ) : (

            <>

              <div className="panel-title">
                Classification Result
              </div>


              <h2 className={vClass}>
                {result.verdict}
              </h2>


              <p>

                Confidence:
                {" "}
                {result.confidence}%

              </p>


              {/* Progress Bar */}

              <div className="progress">

                <div

                  className={`progress-fill ${vClass}`}

                  style={{
                    width:
                      `${result.confidence}%`
                  }}

                />

              </div>



              {/* SHAP WORD LIST */}

              <div style={{
                marginTop: "20px"
              }}>

                <strong>
                  Important Words (SHAP):
                </strong>

                {explanation.map(
                  (item, index) => (

                    <div key={index}>

                      {item.word}
                      {" "}
                      :
                      {" "}
                      {item.impact.toFixed(4)}

                    </div>

                  )
                )}

              </div>



              {/* HIGHLIGHTED TEXT */}

              <div style={{
                marginTop: "20px"
              }}>

                <strong>
                  Highlighted Explanation:
                </strong>

                <div style={{

                  padding: "12px",

                  border:
                    "1px solid #e5e7eb",

                  borderRadius: "8px",

                  marginTop: "10px",

                  lineHeight: "1.8"

                }}>

                  {highlightText()}

                </div>

              </div>


              {/* TIMESTAMP */}

              <div style={{
                marginTop: "15px",
                fontSize: "13px",
                color: "#555"
              }}>

                Analyzed at:
                {" "}
                {result.timestamp}

              </div>


            </>

          )}

        </div>


      </div>

    </div>

  );

}

export default Prediction;
