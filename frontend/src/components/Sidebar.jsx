"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out successfully");
    router.push("/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: "📊" },
    { label: "Content", href: "/dashboard/content", icon: "📝" },
    { label: "Pages", href: "/dashboard/pages", icon: "📄" },
    { label: "Media Library", href: "/dashboard/media", icon: "🖼️" },
    { label: "Profile", href: "/dashboard/profile", icon: "👤" },
  ];

  return (
    <div
      style={{
        width: "260px",
        background: "#0f172a",
        color: "#f8fafc",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 16px",
        borderRight: "1px solid #1e293b",
      }}
    >
      <div>
        {/* Brand Header */}
        <div style={{ padding: "0 8px 24px 8px", borderBottom: "1px solid #1e293b", marginBottom: "24px" }}>
          <Link href="/dashboard" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "18px",
                color: "#fff",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
              }}
            >
              RC
            </div>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: "700", letterSpacing: "-0.02em", margin: 0 }}>RenewCred CMS</h2>
              <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "500" }}>Admin Control Panel</span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: isActive ? "600" : "500",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  background: isActive ? "linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(79, 70, 229, 0.15) 100%)" : "transparent",
                  borderLeft: isActive ? "3px solid #2563eb" : "3px solid transparent",
                  transition: "all 0.15s ease",
                }}
              >
                <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom User & Actions */}
      <div>
        <div
          style={{
            padding: "12px 14px",
            background: "#1e293b",
            borderRadius: "10px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#3b82f6",
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
          <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: "600", color: "#f8fafc" }}>Administrator</div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>admin@gmail.com</div>
          </div>
        </div>

        <Link
          href="/"
          target="_blank"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            width: "100%",
            padding: "9px",
            background: "#1e293b",
            color: "#93c5fd",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: "600",
            marginBottom: "8px",
            transition: "all 0.15s ease",
          }}
        >
          <span>🌐 View Public Site ↗</span>
        </Link>

        <button
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            padding: "10px",
            background: "rgba(239, 68, 68, 0.15)",
            color: "#fca5a5",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "8px",
            fontSize: "0.85rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <span>🚪 Logout</span>
        </button>
      </div>
    </div>
  );
}