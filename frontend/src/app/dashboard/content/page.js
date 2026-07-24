"use client";

import { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import ProtectedRoute from "../../../components/ProtectedRoute";
import api from "../../../services/api";
import { toast } from "react-toastify";
import RichTextEditor from "../../../components/RichTextEditor";
import RichTextRenderer from "../../../components/RichTextRenderer";

export default function ContentPage() {
  const [contents, setContents] = useState([]);

  const [page, setPage] = useState("");
  const [section, setSection] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [editId, setEditId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Published");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchContent = async () => {
    try {
      const response = await api.get("/content");
      setContents(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const editContent = (item) => {
    setPage(item.page);
    setSection(item.section);
    setContent(item.content);

    setImage(null);
    setImageUrl(item.image || "");
    setStatus(item.status || "Published");

    setEditId(item.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setPage("");
    setSection("");
    setContent("");
    setImage(null);
    setImageUrl("");
    setStatus("Published");
    setIsEditing(false);
    setEditId(null);
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const uploadImage = async () => {
    if (!image) return imageUrl;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setImageUrl(response.data.imageUrl);
      return response.data.imageUrl;
    } catch (err) {
      console.log(err);
      toast.error("Image Upload Failed");
      return null;
    }
  };

  const addContent = async (e) => {
    e.preventDefault();

    if (!page || !section || !content) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      const uploadedImage = await uploadImage();

      await api.post("/content", {
        page,
        section,
        content,
        image: uploadedImage,
        status,
      });

      toast.success("Content Section Added Successfully");
      resetForm();
      fetchContent();
    } catch (err) {
      console.log(err);
      toast.error("Failed to Add Content");
    }
  };

  const updateContent = async (e) => {
    e.preventDefault();
    if (!page || !section || !content) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      let uploadedImage = imageUrl;
      if (image) {
        uploadedImage = await uploadImage();
      }

      await api.put(`/content/${editId}`, {
        page,
        section,
        content,
        image: uploadedImage,
        status,
      });

      toast.success("Content Section Updated Successfully");
      resetForm();
      fetchContent();
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  const deleteContent = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this content?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/content/${id}`);
      toast.success("Content Deleted Successfully");
      fetchContent();
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
    }
  };

  const exportCSV = () => {
    const headers = ["ID", "Page", "Section", "Status", "Content"];
    const rows = filteredContents.map((item) => [
      item.id,
      `"${item.page}"`,
      `"${item.section}"`,
      `"${item.status || "Published"}"`,
      `"${item.content.replace(/"/g, '""').replace(/<[^>]+>/g, "")}"`,
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cms-content-export-${Date.now()}.csv`;
    link.click();
  };

  const filteredContents = contents
    .filter((item) => {
      const matchesSearch =
        item.page.toLowerCase().includes(search.toLowerCase()) ||
        item.section.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filter === "All" || (item.status || "Published") === filter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return b.id - a.id;
        case "oldest":
          return a.id - b.id;
        case "pageAsc":
          return a.page.localeCompare(b.page);
        case "pageDesc":
          return b.page.localeCompare(a.page);
        case "published":
          return (b.status === "Published") - (a.status === "Published");
        default:
          return 0;
      }
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContents.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <ProtectedRoute>
      <Layout>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "800", color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
            Content Management 📝
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "4px" }}>
            Create, edit, organize, and publish rich content sections across dynamic pages
          </p>
        </div>

        {/* Content Creation Form Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            border: "1px solid #e2e8f0",
            padding: "28px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            marginBottom: "36px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
              {isEditing ? "✏️ Edit Content Section" : "➕ Create New Content Section"}
            </h3>

            {isEditing && (
              <button onClick={resetForm} className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.8rem" }}>
                Cancel Editing
              </button>
            )}
          </div>

          <form onSubmit={isEditing ? updateContent : addContent}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginBottom: "20px" }}>
              {/* Page Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
                  Target Page Name <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Home, About, Services, Contact"
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  className="form-input"
                />
                <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                  {["Home", "About", "Services", "Contact"].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPage(p)}
                      style={{
                        padding: "2px 8px",
                        fontSize: "0.75rem",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                        background: page === p ? "#2563eb" : "#f8fafc",
                        color: page === p ? "#ffffff" : "#475569",
                        cursor: "pointer",
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Name */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
                  Section Title <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Platform Features & Specifications"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Status */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
                  Publication Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-input"
                >
                  <option value="Published">🟢 Published (Visible on Website)</option>
                  <option value="Draft">🟡 Draft (Hidden from Public)</option>
                </select>
              </div>
            </div>

            {/* File Upload Image */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
                Featured Section Image (Optional)
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ fontSize: "0.85rem", color: "#475569" }}
                />
                {imageUrl && !image && (
                  <span style={{ fontSize: "0.8rem", color: "#10b981", fontWeight: "600" }}>
                    ✓ Current Image Attached
                  </span>
                )}
              </div>
            </div>

            {/* Rich Text Editor */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", color: "#334155", marginBottom: "8px" }}>
                Section Content (Rich Text + Tables + Math Formulas) <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <RichTextEditor value={content} onChange={setContent} />
            </div>

            {/* Submit Button */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" className="btn-primary">
                <span>{isEditing ? "💾 Update Content Section" : "✨ Save & Publish Section"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Toolbar & Filters */}
        <div
          style={{
            background: "#ffffff",
            padding: "16px 20px",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            marginBottom: "20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="🔍 Search by page or section..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
              style={{ width: "260px", padding: "8px 12px", fontSize: "0.85rem" }}
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-input"
              style={{ width: "140px", padding: "8px 12px", fontSize: "0.85rem" }}
            >
              <option value="All">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-input"
              style={{ width: "150px", padding: "8px 12px", fontSize: "0.85rem" }}
            >
              <option value="latest">Sort: Latest</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="pageAsc">Sort: Page A-Z</option>
              <option value="pageDesc">Sort: Page Z-A</option>
              <option value="published">Sort: Published</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="form-input"
              style={{ width: "120px", padding: "8px 12px", fontSize: "0.85rem" }}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
            </select>

            <button onClick={exportCSV} className="btn-secondary" style={{ padding: "8px 14px", fontSize: "0.85rem" }}>
              📥 Export CSV
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Page</th>
                <th>Section Title</th>
                <th>Media Image</th>
                <th>Status</th>
                <th style={{ width: "35%" }}>Content Preview</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
                    No content sections found matching your query filters.
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id}>
                    <td><strong>#{item.id}</strong></td>
                    <td>
                      <span className="badge badge-primary">{item.page}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: "700", color: "#0f172a" }}>{item.section}</span>
                    </td>
                    <td>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.section}
                          style={{
                            width: "90px",
                            height: "55px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>No Image</span>
                      )}
                    </td>
                    <td>
                      <span className={(item.status || "Published") === "Published" ? "badge badge-success" : "badge badge-warning"}>
                        {(item.status || "Published")}
                      </span>
                    </td>
                    <td>
                      <div style={{ maxHeight: "100px", overflow: "hidden", fontSize: "0.85rem" }}>
                        <RichTextRenderer content={item.content} />
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => editContent(item)}
                          className="btn-primary"
                          style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteContent(item.id)}
                          className="btn-danger"
                          style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            padding: "12px 16px",
            background: "#ffffff",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
          }}
        >
          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
            Showing {filteredContents.length > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, filteredContents.length)} of {filteredContents.length} entries
          </span>

          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn-secondary"
              style={{ padding: "6px 12px", fontSize: "0.8rem", opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              ← Previous
            </button>

            <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#0f172a", padding: "0 8px" }}>
              Page {currentPage} of {totalPages || 1}
            </span>

            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn-secondary"
              style={{ padding: "6px 12px", fontSize: "0.8rem", opacity: currentPage === totalPages || totalPages === 0 ? 0.5 : 1 }}
            >
              Next →
            </button>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
