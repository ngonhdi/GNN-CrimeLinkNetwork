import React from "react";

const ScanningOverlay = ({ isScanning, progress }) => {
  if (!isScanning) return null;

  return (
    <div className="scanning-overlay">
      <div
        className="scan-ring"
        style={{
          transform: `scale(${1 + progress * 0.5})`,
          opacity: 1 - progress * 0.3,
        }}
      />
      <div
        className="scan-ring delay"
        style={{
          transform: `scale(${1 + progress * 0.3})`,
          opacity: 1 - progress * 0.5,
        }}
      />
      <div className="scan-text">
        {progress < 0.33 && "Analyzing Spatial proximity..."}
        {progress >= 0.33 &&
          progress < 0.66 &&
          "Analyzing Temporal patterns..."}
        {progress >= 0.66 && "Detected semantic match..."}
      </div>
    </div>
  );
};

export default ScanningOverlay;
