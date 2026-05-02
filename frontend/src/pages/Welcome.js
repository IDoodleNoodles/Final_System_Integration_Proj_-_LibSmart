import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import Button from '../components/Button';

export default function Welcome() {
  return (
    <div className="welcome-shell">
      <header className="welcome-header">
        <div className="brand-lockup">
          <div>
            <div className="brand-mark" style={{ fontSize: '2rem' }}>LibSmart</div>
            <div className="brand-subtitle" style={{ color: 'hsl(var(--muted-foreground))' }}>Library</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/login">
            <Button variant="secondary">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="welcome-main">
        <section className="welcome-hero">
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <div style={{ width: '5rem', height: '5rem', borderRadius: '1.5rem', background: 'rgba(33, 117, 255, 0.1)', display: 'grid', placeItems: 'center' }}>
              <BookOpen size={38} color="hsl(var(--libsmart-blue))" />
            </div>
          </div>
          <h1 className="page-title" style={{ marginTop: '1.4rem' }}>Welcome to LibSmart</h1>
          <p className="page-subtitle" style={{ fontSize: '1.05rem', maxWidth: '50rem', margin: '0.8rem auto 0' }}>
            Your comprehensive library management system for seamless book tracking, user management, and branch operations.
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="metric">2.5K+</div>
              <p className="page-subtitle">Active Book Loans</p>
            </div>
            <div className="feature-card">
              <div className="metric">1.8K+</div>
              <p className="page-subtitle">Registered Users</p>
            </div>
            <div className="feature-card">
              <div className="metric">12</div>
              <p className="page-subtitle">Branch Locations</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary">Create Account</Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="welcome-footer">&copy; 2024 LibSmart. All rights reserved.</footer>
    </div>
  );
}
