import React from 'react';
import { ExternalLink, X, Terminal, CheckCircle2, FileCode, Zap } from 'lucide-react';

export default function StackBlitzModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const stackblitzConfigCode = `// .stackblitzrc
{
  "startCommand": "npm run dev"
}

// package.json scripts:
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1.5rem'
    }}>
      <div className="card" style={{ maxWidth: '640px', width: '100%', position: 'relative', border: '1px solid var(--accent-primary)' }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            background: 'rgba(19, 144, 255, 0.2)',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            color: '#1390ff',
            display: 'flex'
          }}>
            <ExternalLink size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>StackBlitz Integration Guide</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Unit 1 Syllabus: Instant browser WebContainer execution
            </p>
          </div>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          StackBlitz runs this full Vite + React environment natively in any browser via <strong>WebContainers</strong> with zero local software setup required.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle2 size={18} color="var(--accent-success)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>1. Pre-configured .stackblitzrc</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Tells StackBlitz to run <code>npm run dev</code> as soon as the project loads.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle2 size={18} color="var(--accent-success)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>2. Standard Node & Vite Configuration</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Optimized with ES modules (<code>"type": "module"</code>) for near-instant HMR.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <CheckCircle2 size={18} color="var(--accent-success)" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>3. One-Click Cloud Forking</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Upload or push this repository to GitHub, then prepend <code>stackblitz.com/github/YOUR_REPO</code> to run in seconds.
              </p>
            </div>
          </div>
        </div>

        <div className="demo-box" style={{ background: '#0d1117' }}>
          <div className="demo-title" style={{ color: '#1390ff' }}>
            <FileCode size={15} /> Included Configuration
          </div>
          <pre style={{ fontSize: '0.8rem', color: '#58a6ff', margin: 0, overflowX: 'auto' }}>
            {stackblitzConfigCode}
          </pre>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
          <a
            href="https://stackblitz.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ backgroundColor: '#1390ff' }}
          >
            <ExternalLink size={15} /> Visit StackBlitz.com
          </a>
        </div>
      </div>
    </div>
  );
}
