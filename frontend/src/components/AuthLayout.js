import React from 'react';

export default function AuthLayout({ heroTitle, heroCopy, heroStats = [], children, footer }) {
  return (
    <div className="auth-shell">
      <aside className="auth-hero">
        <div className="auth-hero-content">
          <div className="brand-lockup">
            <div>
              <div className="brand-mark">LibSmart</div>
              <div className="brand-subtitle">Library</div>
            </div>
          </div>
          <div className="hero-badge">
            <span>Designed for fast borrowing, tracking, and branch operations.</span>
          </div>
          <h1 className="hero-title">{heroTitle}</h1>
          <p className="hero-copy">{heroCopy}</p>
          {heroStats.length ? (
            <div className="hero-stats">
              {heroStats.map((stat) => (
                <div className="hero-stat" key={stat.label}>
                  <div className="hero-stat-value">{stat.value}</div>
                  <div className="hero-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="auth-hero-footer">
          <p className="help-text">Streamlined access for readers, librarians, and administrators.</p>
        </div>
      </aside>
      <main className="auth-card-wrap">
        <section className="auth-card">
          {children}
          {footer ? <div style={{ marginTop: '1.5rem' }}>{footer}</div> : null}
        </section>
      </main>
    </div>
  );
}