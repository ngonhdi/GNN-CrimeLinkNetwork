import React from "react";
import NetworkGraph from "../shared/NetworkGraph";
import ScanningOverlay from "../shared/ScanningOverlay";
import { mockCrimes, relatedCrimes } from "../../data/mockData";

const InvestigationTab = ({
  selectedCrime,
  setSelectedCrime,
  isScanning,
  scanProgress,
  showResults,
  highlightedNodes,
  handleScan,
  graphNodes,
  graphEdges,
  setHighlightedNodes,
  setShowResults,
}) => {
  return (
    <>
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">Mạng lưới Tội phạm Chicago</h2>
        </div>
        <div className="map-container">
          <NetworkGraph
            nodes={graphNodes}
            edges={graphEdges}
            highlightedNodes={highlightedNodes}
            onNodeClick={(node) => {
              const crime = mockCrimes.find((c) => c.id === node.id);
              setSelectedCrime(crime);
              setHighlightedNodes([node.id]);
              setShowResults(false);
            }}
          />
          <ScanningOverlay isScanning={isScanning} progress={scanProgress} />
        </div>
      </div>

      <div className="control-panel">
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Bảng điều khiển</h2>
          </div>
          <div className="input-group">
            <label className="input-label">Mã vụ án</label>
            <input
              type="text"
              className="input-field"
              value={selectedCrime?.id || ""}
              placeholder="Click node hoặc nhập mã..."
              onChange={(e) => {
                const crime = mockCrimes.find((c) => c.id === e.target.value);
                if (crime) setSelectedCrime(crime);
              }}
            />
          </div>
          {selectedCrime && (
            <div
              style={{
                marginTop: "15px",
                padding: "12px",
                background: "rgba(0,245,212,0.05)",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7c93",
                  marginBottom: "5px",
                }}
              >
                ĐÃ CHỌN
              </div>
              <div
                style={{ fontFamily: "JetBrains Mono", color: "#00f5d4" }}
              >
                {selectedCrime.type}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#8899aa",
                  marginTop: "5px",
                }}
              >
                Quận {selectedCrime.district} • {selectedCrime.date}{" "}
                {selectedCrime.time}
              </div>
            </div>
          )}
          <button
            className="scan-button"
            style={{ marginTop: "20px", width: "100%" }}
            onClick={handleScan}
            disabled={!selectedCrime || isScanning}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
            </svg>
            {isScanning ? "Đang quét..." : "Quét Liên Kết"}
          </button>
        </div>

        {showResults && (
          <div className="panel results-panel">
            <div className="panel-header">
              <h2 className="panel-title">Kết quả phân tích</h2>
            </div>
            {relatedCrimes.map((crime) => (
              <div key={crime.id} className="result-card">
                <div className="result-header">
                  <span className="result-id">{crime.id}</span>
                  <span className="similarity-badge">
                    {(crime.similarity * 100).toFixed(0)}% Match
                  </span>
                </div>
                <div className="weight-bars">
                  <div className="weight-item">
                    <div className="weight-label">Spatial</div>
                    <div className="weight-bar">
                      <div
                        className="weight-fill spatial"
                        style={{ width: `${crime.spatialWeight * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="weight-item">
                    <div className="weight-label">Temporal</div>
                    <div className="weight-bar">
                      <div
                        className="weight-fill temporal"
                        style={{
                          width: `${crime.temporalWeight * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="weight-item">
                    <div className="weight-label">Semantic</div>
                    <div className="weight-bar">
                      <div
                        className="weight-fill semantic"
                        style={{
                          width: `${crime.semanticWeight * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="insight-box">
              <div className="insight-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                Phát hiện quan trọng
              </div>
              <p className="insight-text">
                Dù các vụ án này cách nhau vài ngày và khác địa điểm, mô hình
                GNN phát hiện ra{" "}
                <strong style={{ color: "#00f5d4" }}>
                  mẫu hình di chuyển tương đồng
                </strong>
                . Đây là dấu hiệu của một{" "}
                <strong style={{ color: "#f39c12" }}>
                  nhóm tội phạm lưu động
                </strong>{" "}
                hoạt động xuyên quận.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InvestigationTab;
