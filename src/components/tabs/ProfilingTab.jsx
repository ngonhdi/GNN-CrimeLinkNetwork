import React from "react";
import RadarChart from "../shared/RadarChart.jsx";
import { radarDataByCluster, radarLabels } from "../../data/mockData";

const ProfilingTab = ({ selectedCluster, setSelectedCluster, showExplanation, setShowExplanation }) => {
  const currentRadarData = selectedCluster ? radarDataByCluster[selectedCluster] : null;

  return (
    <>
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">Phân tích Hồ sơ Đối tượng</h2>
        </div>
        <div className="cluster-selector">
          <button
            className={`cluster-btn ${selectedCluster === "A" ? "active" : ""}`}
            onClick={() => {
              setSelectedCluster("A");
              setShowExplanation(true);
            }}
          >
            Cluster A - Trộm xe
          </button>
          <button
            className={`cluster-btn ${selectedCluster === "B" ? "active" : ""}`}
            onClick={() => {
              setSelectedCluster("B");
              setShowExplanation(true);
            }}
          >
            Cluster B - Ma túy
          </button>
          <button
            className={`cluster-btn ${selectedCluster === "C" ? "active" : ""}`}
            onClick={() => {
              setSelectedCluster("C");
              setShowExplanation(true);
            }}
          >
            Cluster C - Đột nhập
          </button>
        </div>

        {selectedCluster && currentRadarData && (
          <>
            <RadarChart data={currentRadarData} labels={radarLabels} />
            <div className="legend">
              <div className="legend-item">
                <div className="legend-dot city"></div>
                <span>Trung bình Chicago</span>
              </div>
              <div className="legend-item">
                <div className="legend-dot group"></div>
                <span>
                  Cluster {selectedCluster} - {currentRadarData.name}
                </span>
              </div>
            </div>
          </>
        )}

        {!selectedCluster && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#6b7c93" }}>
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ opacity: 0.3, marginBottom: "15px" }}
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            <p>Chọn một Cluster để xem phân tích chi tiết</p>
          </div>
        )}
      </div>

      <div className="control-panel">
        {showExplanation && currentRadarData && (
          <div className="panel">
            <div className="panel-header">
              <h2 className="panel-title">Chi tiết Cluster {selectedCluster}</h2>
            </div>

            <div
              style={{
                padding: "15px",
                background: "rgba(155,89,182,0.1)",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#9b59b6",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                }}
              >
                Loại tội phạm
              </div>
              <div
                style={{
                  fontFamily: "JetBrains Mono",
                  color: "#e0e6ed",
                  fontSize: "16px",
                }}
              >
                {currentRadarData.name}
              </div>
              <div style={{ fontSize: "12px", color: "#8899aa", marginTop: "8px" }}>
                Thời điểm hoạt động:{" "}
                <strong style={{ color: "#f39c12" }}>{currentRadarData.peakTime}</strong>
              </div>
              <div style={{ fontSize: "12px", color: "#8899aa", marginTop: "4px" }}>
                Địa điểm:{" "}
                <strong style={{ color: "#00f5d4" }}>{currentRadarData.location}</strong>
              </div>
            </div>

            <div className="explanation-panel">
              <div className="explanation-header">
                <div className="explanation-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#9b59b6">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                </div>
                <span className="explanation-title">Explainable AI - Multi-head Attention</span>
              </div>
              <p style={{ fontSize: "13px", color: "#c4cdd5", lineHeight: "1.6" }}>
                Liên kết trong cluster này được hình thành chủ yếu do yếu tố{" "}
                <strong style={{ color: "#f39c12" }}>Thời gian</strong> (
                {(currentRadarData.temporalWeight * 100).toFixed(0)}%)
                {currentRadarData.temporalWeight > currentRadarData.spatialWeight
                  ? " chiếm ưu thế hơn "
                  : " cân bằng với "}
                <strong style={{ color: "#3498db" }}>Khoảng cách</strong> (
                {(currentRadarData.spatialWeight * 100).toFixed(0)}%).
              </p>
              <div className="attention-weights">
                <div className="attention-item">
                  <div className="attention-circle">
                    <svg viewBox="0 0 36 36" width="80" height="80">
                      <circle className="attention-bg" cx="18" cy="18" r="15.915" />
                      <circle
                        className="attention-fill temporal"
                        cx="18"
                        cy="18"
                        r="15.915"
                        strokeDasharray={`${currentRadarData.temporalWeight * 100} 100`}
                      />
                    </svg>
                    <span className="attention-value">{currentRadarData.temporalWeight}</span>
                  </div>
                  <div className="attention-label">Temporal Weight</div>
                </div>
                <div className="attention-item">
                  <div className="attention-circle">
                    <svg viewBox="0 0 36 36" width="80" height="80">
                      <circle className="attention-bg" cx="18" cy="18" r="15.915" />
                      <circle
                        className="attention-fill spatial"
                        cx="18"
                        cy="18"
                        r="15.915"
                        strokeDasharray={`${currentRadarData.spatialWeight * 100} 100`}
                      />
                    </svg>
                    <span className="attention-value">{currentRadarData.spatialWeight}</span>
                  </div>
                  <div className="attention-label">Spatial Weight</div>
                </div>
              </div>
            </div>

            <div className="insight-box" style={{ marginTop: "20px" }}>
              <div className="insight-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                Phân tích Chuyên sâu
              </div>
              <p className="insight-text">{currentRadarData.insight}</p>
            </div>
          </div>
        )}

        {!showExplanation && (
          <div className="panel">
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#6b7c93" }}>
              <p>Chọn cluster để xem phân tích Explainable AI</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilingTab;
