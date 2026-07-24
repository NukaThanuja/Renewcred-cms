"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardCharts({ stats }) {
  const barData = {
    labels: ["Pages", "Sections", "Images", "Users"],
    datasets: [
      {
        label: "Total Count",
        data: [
          stats.totalPages || 0,
          stats.totalSections || 0,
          stats.totalImages || 0,
          stats.totalUsers || 0,
        ],
        backgroundColor: [
          "#2563eb",
          "#10b981",
          "#f59e0b",
          "#6366f1",
        ],
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        cornerRadius: 8,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#f1f5f9" }, beginAtZero: true },
    },
  };

  const pieData = {
    labels: ["Published", "Draft"],
    datasets: [
      {
        data: [
          stats.published || 0,
          stats.draft || 0,
        ],
        backgroundColor: [
          "#10b981",
          "#f59e0b",
        ],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom", labels: { font: { family: "inherit", weight: "600" } } },
    },
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: "24px",
        marginTop: "32px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a" }}>CMS Activity Overview</h3>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Distribution across pages, sections, and media</span>
        </div>
        <Bar data={barData} options={barOptions} />
      </div>

      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "14px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#0f172a" }}>Publication Status</h3>
          <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Published vs Draft articles ratio</span>
        </div>
        <div style={{ maxHeight: "280px", display: "flex", justifyContent: "center" }}>
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}