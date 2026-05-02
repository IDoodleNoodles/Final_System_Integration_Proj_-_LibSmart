import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please enter your username and password.');
      return;
    }

    localStorage.setItem('authToken', 'demo-token');
    localStorage.setItem('user', JSON.stringify({ username: formData.username }));
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      heroTitle="Welcome Back"
      heroCopy="Sign in to manage the catalog, branches, and user accounts from one polished workspace."
      heroStats={[
        { label: 'Borrowed Today', value: '128' },
        { label: 'Active Members', value: '1.8K' },
        { label: 'Branches Online', value: '12' },
      ]}
    >
      <div className="auth-heading">
        <h2>Welcome Back !!</h2>
        <p>Sign in to continue to your library dashboard.</p>
      </div>

      <form onSubmit={handleSubmit} className="section-grid">
        <div className="field">
          <label className="field-label" htmlFor="username">Username or Email</label>
          <Input
            id="username"
            name="username"
            icon={Mail}
            placeholder="Enter your username or email"
            value={formData.username}
            onChange={(event) => setFormData((current) => ({ ...current, username: event.target.value }))}
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="password">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            icon={Lock}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
          />
        </div>

        {error ? <div className="field-error">{error}</div> : null}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link className="help-text" to="/forgot-password">Forgot Password?</Link>
        </div>

        <Button type="submit">SIGN IN</Button>
      </form>

      <div className="auth-split" />

      <p style={{ textAlign: 'center', fontSize: '0.95rem' }} className="help-text">
        Don't have an account? <Link to="/register" style={{ color: 'hsl(var(--libsmart-blue))', fontWeight: 700 }}>Create one</Link>
      </p>

      <p className="auth-footnote" style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.82rem' }}>
        By signing in, you agree to our Terms of Service and Privacy Policy
      </p>
    </AuthLayout>
  );
}
