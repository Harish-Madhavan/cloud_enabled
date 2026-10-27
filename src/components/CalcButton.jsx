import React from 'react';

/**
 * Functional Component: CalcButton
 * Implements: Destructured props with defaults, pure presentational rendering, dynamic styles
 */
export default function CalcButton({
  label,
  onClick,
  variant = 'number', // 'number' | 'operator' | 'action' | 'equal' | 'memory' | 'scientific'
  span = 1,
  disabled = false,
  ariaLabel
}) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'operator':
        return {
          backgroundColor: 'rgba(99, 102, 241, 0.25)',
          color: '#a5b4fc',
          borderColor: 'rgba(99, 102, 241, 0.4)',
          fontWeight: 700
        };
      case 'equal':
        return {
          backgroundColor: 'var(--accent-primary)',
          color: '#ffffff',
          fontWeight: 700,
          boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
        };
      case 'action':
        return {
          backgroundColor: 'rgba(239, 68, 68, 0.15)',
          color: '#fca5a5',
          borderColor: 'rgba(239, 68, 68, 0.3)',
          fontWeight: 600
        };
      case 'memory':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.12)',
          color: '#6ee7b7',
          borderColor: 'rgba(16, 185, 129, 0.25)',
          fontSize: '0.82rem',
          fontWeight: 600
        };
      case 'scientific':
        return {
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          color: '#67e8f9',
          borderColor: 'rgba(6, 182, 212, 0.3)',
          fontSize: '0.9rem',
          fontWeight: 600
        };
      case 'number':
      default:
        return {
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontWeight: 500
        };
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      className="calc-btn"
      style={{
        gridColumn: `span ${span}`,
        ...getVariantStyle()
      }}
    >
      {label}
    </button>
  );
}
