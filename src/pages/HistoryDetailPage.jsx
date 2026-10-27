import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCalc } from '../context/CalcContext';
import CardWrapper from '../components/CardWrapper';
import { ArrowLeft, Clock, Calendar, Hash, Calculator, RotateCcw } from 'lucide-react';

export default function HistoryDetailPage() {
  const { calcId } = useParams();
  const navigate = useNavigate();
  const { history } = useCalc();

  // Find record matching the dynamic URL route parameter
  const record = history.find((item) => item.id === calcId);

  if (!record) {
    return (
      <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-danger)', marginBottom: '0.75rem' }}>
            Record Not Found
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            No calculation entry found for route parameter: <code>{calcId}</code>
          </p>
          <button onClick={() => navigate('/history')} className="btn btn-primary">
            <ArrowLeft size={16} /> Return to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/history')}
        className="btn btn-secondary btn-sm"
        style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
      >
        <ArrowLeft size={14} /> Back to History Tape
      </button>

      <CardWrapper
        title="Calculation Record Details"
        badgeText={record.mode}
      >
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.5rem'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>EQUATION</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 600, fontFamily: 'var(--font-mono)', margin: '0.4rem 0 1rem', color: 'var(--text-primary)' }}>
            {record.equation}
          </div>

          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CALCULATED RESULT</span>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#34d399' }}>
            = {record.result}
          </div>
        </div>

        {/* Metadata Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              <Hash size={12} /> Record ID
            </div>
            <code style={{ fontSize: '0.82rem', color: '#60a5fa' }}>{record.id}</code>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              <Clock size={12} /> Time
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{record.timestamp}</span>
          </div>

          <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              <Calendar size={12} /> Date
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{record.date}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Calculator size={15} /> Open in Standard Calculator
          </button>
        </div>
      </CardWrapper>
    </div>
  );
}
