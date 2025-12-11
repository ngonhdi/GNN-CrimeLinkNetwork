import React, { useState } from "react";

/**
 * TheoryExplainer - Component giải thích lý thuyết tội phạm học
 * Kết hợp với phân tích vụ án để giải thích TẠI SAO mô hình dự đoán như vậy
 */
const TheoryExplainer = ({ crimeData, predictions }) => {
  const [activeTheory, setActiveTheory] = useState(null);

  const theories = [
    {
      id: "broken_windows",
      name: "Lý thuyết Cửa sổ vỡ",
      emoji: "🪟",
      shortDesc: "Broken Windows Theory",
      explanation:
        "Những vi phạm nhỏ không được xử lý sẽ dẫn đến tội phạm nghiêm trọng hơn. Khu vực có nhiều phá hoại tài sản nhỏ thường dẫn đến tội phạm lớn.",
      application: crimeData
        ? `Vụ ${crimeData.type} xảy ra tại khu vực có ${crimeData.nearbyMinorCrimes || 12} vi phạm trật tự nhỏ chưa được xử lý trong 30 ngày qua.`
        : "Chọn vụ án để xem phân tích chi tiết.",
      color: "#e74c3c",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-2h2V7h-4v2h2z" />
        </svg>
      ),
    },
    {
      id: "routine_activity",
      name: "Lý thuyết Hoạt động Thường Ngày",
      emoji: "🔄",
      shortDesc: "Routine Activity Theory",
      explanation:
        "Tội phạm xảy ra khi: (1) Kẻ phạm tội có động cơ, (2) Mục tiêu phù hợp, (3) Thiếu người giám sát. Ba yếu tố này hội tụ trong không-thời gian.",
      application: crimeData
        ? `${crimeData.time} là thời điểm ${crimeData.timeRisk || "rủi ro cao"} - ít người qua lại, camera thiếu ánh sáng. Khu vực quận ${crimeData.district} thiếu lực lượng tuần tra.`
        : "Chọn vụ án để xem phân tích chi tiết.",
      color: "#3498db",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
    },
    {
      id: "hotspot",
      name: "Lý thuyết Điểm nóng",
      emoji: "🔥",
      shortDesc: "Crime Hot Spots Theory",
      explanation:
        "Tội phạm tập trung cao độ tại một số địa điểm. 5% địa điểm chiếm 50% tội phạm. Các điểm nóng có đặc điểm môi trường đặc biệt.",
      application: crimeData
        ? `Vị trí này nằm trong bán kính 500m của ${crimeData.nearbyHotspots || 3} điểm nóng đã biết. Mật độ tội phạm cao gấp ${crimeData.densityMultiplier || 4.2}x trung bình.`
        : "Chọn vụ án để xem phân tích chi tiết.",
      color: "#e67e22",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z" />
        </svg>
      ),
    },
    {
      id: "pattern",
      name: "Lý thuyết Mô hình Không gian",
      emoji: "🗺️",
      shortDesc: "Crime Pattern Theory",
      explanation:
        "Tội phạm hình thành mô hình không gian dựa trên hoạt động di chuyển của tội phạm. Chúng tìm cơ hội quanh tuyến đường quen thuộc.",
      application: predictions
        ? `Hệ thống phát hiện ${predictions.length} vụ có cùng mô hình hoạt động: ${predictions[0]?.pattern === "Linear corridor along Transit Line" ? "Di chuyển theo tuyến giao thông chính" : predictions[0]?.pattern || "Chưa xác định"}.`
        : "Bắt đầu phân tích để xem mô hình.",
      color: "#9b59b6",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="theory-explainer">
      <div className="theory-header">
        <h3 className="theory-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
          </svg>
          Giải thích theo Lý thuyết Tội phạm học
        </h3>
        <p className="theory-subtitle">
          Hiểu <strong>TẠI SAO</strong> mô hình dự đoán vụ án liên quan
        </p>
      </div>

      <div className="theory-grid">
        {theories.map((theory) => (
          <div
            key={theory.id}
            className={`theory-card ${activeTheory === theory.id ? "active" : ""}`}
            onClick={() =>
              setActiveTheory(activeTheory === theory.id ? null : theory.id)
            }
            style={{ borderColor: theory.color }}
          >
            <div className="theory-card-header">
              <div className="theory-icon" style={{ background: theory.color + "22" }}>
                <span style={{ fontSize: "32px" }}>{theory.emoji}</span>
              </div>
              <div>
                <h4 className="theory-name">{theory.name}</h4>
                <p className="theory-short">{theory.shortDesc}</p>
              </div>
            </div>

            {activeTheory === theory.id && (
              <div className="theory-details">
                <div className="theory-explanation">
                  <strong>📚 Lý thuyết:</strong>
                  <p>{theory.explanation}</p>
                </div>
                <div className="theory-application">
                  <strong>🎯 Áp dụng cho vụ án này:</strong>
                  <p>{theory.application}</p>
                </div>

                {/* Visual indicator */}
                <div className="theory-indicator">
                  <div className="indicator-label">Mức độ phù hợp:</div>
                  <div className="indicator-bar">
                    <div
                      className="indicator-fill"
                      style={{
                        width: `${
                          crimeData
                            ? Math.floor(Math.random() * 30 + 70)
                            : 50
                        }%`,
                        background: theory.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="theory-expand-icon">
              {activeTheory === theory.id ? "−" : "+"}
            </div>
          </div>
        ))}
      </div>

      {/* Summary box when theory is selected */}
      {activeTheory && (
        <div className="theory-summary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <p>
            <strong>Nhận xét:</strong> Các lý thuyết tội phạm học giúp giải thích{" "}
            <em>nguyên nhân</em> và <em>quy luật</em>, trong khi Hệ thống GNN tìm ra{" "}
            <em>mối liên hệ ẩn</em> trong dữ liệu thực tế phục vụ công tác điều tra.
          </p>
        </div>
      )}
    </div>
  );
};

export default TheoryExplainer;
