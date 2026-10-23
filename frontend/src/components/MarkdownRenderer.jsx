import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function CodeBlock({ children, className, ...props }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  // Extract raw text from children
  const codeText = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        margin: "14px 0",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid #1E293B",
        backgroundColor: "#0F172A",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 14px",
          background: "#1E293B",
          color: "#94A3B8",
          fontSize: "12px",
          fontFamily: "monospace",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          fontWeight: 600,
        }}
      >
        <span>{language || "code"}</span>
        <button
          onClick={handleCopy}
          type="button"
          style={{
            background: copied ? "#10B981" : "rgba(255,255,255,0.1)",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            padding: "3px 10px",
            fontSize: "11px",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: "14px 16px",
          overflowX: "auto",
          color: "#F8FAFC",
          fontSize: "14px",
          lineHeight: "1.6",
          fontFamily: "Consolas, Monaco, 'Courier New', monospace",
        }}
      >
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
}

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="markdown-content" style={{ lineHeight: "1.7", color: "#1F2937" }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              style={{
                fontSize: "1.4rem",
                color: "#14213D",
                marginTop: "18px",
                marginBottom: "10px",
                fontWeight: 700,
                borderBottom: "1px solid #E5E7EB",
                paddingBottom: "6px",
              }}
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              style={{
                fontSize: "1.25rem",
                color: "#14213D",
                marginTop: "16px",
                marginBottom: "8px",
                fontWeight: 700,
              }}
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              style={{
                fontSize: "1.1rem",
                color: "#14213D",
                marginTop: "14px",
                marginBottom: "6px",
                fontWeight: 600,
              }}
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              style={{
                margin: "10px 0",
                lineHeight: "1.75",
                color: "#374151",
              }}
              {...props}
            />
          ),
          ul: ({ node, ...props }) => (
            <ul
              style={{
                margin: "8px 0 14px 22px",
                paddingLeft: "6px",
                listStyleType: "disc",
                lineHeight: "1.75",
                color: "#374151",
              }}
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              style={{
                margin: "8px 0 14px 22px",
                paddingLeft: "6px",
                listStyleType: "decimal",
                lineHeight: "1.75",
                color: "#374151",
              }}
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li
              style={{
                marginBottom: "6px",
                paddingLeft: "4px",
              }}
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong
              style={{
                color: "#111827",
                fontWeight: 600,
              }}
              {...props}
            />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              style={{
                borderLeft: "4px solid #2563EB",
                background: "#F8FAFC",
                padding: "10px 16px",
                margin: "12px 0",
                borderRadius: "0 8px 8px 0",
                color: "#4B5563",
                fontStyle: "italic",
              }}
              {...props}
            />
          ),
          hr: ({ node, ...props }) => (
            <hr
              style={{
                border: "none",
                borderTop: "1px solid #E5E7EB",
                margin: "18px 0",
              }}
              {...props}
            />
          ),
          table: ({ node, ...props }) => (
            <div style={{ overflowX: "auto", margin: "14px 0" }}>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                  fontSize: "14px",
                }}
                {...props}
              />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th
              style={{
                border: "1px solid #E5E7EB",
                background: "#F3F4F6",
                padding: "8px 12px",
                textAlign: "left",
                fontWeight: 600,
                color: "#111827",
              }}
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              style={{
                border: "1px solid #E5E7EB",
                padding: "8px 12px",
                color: "#374151",
              }}
              {...props}
            />
          ),
          code: ({ node, className, children, ...props }) => {
            // If the code tag contains newlines or has a language className, render as a code block
            const isCodeBlock = String(children).includes("\n") || Boolean(className);
            if (isCodeBlock) {
              return (
                <CodeBlock className={className} {...props}>
                  {children}
                </CodeBlock>
              );
            }
            return (
              <code
                style={{
                  backgroundColor: "#F1F5F9",
                  color: "#D97706",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "0.9em",
                  fontFamily: "Consolas, Monaco, 'Courier New', monospace",
                  border: "1px solid #E2E8F0",
                }}
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
