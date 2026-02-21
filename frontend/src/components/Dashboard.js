import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid
} from "recharts";

function Dashboard() {

  // Model accuracy data
  const modelData = [
    { name: "SVM", accuracy: 99.53 },
    { name: "Naive Bayes", accuracy: 94.48 }
  ];

  // Dataset distribution
  const datasetData = [
    { name: "Fake News", value: 23481 },
    { name: "Real News", value: 21417 }
  ];

  const COLORS = ["#dc2626", "#16a34a"];

  return (

    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Fake News Detection Dashboard
      </h1>


      {/* Charts Section */}

      <div className="chart-grid">

        {/* Model Accuracy */}

        <div className="chart-card">

          <h3 className="chart-title">
            Model Accuracy Comparison
          </h3>

          <ResponsiveContainer width="100%" height={250}>

            <BarChart data={modelData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis domain={[90, 100]} />

              <Tooltip />

              <Bar
                dataKey="accuracy"
                fill="#2563eb"
                radius={[6,6,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>


        {/* Dataset Distribution */}

        <div className="chart-card">

          <h3 className="chart-title">
            Dataset Distribution
          </h3>

          <ResponsiveContainer width="100%" height={250}>

            <PieChart>

              <Pie
                data={datasetData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >

                {datasetData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />

                ))}

              </Pie>

              <Legend />

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* Project Summary */}

      <div className="chart-card chart-full" style={{marginTop:"25px"}}>

        <h3 className="chart-title">
          Project Summary
        </h3>

        <p>

          This Fake News Detection system uses Natural Language Processing and Machine Learning 
          to classify news articles as Fake or Real. The model was trained on a dataset containing 
          44,898 news articles using TF-IDF vectorization and classification algorithms.

        </p>

        <p style={{marginTop:"10px"}}>

          The Support Vector Machine (SVM) achieved the highest accuracy of 
          <strong> 99.53% </strong> demonstrating strong performance in detecting misinformation.

        </p>

      </div>


      {/* Model Insights */}

      <div className="chart-card chart-full" style={{marginTop:"25px"}}>

        <h3 className="chart-title">
          Model Insights
        </h3>

        <ul>

          <li>Dataset size: 44,898 news articles</li>

          <li>Feature extraction method: TF-IDF (5000 features)</li>

          <li>Best performing model: Support Vector Machine</li>

          <li>Evaluation metrics: Accuracy, Precision, Recall, F1-score</li>

          <li>Model trained using supervised learning</li>

        </ul>

      </div>


      {/* Explainability */}

      <div className="chart-card chart-full" style={{marginTop:"25px"}}>

        <h3 className="chart-title">
          Model Explainability
        </h3>

        <p>

          SHAP (SHapley Additive Explanations) was used to interpret model predictions. 
          It identifies important words influencing classification decisions, improving 
          transparency and trust in the AI system.

        </p>

      </div>


    </div>

  );

}

export default Dashboard;
