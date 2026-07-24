"use client";

export default function DashboardCard({ title, value, icon, color = "#2563eb", change = "+12%" }) {
  return (
    <div
      className="card-hover"
      style={{
        background: "#ffffff",
        padding: "24px",
        borderRadius: "14px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        flex: "1 1 220px",
        minWidth: "220px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: color,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {title}
        </span>
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: `${color}15`,
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          {icon || "📄"}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
        <h2 style={{ fontSize: "2.2rem", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.03em" }}>
          {value !== undefined ? value : 0}
        </h2>
        <span className="badge badge-success" style={{ fontSize: "0.75rem", padding: "2px 8px" }}>
          {change}
        </span>
      </div>
    </div>
  );
}