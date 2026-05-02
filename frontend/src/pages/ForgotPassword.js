import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Button from '../components/Button';
import Input from '../components/Input';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState('username');
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUsernameSubmit = (event) => {
    event.preventDefault();

    if (!username.trim()) {
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 800);
  };

  const handleOtpSubmit = (event) => {
    event.preventDefault();

    if (!otp.trim()) {
      return;
    }

    navigate('/reset-password');
  };

  return (
    <AuthLayout
      heroTitle="Reset access securely"
      heroCopy="Use the recovery flow to verify your account and set a new password."
      heroStats={[
        { label: 'Recovery Steps', value: '2' },
        { label: 'Secure Codes', value: '6-digit' },
        { label: 'Support Hours', value: '24/7' },
      ]}
    >
      <div className="auth-heading">
        <h2>Reset Password</h2>
        <p>{step === 'username' ? 'Enter your username or email to receive an OTP.' : 'Enter the OTP sent to your email.'}</p>
      </div>

      <div className="tabs" style={{ marginBottom: '1.25rem' }}>
        <button type="button" className={`tab-button ${step === 'username' ? 'active' : ''}`}>Account</button>
        <button type="button" className={`tab-button ${step === 'otp' ? 'active' : ''}`}>OTP</button>
      </div>

      {step === 'username' ? (
        <form onSubmit={handleUsernameSubmit} className="section-grid">
          <div className="field">
            <label className="field-label" htmlFor="username">Please enter your username</label>
            <Input id="username" icon={Mail} placeholder="Enter your username or email" value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <Button type="submit" disabled={loading}>{loading ? 'Sending OTP...' : 'Send OTP'}</Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="section-grid">
          <div className="field">
            <label className="field-label" htmlFor="otp">Enter OTP</label>
            <p className="help-text" style={{ fontSize: '0.85rem' }}>We've sent a 6-digit code to your registered email.</p>
            <input
              id="otp"
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              className="field-input"
              style={{ textAlign: 'center', fontSize: '1.4rem', letterSpacing: '0.35em' }}
            />
          </div>
          <Button type="submit">Verify OTP</Button>
        </form>
      )}

      <button type="button" onClick={() => (step === 'otp' ? setStep('username') : navigate('/login'))} className="button button-ghost" style={{ width: '100%', marginTop: '1rem' }}>
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="auth-split" />

      <p style={{ textAlign: 'center', fontSize: '0.95rem' }} className="help-text">
        Remember your password? <Link to="/login" style={{ color: 'hsl(var(--libsmart-blue))', fontWeight: 700 }}>Sign in</Link>
      </p>
    </AuthLayout>
  );
}
