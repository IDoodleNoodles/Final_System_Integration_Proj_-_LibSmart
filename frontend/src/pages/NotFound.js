import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Button from '../components/Button';

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="welcome-shell" style={{ justifyContent: 'center' }}>
      <main className="welcome-main">
        <div className="welcome-hero">
          <div style={{ display: 'grid', placeItems: 'center', marginBottom: '1.2rem' }}>
            <div style={{ width: '5rem', height: '5rem', borderRadius: '1.5rem', background: 'rgba(33, 117, 255, 0.1)', display: 'grid', placeItems: 'center' }}>
              <BookOpen size={38} color="hsl(var(--libsmart-blue))" />
            </div>
          </div>
          <h1 className="page-title">404</h1>
          <p className="page-subtitle" style={{ fontSize: '1.05rem', marginTop: '0.6rem' }}>Page not found</p>
          <p className="help-text" style={{ maxWidth: '42rem', margin: '1rem auto 0', lineHeight: 1.7 }}>
            The page at {location.pathname} does not exist. It may have been moved or removed.
          </p>
          <div style={{ marginTop: '1.6rem' }}>
            <Link to="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
