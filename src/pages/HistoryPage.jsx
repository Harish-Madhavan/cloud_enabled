import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCalc } from '../context/CalcContext';
import CardWrapper from '../components/CardWrapper';
import { History, Trash2, ArrowRight, Filter, Search, RotateCcw } from 'lucide-react';

export default function HistoryPage() {
  const { history, clearHistory, deleteHistoryItem } = useCalc();
  const navigate = useNavigate();

  const [filterMode, setFilterMode] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // ES6+ filtering with arrow functions & array methods
  const filteredHistory = history.filter((item) => {
    const matchesMode = filterMode === 'All' || item.mode === filterMode;
    const matchesSearch = item.equation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.result.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMode && matchesSearch;
  });

  const modes = ['All', 'Standard', 'Scientific', 'Currency', 'Statistics'];

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto' }}>
      <CardWrapper
        title="Calculation Audit Tape & History"
        badgeText={`${history.length} Saved`}
        actions={
          history.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear the entire calculation history?')) {
                  clearHistory();
                }
              }}
              className="btn btn-danger btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
            >
              <Trash2 size={13} /> Clear All
            </button>
          )
        }
      >
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Audit trail of calculations. Click any past equation to inspect its dynamic route (<code>/history/:calcId</code>) via React Router.
        </p>

        {/* Filter and Search Controls (Controlled inputs) */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search equations or results..."
              className="form-input"
              style={{ paddingLeft: '2.2rem', fontSize: '0.88rem' }}
            />
            <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {modes.map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`btn btn-sm ${filterMode === mode ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.8rem' }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Calculations List */}
        {filteredHistory.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <History size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
            <p style={{ fontSize: '0.95rem' }}>No calculation records found.</p>
            <Link to="/" className="btn btn-secondary btn-sm" style={{ marginTop: '0.75rem' }}>
              Perform a Standard Calculation
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="card card-interactive"
                style={{
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--bg-secondary)',
                  margin: 0
                }}
              >
                <div
                  onClick={() => navigate(`/history/${item.id}`)}
                  style={{ flex: 1, cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{item.mode}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.timestamp}</span>
                    <span style={{ fontSize: '0.7rem', color: '#60a5fa' }}>ID: {item.id}</span>
                  </div>

                  <div style={{ fontSize: '0.95rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                    {item.equation}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                    = {item.result}
                  </div>

                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.3rem' }}
                    title="Delete record"
                  >
                    <Trash2 size={16} />
                  </button>

                  <Link
                    to={`/history/${item.id}`}
                    style={{ color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center' }}
                    title="Inspect details"
                  >
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardWrapper>
    </div>
  );
}
