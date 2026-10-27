import React from 'react';
import { CheckCircle2, Clock, Calculator } from 'lucide-react';

export default function Footer() {
  const topics = [
    { name: 'ES6+', note: 'Arrow functions, map/filter/reduce, spread' },
    { name: 'Component Architecture', note: 'Display, Keypad, Card composition' },
    { name: 'JSX', note: 'Expressions, conditionals, list keys' },
    { name: 'Functional Components', note: 'Pure functions with destructured props' },
    { name: 'useState', note: 'Display, memory registers, array state' },
    { name: 'useEffect', note: 'Keyboard listeners & interval cleanups' },
    { name: 'React Router', note: 'Modes, /history/:calcId dynamic routes, 404' },
    { name: 'Fetch API', note: 'Live exchange rates + AbortController' },
    { name: 'StackBlitz', note: 'WebContainer instant execution' }
  ];

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Calculator size={18} color="var(--accent-primary)" />
            <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>
              UNIT – 01: MODERN FRONT-END COMPONENT ARCHITECTURE
            </strong>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
              <Clock size={11} /> 9 HOURS
            </span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Demonstrating all 9 curriculum topics in a functional, responsive multi-mode calculator app.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', maxWidth: '650px' }}>
          {topics.map((t, idx) => (
            <span
              key={idx}
              title={t.note}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontSize: '0.75rem',
                padding: '0.2rem 0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)'
              }}
            >
              <CheckCircle2 size={11} color="var(--accent-success)" />
              <strong>{t.name}</strong>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
