import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Calculator, Binary, DollarSign, History, Keyboard, ExternalLink, Clock } from 'lucide-react';
import { useCalc } from '../context/CalcContext';
import KeyboardModal from './KeyboardModal';
import StackBlitzModal from './StackBlitzModal';

export default function Navbar() {
  const { history, memory } = useCalc();
  const [showKeyboardModal, setShowKeyboardModal] = useState(false);
  const [showStackBlitzModal, setShowStackBlitzModal] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  // useEffect Hook: Timer tracking active session with proper cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          {/* Brand */}
          <Link to="/" className="brand-link">
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)'
            }}>
              <Calculator size={20} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>CalcPulse</span>
                <span className="brand-badge">UNIT-1</span>
              </div>
            </div>
          </Link>

          {/* Navigation with React Router NavLinks */}
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                <Calculator size={16} />
                <span>Standard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/scientific" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Binary size={16} />
                <span>Scientific & Stats</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/currency" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <DollarSign size={16} />
                <span>Currency (API)</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <History size={16} />
                <span>History</span>
                {history.length > 0 && (
                  <span style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    fontSize: '0.7rem',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '9999px',
                    marginLeft: '0.2rem'
                  }}>
                    {history.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Actions & Live Clock */}
          <div className="nav-actions">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              padding: '0.3rem 0.6rem',
              borderRadius: 'var(--radius-sm)'
            }}>
              <Clock size={13} color="var(--accent-success)" />
              <span style={{ fontFamily: 'var(--font-mono)' }}>{formatTimer(sessionTime)}</span>
            </div>

            <button
              onClick={() => setShowKeyboardModal(true)}
              className="btn btn-secondary btn-sm"
              title="View Keyboard Shortcuts"
            >
              <Keyboard size={15} />
            </button>

            <button
              onClick={() => setShowStackBlitzModal(true)}
              className="btn btn-secondary btn-sm"
              style={{ border: '1px solid #1390ff', color: '#60a5fa' }}
            >
              <ExternalLink size={14} />
              <span>StackBlitz</span>
            </button>
          </div>
        </div>
      </header>

      <KeyboardModal
        isOpen={showKeyboardModal}
        onClose={() => setShowKeyboardModal(false)}
      />

      <StackBlitzModal
        isOpen={showStackBlitzModal}
        onClose={() => setShowStackBlitzModal(false)}
      />
    </>
  );
}
