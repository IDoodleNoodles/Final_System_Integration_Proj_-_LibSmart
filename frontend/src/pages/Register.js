import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Lock, Mail, User } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.fullName || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
      setPasswordError('Please complete every field.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setPasswordError('Please agree to the Terms of Service.');
      return;
    }

    navigate('/login');
  };

  const handleChange = (event) => {
    const { name, type, value, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'password' || name === 'confirmPassword') {
      const nextPassword = name === 'password' ? value : formData.password;
      const nextConfirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
      setPasswordError(nextPassword && nextConfirmPassword && nextPassword !== nextConfirmPassword ? 'Passwords do not match' : '');
    }
  };

  return (
    <AuthLayout
      heroTitle="Create your library account"
      heroCopy="Join LibSmart and get access to a cleaner way to manage readers, branches, and collections."
      heroStats={[
        { label: 'Collections', value: '50+' },
        { label: 'Daily Readers', value: '1.2K' },
        { label: 'Uptime', value: '99.9%' },
      ]}
    >
      <div className="auth-heading">
        <h2>Create Account</h2>
        <p>Set up your account to start using the platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="section-grid">
        <div className="field">
          <label className="field-label" htmlFor="fullName">Full Name</label>
          <Input id="fullName" name="fullName" icon={User} placeholder="John Doe" value={formData.fullName} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="email">Email Address</label>
          <Input id="email" name="email" icon={Mail} type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="username">Username</label>
          <Input id="username" name="username" icon={User} placeholder="johndoe" value={formData.username} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="password">Password</label>
          <Input id="password" name="password" type="password" icon={Lock} placeholder="Enter a strong password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="confirmPassword">Confirm Password</label>
          <Input id="confirmPassword" name="confirmPassword" type="password" icon={Lock} placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
          {passwordError ? (
            <div className="field-error" style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <AlertCircle size={14} />
              <span>{passwordError}</span>
            </div>
          ) : null}
        </div>

        <label style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.92rem', color: 'hsl(var(--muted-foreground))' }}>
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            style={{ marginTop: '0.2rem', accentColor: 'hsl(var(--libsmart-blue))' }}
          />
          <span>
            I agree to the <button type="button" style={{ color: 'hsl(var(--libsmart-blue))', fontWeight: 700, background: 'none', border: 0, padding: 0 }}>Terms of Service</button> and{' '}
            <button type="button" style={{ color: 'hsl(var(--libsmart-blue))', fontWeight: 700, background: 'none', border: 0, padding: 0 }}>Privacy Policy</button>
          </span>
        </label>

        <Button type="submit">CREATE ACCOUNT</Button>
      </form>

      <div className="auth-split" />

      <p style={{ textAlign: 'center', fontSize: '0.95rem' }} className="help-text">
        Already have an account? <Link to="/login" style={{ color: 'hsl(var(--libsmart-blue))', fontWeight: 700 }}>Sign in</Link>
      </p>
    </AuthLayout>
  );
}
