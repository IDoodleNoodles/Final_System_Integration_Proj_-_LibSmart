import React from 'react';
import ModalShell from './ModalShell';

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText, isDangerous }) {
  return (
    <ModalShell
      isOpen={isOpen}
      title={title}
      onClose={onCancel}
      footer={(
        <>
          <button type="button" className="button button-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={`button ${isDangerous ? 'button-danger' : 'button-primary'}`} onClick={onConfirm}>
            {confirmText}
          </button>
        </>
      )}
    >
      <p className="help-text" style={{ lineHeight: 1.7 }}>{message}</p>
    </ModalShell>
  );
}
