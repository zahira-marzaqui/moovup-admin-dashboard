import React from "react";

export default function Modal({ open, onClose, title, children, actions }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="card-header">
          <strong>{title}</strong>
          <button className="btn ghost" onClick={onClose}>
            Fermer
          </button>
        </div>
        <div>{children}</div>
        {actions && <div style={{ marginTop: 12 }}>{actions}</div>}
      </div>
    </div>
  );
}
