"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import ProtectedRoute from "../../components/ProtectedRoute";
import DashboardCard from "../../components/DashboardCard";
import DashboardCharts from "../../components/DashboardCharts";
import api from "../../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPages: 0,
    totalSections: 0,
    totalImages: 0,
    totalUsers: 0,
    published: 0,
    draft: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get("/dashboard");
      setStats(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        {/* Welcome Header */}
        <div style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em", margin: 0 }}>
              Dashboard Overview 👋
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "4px" }}>
              Welcome back, Admin! Here is what's happening across your CMS platform today.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/dashboard/content" className="btn-primary" style={{ textDecoration: "none" }}>
              <span>+ Create Content</span>
            </Link>
            <Link href="/" target="_blank" className="btn-secondary" style={{ textDecoration: "none" }}>
              <span>🌐 Public Site</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <DashboardCard title="Pages Managed" value={stats.totalPages} icon="📄" color="#2563eb" change="+2 new" />
          <DashboardCard title="Content Sections" value={stats.totalSections} icon="📝" color="#10b981" change="+5 this week" />
          <DashboardCard title="Media Assets" value={stats.totalImages} icon="🖼️" color="#f59e0b" change="Active" />
          <DashboardCard title="Admin Users" value={stats.totalUsers} icon="👥" color="#6366f1" change="Verified" />
        </div>

        {/* Charts Section */}
        <DashboardCharts stats={stats} />
      </Layout>
    </ProtectedRoute>
  );
}