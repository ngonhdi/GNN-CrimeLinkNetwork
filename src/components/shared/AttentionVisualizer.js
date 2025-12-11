import React, { useState, useEffect } from "react";

/**
 * AttentionVisualizer - Visualize Multi-Head Attention mechanism
 * Giải thích cách GNN sử dụng attention để tìm liên kết
 */
const AttentionVisualizer = ({ sourceCrime, relatedCrimes }) => {
  const [selectedHead, setSelectedHead] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Simulate 4 attention heads focusing on different aspects
  const attentionHeads = [
    {
      name: "Spatial Head",
      emoji: "🗺️",
      focus: "Khoảng cách địa lý",
      color: "#3498db",
      weights: relatedCrimes.map((c) => c.spatialWeight || Math.random()),
    },
    {
      name: "Temporal Head",
      emoji: "⏰",
      focus: "Khoảng thời gian",
      color: "#9b59b6",
      weights: relatedCrimes.map((c) => c.temporalWeight || Math.random()),
    },
    {
      name: "Semantic Head",
      emoji: "🏷️",
      focus: "Loại tội phạm",
      color: "#e67e22",
      weights: relatedCrimes.map((c) => c.semanticWeight || Math.random()),
    },
    {
      name: "Behavioral Head",
      emoji: "🎭",
      focus: "Mô hình hành vi",
      color: "#1abc9c",
      weights: relatedCrimes.map(() => Math.random()),
    },
  ];

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setSelectedHead((prev) => (prev + 1) % attentionHeads.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const currentHead = attentionHeads[selectedHead];

  return (
    <div className="attention-visualizer">
      {/* Header */}
      <div className="attention-header">
        <h3 className="attention-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
          Cơ chế Chú ý Đa đầu (Multi-Head Attention)
        </h3>
        <p className="attention-subtitle">
          Mỗi "đầu chú ý" phân tích một khía cạnh khác nhau của vụ án
        </p>
      </div>

      {/* Attention Heads Selector */}
      <div className="attention-heads-selector">
        {attentionHeads.map((head, idx) => (
          <button
            key={idx}
            className={`attention-head-btn ${selectedHead === idx ? "active" : ""}`}
            onClick={() => {
              setSelectedHead(idx);
              setIsAnimating(false);
            }}
            style={{
              borderColor: selectedHead === idx ? head.color : "#2a3f5f",
              background: selectedHead === idx ? head.color + "11" : "transparent",
            }}
          >
            <span className="head-emoji">{head.emoji}</span>
            <span className="head-name">{head.name}</span>
          </button>
        ))}
      </div>

      {/* Auto-play toggle */}
      <div className="attention-controls">
        <label className="attention-toggle">
          <input
            type="checkbox"
            checked={isAnimating}
            onChange={(e) => setIsAnimating(e.target.checked)}
          />
          <span>Auto-play</span>
        </label>
      </div>

      {/* Current Head Visualization */}
      <div className="attention-main">
        <div className="attention-focus-card">
          <div className="focus-header">
            <span className="focus-emoji">{currentHead.emoji}</span>
            <div>
              <h4 className="focus-name">{currentHead.name}</h4>
              <p className="focus-description">{currentHead.focus}</p>
            </div>
          </div>

          {/* Source Crime */}
          <div className="attention-source">
            <div className="crime-node source">
              <div className="node-pulse" style={{ borderColor: currentHead.color }} />
              {sourceCrime ? sourceCrime.type : "Vụ án gốc"}
            </div>
          </div>

          {/* Attention Arrows */}
          <div className="attention-arrows">
            {relatedCrimes.slice(0, 3).map((crime, idx) => {
              const weight = currentHead.weights[idx] || 0;
              return (
                <div key={idx} className="attention-connection">
                  <div className="connection-line">
                    <div
                      className="connection-arrow"
                      style={{
                        width: `${weight * 100}%`,
                        background: `linear-gradient(90deg, ${currentHead.color}00, ${currentHead.color})`,
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill={currentHead.color}
                      >
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                      </svg>
                    </div>
                  </div>
                  <div className="attention-weight">
                    {(weight * 100).toFixed(0)}%
                  </div>
                  <div className="crime-node target">
                    {crime.type || `Vụ ${idx + 1}`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        <div className="attention-explanation">
          <h4>💡 {currentHead.name} đang phân tích:</h4>
          <ul>
            {selectedHead === 0 && (
              <>
                <li>📍 Khoảng cách địa lý giữa các vụ án</li>
                <li>🏙️ Các vụ gần nhau ({"<"}1km) có trọng số cao</li>
                <li>🗺️ Phát hiện pattern di chuyển theo không gian</li>
              </>
            )}
            {selectedHead === 1 && (
              <>
                <li>⏱️ Khoảng thời gian giữa các vụ án</li>
                <li>📅 Các vụ xảy ra gần nhau ({"<"}24h) có trọng số cao</li>
                <li>🔄 Phát hiện pattern hoạt động theo thời gian</li>
              </>
            )}
            {selectedHead === 2 && (
              <>
                <li>🏷️ Loại tội phạm tương tự nhau</li>
                <li>📊 Cùng category có trọng số cao</li>
                <li>🎯 Phát hiện chuyên môn hóa của tội phạm</li>
              </>
            )}
            {selectedHead === 3 && (
              <>
                <li>🎭 Mô hình hành vi (thủ đoạn phạm tội)</li>
                <li>🔍 Phương thức thực hiện tương đồng</li>
                <li>👥 Phát hiện "đặc điểm" của nhóm đối tượng</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* How it works */}
      <div className="attention-info">
        <div className="info-card">
          <h4>🧠 Cách hoạt động:</h4>
          <ol className="info-steps">
            <li>
              <strong>4 attention heads</strong> hoạt động song song
            </li>
            <li>
              Mỗi head tính <strong>attention score</strong> riêng
            </li>
            <li>
              Scores được <strong>kết hợp</strong> để ra dự đoán cuối
            </li>
            <li>
              Model <strong>học tự động</strong> head nào quan trọng hơn
            </li>
          </ol>
        </div>

        <div className="info-card">
          <h4>✨ Ưu điểm:</h4>
          <ul className="info-benefits">
            <li>🎯 Phát hiện mối liên hệ từ nhiều góc độ</li>
            <li>🔄 Tự động điều chỉnh theo từng vụ án</li>
            <li>🧩 Tìm được mô hình phức tạp mà phương pháp truyền thống khó phát hiện</li>
          </ul>
        </div>
      </div>

      {/* Final aggregation visualization */}
      <div className="attention-aggregation">
        <h4 className="aggregation-title">
          🔀 Kết hợp từ tất cả attention heads
        </h4>
        <div className="aggregation-formula">
          <span className="formula-part" style={{ color: attentionHeads[0].color }}>
            Spatial
          </span>
          <span className="formula-op">⊕</span>
          <span className="formula-part" style={{ color: attentionHeads[1].color }}>
            Temporal
          </span>
          <span className="formula-op">⊕</span>
          <span className="formula-part" style={{ color: attentionHeads[2].color }}>
            Semantic
          </span>
          <span className="formula-op">⊕</span>
          <span className="formula-part" style={{ color: attentionHeads[3].color }}>
            Behavioral
          </span>
          <span className="formula-op">=</span>
          <span className="formula-result">Kết quả Dự đoán</span>
        </div>
      </div>
    </div>
  );
};

export default AttentionVisualizer;
