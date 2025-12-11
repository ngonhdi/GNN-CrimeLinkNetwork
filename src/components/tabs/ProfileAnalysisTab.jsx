import React, { useState } from "react";

/**
 * Profile Analysis Tab - Phân tích Hồ sơ Đối tượng/Vụ án
 * Inspired by: IBM i2 Analyst's Notebook, Palantir Gotham
 */
const ProfileAnalysisTab = () => {
  const [selectedProfile, setSelectedProfile] = useState("suspect_001");
  const [viewMode, setViewMode] = useState("network"); // network, timeline, details

  // Simulated profile data
  const profiles = {
    suspect_001: {
      id: "DT-2024-001",
      name: "Nguyễn Văn A",
      alias: ["Ván", "A Nguyên"],
      age: 34,
      gender: "Nam",
      address: "Số 15, Ngõ 25, Phố Tây Sơn, Đống Đa, Hà Nội",
      occupation: "Thợ điện tự do",
      criminal_record: [
        { year: 2018, crime: "Trộm cắp tài sản", sentence: "18 tháng tù", status: "Đã chấp hành xong" },
        { year: 2020, crime: "Vi phạm giao thông", sentence: "Phạt hành chính", status: "Đã chấp hành" },
      ],
      associations: [
        { id: "DT-2024-002", name: "Trần Văn B", relation: "Bạn cùng phòng trọ", risk: "cao" },
        { id: "DT-2024-003", name: "Lê Thị C", relation: "Bạn gái cũ", risk: "trung-binh" },
        { id: "DT-2024-004", name: "Phạm Văn D", relation: "Đồng nghiệp", risk: "thấp" },
        { id: "VỤ-2024-015", name: "Vụ trộm xe máy 15/03", relation: "Nghi phạm", risk: "cao" },
        { id: "VỤ-2024-023", name: "Vụ đột nhập 22/03", relation: "Có mặt gần hiện trường", risk: "trung-binh" },
      ],
      timeline: [
        { date: "05/11/2024 02:30", event: "Xuất hiện gần hiện trường vụ án", location: "Chung cư Cầu Giấy", type: "di chuyển" },
        { date: "04/11/2024 23:15", event: "Gọi điện cho Trần Văn B", location: "Tây Sơn", type: "liên lạc" },
        { date: "04/11/2024 18:00", event: "Rút tiền ATM", location: "Ngân hàng Techcombank", type: "giao dịch" },
        { date: "03/11/2024 14:30", event: "Mua dây điện", location: "Chợ điện tử Thái Hà", type: "mua sắm" },
        { date: "01/11/2024 22:00", event: "Gặp gỡ nhóm bạn", location: "Quán cà phê Láng Hạ", type: "gặp gỡ" },
        { date: "30/10/2024 19:00", event: "Theo dõi mục tiêu", location: "Gần chung cư", type: "di chuyển" },
      ],
      phone: "098-XXX-XXXX",
      vehicle: "Honda SH 30A-XXX.XX",
      socialMedia: ["Facebook: Nguyen Van A", "Zalo: 098XXXXXXX"],
      riskScore: 87,
      watchlist: true,
    },
  };

  const currentProfile = profiles[selectedProfile];

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

  const getEventIcon = (type) => {
    switch (type) {
      case "di chuyển":
        return "🚶";
      case "liên lạc":
        return "📞";
      case "giao dịch":
        return "💳";
      case "mua sắm":
        return "🛒";
      case "gặp gỡ":
        return "👥";
      default:
        return "📍";
    }
  };

  return (
    <div className="profile-analysis-tab">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-title-section">
          <h2 className="profile-title">👤 Phân tích Hồ sơ Đối tượng</h2>
          <p className="profile-subtitle">
            Phân tích mối quan hệ, dòng thời gian và đặc điểm hành vi
          </p>
        </div>

        <div className="profile-controls">
          <div className="view-mode-selector">
            <button
              className={`view-mode-btn ${viewMode === "network" ? "active" : ""}`}
              onClick={() => setViewMode("network")}
            >
              🕸️ Mạng lưới
            </button>
            <button
              className={`view-mode-btn ${viewMode === "timeline" ? "active" : ""}`}
              onClick={() => setViewMode("timeline")}
            >
              📅 Dòng thời gian
            </button>
            <button
              className={`view-mode-btn ${viewMode === "details" ? "active" : ""}`}
              onClick={() => setViewMode("details")}
            >
              📋 Chi tiết
            </button>
          </div>
        </div>
      </div>

      <div className="profile-content">
        {/* Left Panel - Profile Summary */}
        <div className="profile-summary">
          <div className="summary-card">
            <div className="profile-avatar">
              <div className="avatar-icon">👤</div>
              {currentProfile.watchlist && (
                <div className="watchlist-badge">⚠️ Theo dõi</div>
              )}
            </div>

            <div className="profile-basic-info">
              <h3 className="profile-name">{currentProfile.name}</h3>
              <div className="profile-id">{currentProfile.id}</div>
              {currentProfile.alias.length > 0 && (
                <div className="profile-alias">
                  Biệt danh: {currentProfile.alias.join(", ")}
                </div>
              )}
            </div>

            <div className="risk-score-section">
              <div className="risk-score-label">Điểm rủi ro:</div>
              <div className="risk-score-circle">
                <svg viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(107, 124, 147, 0.2)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={getRiskColor("cao")}
                    strokeWidth="10"
                    strokeDasharray={`${currentProfile.riskScore * 2.827} ${282.7 - currentProfile.riskScore * 2.827}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy="7"
                    fontSize="24"
                    fill="#e74c3c"
                    fontWeight="bold"
                  >
                    {currentProfile.riskScore}
                  </text>
                </svg>
              </div>
              <div className="risk-score-desc">Mức độ cao</div>
            </div>

            <div className="profile-details-list">
              <div className="detail-item">
                <span className="detail-label">Tuổi:</span>
                <span className="detail-value">{currentProfile.age}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Giới tính:</span>
                <span className="detail-value">{currentProfile.gender}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Nghề nghiệp:</span>
                <span className="detail-value">{currentProfile.occupation}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Điện thoại:</span>
                <span className="detail-value">{currentProfile.phone}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phương tiện:</span>
                <span className="detail-value">{currentProfile.vehicle}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Địa chỉ:</span>
                <span className="detail-value">{currentProfile.address}</span>
              </div>
            </div>

            <div className="criminal-record-section">
              <h4 className="section-title">📜 Tiền án:</h4>
              {currentProfile.criminal_record.map((record, idx) => (
                <div key={idx} className="record-item">
                  <div className="record-year">{record.year}</div>
                  <div className="record-content">
                    <div className="record-crime">{record.crime}</div>
                    <div className="record-sentence">{record.sentence}</div>
                    <div className="record-status">{record.status}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="social-media-section">
              <h4 className="section-title">📱 Mạng xã hội:</h4>
              {currentProfile.socialMedia.map((social, idx) => (
                <div key={idx} className="social-item">
                  {social}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Main Content */}
        <div className="profile-main-content">
          {/* Network View */}
          {viewMode === "network" && (
            <div className="network-view">
              <div className="network-header">
                <h3>🕸️ Mạng lưới Mối quan hệ</h3>
                <span className="connection-count">
                  {currentProfile.associations.length} kết nối
                </span>
              </div>

              <div className="network-visualization">
                {/* Central node */}
                <div className="network-center-node">
                  <div className="center-node-circle">
                    <div className="node-icon">👤</div>
                    <div className="node-label">{currentProfile.name.split(" ").slice(-1)}</div>
                  </div>
                </div>

                {/* Connected nodes */}
                {currentProfile.associations.map((assoc, idx) => {
                  const angle = (idx * 360) / currentProfile.associations.length;
                  const radius = 200;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <div key={assoc.id}>
                      {/* Connection line */}
                      <svg className="connection-line" style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        zIndex: 1,
                      }}>
                        <line
                          x1="50%"
                          y1="50%"
                          x2={`calc(50% + ${x}px)`}
                          y2={`calc(50% + ${y}px)`}
                          stroke={getRiskColor(assoc.risk)}
                          strokeWidth="2"
                          strokeDasharray={assoc.risk === "cao" ? "none" : "5,5"}
                          opacity="0.5"
                        />
                      </svg>

                      {/* Connected node */}
                      <div
                        className="network-node"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          borderColor: getRiskColor(assoc.risk),
                        }}
                      >
                        <div className="node-icon">
                          {assoc.id.startsWith("DT") ? "👤" : "📁"}
                        </div>
                        <div className="node-name">
                          {assoc.name.length > 15
                            ? assoc.name.substring(0, 15) + "..."
                            : assoc.name}
                        </div>
                        <div className="node-relation">{assoc.relation}</div>
                        <div
                          className="node-risk"
                          style={{ color: getRiskColor(assoc.risk) }}
                        >
                          {assoc.risk}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="network-legend">
                <div className="legend-title">Mức độ liên quan:</div>
                <div className="legend-items">
                  <div className="legend-item">
                    <div className="legend-line high"></div>
                    <span>Cao</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-line medium"></div>
                    <span>Trung bình</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-line low"></div>
                    <span>Thấp</span>
                  </div>
                </div>
              </div>

              <div className="associations-list">
                <h4>📋 Danh sách Mối quan hệ:</h4>
                {currentProfile.associations.map((assoc) => (
                  <div key={assoc.id} className="association-card">
                    <div className="assoc-icon">
                      {assoc.id.startsWith("DT") ? "👤" : "📁"}
                    </div>
                    <div className="assoc-info">
                      <div className="assoc-name">{assoc.name}</div>
                      <div className="assoc-relation">{assoc.relation}</div>
                    </div>
                    <div
                      className="assoc-risk-badge"
                      style={{
                        background: `rgba(${
                          assoc.risk === "cao"
                            ? "231, 76, 60"
                            : assoc.risk === "trung bình"
                            ? "243, 156, 18"
                            : "39, 174, 96"
                        }, 0.2)`,
                        color: getRiskColor(assoc.risk),
                      }}
                    >
                      {assoc.risk}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline View */}
          {viewMode === "timeline" && (
            <div className="timeline-view">
              <div className="timeline-header">
                <h3>📅 Dòng thời gian Hoạt động</h3>
                <span className="event-count">{currentProfile.timeline.length} sự kiện</span>
              </div>

              <div className="timeline-container">
                {currentProfile.timeline.map((event, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-marker">
                      <div className="marker-dot"></div>
                      {idx < currentProfile.timeline.length - 1 && (
                        <div className="marker-line"></div>
                      )}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-date">{event.date}</div>
                      <div className="timeline-event">
                        <span className="event-icon">{getEventIcon(event.type)}</span>
                        <span className="event-text">{event.event}</span>
                      </div>
                      <div className="timeline-location">
                        📍 {event.location}
                      </div>
                      <div
                        className="timeline-type"
                        style={{
                          background:
                            event.type === "di chuyển"
                              ? "rgba(231, 76, 60, 0.1)"
                              : event.type === "liên lạc"
                              ? "rgba(52, 152, 219, 0.1)"
                              : "rgba(155, 89, 182, 0.1)",
                          color:
                            event.type === "di chuyển"
                              ? "#e74c3c"
                              : event.type === "liên lạc"
                              ? "#3498db"
                              : "#9b59b6",
                        }}
                      >
                        {event.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Details View */}
          {viewMode === "details" && (
            <div className="details-view">
              <div className="details-header">
                <h3>📋 Thông tin Chi tiết</h3>
              </div>

              <div className="details-sections">
                <div className="detail-section">
                  <h4 className="section-title">📊 Phân tích Hành vi</h4>
                  <div className="analysis-content">
                    <p>
                      Đối tượng có hành vi di chuyển bất thường vào ban đêm, thường xuyên
                      xuất hiện gần các hiện trường vụ án. Có mối liên hệ với nhiều đối tượng
                      có tiền án tiền sự.
                    </p>
                    <div className="behavior-tags">
                      <span className="tag red">Hoạt động đêm</span>
                      <span className="tag orange">Di chuyển bất thường</span>
                      <span className="tag yellow">Mối quan hệ phức tạp</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4 className="section-title">🎯 Mô hình Phạm tội (MO)</h4>
                  <div className="mo-content">
                    <ul className="mo-list">
                      <li>Quan sát và theo dõi mục tiêu trước 2-3 ngày</li>
                      <li>Hành động vào khung giờ 2:00 - 3:30 sáng</li>
                      <li>Vô hiệu hóa camera an ninh trước 15-20 phút</li>
                      <li>Sử dụng dụng cụ chuyên nghiệp (dây điện, kìm, ...)</li>
                      <li>Không để lại dấu vết DNA hoặc vân tay</li>
                    </ul>
                  </div>
                </div>

                <div className="detail-section">
                  <h4 className="section-title">⚠️ Cảnh báo & Khuyến nghị</h4>
                  <div className="warning-content">
                    <div className="warning-box high">
                      <div className="warning-icon">🚨</div>
                      <div className="warning-text">
                        <strong>Mức độ nguy hiểm: CAO</strong>
                        <p>Đối tượng được đánh giá có khả năng tái phạm cao. Cần giám sát chặt chẽ.</p>
                      </div>
                    </div>
                    <div className="recommendation-box">
                      <h5>Khuyến nghị:</h5>
                      <ul>
                        <li>✓ Giám sát 24/7 qua camera và định vị</li>
                        <li>✓ Theo dõi mối quan hệ với Trần Văn B</li>
                        <li>✓ Rà soát lịch sử mua sắm dụng cụ</li>
                        <li>✓ Phối hợp với công an địa phương nơi cư trú</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h4 className="section-title">📈 Lịch sử Tương tác</h4>
                  <div className="interaction-chart">
                    <div className="chart-bar">
                      <div className="bar-label">Liên lạc điện thoại</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "80%", background: "#3498db" }}></div>
                        <span className="bar-value">34 cuộc gọi</span>
                      </div>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-label">Gặp gỡ trực tiếp</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "60%", background: "#9b59b6" }}></div>
                        <span className="bar-value">12 lần</span>
                      </div>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-label">Giao dịch tài chính</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "40%", background: "#e67e22" }}></div>
                        <span className="bar-value">7 lần</span>
                      </div>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-label">Xuất hiện gần hiện trường</div>
                      <div className="bar-container">
                        <div className="bar-fill" style={{ width: "90%", background: "#e74c3c" }}></div>
                        <span className="bar-value">9/9 vụ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileAnalysisTab;
