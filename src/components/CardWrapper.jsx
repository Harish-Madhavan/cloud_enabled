import React from 'react';

/**
 * Component Architecture Pattern: Composable Card Container
 * Implements: Component composition via 'children' prop instead of prop drilling
 */
export default function CardWrapper({ title, badgeText, actions, children, style = {} }) {
  return (
    <div className="card" style={{ ...style }}>
      {(title || badgeText || actions) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {title && <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>{title}</h2>}
            {badgeText && <span className="badge badge-cyan">{badgeText}</span>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
