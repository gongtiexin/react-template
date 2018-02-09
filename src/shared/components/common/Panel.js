/**
 * panel
 */
import React from "react";
import PropTypes from "prop-types";

export default function Panel({ children, className, id, style }) {
  return (
    <div id={id} style={style} className={`fe-panel ${className}`}>
      {children}
    </div>
  );
}

Panel.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
};

export function PanelHeader({ children, className, id, style }) {
  return (
    <div id={id} style={style} className={`fe-panel-header ${className || ""}`}>
      {children}
    </div>
  );
}

PanelHeader.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
};

export function PanelBody({ children, className, id, style }) {
  return (
    <div id={id} style={style} className={`fe-panel-body ${className || ""}`}>
      {children}
    </div>
  );
}

PanelBody.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
};
