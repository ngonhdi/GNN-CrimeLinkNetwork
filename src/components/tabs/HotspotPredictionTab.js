import React, { useState } from "react";

/**
 * Hotspot Prediction Tab - Dự báo Điểm nóng Tội phạm
 * Inspired by: Palantir Gotham, PredPol, ArcGIS Crime Analysis
 */
const HotspotPredictionTab = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("next_7_days");
  const [selectedCrimeType, setSelectedCrimeType] = useState("all");
  const [showHeatmap, setShowHeatmap] = useState(true);

  // Simulated hotspot data
  const hotspots = [
    {
      id: 1,
      district: "Cầu Giấy",
      area: "Dịch Vọng - Trung Hòa",
      risk: "cao",
      probability: 87,
      crimeTypes: ["Trộm cắp xe máy", "Cướp giật"],
      timePattern: "18:00 - 23:00",
      peak: "Thứ 6, Thứ 7, CN",
      factors: ["Khu vui chơi tập trung", "Ánh sáng yếu", "Ít camera"],
      trend: "tăng",
      lastIncident: "2 ngày trước",
    },
    {
      id: 2,
      district: "Đống Đa",
      area: "Khu Văn Phòng Láng Hạ",
      risk: "trung bình",
      probability: 64,
      crimeTypes: ["Đột nhập văn phòng", "Trộm cắp tài sản"],
      timePattern: "01:00 - 05:00",
      peak: "Thứ 2 - Thứ 6",
      factors: ["Nhiều văn phòng", "Giờ vắng người", "Bảo vệ luân chuyển"],
      trend: "ổn định",
      lastIncident: "5 ngày trước",
    },
    {
      id: 3,
      district: "Hoàn Kiếm",
      area: "Phố Cổ - Hàng Đào",
      risk: "cao",
      probability: 91,
      crimeTypes: ["Móc túi", "Cướp giật du khách"],
      timePattern: "19:00 - 22:00",
      peak: "Thứ 7, CN",
      factors: ["Đông người", "Du khách nhiều", "Khu phố đi bộ"],
      trend: "tăng mạnh",
      lastIncident: "Hôm qua",
    },
    {
      id: 4,
      district: "Hai Bà Trưng",
      area: "Minh Khai - Thanh Nhàn",
      risk: "thấp",
      probability: 32,
      crimeTypes: ["Va chạm giao thông"],
      timePattern: "07:00 - 09:00",
      peak: "Thứ 2 - Thứ 6",
      factors: ["Giao thông đông", "Giờ cao điểm"],
      trend: "giảm",
      lastIncident: "2 tuần trước",
    },
    {
      id: 5,
      district: "Ba Đình",
      area: "Kim Mã - Giảng Võ",
      risk: "trung bình",
      probability: 58,
      crimeTypes: ["Trộm cắp xe hơi", "Đập kính ô tô"],
      timePattern: "02:00 - 05:00",
      peak: "Thứ 4 - Thứ 6",
      factors: ["Nhiều xe đậu ngoài đường", "Khu vực vắng"],
      trend: "tăng nhẹ",
      lastIncident: "4 ngày trước",
    },
  ];

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

  return (
    <div className="hotspot-prediction-tab">
      {/* Header với controls */}
      <div className="hotspot-header">
        <div className="hotspot-title-section">
          <h2 className="hotspot-title">🗺️ Dự báo Điểm nóng Tội phạm</h2>
          <p className="hotspot-subtitle">
            Phân tích không gian-thời gian dự đoán khu vực có nguy cơ cao
          </p>
        </div>

        <div className="hotspot-controls">
          <div className="control-group">
            <label className="control-label">Khung thời gian:</label>
            <select
              className="control-select"
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
            >
              <option value="next_24h">24 giờ tới</option>
              <option value="next_7_days">7 ngày tới</option>
              <option value="next_30_days">30 ngày tới</option>
            </select>
          </div>

          <div className="control-group">
            <label className="control-label">Loại tội phạm:</label>
            <select
              className="control-select"
              value={selectedCrimeType}
              onChange={(e) => setSelectedCrimeType(e.target.value)}
            >
              <option value="all">Tất cả</option>
              <option value="theft">Trộm cắp</option>
              <option value="robbery">Cướp giật</option>
              <option value="burglary">Đột nhập</option>
              <option value="assault">Gây rối</option>
            </select>
          </div>

          <button
            className={`toggle-heatmap ${showHeatmap ? "active" : ""}`}
            onClick={() => setShowHeatmap(!showHeatmap)}
          >
            {showHeatmap ? "🔥 Ẩn" : "🗺️ Hiện"} Bản đồ nhiệt
          </button>
        </div>
      </div>

      <div className="hotspot-content">
        {/* Bản đồ nhiệt */}
        {showHeatmap && (
          <div className="heatmap-container">
            <div className="heatmap-visualization">
              <div className="map-overlay">
                <div className="map-title">Bản đồ Dự báo Điểm nóng - Hà Nội</div>

                {/* Hotspot markers */}
                <div className="hotspot-marker hotspot-high" style={{ top: "25%", left: "60%" }}>
                  <div className="marker-pulse"></div>
                  <div className="marker-label">Cầu Giấy<br/>87%</div>
                </div>

                <div className="hotspot-marker hotspot-high" style={{ top: "45%", left: "50%" }}>
                  <div className="marker-pulse"></div>
                  <div className="marker-label">Hoàn Kiếm<br/>91%</div>
                </div>

                <div className="hotspot-marker hotspot-medium" style={{ top: "35%", left: "45%" }}>
                  <div className="marker-pulse"></div>
                  <div className="marker-label">Đống Đa<br/>64%</div>
                </div>

                <div className="hotspot-marker hotspot-medium" style={{ top: "50%", left: "35%" }}>
                  <div className="marker-pulse"></div>
                  <div className="marker-label">Ba Đình<br/>58%</div>
                </div>

                <div className="hotspot-marker hotspot-low" style={{ top: "55%", left: "65%" }}>
                  <div className="marker-pulse"></div>
                  <div className="marker-label">Hai Bà Trưng<br/>32%</div>
                </div>

                {/* Heatmap gradient overlay */}
                <svg className="heatmap-svg" viewBox="0 0 600 400" preserveAspectRatio="none">
                  <defs>
                    <radialGradient id="heat-high-1" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="rgba(231, 76, 60, 0.7)" />
                      <stop offset="50%" stopColor="rgba(231, 76, 60, 0.3)" />
                      <stop offset="100%" stopColor="rgba(231, 76, 60, 0)" />
                    </radialGradient>
                    <radialGradient id="heat-high-2" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="rgba(231, 76, 60, 0.7)" />
                      <stop offset="50%" stopColor="rgba(231, 76, 60, 0.3)" />
                      <stop offset="100%" stopColor="rgba(231, 76, 60, 0)" />
                    </radialGradient>
                    <radialGradient id="heat-medium-1" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="rgba(243, 156, 18, 0.5)" />
                      <stop offset="50%" stopColor="rgba(243, 156, 18, 0.2)" />
                      <stop offset="100%" stopColor="rgba(243, 156, 18, 0)" />
                    </radialGradient>
                  </defs>

                  <ellipse cx="360" cy="100" rx="120" ry="80" fill="url(#heat-high-1)" />
                  <ellipse cx="300" cy="180" rx="150" ry="100" fill="url(#heat-high-2)" />
                  <ellipse cx="270" cy="140" rx="100" ry="70" fill="url(#heat-medium-1)" />
                </svg>
              </div>

              {/* Legend */}
              <div className="heatmap-legend">
                <div className="legend-title">Mức độ rủi ro:</div>
                <div className="legend-items">
                  <div className="legend-item">
                    <div className="legend-color" style={{ background: "#e74c3c" }}></div>
                    <span>Cao (&gt;80%)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ background: "#f39c12" }}></div>
                    <span>Trung bình (50-80%)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color" style={{ background: "#27ae60" }}></div>
                    <span>Thấp (&lt;50%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Danh sách hotspots */}
        <div className="hotspots-list">
          <div className="list-header">
            <h3>📊 Danh sách Điểm nóng Ưu tiên</h3>
            <span className="list-count">{hotspots.length} khu vực</span>
          </div>

          <div className="hotspots-grid">
            {hotspots.map((hotspot) => (
              <div key={hotspot.id} className="hotspot-card">
                <div className="hotspot-card-header">
                  <div className="hotspot-location">
                    <div className="location-district">{hotspot.district}</div>
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
                  <div className="probability-label">Xác suất xảy ra:</div>
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
                    <span className="detail-text">
                      {hotspot.crimeTypes.join(", ")}
                    </span>
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
                      Xu hướng: <strong>{hotspot.trend}</strong>
                    </span>
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
                  <button className="action-btn-small deploy">
                    🚔 Triển khai tuần tra
                  </button>
                  <button className="action-btn-small detail">
                    📋 Xem chi tiết
                  </button>
                </div>

                <div className="last-incident">
                  Vụ gần nhất: <strong>{hotspot.lastIncident}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Panel */}
        <div className="hotspot-stats">
          <div className="stat-card">
            <div className="stat-icon red">🚨</div>
            <div className="stat-content">
              <div className="stat-value">3</div>
              <div className="stat-label">Điểm nóng cấp cao</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">⚠️</div>
            <div className="stat-content">
              <div className="stat-value">2</div>
              <div className="stat-label">Điểm nóng trung bình</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">📊</div>
            <div className="stat-content">
              <div className="stat-value">89%</div>
              <div className="stat-label">Độ chính xác dự đoán</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">✅</div>
            <div className="stat-content">
              <div className="stat-value">27</div>
              <div className="stat-label">Vụ ngăn chặn (7 ngày)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotspotPredictionTab;
