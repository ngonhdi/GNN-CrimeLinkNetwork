import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Circle, HeatmapLayer } from "@react-google-maps/api";
import GoogleMapFallback from "./GoogleMapFallback.jsx";

const libraries = ["visualization"];

// API Key - Thay thế bằng key thật của bạn
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY_HERE";
const USE_FALLBACK_MAP = !GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY_HERE";

const GoogleMapHotspot = ({ hotspots, center, zoom, showHeatmap }) => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [map, setMap] = useState(null);

  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Nếu không có API key, dùng fallback map
  if (USE_FALLBACK_MAP) {
    return <GoogleMapFallback hotspots={hotspots} showHeatmap={showHeatmap} />;
  }

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
    styles: [
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ color: "#1a1f2e" }],
      },
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8899aa" }],
      },
      {
        featureType: "all",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#0a0f14" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#2c3e50" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#0f1419" }],
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#1a252f" }],
      },
    ],
  };

  // Check if Google Maps is loaded first
  if (!isLoaded) {
    return (
      <div className="map-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải bản đồ...</p>
      </div>
    );
  }

  const getMarkerIcon = (risk) => {
    const colors = {
      cao: "#e74c3c",
      "trung bình": "#f39c12",
      thấp: "#27ae60",
    };

    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: colors[risk] || "#6b7c93",
      fillOpacity: 0.9,
      strokeColor: "#ffffff",
      strokeWeight: 2,
      scale: 12,
    };
  };

  const getCircleOptions = (risk) => {
    const colors = {
      cao: "#e74c3c",
      "trung bình": "#f39c12",
      thấp: "#27ae60",
    };

    return {
      strokeColor: colors[risk] || "#6b7c93",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: colors[risk] || "#6b7c93",
      fillOpacity: 0.2,
      radius: 500, // 500m radius
    };
  };

  // Prepare heatmap data
  const heatmapData = hotspots.map((hotspot) => ({
    location: new window.google.maps.LatLng(hotspot.lat, hotspot.lng),
    weight: hotspot.probability / 10, // Weight based on probability
  }));

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={mapOptions}
    >
      {/* Heatmap Layer */}
      {showHeatmap && (
        <HeatmapLayer
          data={heatmapData}
          options={{
            radius: 30,
            opacity: 0.6,
            gradient: [
              "rgba(0, 255, 255, 0)",
              "rgba(0, 255, 255, 1)",
              "rgba(0, 191, 255, 1)",
              "rgba(0, 127, 255, 1)",
              "rgba(0, 63, 255, 1)",
              "rgba(0, 0, 255, 1)",
              "rgba(0, 0, 223, 1)",
              "rgba(0, 0, 191, 1)",
              "rgba(0, 0, 159, 1)",
              "rgba(0, 0, 127, 1)",
              "rgba(63, 0, 91, 1)",
              "rgba(127, 0, 63, 1)",
              "rgba(191, 0, 31, 1)",
              "rgba(255, 0, 0, 1)",
            ],
          }}
        />
      )}

      {/* Hotspot Markers */}
      {hotspots.map((hotspot) => (
        <React.Fragment key={hotspot.id}>
          {/* Marker */}
          <Marker
            position={{ lat: hotspot.lat, lng: hotspot.lng }}
            icon={getMarkerIcon(hotspot.risk)}
            onClick={() => setSelectedHotspot(hotspot)}
            animation={window.google.maps.Animation.DROP}
          />

          {/* Circle around marker */}
          <Circle
            center={{ lat: hotspot.lat, lng: hotspot.lng }}
            options={getCircleOptions(hotspot.risk)}
          />
        </React.Fragment>
      ))}

      {/* Info Window */}
      {selectedHotspot && (
        <InfoWindow
          position={{ lat: selectedHotspot.lat, lng: selectedHotspot.lng }}
          onCloseClick={() => setSelectedHotspot(null)}
        >
          <div className="map-info-window">
            <div className="info-header">
              <h4>{selectedHotspot.district}</h4>
              <span
                className="info-risk-badge"
                style={{
                  background:
                    selectedHotspot.risk === "cao"
                      ? "#e74c3c"
                      : selectedHotspot.risk === "trung bình"
                      ? "#f39c12"
                      : "#27ae60",
                }}
              >
                {selectedHotspot.risk.toUpperCase()}
              </span>
            </div>
            <div className="info-content">
              <p>
                <strong>📍 Khu vực:</strong> {selectedHotspot.area}
              </p>
              <p>
                <strong>🎯 Xác suất:</strong> {selectedHotspot.probability}%
              </p>
              <p>
                <strong>🚨 Loại tội phạm:</strong> {selectedHotspot.crimeTypes.join(", ")}
              </p>
              <p>
                <strong>⏰ Thời gian:</strong> {selectedHotspot.timePattern}
              </p>
              <p>
                <strong>📊 Xu hướng:</strong>{" "}
                <span
                  style={{
                    color:
                      selectedHotspot.trend === "tăng" || selectedHotspot.trend === "tăng mạnh"
                        ? "#e74c3c"
                        : selectedHotspot.trend === "giảm"
                        ? "#27ae60"
                        : "#f39c12",
                  }}
                >
                  {selectedHotspot.trend} ({selectedHotspot.trendPercent > 0 ? "+" : ""}
                  {selectedHotspot.trendPercent}%)
                </span>
              </p>
            </div>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default GoogleMapHotspot;
