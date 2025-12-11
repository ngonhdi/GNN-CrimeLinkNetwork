import React from "react";

const RadarChart = ({ data, labels }) => {
  const centerX = 150;
  const centerY = 150;
  const radius = 100;
  const angleStep = (Math.PI * 2) / labels.length;

  const getPoint = (value, index) => {
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: centerX + Math.cos(angle) * radius * value,
      y: centerY + Math.sin(angle) * radius * value,
    };
  };

  const cityAvgPath =
    data.cityAvg
      .map((v, i) => getPoint(v, i))
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
      .join(" ") + "Z";
  const groupPath =
    data.group
      .map((v, i) => getPoint(v, i))
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
      .join(" ") + "Z";

  return (
    <svg viewBox="0 0 300 300" className="radar-chart">
      {/* Grid circles */}
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <circle
          key={scale}
          cx={centerX}
          cy={centerY}
          r={radius * scale}
          fill="none"
          stroke="#2a3a4a"
          strokeWidth="1"
        />
      ))}

      {/* Grid lines */}
      {labels.map((_, i) => {
        const point = getPoint(1, i);
        return (
          <line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={point.x}
            y2={point.y}
            stroke="#2a3a4a"
            strokeWidth="1"
          />
        );
      })}

      {/* City average */}
      <path
        d={cityAvgPath}
        fill="rgba(52, 152, 219, 0.2)"
        stroke="#3498db"
        strokeWidth="2"
      />

      {/* Group data */}
      <path
        d={groupPath}
        fill="rgba(0, 245, 212, 0.3)"
        stroke="#00f5d4"
        strokeWidth="2"
      />

      {/* Labels */}
      {labels.map((label, i) => {
        const point = getPoint(1.2, i);
        return (
          <text
            key={i}
            x={point.x}
            y={point.y}
            textAnchor="middle"
            fill="#8899aa"
            fontSize="10"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};

export default RadarChart;
