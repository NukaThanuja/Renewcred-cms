"use client";

import Link from "next/link";
import Layout from "../../../components/Layout";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function Pages() {
  const pagesList = [
    { id: 1, name: "Home", slug: "/", description: "Main landing page showcasing hero banner & platform features" },
    { id: 2, name: "About", slug: "/about", description: "Company background, mission principles & tech overview" },
    { id: 3, name: "Services", slug: "/services", description: "Service modules, features matrix & technical offerings" },
    { id: 4, name: "Contact", slug: "/contact", description: "Contact details, address, and inquiry submission" },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <div style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
              Website Pages Management 📄
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "4px" }}>
              Overview of public dynamic pages supported in the application
            </p>
          </div>

          <Link href="/dashboard/content" className="btn-primary" style={{ textDecoration: "none" }}>
            + Manage Content Sections
          </Link>
        </div>

        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Page Name</th>
              <th>Public URL Route</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pagesList.map((p) => (
              <tr key={p.id}>
                <td><strong>#{p.id}</strong></td>
                <td>
                  <span style={{ fontWeight: "700", color: "#0f172a" }}>{p.name}</span>
                </td>
                <td>
                  <code style={{ background: "#eff6ff", color: "#2563eb", padding: "4px 8px", borderRadius: "4px" }}>
                    {p.slug}
                  </code>
                </td>
                <td style={{ color: "#64748b" }}>{p.description}</td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <Link
                      href="/dashboard/content"
                      className="btn-primary"
                      style={{ padding: "6px 12px", fontSize: "0.8rem", textDecoration: "none" }}
                    >
                      Edit Sections
                    </Link>

                    <Link
                      href={p.slug}
                      target="_blank"
                      className="btn-secondary"
                      style={{ padding: "6px 12px", fontSize: "0.8rem", textDecoration: "none" }}
                    >
                      View Live ↗
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </ProtectedRoute>
  );
}