import React from 'react';

/**
 * Functional Component: Display
 * Implements: JSX conditional rendering (&&, ternary), embedded expressions, memory indicator
 */
export default function Display({
  equation = '',
  currentValue = '0',
  memoryValue = 0,
  hasError = false,
  subText = ''
}) {
  return (
    <div className="calc-display-container">
      {/* Top Status & Memory Bar */}
      <div className="calc-display-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {/* Conditional rendering for Memory Indicator */}
          {memoryValue !== 0 && (
            <span className="badge badge-emerald" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>
              M = {memoryValue}
            </span>
          )}
          {hasError && (
            <span className="badge badge-danger" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>
              Error
            </span>
          )}
        </div>
        <span className="calc-subtext">
          {subText || equation || '\u00A0'}
        </span>
      </div>

      {/* Main Large Display Number */}
      <div className="calc-main-value">
        {hasError ? 'Error' : currentValue}
      </div>
    </div>
  );
}
