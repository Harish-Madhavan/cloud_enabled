import React from 'react';

export default function TopicBadge({ tag, variant = 'indigo' }) {
  const variantClass = {
    indigo: 'badge-indigo',
    cyan: 'badge-cyan',
    emerald: 'badge-emerald',
    amber: 'badge-amber',
  }[variant] || 'badge-indigo';

  return (
    <span className={`badge ${variantClass}`}>
      {tag}
    </span>
  );
}
