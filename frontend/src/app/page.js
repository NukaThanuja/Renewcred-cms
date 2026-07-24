"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../services/api";
import Navbar from "../components/Navbar";
import RichTextRenderer from "../components/RichTextRenderer";

export default function Home() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      const response = await api.get("/content/page/Home");
      setSections(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc" }}>
      <Navbar />

      {/* Hero Header Banner */}
      <section
        style={{
          background: "radial-gradient(circle at 50% 0%, #1e293b 0%, #0f172a 100%)",
          color: "#ffffff",
          padding: "70px 24px 80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(37, 99, 235, 0.15)",
            filter: "blur(120px)",
            top: "-100px",
            left: "calc(50% - 250px)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "850px", margin: "0 auto", position: "relative", zIndex: 10 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(37, 99, 235, 0.2)",
              border: "1px solid rgba(37, 99, 235, 0.4)",
              borderRadius: "9999px",
              padding: "6px 16px",
              fontSize: "0.85rem",
              fontWeight: "600",
              color: "#93c5fd",
              marginBottom: "24px",
            }}
          >
            <span>⚡ Headless Dynamic Web Application</span>
          </div>

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: "20px",
              background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dynamic Content Powered by Express & Next.js CMS
          </h1>

          <p
            style={{
              fontSize: "1.15rem",
              color: "#94a3b8",
              lineHeight: 1.6,
              marginBottom: "36px",
              maxWidth: "700px",
              margin: "0 auto 36px auto",
            }}
          >
            All content on this website is dynamically fetched from our Express.js API backend and managed via the Redux Toolkit authenticated Admin Panel.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/login" className="btn-primary" style={{ textDecoration: "none", padding: "12px 24px", fontSize: "1rem" }}>
              <span>🚀 Open CMS Admin Panel</span>
            </Link>
            <a href="#content-sections" className="btn-secondary" style={{ textDecoration: "none", padding: "12px 24px", fontSize: "1rem" }}>
              <span>📖 Browse Sections</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main id="content-sections" style={{ flex: 1, padding: "50px 24px", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em" }}>
              Published Home Content
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "4px" }}>
              Managed live from the administrator CMS dashboard
            </p>
          </div>

          <span className="badge badge-success" style={{ padding: "6px 14px", fontSize: "0.85rem" }}>
            {sections.length} Published Sections
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
            <p style={{ fontSize: "1.1rem" }}>Loading dynamic page content...</p>
          </div>
        ) : sections.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              padding: "48px 32px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>📝</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>
              No Home Content Found
            </h3>
            <p style={{ color: "#64748b", marginBottom: "24px" }}>
              Log into the CMS Admin Panel to add dynamic sections to the Home page.
            </p>
            <Link href="/login" className="btn-primary" style={{ textDecoration: "none" }}>
              Go to CMS Admin
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {sections.map((item) => (
              <article
                key={item.id}
                className="card-hover"
                style={{
                  background: "#ffffff",
                  borderRadius: "16px",
                  border: "1px solid #e2e8f0",
                  padding: "36px",
                  boxShadow: "0 4px 20px -2px rgba(15, 23, 42, 0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", margin: 0, letterSpacing: "-0.01em" }}>
                    {item.section}
                  </h2>
                  <span className="badge badge-success">Published</span>
                </div>

                {item.image && (
                  <div style={{ marginBottom: "24px", overflow: "hidden", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                    <img
                      src={item.image}
                      alt={item.section}
                      style={{
                        width: "100%",
                        maxHeight: "420px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                )}

                <RichTextRenderer content={item.content} />
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: "#0f172a", color: "#94a3b8", borderTop: "1px solid #1e293b", padding: "40px 24px 24px 24px", marginTop: "60px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "#ffffff" }}>RenewCred CMS</span>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>
              Full-Stack Dynamic Content Management System
            </p>
          </div>

          <div style={{ display: "flex", gap: "16px", fontSize: "0.85rem" }}>
            <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home</Link>
            <Link href="/about" style={{ color: "#94a3b8", textDecoration: "none" }}>About</Link>
            <Link href="/services" style={{ color: "#94a3b8", textDecoration: "none" }}>Services</Link>
            <Link href="/login" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>Admin Login</Link>
          </div>
        </div>

        <div style={{ maxWidth: "1100px", margin: "24px auto 0 auto", paddingTop: "20px", borderTop: "1px solid #1e293b", textAlign: "center", fontSize: "0.8rem", color: "#64748b" }}>
          © {new Date().getFullYear()} RenewCred CMS. Built with Next.js, Redux Toolkit, Express.js & SQLite.
        </div>
      </footer>
    </div>
  );
}