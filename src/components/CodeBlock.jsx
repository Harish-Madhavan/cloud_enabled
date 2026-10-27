import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ title = 'code.jsx', code = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-container">
      <div className="code-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="code-header-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{title}</span>
        </div>
        <button
          onClick={handleCopy}
          className="btn btn-secondary btn-sm"
          style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} color="var(--accent-success)" /> Copied
            </>
          ) : (
            <>
              <Copy size={13} /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="code-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
