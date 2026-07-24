"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "../../services/api";
import Navbar from "../../components/Navbar";
import RichTextRenderer from "../../components/RichTextRenderer";

export default function DynamicPage() {
  const params = useParams();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.page) {
      fetchPageContent();
    }
  }, [params.page]);

  const fetchPageContent = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/content/page/${params.page}`);
      setSections(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = params.page ? params.page.charAt(0).toUpperCase() + params.page.slice(1) : "Page";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc" }}>
      <Navbar />

      {/* Page Header */}
      <section style={{ background: "#0f172a", color: "#ffffff", padding: "50px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#94a3b8", marginBottom: "12px" }}>
            <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#3b82f6", fontWeight: "600" }}>{pageTitle}</span>
          </div>

          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", letterSpacing: "-0.02em", margin: 0 }}>
            {pageTitle} Page
          </h1>
        </div>
      </section>

      {/* Page Content */}
      <main style={{ flex: 1, padding: "50px 24px", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#64748b" }}>
            <p style={{ fontSize: "1.1rem" }}>Loading {pageTitle} content...</p>
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
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>📄</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>
              No Published Content for "{pageTitle}"
            </h3>
            <p style={{ color: "#64748b", marginBottom: "24px" }}>
              You can create dynamic content sections for the "{pageTitle}" page in the CMS Admin panel.
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
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
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
      <footer style={{ background: "#0f172a", color: "#94a3b8", borderTop: "1px solid #1e293b", padding: "40px 24px 24px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span style={{ fontSize: "1.1rem", fontWeight: "800", color: "#ffffff" }}>RenewCred CMS</span>
            <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>Dynamic Content Management Platform</p>
          </div>

          <div style={{ display: "flex", gap: "16px", fontSize: "0.85rem" }}>
            <Link href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home</Link>
            <Link href="/about" style={{ color: "#94a3b8", textDecoration: "none" }}>About</Link>
            <Link href="/services" style={{ color: "#94a3b8", textDecoration: "none" }}>Services</Link>
            <Link href="/login" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}