"use client";

import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import ProtectedRoute from "../../../components/ProtectedRoute";
import api from "../../../services/api";
import { toast } from "react-toastify";

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await api.get("/media");
      setMedia(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageUrl) => {
    const confirmDelete = confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;

    try {
      const imageName = imageUrl.split("/").pop();
      await api.delete(`/media/${imageName}`);
      toast.success("Image deleted successfully");
      fetchMedia();
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete image");
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    toast.success("Image URL copied to clipboard!");
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div style={{ marginBottom: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
              Media Library 🖼️
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "4px" }}>
              Manage all uploaded media assets and image files
            </p>
          </div>

          <span className="badge badge-primary" style={{ padding: "6px 14px", fontSize: "0.85rem" }}>
            {media.length} Total Images
          </span>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#64748b" }}>Loading media assets...</div>
        ) : media.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              padding: "48px 24px",
              textAlign: "center",
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🖼️</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a" }}>No Media Images Found</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "4px" }}>
              Upload images via Content Management editor to populate your media library.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {media.map((item) => (
              <div
                key={item.id}
                className="card-hover"
                style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  padding: "16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ overflow: "hidden", borderRadius: "10px", marginBottom: "12px", background: "#f8fafc" }}>
                    <img
                      src={item.image}
                      alt={item.section || "media asset"}
                      style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                    <span className="badge badge-neutral">{item.page}</span>
                  </div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                    {item.section}
                  </h4>
                </div>

                <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                  <button
                    onClick={() => copyUrl(item.image)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: "8px", fontSize: "0.8rem", justifyContent: "center" }}
                  >
                    📋 Copy URL
                  </button>

                  <button
                    onClick={() => deleteImage(item.image)}
                    className="btn-danger"
                    style={{ padding: "8px 12px", fontSize: "0.8rem" }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
}