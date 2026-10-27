import React from 'react';
import { X, Keyboard, CheckCircle2 } from 'lucide-react';

export default function KeyboardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '0 - 9', action: 'Input numbers' },
    { key: '.', action: 'Decimal point' },
    { key: '+, -, *, /', action: 'Basic mathematical operators' },
    { key: 'Enter or =', action: 'Calculate equation result' },
    { key: 'Backspace', action: 'Delete last character' },
    { key: 'Escape or c', action: 'Clear all (AC)' },
    { key: '%', action: 'Calculate percentage' }
  ];

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
      <div className="card" style={{ maxWidth: '480px', width: '100%', position: 'relative' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{
            background: 'rgba(99, 102, 241, 0.2)',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            color: 'var(--accent-primary)',
            display: 'flex'
          }}>
            <Keyboard size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Keyboard Support</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Powered by <code>useEffect</code> global keydown event listeners
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {shortcuts.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.5rem 0.75rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem'
              }}
            >
              <kbd style={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '4px',
                padding: '0.2rem 0.5rem',
                fontFamily: 'var(--font-mono)',
                color: '#67e8f9',
                fontSize: '0.8rem'
              }}>
                {item.key}
              </kbd>
              <span style={{ color: 'var(--text-secondary)' }}>{item.action}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn btn-primary" style={{ width: '100%' }}>
            Got it, Let's Calculate
          </button>
        </div>
      </div>
    </div>
  );
}
