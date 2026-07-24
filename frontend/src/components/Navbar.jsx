"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isPublicPage = !pathname?.startsWith("/dashboard");

  if (isPublicPage) {
    return (
      <header className="glass-nav" style={{ position: "sticky", top: 0, zIndex: 50 }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "800",
                fontSize: "18px",
                color: "#ffffff",
                boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
              }}
            >
              RC
            </div>
            <div>
              <span style={{ fontSize: "1.2rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em" }}>RenewCred</span>
              <span style={{ fontSize: "0.75rem", color: "#2563eb", fontWeight: "700", marginLeft: "6px", background: "#eff6ff", padding: "2px 8px", borderRadius: "12px" }}>CMS</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                fontWeight: pathname === "/" ? "700" : "500",
                color: pathname === "/" ? "#2563eb" : "#475569",
                fontSize: "0.95rem",
                transition: "color 0.15s ease",
              }}
            >
              Home
            </Link>

            <Link
              href="/about"
              style={{
                textDecoration: "none",
                fontWeight: pathname === "/about" ? "700" : "500",
                color: pathname === "/about" ? "#2563eb" : "#475569",
                fontSize: "0.95rem",
                transition: "color 0.15s ease",
              }}
            >
              About
            </Link>

            <Link
              href="/services"
              style={{
                textDecoration: "none",
                fontWeight: pathname === "/services" ? "700" : "500",
                color: pathname === "/services" ? "#2563eb" : "#475569",
                fontSize: "0.95rem",
                transition: "color 0.15s ease",
              }}
            >
              Services
            </Link>

            <Link
              href="/contact"
              style={{
                textDecoration: "none",
                fontWeight: pathname === "/contact" ? "700" : "500",
                color: pathname === "/contact" ? "#2563eb" : "#475569",
                fontSize: "0.95rem",
                transition: "color 0.15s ease",
              }}
            >
              Contact
            </Link>
          </nav>

          {/* Admin Link */}
          <Link href="/login" className="btn-primary" style={{ textDecoration: "none", fontSize: "0.85rem", padding: "8px 16px" }}>
            <span>Admin Portal</span>
            <span>→</span>
          </Link>
        </div>
      </header>
    );
  }

  // Admin Header Topbar
  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "16px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Control Panel</span>
        <span style={{ color: "#cbd5e1" }}>/</span>
        <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "#0f172a", textTransform: "capitalize" }}>
          {pathname?.split("/").pop() || "Dashboard"}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Link
          href="/"
          target="_blank"
          className="btn-secondary"
          style={{ padding: "6px 14px", fontSize: "0.85rem", textDecoration: "none" }}
        >
          <span>👁️ Preview Site</span>
        </Link>

        <div style={{ width: "1px", height: "24px", background: "#e2e8f0" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            A
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1e293b" }}>Admin</span>
        </div>
      </div>
    </header>
  );
}