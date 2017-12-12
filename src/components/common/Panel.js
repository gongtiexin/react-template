/**
 * panel
 */
import React from 'react';

export default function Panel({ children, className }) {
  return (
    <div className={`fe-panel ${className || ''}`}>
      {children}
    </div>
  );
}

export function PanelHeader({ children, className }) {
  return (
    <div className={`fe-panel-header ${className || ''}`}>
      {children}
    </div>
  );
}

export function PanelBody({ children, className }) {
  return (
    <div className={`fe-panel-body ${className || ''}`}>
      {children}
    </div>
  );
}
