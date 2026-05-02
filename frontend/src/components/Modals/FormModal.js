import React from 'react';
import ModalShell from './ModalShell';

export default function FormModal({ isOpen, title, onClose, onSubmit, submitText, children }) {
  return (
    <ModalShell
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      footer={(
        <>
          <button type="button" className="button button-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form={`${title}-form`} className="button button-primary">
            {submitText}
          </button>
        </>
      )}
    >
      <form id={`${title}-form`} onSubmit={onSubmit} className="section-grid">
        {children}
      </form>
    </ModalShell>
  );
}
