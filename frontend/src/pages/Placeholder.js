import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Placeholder() {
  const location = useLocation();
  const pageName = location.pathname.split('/')[1] || 'Page';

  return (
    <div className="panel">
      <div className="panel-header">
        <h2>{pageName.charAt(0).toUpperCase() + pageName.slice(1)}</h2>
      </div>
      <div className="panel-body empty-state">
        This section is reserved for additional LibSmart screens.
      </div>
    </div>
  );
}
