import React from 'react';
import ModalShell from './ModalShell';

export default function ViewModal({ isOpen, title, onClose, children }) {
  return (
    <ModalShell
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      footer={(
        <button type="button" className="button button-primary" onClick={onClose}>
          Close
        </button>
      )}
    >
      {children}
    </ModalShell>
  );
}
