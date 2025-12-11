import React, { useState, useEffect } from "react";
import { mockCrimes } from "../../data/mockData";

const API_BASE_URL = "http://localhost:8000/api";

const LinkPredictionTab = () => {
  const [selectedCrime, setSelectedCrime] = useState(null);
  const [relatedCrimes, setRelatedCrimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isPreprocessed, setIsPreprocessed] = useState(false);
  const [error, setError] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);

  // Check API health on component mount
  useEffect(() => {
    checkAPIHealth();
  }, []);

  const checkAPIHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();

      if (data.status === "ok") {
        setModelInfo(data.model_info);
        if (data.model_loaded) {
          console.log("✓ API connected, model loaded");
        } else {
          console.log("✓ API connected, running in MOCK mode");
          setError("Running in MOCK mode - using simulated data");
        }
      } else {
        setError("API not available");
      }
    } catch (err) {
      setError("Cannot connect to API. Please start backend server.");
      console.error("API Health Check Error:", err);
    }
  };

  const preprocessData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/prediction/preprocess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crime_data: mockCrimes.map(crime => ({
            ID: crime.id,
            "Primary Type": crime.type,
            Description: crime.description,
            Latitude: crime.lat,
            Longitude: crime.lng,
            Date: crime.date || new Date().toISOString(),
            Arrest: Math.random() > 0.7,
            Domestic: Math.random() > 0.8,
            District: crime.district || 1,
            Ward: Math.floor(Math.random() * 50) + 1,
            "Community Area": Math.floor(Math.random() * 77) + 1,
            "Location Description": crime.location || "STREET"
          }))
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsPreprocessed(true);
        console.log(`✓ Preprocessed: ${data.num_nodes} nodes, ${data.num_edges} edges`);
      } else {
        setError(data.error || "Preprocessing failed");
      }
    } catch (err) {
      setError("Error preprocessing data: " + err.message);
      console.error("Preprocess Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const predictRelatedCrimes = async (crimeIdx) => {
    if (!isPreprocessed) {
      try {
        await preprocessData();
      } catch (err) {
        console.log("Skipping preprocess, continuing with prediction");
        setIsPreprocessed(true); // Mark as preprocessed to skip next time
      }
    }

    setIsPredicting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/prediction/predict/related`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          crime_data: mockCrimes.map(crime => ({
            ID: crime.id,
            "Primary Type": crime.type,
            Description: crime.description,
            Latitude: crime.lat,
            Longitude: crime.lng,
            Date: crime.date || new Date().toISOString(),
            Arrest: Math.random() > 0.7,
            Domestic: Math.random() > 0.8,
            District: crime.district || 1,
            Ward: Math.floor(Math.random() * 50) + 1,
            "Community Area": Math.floor(Math.random() * 77) + 1,
            "Location Description": crime.location || "STREET"
          })),
          crime_idx: crimeIdx,
          top_k: 10,
          threshold: 0.5
        }),
      });

      const data = await response.json();

      if (data.success) {
        setRelatedCrimes(data.related_crimes);
        console.log(`✓ Found ${data.num_results} related crimes`);
      } else {
        setError(data.error || "Prediction failed");
      }
    } catch (err) {
      setError("Error predicting: " + err.message);
      console.error("Predict Error:", err);
    } finally {
      setIsPredicting(false);
    }
  };

  const handleCrimeSelect = (crime, idx) => {
    setSelectedCrime({ ...crime, idx });
    setRelatedCrimes([]);
    predictRelatedCrimes(idx);
  };

  return (
    <div className="link-prediction-container">
      <div className="section-header">
        <h2>🔗 Crime Link Prediction (GraphSAGE/GAT)</h2>
        <p>Dự đoán các vụ án liên quan bằng Graph Neural Network</p>
      </div>

      {/* API Status */}
      <div className={`api-status ${error ? "error" : modelInfo ? "success" : "warning"}`}>
        {error && (
          <>
            <span className="status-icon">⚠️</span>
            <div className="status-text">
              <strong>API Error:</strong> {error}
              <button onClick={checkAPIHealth} className="retry-btn">Retry</button>
            </div>
          </>
        )}
        {modelInfo && !error && (
          <>
            <span className="status-icon">✓</span>
            <div className="status-text">
              <strong>Model Loaded:</strong> {modelInfo.model_name} |
              Device: {modelInfo.device} |
              Features: {modelInfo.num_features}
            </div>
          </>
        )}
      </div>

      <div className="link-prediction-content">
        {/* Crime Selection */}
        <div className="crime-selection-panel">
          <h3>Chọn vụ án để phân tích</h3>

          {!isPreprocessed && (
            <button
              onClick={preprocessData}
              disabled={isLoading}
              className="preprocess-btn"
            >
              {isLoading ? "⏳ Đang tiền xử lý..." : "🔄 Tiền xử lý dữ liệu"}
            </button>
          )}

          <div className="crime-list">
            {mockCrimes.map((crime, idx) => (
              <div
                key={crime.id}
                className={`crime-item ${selectedCrime?.id === crime.id ? "selected" : ""}`}
                onClick={() => !isPredicting && handleCrimeSelect(crime, idx)}
              >
                <div className="crime-item-header">
                  <span className="crime-id">#{crime.id}</span>
                  <span className={`crime-type-badge ${crime.type.toLowerCase().replace(/\s+/g, '-')}`}>
                    {crime.type}
                  </span>
                </div>
                <div className="crime-item-desc">{crime.description}</div>
                <div className="crime-item-location">
                  📍 {crime.lat.toFixed(4)}, {crime.lng.toFixed(4)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prediction Results */}
        <div className="prediction-results-panel">
          <h3>Kết quả dự đoán</h3>

          {selectedCrime && (
            <div className="selected-crime-info">
              <h4>Vụ án đang phân tích:</h4>
              <div className="crime-card-highlight">
                <div className="crime-type">{selectedCrime.type}</div>
                <div className="crime-desc">{selectedCrime.description}</div>
                <div className="crime-coords">
                  Tọa độ: {selectedCrime.lat.toFixed(4)}, {selectedCrime.lng.toFixed(4)}
                </div>
              </div>
            </div>
          )}

          {isPredicting && (
            <div className="loading-prediction">
              <div className="loading-spinner"></div>
              <p>Đang chạy GNN model để dự đoán...</p>
            </div>
          )}

          {!isPredicting && relatedCrimes.length > 0 && (
            <div className="related-crimes-list">
              <h4>✨ {relatedCrimes.length} vụ án liên quan (theo GraphSAGE/GAT):</h4>
              {relatedCrimes.map((related, idx) => (
                <div key={idx} className="related-crime-card">
                  <div className="related-crime-header">
                    <span className="crime-id">#{related.crime_id}</span>
                    <span className="probability-badge">
                      {(related.probability * 100).toFixed(1)}% khả năng liên quan
                    </span>
                  </div>
                  <div className="related-crime-type">{related.crime_type}</div>
                  <div className="related-crime-desc">{related.description}</div>
                  <div className="related-crime-meta">
                    <span>📍 {related.lat.toFixed(4)}, {related.lng.toFixed(4)}</span>
                    <span>📅 {related.date}</span>
                    {related.arrest && <span className="arrest-badge">🚔 Có bắt giữ</span>}
                  </div>
                  <div className="probability-bar">
                    <div
                      className="probability-fill"
                      style={{ width: `${related.probability * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isPredicting && selectedCrime && relatedCrimes.length === 0 && !error && (
            <div className="no-results">
              <p>Không tìm thấy vụ án liên quan với xác suất {'>'} 50%</p>
            </div>
          )}

          {!selectedCrime && !isPredicting && (
            <div className="placeholder">
              <p>👈 Chọn một vụ án bên trái để xem dự đoán</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkPredictionTab;
