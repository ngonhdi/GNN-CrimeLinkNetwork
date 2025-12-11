import React from "react";
import HeatmapVisualization from "../shared/HeatmapVisualization";

const ForecastTab = ({
  timeFilter,
  setTimeFilter,
  crimeTypeFilter,
  setCrimeTypeFilter,
  timeSlider,
  setTimeSlider,
  isForecasting,
  setIsForecasting,
  forecastComplete,
  setForecastComplete,
}) => {
  const handleRunForecast = () => {
    setIsForecasting(true);
    setForecastComplete(false);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setTimeSlider(step);
      if (step >= 5) {
        clearInterval(interval);
        setIsForecasting(false);
        setForecastComplete(true);
      }
    }, 500);
  };

  return (
    <>
      <div className="panel">
        <div className="panel-header">
          <h2 className="panel-title">Dự báo Điểm nóng Động</h2>
        </div>
        <div className="filter-pills">
          <button
            className={`pill ${timeFilter === "weekend" ? "active" : ""}`}
            onClick={() => {
              setTimeFilter("weekend");
              setForecastComplete(false);
            }}
          >
            Cuối tuần
          </button>
          <button
            className={`pill ${timeFilter === "weekday" ? "active" : ""}`}
            onClick={() => {
              setTimeFilter("weekday");
              setForecastComplete(false);
            }}
          >
            Ngày thường
          </button>
          <button
            className={`pill ${timeFilter === "night" ? "active" : ""}`}
            onClick={() => {
              setTimeFilter("night");
              setForecastComplete(false);
            }}
          >
            Đêm khuya
          </button>
        </div>
        <div className="filter-pills">
          <button
            className={`pill ${crimeTypeFilter === "all" ? "active" : ""}`}
            onClick={() => {
              setCrimeTypeFilter("all");
              setForecastComplete(false);
            }}
          >
            Tất cả
          </button>
          <button
            className={`pill ${crimeTypeFilter === "narcotics" ? "active" : ""}`}
            onClick={() => {
              setCrimeTypeFilter("narcotics");
              setForecastComplete(false);
            }}
          >
            Ma túy
          </button>
          <button
            className={`pill ${crimeTypeFilter === "theft" ? "active" : ""}`}
            onClick={() => {
              setCrimeTypeFilter("theft");
              setForecastComplete(false);
            }}
          >
            Trộm cắp
          </button>
          <button
            className={`pill ${crimeTypeFilter === "violence" ? "active" : ""}`}
            onClick={() => {
              setCrimeTypeFilter("violence");
              setForecastComplete(false);
            }}
          >
            Bạo lực
          </button>
        </div>
        <div className="time-controls">
          <span style={{ fontSize: "12px", color: "#6b7c93" }}>Thời gian:</span>
          <input
            type="range"
            className="time-slider"
            min="0"
            max="5"
            step="1"
            value={timeSlider}
            onChange={(e) => {
              setTimeSlider(parseInt(e.target.value));
              if (parseInt(e.target.value) >= 3) {
                setForecastComplete(true);
              }
            }}
          />
          <span className="time-label">
            {timeFilter === "weekend" &&
              ["T7 00:00", "T7 06:00", "T7 12:00", "T7 18:00", "CN 00:00", "CN 06:00"][
                timeSlider
              ]}
            {timeFilter === "weekday" &&
              ["T2 06:00", "T2 12:00", "T2 18:00", "T3 06:00", "T3 12:00", "T3 18:00"][
                timeSlider
              ]}
            {timeFilter === "night" &&
              ["22:00", "23:00", "00:00", "01:00", "02:00", "03:00"][timeSlider]}
          </span>
        </div>
        <HeatmapVisualization
          timeStep={timeSlider}
          timeFilter={timeFilter}
          crimeType={crimeTypeFilter}
        />
      </div>

      <div className="control-panel">
        <div className="panel">
          <div className="panel-header">
            <h2 className="panel-title">Cấu hình Dự báo</h2>
          </div>
          <div
            style={{
              padding: "15px",
              background: "rgba(0,245,212,0.05)",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#6b7c93",
                marginBottom: "8px",
                textTransform: "uppercase",
              }}
            >
              Đang phân tích
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono",
                color: "#00f5d4",
                fontSize: "14px",
              }}
            >
              {timeFilter === "weekend" && "Cuối tuần"}
              {timeFilter === "weekday" && "Ngày thường"}
              {timeFilter === "night" && "Đêm khuya (22h-4h)"}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#8899aa",
                marginTop: "5px",
              }}
            >
              Loại: {crimeTypeFilter === "all" && "Tất cả tội phạm"}
              {crimeTypeFilter === "narcotics" && "Tội phạm Ma túy"}
              {crimeTypeFilter === "theft" && "Trộm cắp tài sản"}
              {crimeTypeFilter === "violence" && "Bạo lực"}
            </div>
          </div>

          <button
            className="scan-button"
            style={{ width: "100%", marginBottom: "15px" }}
            onClick={handleRunForecast}
            disabled={isForecasting}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
            </svg>
            {isForecasting ? "Đang dự báo..." : "Chạy Dự báo"}
          </button>

          {forecastComplete && (
            <div className="prediction-box" style={{ animation: "slideUp 0.5s ease" }}>
              <div className="prediction-title">⚠️ Vùng nguy cơ cao được phát hiện</div>
              {crimeTypeFilter === "narcotics" && (
                <>
                  <div className="zone-item">
                    <span className="zone-name">Khu vực A - Quận 11</span>
                    <span className="zone-risk">
                      {timeFilter === "night" ? "94%" : "87%"} Risk
                    </span>
                  </div>
                  <div className="zone-item">
                    <span className="zone-name">Khu vực B - Quận 7</span>
                    <span className="zone-risk">
                      {timeFilter === "night" ? "89%" : "79%"} Risk
                    </span>
                  </div>
                </>
              )}
              {crimeTypeFilter === "theft" && (
                <>
                  <div className="zone-item">
                    <span className="zone-name">Trung tâm TM - Quận 1</span>
                    <span className="zone-risk">
                      {timeFilter === "weekday" ? "91%" : "76%"} Risk
                    </span>
                  </div>
                  <div className="zone-item">
                    <span className="zone-name">Bãi đỗ xe - Quận 5</span>
                    <span className="zone-risk">
                      {timeFilter === "night" ? "88%" : "72%"} Risk
                    </span>
                  </div>
                </>
              )}
              {crimeTypeFilter === "violence" && (
                <>
                  <div className="zone-item">
                    <span className="zone-name">Khu giải trí - Quận 3</span>
                    <span className="zone-risk">
                      {timeFilter === "night" ? "96%" : "82%"} Risk
                    </span>
                  </div>
                  <div className="zone-item">
                    <span className="zone-name">Khu dân cư - Quận 9</span>
                    <span className="zone-risk">74% Risk</span>
                  </div>
                </>
              )}
              {crimeTypeFilter === "all" && (
                <>
                  <div className="zone-item">
                    <span className="zone-name">Đa điểm - Quận 7, 11</span>
                    <span className="zone-risk">85% Risk</span>
                  </div>
                  <div className="zone-item">
                    <span className="zone-name">Khu vực C - Quận 3</span>
                    <span className="zone-risk">78% Risk</span>
                  </div>
                </>
              )}
            </div>
          )}

          {forecastComplete && (
            <div className="insight-box" style={{ marginTop: "20px", animation: "slideUp 0.5s ease" }}>
              <div className="insight-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                Đề xuất Tuần tra
              </div>
              <p className="insight-text">
                {timeFilter === "weekend" && crimeTypeFilter === "narcotics" && (
                  <>
                    Hệ thống đề xuất{" "}
                    <strong style={{ color: "#00f5d4" }}>lộ trình tuần tra tối ưu</strong> cắt
                    ngang luồng di chuyển dự báo. Triển khai từ{" "}
                    <strong style={{ color: "#f39c12" }}>22:00 - 04:00</strong> sẽ đạt hiệu quả
                    cao nhất.
                  </>
                )}
                {timeFilter === "weekday" && (
                  <>
                    Ngày thường có mật độ thấp hơn. Tập trung{" "}
                    <strong style={{ color: "#00f5d4" }}>tuần tra cơ động</strong> vào khung{" "}
                    <strong style={{ color: "#f39c12" }}>17:00 - 21:00</strong> khi người dân tan
                    làm.
                  </>
                )}
                {timeFilter === "night" && (
                  <>
                    Khung đêm khuya có{" "}
                    <strong style={{ color: "#ff6b6b" }}>nguy cơ cao nhất</strong>. Đề xuất{" "}
                    <strong style={{ color: "#00f5d4" }}>tăng cường 50% lực lượng</strong> và sử
                    dụng <strong style={{ color: "#f39c12" }}>camera giám sát AI</strong>.
                  </>
                )}
                {timeFilter === "weekend" && crimeTypeFilter !== "narcotics" && (
                  <>
                    Cuối tuần tập trung tại các điểm đông người.{" "}
                    <strong style={{ color: "#00f5d4" }}>Tuần tra đồng phục</strong> kết hợp{" "}
                    <strong style={{ color: "#f39c12" }}>thường phục</strong> sẽ hiệu quả.
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForecastTab;
