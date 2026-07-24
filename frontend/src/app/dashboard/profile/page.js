"use client";

import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import ProtectedRoute from "../../../components/ProtectedRoute";
import api from "../../../services/api";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setUser(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
            Admin Profile 👤
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "4px" }}>
            Administrator account credentials & system role
          </p>
        </div>

        {loading ? (
          <div>Loading profile...</div>
        ) : (
          <div style={{ maxWidth: "600px" }}>
            <div
              style={{
                background: "#ffffff",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                padding: "32px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px", paddingBottom: "24px", borderBottom: "1px solid #e2e8f0" }}>
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    fontWeight: "bold",
                    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
                  }}
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : "A"}
                </div>
                <div>
                  <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>
                    {user.name || "Administrator"}
                  </h2>
                  <span className="badge badge-primary" style={{ marginTop: "6px" }}>
                    {user.role || "Super Admin"}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Full Name
                  </label>
                  <div style={{ fontSize: "1rem", fontWeight: "600", color: "#0f172a", marginTop: "4px" }}>
                    {user.name}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Email Address
                  </label>
                  <div style={{ fontSize: "1rem", fontWeight: "600", color: "#0f172a", marginTop: "4px" }}>
                    {user.email}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    System Authorization Role
                  </label>
                  <div style={{ fontSize: "1rem", fontWeight: "600", color: "#10b981", marginTop: "4px" }}>
                    {user.role} (Full CMS Read/Write Access)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
}