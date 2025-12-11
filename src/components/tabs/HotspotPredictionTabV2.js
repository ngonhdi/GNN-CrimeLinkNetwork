import React, { useState } from "react";
import GoogleMapHotspot from "../shared/GoogleMapHotspot";
import { hotspotLocations, hanoiCenter, defaultZoom } from "../../data/hotspotData";

/**
 * Hotspot Prediction Tab V2 - với Google Maps thật
 * Tham khảo: Palantir Gotham, PredPol, ArcGIS Crime Analysis
 */
const HotspotPredictionTabV2 = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("next_7_days");
  const [selectedCrimeType, setSelectedCrimeType] = useState("all");
  const [selectedWard, setSelectedWard] = useState("all");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [filteredHotspots, setFilteredHotspots] = useState(hotspotLocations);
  const [activeAction, setActiveAction] = useState(null); // "deploy", "detail", "alert"
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Xử lý các action buttons - Hiển thị trong giao diện
  const handleDeployPatrol = (hotspot) => {
    setSelectedHotspot(hotspot);
    setActiveAction("deploy");
  };

  const handleViewDetail = (hotspot) => {
    setSelectedHotspot(hotspot);
    setActiveAction("detail");
  };

  const handleSetAlert = (hotspot) => {
    setSelectedHotspot(hotspot);
    setActiveAction("alert");
  };

  const closeActionPanel = () => {
    setActiveAction(null);
    setSelectedHotspot(null);
  };

  // Xử lý phân tích
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    // Simulate analysis process
    setTimeout(() => {
      // Filter hotspots based on criteria
      let filtered = [...hotspotLocations];

      // Filter by crime type
      if (selectedCrimeType !== "all") {
        filtered = filtered.filter((hotspot) =>
          hotspot.crimeTypes.some((type) => type.toLowerCase().includes(selectedCrimeType.toLowerCase()))
        );
      }

      // Filter by ward (phường)
      if (selectedWard !== "all") {
        filtered = filtered.filter((hotspot) => hotspot.ward === selectedWard);
      }

      // Sort by probability (highest first)
      filtered.sort((a, b) => b.probability - a.probability);

      setFilteredHotspots(filtered);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2000);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "cao":
        return "#e74c3c";
      case "trung bình":
        return "#f39c12";
      case "thấp":
        return "#27ae60";
      default:
        return "#6b7c93";
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "tăng":
      case "tăng mạnh":
        return "📈";
      case "giảm":
        return "📉";
      case "ổn định":
        return "➡️";
      default:
        return "➖";
    }
  };

  // Get unique districts for filter
  const uniqueWards = [...new Set(hotspotLocations.map((h) => h.ward))];

  // Statistics
  const stats = {
    total: filteredHotspots.length,
    high: filteredHotspots.filter((h) => h.risk === "cao").length,
    medium: filteredHotspots.filter((h) => h.risk === "trung bình").length,
    low: filteredHotspots.filter((h) => h.risk === "thấp").length,
    avgProbability: Math.round(
      filteredHotspots.reduce((sum, h) => sum + h.probability, 0) / filteredHotspots.length
    ),
    totalIncidents: filteredHotspots.reduce((sum, h) => sum + h.incidentCount30days, 0),
  };

  return (
    <div className="hotspot-prediction-tab-v2">
      {/* Header với controls */}
      <div className="hotspot-header">
        <div className="hotspot-title-section">
          <h2 className="hotspot-title">🗺️ Dự Báo Điểm Nóng Tội Phạm</h2>
          <p className="hotspot-subtitle">
            Phân tích không gian-thời gian dự đoán khu vực có nguy cơ cao • Powered by GNN + Google Maps
          </p>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="filter-panel">
        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">📅</span>
            Khung thời gian dự báo:
          </label>
          <select
            className="filter-select"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option value="next_24h">24 giờ tới</option>
            <option value="next_3_days">3 ngày tới</option>
            <option value="next_7_days">7 ngày tới (Khuyến nghị)</option>
            <option value="next_14_days">14 ngày tới</option>
            <option value="next_30_days">30 ngày tới</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">🎯</span>
            Loại tội phạm:
          </label>
          <select
            className="filter-select"
            value={selectedCrimeType}
            onChange={(e) => setSelectedCrimeType(e.target.value)}
          >
            <option value="all">Tất cả loại</option>
            <option value="trộm cắp">Trộm cắp</option>
            <option value="cướp">Cướp giật</option>
            <option value="đột nhập">Đột nhập</option>
            <option value="móc túi">Móc túi</option>
            <option value="xe">Liên quan xe</option>
            <option value="lừa đảo">Lừa đảo</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <span className="label-icon">📍</span>
            Khu vực:
          </label>
          <select
            className="filter-select"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
          >
            <option value="all">Toàn thành phố</option>
            {uniqueWards.map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`analyze-button ${isAnalyzing ? "analyzing" : ""}`}
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <span className="spinner"></span>
              Đang phân tích...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
              </svg>
              🔍 Bắt đầu Phân tích Dự báo
            </>
          )}
        </button>

        <button
          className={`toggle-heatmap ${showHeatmap ? "active" : ""}`}
          onClick={() => setShowHeatmap(!showHeatmap)}
        >
          {showHeatmap ? "🔥 Tắt" : "🗺️ Bật"} Lớp Nhiệt
        </button>
      </div>

      {/* Analysis Progress Indicator */}
      {isAnalyzing && (
        <div className="analysis-progress">
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <p className="progress-text">
            Đang phân tích dữ liệu 87,000 vụ án • 3.2M hồ sơ • 15K camera...
          </p>
        </div>
      )}

      {/* Success Message */}
      {analysisComplete && !isAnalyzing && (
        <div className="analysis-complete">
          <div className="complete-icon">✅</div>
          <div className="complete-text">
            <strong>Phân tích hoàn tất!</strong>
            <p>
              Tìm thấy {filteredHotspots.length} điểm nóng phù hợp với tiêu chí lọc. Hệ thống khuyến
              nghị ưu tiên {stats.high} khu vực có nguy cơ cao.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="hotspot-content">
        {/* Google Maps */}
        <div className="map-section">
          <div className="map-container-google">
            <GoogleMapHotspot
              hotspots={filteredHotspots}
              center={hanoiCenter}
              zoom={defaultZoom}
              showHeatmap={showHeatmap}
            />
          </div>

          {/* Map Legend */}
          <div className="map-legend-panel">
            <div className="legend-title">📊 Chú giải:</div>
            <div className="legend-items-grid">
              <div className="legend-item">
                <div className="legend-marker high"></div>
                <span>Nguy cơ Cao (&gt;80%)</span>
                <strong>{stats.high}</strong>
              </div>
              <div className="legend-item">
                <div className="legend-marker medium"></div>
                <span>Nguy cơ TB (50-80%)</span>
                <strong>{stats.medium}</strong>
              </div>
              <div className="legend-item">
                <div className="legend-marker low"></div>
                <span>Nguy cơ Thấp (&lt;50%)</span>
                <strong>{stats.low}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Hotspots List */}
        <div className="hotspots-list-section">
          <div className="list-header">
            <h3>
              📋 Danh Sách Điểm Nóng Ưu Tiên
              {selectedWard !== "all" && ` - ${selectedWard}`}
            </h3>
            <span className="list-count">
              {filteredHotspots.length} khu vực
              {stats.high > 0 && ` • ${stats.high} CAO`}
            </span>
          </div>

          {filteredHotspots.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <p>Không tìm thấy điểm nóng phù hợp với tiêu chí lọc.</p>
              <button className="reset-filters-btn" onClick={() => {
                setSelectedCrimeType("all");
                setSelectedWard("all");
                handleAnalyze();
              }}>
                🔄 Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="hotspots-grid">
              {filteredHotspots.map((hotspot, idx) => (
                <div key={hotspot.id} className="hotspot-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <div className="hotspot-card-header">
                    <div className="hotspot-location">
                      <div className="location-area">{hotspot.area}</div>
                    </div>
                    <div
                      className="risk-badge"
                      style={{
                        background: `rgba(${
                          hotspot.risk === "cao"
                            ? "231, 76, 60"
                            : hotspot.risk === "trung bình"
                            ? "243, 156, 18"
                            : "39, 174, 96"
                        }, 0.2)`,
                        color: getRiskColor(hotspot.risk),
                        border: `1px solid ${getRiskColor(hotspot.risk)}`,
                      }}
                    >
                      {hotspot.risk.toUpperCase()}
                    </div>
                  </div>

                  <div className="probability-section">
                    <div className="probability-label">Xác suất xảy ra trong {selectedTimeframe === "next_7_days" ? "7 ngày" : selectedTimeframe === "next_24h" ? "24h" : "30 ngày"} tới:</div>
                    <div className="probability-bar-container">
                      <div
                        className="probability-bar"
                        style={{
                          width: `${hotspot.probability}%`,
                          background: getRiskColor(hotspot.risk),
                        }}
                      >
                        <span className="probability-value">{hotspot.probability}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="hotspot-details">
                    <div className="detail-item">
                      <span className="detail-icon">🎯</span>
                      <span className="detail-text">{hotspot.crimeTypes.join(", ")}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">⏰</span>
                      <span className="detail-text">{hotspot.timePattern}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📅</span>
                      <span className="detail-text">Cao điểm: {hotspot.peak}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">{getTrendIcon(hotspot.trend)}</span>
                      <span className="detail-text">
                        Xu hướng: <strong>{hotspot.trend}</strong> ({hotspot.trendPercent > 0 ? "+" : ""}{hotspot.trendPercent}%)
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📊</span>
                      <span className="detail-text">Vụ xảy ra 30 ngày qua: <strong>{hotspot.incidentCount30days}</strong></span>
                    </div>
                  </div>

                  <div className="risk-factors">
                    <div className="factors-title">⚠️ Yếu tố rủi ro:</div>
                    <div className="factors-tags">
                      {hotspot.factors.map((factor, idx) => (
                        <span key={idx} className="factor-tag">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hotspot-actions">
                    <button
                      className="action-btn-small deploy"
                      onClick={() => handleDeployPatrol(hotspot)}
                      title="Triển khai lực lượng tuần tra"
                    >
                      🚔 Triển khai Tuần tra
                    </button>
                    <button
                      className="action-btn-small detail"
                      onClick={() => handleViewDetail(hotspot)}
                      title="Xem thông tin chi tiết"
                    >
                      📋 Xem Chi tiết
                    </button>
                    <button
                      className="action-btn-small alert"
                      onClick={() => handleSetAlert(hotspot)}
                      title="Thiết lập cảnh báo tự động"
                    >
                      🔔 Thiết lập Cảnh báo
                    </button>
                  </div>

                  <div className="last-incident">
                    Vụ gần nhất: <strong>{hotspot.lastIncident}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="statistics-dashboard">
        <div className="dashboard-title">📊 Tổng Quan Phân Tích</div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon red">🚨</div>
            <div className="stat-content">
              <div className="stat-value">{stats.high}</div>
              <div className="stat-label">Điểm nóng Cao</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">⚠️</div>
            <div className="stat-content">
              <div className="stat-value">{stats.medium}</div>
              <div className="stat-label">Điểm nóng Trung bình</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">📊</div>
            <div className="stat-content">
              <div className="stat-value">{stats.avgProbability}%</div>
              <div className="stat-label">Xác suất Trung bình</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">📈</div>
            <div className="stat-content">
              <div className="stat-value">{stats.totalIncidents}</div>
              <div className="stat-label">Vụ trong 30 ngày</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Panel */}
      {stats.high > 0 && (
        <div className="recommendation-panel">
          <div className="recommendation-header">
            <div className="rec-icon">💡</div>
            <h4>Khuyến Nghị Hành Động</h4>
          </div>
          <div className="recommendation-content">
            <div className="rec-item priority">
              <strong>🎯 Ưu tiên cao nhất:</strong>
              <p>
                Triển khai lực lượng tuần tra tăng cường tại {stats.high} khu vực nguy cơ cao, đặc biệt là{" "}
                {filteredHotspots
                  .filter((h) => h.risk === "cao")
                  .slice(0, 3)
                  .map((h) => h.district)
                  .join(", ")}
              </p>
            </div>
            <div className="rec-item">
              <strong>📅 Khung giờ:</strong>
              <p>Tập trung vào khung giờ 18:00 - 23:00 và 01:00 - 05:00 (chiếm 70% các vụ)</p>
            </div>
            <div className="rec-item">
              <strong>🔧 Biện pháp:</strong>
              <p>Nâng cấp hệ thống camera, tăng cường ánh sáng đường phố, phối hợp với ban quản lý khu vực</p>
            </div>
          </div>
        </div>
      )}

      {/* Action Panel - Hiển thị trong giao diện thay vì alert */}
      {activeAction && selectedHotspot && (
        <div className="action-panel-overlay" onClick={closeActionPanel}>
          <div className="action-panel" onClick={(e) => e.stopPropagation()}>
            <div className="action-panel-header">
              <h3>
                {activeAction === "deploy" && "🚔 Triển khai Tuần tra"}
                {activeAction === "detail" && "📋 Chi tiết Điểm nóng"}
                {activeAction === "alert" && "🔔 Thiết lập Cảnh báo"}
              </h3>
              <button className="close-btn" onClick={closeActionPanel}>✕</button>
            </div>

            <div className="action-panel-content">
              {/* Deploy Patrol */}
              {activeAction === "deploy" && (
                <div className="deploy-panel">
                  <div className="info-row">
                    <strong>Phường:</strong> {selectedHotspot.ward}
                  </div>
                  <div className="info-row">
                    <strong>Khu vực:</strong> {selectedHotspot.area}
                  </div>
                  <div className="info-row">
                    <strong>Mức độ rủi ro:</strong>
                    <span className={`risk-level ${selectedHotspot.risk}`}>
                      {selectedHotspot.risk.toUpperCase()}
                    </span>
                  </div>
                  <div className="info-row">
                    <strong>Xác suất:</strong> {selectedHotspot.probability}%
                  </div>
                  <div className="info-row">
                    <strong>Thời gian tăng cường:</strong> {selectedHotspot.timePattern}
                  </div>
                  <div className="info-row">
                    <strong>Tọa độ:</strong> {selectedHotspot.lat}, {selectedHotspot.lng}
                  </div>
                  <div className="recommendation-box">
                    <strong>💡 Khuyến nghị:</strong>
                    <p>{selectedHotspot.recommendation}</p>
                  </div>
                  <button className="action-confirm-btn deploy">
                    ✅ Xác nhận triển khai
                  </button>
                </div>
              )}

              {/* View Detail */}
              {activeAction === "detail" && (
                <div className="detail-panel">
                  <div className="info-row">
                    <strong>Phường:</strong> {selectedHotspot.ward}
                  </div>
                  <div className="info-row">
                    <strong>Khu vực:</strong> {selectedHotspot.area}
                  </div>
                  <div className="info-row">
                    <strong>Mức độ:</strong>
                    <span className={`risk-level ${selectedHotspot.risk}`}>
                      {selectedHotspot.risk.toUpperCase()}
                    </span>
                  </div>
                  <div className="info-row">
                    <strong>Xác suất:</strong> {selectedHotspot.probability}%
                  </div>
                  <div className="info-section">
                    <strong>🚨 Loại tội phạm:</strong>
                    <ul>
                      {selectedHotspot.crimeTypes.map((type, idx) => (
                        <li key={idx}>{type}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="info-section">
                    <strong>⏰ Thời gian cao điểm:</strong> {selectedHotspot.timePattern}
                  </div>
                  <div className="info-section">
                    <strong>📅 Ngày cao điểm:</strong> {selectedHotspot.peak}
                  </div>
                  <div className="info-section">
                    <strong>🔍 Yếu tố nguy cơ:</strong>
                    <ul>
                      {selectedHotspot.factors.map((factor, idx) => (
                        <li key={idx}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="info-row">
                    <strong>📊 Xu hướng:</strong> {selectedHotspot.trend} ({selectedHotspot.trendPercent > 0 ? '+' : ''}{selectedHotspot.trendPercent}%)
                  </div>
                  <div className="info-row">
                    <strong>🕐 Vụ gần nhất:</strong> {selectedHotspot.lastIncident}
                  </div>
                  <div className="info-row">
                    <strong>📈 Số vụ 30 ngày:</strong> {selectedHotspot.incidentCount30days}
                  </div>
                  <div className="recommendation-box">
                    <strong>💡 Khuyến nghị:</strong>
                    <p>{selectedHotspot.recommendation}</p>
                  </div>
                </div>
              )}

              {/* Set Alert */}
              {activeAction === "alert" && (
                <div className="alert-panel">
                  <div className="info-row">
                    <strong>Phường:</strong> {selectedHotspot.ward}
                  </div>
                  <div className="info-row">
                    <strong>Khu vực:</strong> {selectedHotspot.area}
                  </div>
                  <div className="info-row">
                    <strong>Mức độ:</strong>
                    <span className={`risk-level ${selectedHotspot.risk}`}>
                      {selectedHotspot.risk.toUpperCase()}
                    </span>
                  </div>
                  <div className="info-row">
                    <strong>Thời gian:</strong> {selectedHotspot.timePattern}
                  </div>
                  <div className="alert-settings">
                    <h4>📱 Nhận thông báo qua:</h4>
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked /> SMS
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked /> Email
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked /> Push notification
                    </label>
                  </div>
                  <div className="alert-triggers">
                    <h4>Khi có:</h4>
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked /> Vụ việc mới phát sinh
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked /> Thay đổi mức độ rủi ro
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked /> Cập nhật xu hướng
                    </label>
                  </div>
                  <button className="action-confirm-btn alert">
                    🔔 Xác nhận thiết lập cảnh báo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotspotPredictionTabV2;
