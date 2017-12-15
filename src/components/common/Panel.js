/**
 * panel
 */
import React from 'react';

export default function Panel({ children, className, id, style }) {
  return (
    <div id={id} style={style} className={`fe-panel ${className || ''}`}>
      {children}
    </div>
  );
}

export function PanelHeader({ children, className, id, style }) {
  return (
    <div id={id} style={style} className={`fe-panel-header ${className || ''}`}>
      {children}
    </div>
  );
}

export function PanelBody({ children, className, id, style }) {
  return (
    <div id={id} style={style} className={`fe-panel-body ${className || ''}`}>
      {children}
    </div>
  );
}
