"use client";

import { useMemo } from "react";
import katex from "katex";

export default function RichTextRenderer({ content, className = "" }) {
  const processedHTML = useMemo(() => {
    if (!content) return "";

    let html = content;

    // Render block math $$ ... $$
    html = html.replace(/\$\$(.*?)\$\$/gs, (_, math) => {
      try {
        return `<div class="math-rendered math-block">${katex.renderToString(math.trim(), { displayMode: true, throwOnError: false })}</div>`;
      } catch {
        return `$$${math}$$`;
      }
    });

    // Render inline math $ ... $
    html = html.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
      try {
        return `<span class="math-rendered math-inline">${katex.renderToString(math.trim(), { displayMode: false, throwOnError: false })}</span>`;
      } catch {
        return `$${math}$`;
      }
    });

    return html;
  }, [content]);

  return (
    <div
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: processedHTML }}
    />
  );
}
