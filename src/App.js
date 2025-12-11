import React, { useState } from "react";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import StorytellingIntro from "./components/shared/StorytellingIntro";
import InvestigationTabEnhanced from "./components/tabs/InvestigationTabEnhanced";
import HotspotPredictionTabV2 from "./components/tabs/HotspotPredictionTabV2";
import ProfileAnalysisTab from "./components/tabs/ProfileAnalysisTab";
import LinkPredictionTabEnhanced from "./components/tabs/LinkPredictionTabEnhanced";
import { mockCrimes, graphEdges } from "./data/mockData";
import "./styles/Dashboard.css";
import "./styles/StorytellingEnhanced.css";
import "./styles/TabsEnhanced.css";
import "./styles/LinkPrediction.css";
import "./styles/LinkPredictionEnhanced.css";

export default function CrimeLinkDashboard() {
  // Storytelling state
  const [showIntro, setShowIntro] = useState(true);

  // Tab state
  const [activeTab, setActiveTab] = useState("investigate");

  // Investigation tab states
  const [selectedCrime, setSelectedCrime] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [highlightedNodes, setHighlightedNodes] = useState([]);


  // Graph data
  const graphNodes = mockCrimes.map((c) => ({
    id: c.id,
    type: c.type,
    lat: c.lat,
    lng: c.lng,
  }));

  // Simulate scanning process for investigation tab
  const handleScan = (crimeToScan = null) => {
    const targetCrime = crimeToScan || selectedCrime;
    if (!targetCrime) return;

    setIsScanning(true);
    setScanProgress(0);
    setShowResults(false);
    setHighlightedNodes([targetCrime.id]);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          setIsScanning(false);
          setShowResults(true);
          setHighlightedNodes([
            "CR-2024-001",
            "CR-2024-002",
            "CR-2024-003",
            "CR-2024-004",
          ]);
          return 1;
        }
        return prev + 0.02;
      });
    }, 50);
  };

  return (
    <div className="dashboard">
      {/* Storytelling Intro */}
      {showIntro && (
        <StorytellingIntro onComplete={() => setShowIntro(false)} />
      )}

      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {activeTab === "investigate" && (
          <InvestigationTabEnhanced
            selectedCrime={selectedCrime}
            setSelectedCrime={setSelectedCrime}
            isScanning={isScanning}
            scanProgress={scanProgress}
            showResults={showResults}
            highlightedNodes={highlightedNodes}
            handleScan={handleScan}
            graphNodes={graphNodes}
            graphEdges={graphEdges}
            setHighlightedNodes={setHighlightedNodes}
            setShowResults={setShowResults}
          />
        )}

        {activeTab === "forecast" && <HotspotPredictionTabV2 />}

        {activeTab === "profile" && <ProfileAnalysisTab />}

        {activeTab === "linkpred" && <LinkPredictionTabEnhanced />}
      </main>

      <Footer />
    </div>
  );
}
