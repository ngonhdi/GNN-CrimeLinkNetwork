import React from "react";

const HeatmapVisualization = ({ timeStep, timeFilter, crimeType }) => {
  // Different hotspot configurations based on filters
  const hotspotConfigs = {
    weekend: {
      narcotics: [
        { x: 120, y: 80, intensity: 0.9, shifting: true },
        { x: 280, y: 150, intensity: 0.7, shifting: false },
        { x: 200, y: 220, intensity: 0.8, shifting: true },
      ],
      theft: [
        { x: 350, y: 100, intensity: 0.85, shifting: true },
        { x: 150, y: 180, intensity: 0.75, shifting: true },
        { x: 400, y: 200, intensity: 0.6, shifting: false },
      ],
      violence: [
        { x: 180, y: 120, intensity: 0.95, shifting: true },
        { x: 320, y: 180, intensity: 0.8, shifting: true },
      ],
      all: [
        { x: 120, y: 80, intensity: 0.9, shifting: true },
        { x: 280, y: 150, intensity: 0.7, shifting: false },
        { x: 200, y: 220, intensity: 0.8, shifting: true },
        { x: 350, y: 100, intensity: 0.6, shifting: true },
        { x: 150, y: 180, intensity: 0.5, shifting: false },
      ],
    },
    weekday: {
      narcotics: [
        { x: 200, y: 100, intensity: 0.6, shifting: false },
        { x: 300, y: 200, intensity: 0.5, shifting: true },
      ],
      theft: [
        { x: 250, y: 80, intensity: 0.8, shifting: true },
        { x: 180, y: 200, intensity: 0.7, shifting: true },
        { x: 380, y: 150, intensity: 0.65, shifting: false },
      ],
      violence: [
        { x: 150, y: 150, intensity: 0.7, shifting: true },
        { x: 350, y: 120, intensity: 0.6, shifting: false },
      ],
      all: [
        { x: 200, y: 100, intensity: 0.6, shifting: false },
        { x: 300, y: 200, intensity: 0.5, shifting: true },
        { x: 250, y: 80, intensity: 0.7, shifting: true },
      ],
    },
    night: {
      narcotics: [
        { x: 100, y: 100, intensity: 0.95, shifting: true },
        { x: 250, y: 180, intensity: 0.85, shifting: true },
        { x: 380, y: 80, intensity: 0.9, shifting: true },
      ],
      theft: [
        { x: 150, y: 120, intensity: 0.7, shifting: true },
        { x: 320, y: 200, intensity: 0.6, shifting: false },
      ],
      violence: [
        { x: 200, y: 100, intensity: 0.98, shifting: true },
        { x: 300, y: 180, intensity: 0.92, shifting: true },
        { x: 400, y: 120, intensity: 0.88, shifting: true },
      ],
      all: [
        { x: 100, y: 100, intensity: 0.95, shifting: true },
        { x: 250, y: 180, intensity: 0.85, shifting: true },
        { x: 380, y: 80, intensity: 0.9, shifting: true },
        { x: 200, y: 150, intensity: 0.75, shifting: false },
      ],
    },
  };

  const hotspots =
    hotspotConfigs[timeFilter]?.[crimeType] || hotspotConfigs.weekend.all;

  return (
    <svg viewBox="0 0 500 300" className="heatmap-svg">
      <defs>
        <radialGradient id="hotspot1">
          <stop offset="0%" stopColor="#ff0000" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#ff6b00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff6b00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hotspot2">
          <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#ffaa00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffaa00" stopOpacity="0" />
        </radialGradient>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#00f5d4" />
        </marker>
      </defs>

      {/* Background grid */}
      <rect width="500" height="300" fill="#0a0f14" />
      {[...Array(10)].map((_, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={i * 30}
          x2="500"
          y2={i * 30}
          stroke="#1a2530"
          strokeWidth="1"
        />
      ))}
      {[...Array(17)].map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 30}
          y1="0"
          x2={i * 30}
          y2="300"
          stroke="#1a2530"
          strokeWidth="1"
        />
      ))}

      {/* Hotspots */}
      {hotspots.map((spot, i) => {
        const shiftX = spot.shifting ? Math.sin(timeStep * 0.5) * 20 : 0;
        const shiftY = spot.shifting ? Math.cos(timeStep * 0.3) * 15 : 0;
        return (
          <circle
            key={i}
            cx={spot.x + shiftX}
            cy={spot.y + shiftY}
            r={50 * spot.intensity}
            fill={`url(#hotspot${spot.intensity > 0.7 ? "1" : "2"})`}
            className="hotspot-pulse"
          />
        );
      })}

      {/* Movement arrows */}
      {timeStep > 2 && (
        <>
          <path
            d="M 130,90 Q 160,120 190,140"
            fill="none"
            stroke="#00f5d4"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
            className="arrow-animate"
          />
          <path
            d="M 360,110 Q 340,150 300,170"
            fill="none"
            stroke="#00f5d4"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
            className="arrow-animate"
          />
        </>
      )}

      {/* High-risk zone markers */}
      {timeStep > 3 && (
        <>
          <rect
            x="240"
            y="160"
            width="60"
            height="40"
            fill="none"
            stroke="#ff0000"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="zone-blink"
          />
          <text
            x="270"
            y="155"
            textAnchor="middle"
            fill="#ff0000"
            fontSize="10"
          >
            HIGH RISK
          </text>
          <rect
            x="100"
            y="200"
            width="50"
            height="35"
            fill="none"
            stroke="#ff0000"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="zone-blink"
          />
          <text
            x="125"
            y="195"
            textAnchor="middle"
            fill="#ff0000"
            fontSize="10"
          >
            HIGH RISK
          </text>
        </>
      )}
    </svg>
  );
};

export default HeatmapVisualization;
