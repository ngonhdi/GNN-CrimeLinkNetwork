import React, { useState, useEffect, useRef } from "react";

const NetworkGraph = ({ nodes, edges, highlightedNodes, onNodeClick }) => {
  const svgRef = useRef(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Generate node positions in a force-directed layout simulation
    const centerX = 300;
    const centerY = 200;
    const newPositions = nodes.map((node, i) => ({
      ...node,
      x:
        centerX +
        Math.cos((i / nodes.length) * Math.PI * 2) * (100 + Math.random() * 80),
      y:
        centerY +
        Math.sin((i / nodes.length) * Math.PI * 2) * (80 + Math.random() * 60),
    }));
    setPositions(newPositions);
  }, [nodes]);

  return (
    <svg ref={svgRef} viewBox="0 0 600 400" className="network-graph">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#00f5d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00f5d4" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Edges */}
      {edges.map((edge, i) => {
        const source = positions.find((p) => p.id === edge.source);
        const target = positions.find((p) => p.id === edge.target);
        if (!source || !target) return null;
        const isHighlighted =
          highlightedNodes.includes(edge.source) &&
          highlightedNodes.includes(edge.target);
        return (
          <g key={i}>
            <line
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={isHighlighted ? "#00f5d4" : "#2a3a4a"}
              strokeWidth={isHighlighted ? 2 : 1}
              opacity={isHighlighted ? 1 : 0.3}
              className={isHighlighted ? "edge-animated" : ""}
            />
            {isHighlighted && (
              <circle r="3" fill="#00f5d4" filter="url(#glow)">
                <animateMotion
                  dur="1.5s"
                  repeatCount="indefinite"
                  path={`M${source.x},${source.y} L${target.x},${target.y}`}
                />
              </circle>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {positions.map((node) => {
        const isHighlighted = highlightedNodes.includes(node.id);
        const nodeColor =
          node.type === "MOTOR VEHICLE THEFT"
            ? "#ff6b6b"
            : node.type === "NARCOTICS"
            ? "#9b59b6"
            : node.type === "BURGLARY"
            ? "#f39c12"
            : "#3498db";
        return (
          <g
            key={node.id}
            onClick={() => onNodeClick(node)}
            style={{ cursor: "pointer" }}
          >
            {isHighlighted && (
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill="none"
                stroke="#00f5d4"
                strokeWidth="2"
                opacity="0.5"
                className="pulse-ring"
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={isHighlighted ? 12 : 8}
              fill={nodeColor}
              filter={isHighlighted ? "url(#glow)" : ""}
              className={isHighlighted ? "node-highlighted" : ""}
            />
            {isHighlighted && (
              <text
                x={node.x}
                y={node.y - 20}
                textAnchor="middle"
                fill="#fff"
                fontSize="10"
              >
                {node.id}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default NetworkGraph;
