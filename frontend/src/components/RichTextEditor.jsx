"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { useEffect, useState } from "react";
import katex from "katex";

export default function RichTextEditor({ value, onChange }) {
  const [mathInput, setMathInput] = useState("");
  const [showMathModal, setShowMathModal] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== (value || "")) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const insertMath = () => {
    if (mathInput.trim()) {
      const formattedMath = `$${mathInput.trim()}$`;
      editor.chain().focus().insertContent(` ${formattedMath} `).run();
      setMathInput("");
      setShowMathModal(false);
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const btnStyle = (isActive = false) => ({
    padding: "6px 10px",
    borderRadius: "4px",
    border: "1px solid #cbd5e1",
    background: isActive ? "#2563eb" : "#ffffff",
    color: isActive ? "#ffffff" : "#1e293b",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.15s ease",
  });

  return (
    <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden", background: "#fff" }}>
      <div
        style={{
          display: "flex",
          gap: "6px",
          padding: "10px",
          borderBottom: "1px solid #e2e8f0",
          flexWrap: "wrap",
          background: "#f8fafc",
        }}
      >
        {/* Formatting */}
        <button type="button" style={btnStyle(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>
        <button type="button" style={btnStyle(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>
        <button type="button" style={btnStyle(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <s>S</s>
        </button>
        <button type="button" style={btnStyle(editor.isActive("code"))} onClick={() => editor.chain().focus().toggleCode().run()}>
          &lt;/&gt;
        </button>

        <span style={{ borderRight: "1px solid #cbd5e1", margin: "0 4px" }} />

        {/* Headings */}
        <button type="button" style={btnStyle(editor.isActive("heading", { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>
        <button type="button" style={btnStyle(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button type="button" style={btnStyle(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </button>

        <span style={{ borderRight: "1px solid #cbd5e1", margin: "0 4px" }} />

        {/* Lists */}
        <button type="button" style={btnStyle(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • Bullet List
        </button>
        <button type="button" style={btnStyle(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. Numbered List
        </button>
        <button type="button" style={btnStyle()} onClick={() => editor.chain().focus().sinkListItem("listItem").run()} title="Indent list item">
          → Indent
        </button>
        <button type="button" style={btnStyle()} onClick={() => editor.chain().focus().liftListItem("listItem").run()} title="Outdent list item">
          ← Outdent
        </button>

        <span style={{ borderRight: "1px solid #cbd5e1", margin: "0 4px" }} />

        {/* Table Controls */}
        <button type="button" style={btnStyle(editor.isActive("table"))} onClick={insertTable}>
          📊 Insert Table
        </button>
        {editor.isActive("table") && (
          <>
            <button type="button" style={btnStyle()} onClick={() => editor.chain().focus().addRowAfter().run()}>
              + Row
            </button>
            <button type="button" style={btnStyle()} onClick={() => editor.chain().focus().addColumnAfter().run()}>
              + Col
            </button>
            <button type="button" style={btnStyle()} onClick={() => editor.chain().focus().deleteRow().run()}>
              - Row
            </button>
            <button type="button" style={btnStyle()} onClick={() => editor.chain().focus().deleteColumn().run()}>
              - Col
            </button>
            <button type="button" style={{ ...btnStyle(), color: "#dc2626" }} onClick={() => editor.chain().focus().deleteTable().run()}>
              🗑️ Table
            </button>
          </>
        )}

        <span style={{ borderRight: "1px solid #cbd5e1", margin: "0 4px" }} />

        {/* Math Equation */}
        <button type="button" style={btnStyle()} onClick={() => setShowMathModal(!showMathModal)}>
          ∑ Math Formula
        </button>
        <button type="button" style={btnStyle(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          " Quote
        </button>
        <button type="button" style={btnStyle(editor.isActive("codeBlock"))} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          Code Block
        </button>
      </div>

      {showMathModal && (
        <div style={{ padding: "10px 15px", background: "#eff6ff", borderBottom: "1px solid #bfdbfe", display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Enter LaTeX expression, e.g. E = mc^2 or \frac{a}{b}"
            value={mathInput}
            onChange={(e) => setMathInput(e.target.value)}
            style={{ flex: 1, padding: "6px 12px", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "14px" }}
          />
          <button type="button" onClick={insertMath} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "4px", cursor: "pointer" }}>
            Insert
          </button>
          <button type="button" onClick={() => setShowMathModal(false)} style={{ background: "#94a3b8", color: "#fff", border: "none", padding: "6px 14px", borderRadius: "4px", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      )}

      <EditorContent
        editor={editor}
        className="rich-content"
        style={{
          minHeight: "250px",
          padding: "15px",
          outline: "none",
        }}
      />
    </div>
  );
}