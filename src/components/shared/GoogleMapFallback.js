import React from "react";

/**
 * Fallback Map Component - Hiển thị bản đồ giả lập khi không có Google Maps API
 */
const GoogleMapFallback = ({ hotspots, showHeatmap }) => {
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

  return (
    <div className="fallback-map-container">
      {/* Bản đồ Hà Nội giả lập */}
      <div className="fallback-map">
        <div className="map-background">
          <div className="map-title">Bản đồ Hà Nội - 8 Điểm nóng</div>

          {/* Vẽ các điểm hotspot */}
          {hotspots.map((hotspot, index) => (
            <div
              key={hotspot.id}
              className="fallback-hotspot-marker"
              style={{
                left: `${20 + (index % 3) * 30}%`,
                top: `${20 + Math.floor(index / 3) * 25}%`,
              }}
            >
              {/* Circle */}
              <div
                className="fallback-circle"
                style={{
                  background: `radial-gradient(circle, ${getRiskColor(
                    hotspot.risk
                  )}40, transparent)`,
                  border: `2px solid ${getRiskColor(hotspot.risk)}`,
                }}
              />

              {/* Marker */}
              <div
                className="fallback-marker"
                style={{ backgroundColor: getRiskColor(hotspot.risk) }}
              >
                <div className="marker-pulse" style={{ backgroundColor: getRiskColor(hotspot.risk) }} />
              </div>

              {/* Label */}
              <div className="fallback-label">
                <div className="label-district">{hotspot.district}</div>
                <div className="label-prob">{hotspot.probability}%</div>
              </div>
            </div>
          ))}

          {/* Heatmap overlay */}
          {showHeatmap && (
            <div className="heatmap-overlay">
              {hotspots.map((hotspot, index) => (
                <div
                  key={`heat-${hotspot.id}`}
                  className="heat-blob"
                  style={{
                    left: `${20 + (index % 3) * 30}%`,
                    top: `${20 + Math.floor(index / 3) * 25}%`,
                    opacity: hotspot.probability / 150,
                    background: `radial-gradient(circle, ${getRiskColor(
                      hotspot.risk
                    )}80, transparent)`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="fallback-legend">
          <h4>Mức độ rủi ro</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color-circle" style={{ backgroundColor: "#e74c3c" }} />
              <span>Cao</span>
            </div>
            <div className="legend-item">
              <div className="legend-color-circle" style={{ backgroundColor: "#f39c12" }} />
              <span>Trung bình</span>
            </div>
            <div className="legend-item">
              <div className="legend-color-circle" style={{ backgroundColor: "#27ae60" }} />
              <span>Thấp</span>
            </div>
          </div>
        </div>

        {/* API Key Warning */}
        <div className="api-warning">
          <div className="warning-icon">⚠️</div>
          <div className="warning-text">
            <strong>Đang sử dụng bản đồ giả lập</strong>
            <p>Để hiển thị Google Maps thật, vui lòng thêm API key vào file GoogleMapHotspot.js</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMapFallback;
