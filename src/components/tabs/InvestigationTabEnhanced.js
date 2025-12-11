import React, { useState, useRef } from "react";
import NetworkGraph from "../shared/NetworkGraph";
import ScanningOverlay from "../shared/ScanningOverlay";
import TheoryExplainer from "../shared/TheoryExplainer";
import AttentionVisualizer from "../shared/AttentionVisualizer";
import {
  mockCrimes,
  relatedCrimes,
  detectiveCases,
  detectiveStoryCase,
} from "../../data/mockData";
import { getRelatedCrimes } from "../../data/relatedCrimesData";

/**
 * Enhanced Investigation Tab with Theory Explanations and Attention Visualization
 */
const InvestigationTabEnhanced = ({
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
  const [showTheory, setShowTheory] = useState(false);
  const [showAttention, setShowAttention] = useState(false);
  const [useDetectiveCase, setUseDetectiveCase] = useState(true);
  const [selectedDetectiveCase, setSelectedDetectiveCase] = useState(detectiveCases[0]);

  // Debounce ref to prevent double-click
  const scanDebounceRef = useRef(false);

  // Use detective case or regular case
  const currentCase = useDetectiveCase ? selectedDetectiveCase : selectedCrime;
  const currentRelated = useDetectiveCase
    ? getRelatedCrimes(selectedDetectiveCase.id)
    : relatedCrimes;

  const handleDetectiveScan = () => {
    // Prevent double-click
    if (scanDebounceRef.current || isScanning) return;
    scanDebounceRef.current = true;

    // Set the crime first
    setSelectedCrime(detectiveStoryCase);
    // Pass the crime directly to handleScan to avoid state sync issues
    handleScan(detectiveStoryCase);

    // Auto-show theory and attention after scan
    setTimeout(() => {
      setShowTheory(true);
      setShowAttention(true);
    }, 3000);

    // Reset debounce after 500ms
    setTimeout(() => {
      scanDebounceRef.current = false;
    }, 500);
  };

  const handleRegularScan = () => {
    // Prevent double-click
    if (scanDebounceRef.current || isScanning || !selectedCrime) return;
    scanDebounceRef.current = true;

    handleScan(selectedCrime);

    // Reset debounce after 500ms
    setTimeout(() => {
      scanDebounceRef.current = false;
    }, 500);
  };

  return (
    <div className="investigation-enhanced">
      {/* Main panel with network graph */}
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">
            🔍 Phân tích Mạng lưới Tội phạm
          </h2>
          <div className="panel-actions">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={useDetectiveCase}
                onChange={(e) => setUseDetectiveCase(e.target.checked)}
              />
              <span className="toggle-label">
                {useDetectiveCase ? "📖 Chế độ Minh họa" : "📊 Chế độ Thông thường"}
              </span>
            </label>
          </div>
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

        {/* Case selector */}
        {useDetectiveCase && (
          <div className="case-selector-container">
            <div className="case-selector-label">Chọn loại vụ án để phân tích:</div>
            <div className="case-selector-grid">
              {detectiveCases.map((caseItem) => (
                <button
                  key={caseItem.id}
                  className={`case-selector-btn ${
                    selectedDetectiveCase.id === caseItem.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedDetectiveCase(caseItem)}
                >
                  <div className="case-icon">{caseItem.icon}</div>
                  <div className="case-title">{caseItem.title}</div>
                  <div className="case-type">{caseItem.type}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Detective case info banner */}
        {useDetectiveCase && (
          <div className="detective-banner">
            <div className="banner-icon">{selectedDetectiveCase.icon}</div>
            <div className="banner-content">
              <h4>Vụ án: {selectedDetectiveCase.title}</h4>
              <p>{selectedDetectiveCase.description}</p>
            </div>
            <button className="banner-btn" onClick={handleDetectiveScan}>
              🔍 Bắt đầu phân tích
            </button>
          </div>
        )}
      </div>

      {/* Control panel */}
      <div className="control-panel">
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Bảng điều khiển</h2>
          </div>

          {useDetectiveCase ? (
            <div className="detective-case-card">
              <div className="case-header">
                <span className="case-badge urgent">🚨 ƯU TIÊN</span>
                <span className="case-id">{selectedDetectiveCase.id}</span>
              </div>
              <div className="case-details">
                <div className="detail-row">
                  <span className="detail-label">Loại:</span>
                  <span className="detail-value">{selectedDetectiveCase.type}</span>
                </div>
                {selectedDetectiveCase.vehicle && (
                  <div className="detail-row">
                    <span className="detail-label">Phương tiện:</span>
                    <span className="detail-value luxury">
                      {selectedDetectiveCase.vehicle}
                    </span>
                  </div>
                )}
                {selectedDetectiveCase.substance && (
                  <div className="detail-row">
                    <span className="detail-label">Chất:</span>
                    <span className="detail-value luxury">
                      {selectedDetectiveCase.substance}
                    </span>
                  </div>
                )}
                {selectedDetectiveCase.items && (
                  <div className="detail-row">
                    <span className="detail-label">Tài sản:</span>
                    <span className="detail-value">{selectedDetectiveCase.items}</span>
                  </div>
                )}
                {selectedDetectiveCase.weapon && (
                  <div className="detail-row">
                    <span className="detail-label">Hung khí:</span>
                    <span className="detail-value">{selectedDetectiveCase.weapon}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Giá trị:</span>
                  <span className="detail-value">
                    ${selectedDetectiveCase.value.toLocaleString()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Thời gian:</span>
                  <span className="detail-value">
                    {selectedDetectiveCase.date} {selectedDetectiveCase.time}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Địa điểm:</span>
                  <span className="detail-value">
                    {selectedDetectiveCase.location}
                  </span>
                </div>
              </div>
              <div className="case-description">
                <strong>📋 Mô tả:</strong>
                <p>{selectedDetectiveCase.description}</p>
              </div>
            </div>
          ) : (
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
              {selectedCrime && (
                <div className="selected-crime-info">
                  <div className="info-label">ĐÃ CHỌN</div>
                  <div className="info-type">{selectedCrime.type}</div>
                  <div className="info-meta">
                    Quận {selectedCrime.district} • {selectedCrime.date}{" "}
                    {selectedCrime.time}
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            className="scan-button"
            onClick={useDetectiveCase ? handleDetectiveScan : handleRegularScan}
            disabled={!currentCase || isScanning}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
            </svg>
            {isScanning ? "Đang quét mạng lưới..." : "🔍 Quét Liên Kết GNN"}
          </button>
        </div>

        {/* Results panel */}
        {showResults && (
          <div className="panel results-panel">
            <div className="panel-header">
              <h2 className="panel-title">
                ⚡ Kết quả phân tích
              </h2>
              <div className="result-count">
                {currentRelated.length} vụ án liên quan
              </div>
            </div>

            {currentRelated.map((crime, idx) => (
              <div key={crime.id} className="result-card enhanced">
                <div className="result-header">
                  <span className="result-number">#{idx + 1}</span>
                  <span className="result-id">{crime.id}</span>
                  <span className="similarity-badge high">
                    {(crime.similarity * 100).toFixed(0)}% Match
                  </span>
                </div>

                {useDetectiveCase && (
                  <div className="result-details">
                    <div className="detail-item">
                      <span className="detail-icon">🚗</span>
                      <span>{crime.vehicle}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{crime.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">⏰</span>
                      <span>
                        {crime.date} {crime.time}
                      </span>
                    </div>
                  </div>
                )}

                <div className="weight-bars">
                  <div className="weight-item">
                    <div className="weight-label">
                      <span className="weight-icon">📍</span>
                      Spatial
                    </div>
                    <div className="weight-bar">
                      <div
                        className="weight-fill spatial"
                        style={{ width: `${crime.spatialWeight * 100}%` }}
                      >
                        <span className="weight-value">
                          {(crime.spatialWeight * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="weight-item">
                    <div className="weight-label">
                      <span className="weight-icon">⏰</span>
                      Temporal
                    </div>
                    <div className="weight-bar">
                      <div
                        className="weight-fill temporal"
                        style={{ width: `${crime.temporalWeight * 100}%` }}
                      >
                        <span className="weight-value">
                          {(crime.temporalWeight * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="weight-item">
                    <div className="weight-label">
                      <span className="weight-icon">🏷️</span>
                      Semantic
                    </div>
                    <div className="weight-bar">
                      <div
                        className="weight-fill semantic"
                        style={{ width: `${crime.semanticWeight * 100}%` }}
                      >
                        <span className="weight-value">
                          {(crime.semanticWeight * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Insight box */}
            <div className="insight-box detective">
              <div className="insight-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                🎯 Kết luận điều tra
              </div>
              {useDetectiveCase ? (
                <p className="insight-text">
                  Hệ thống phát hiện <strong style={{ color: "#e74c3c" }}>23 vụ trộm cắp xe cao cấp</strong> trong
                  30 ngày, tạo thành một <strong>đường dây tội phạm có tổ chức</strong> hoạt động xuyên 5 quận huyện.
                  <br />
                  <br />
                  📊 Mô hình: <strong style={{ color: "#f39c12" }}>
                    Di chuyển theo tuyến giao thông chính
                  </strong>
                  <br />
                  ⏰ Thời gian: 22h-24h (cao điểm hoạt động)
                  <br />
                  🎯 Đối tượng: Xe sang trị giá trên $80K
                  <br />
                  🔧 Thủ đoạn: Vô hiệu camera an ninh chuyên nghiệp
                </p>
              ) : (
                <p className="insight-text">
                  Mặc dù các vụ án này cách nhau vài ngày và xảy ra ở những địa điểm khác nhau,
                  hệ thống phát hiện ra{" "}
                  <strong style={{ color: "#00f5d4" }}>
                    đặc điểm hoạt động tương đồng
                  </strong>
                  . Đây là dấu hiệu của một{" "}
                  <strong style={{ color: "#f39c12" }}>nhóm đối tượng lưu động</strong>{" "}
                  hoạt động xuyên các quận huyện.
                </p>
              )}
            </div>

            {/* Action buttons */}
            <div className="result-actions">
              <button
                className="action-btn primary"
                onClick={() => setShowTheory(!showTheory)}
              >
                📚 {showTheory ? "Ẩn" : "Xem"} Giải thích Lý thuyết
              </button>
              <button
                className="action-btn secondary"
                onClick={() => setShowAttention(!showAttention)}
              >
                🧠 {showAttention ? "Ẩn" : "Xem"} Multi-Head Attention
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Theory Explainer (conditional) */}
      {showResults && showTheory && (
        <div className="theory-section">
          <TheoryExplainer crimeData={currentCase} predictions={currentRelated} />
        </div>
      )}

      {/* Attention Visualizer (conditional) */}
      {showResults && showAttention && (
        <div className="attention-section">
          <AttentionVisualizer
            sourceCrime={currentCase}
            relatedCrimes={currentRelated.slice(0, 3)}
          />
        </div>
      )}
    </div>
  );
};

export default InvestigationTabEnhanced;
