"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

import api from "../../services/api";
import { loginSuccess } from "../../redux/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      localStorage.setItem("token", response.data.token);

      toast.success("Login Successful! Redirecting...");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail("admin@gmail.com");
    setPassword("admin123");
    toast.info("Demo admin credentials filled!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0f172a 100%)",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow Blobs */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(37, 99, 235, 0.25)",
          filter: "blur(100px)",
          top: "10%",
          left: "20%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "rgba(99, 102, 241, 0.2)",
          filter: "blur(90px)",
          bottom: "10%",
          right: "20%",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          padding: "40px 32px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Brand Icon */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "24px",
              color: "#ffffff",
              boxShadow: "0 8px 24px rgba(37, 99, 235, 0.4)",
              marginBottom: "16px",
            }}
          >
            RC
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
            RenewCred CMS
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "6px" }}>
            Sign in to access your admin dashboard
          </p>
        </div>

        {/* Demo Quick Auto-Fill Banner */}
        <div
          onClick={fillDemoAdmin}
          style={{
            background: "rgba(37, 99, 235, 0.15)",
            border: "1px dashed rgba(37, 99, 235, 0.4)",
            borderRadius: "10px",
            padding: "10px 14px",
            marginBottom: "24px",
            cursor: "pointer",
            textAlign: "center",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: "0.8rem", color: "#93c5fd", fontWeight: "600" }}>
            ⚡ Click here to auto-fill Admin Demo Credentials
          </span>
        </div>

        <form onSubmit={loginUser}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#cbd5e1", marginBottom: "6px" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              style={{
                background: "rgba(30, 41, 59, 0.8)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#cbd5e1", marginBottom: "6px" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              style={{
                background: "rgba(30, 41, 59, 0.8)",
                borderColor: "rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "12px",
              fontSize: "0.95rem",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In to Admin Panel →"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <Link href="/" style={{ color: "#94a3b8", fontSize: "0.85rem", textDecoration: "none" }}>
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}