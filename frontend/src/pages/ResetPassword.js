import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Lock } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Button from '../components/Button';
import Input from '../components/Input';

function evaluateStrength(password) {
  if (!password) {
    return 'weak';
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const isLongEnough = password.length >= 8;
  const score = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar, isLongEnough].filter(Boolean).length;

  if (score >= 4) return 'strong';
  if (score >= 2) return 'medium';
  return 'weak';
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('weak');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({ ...current, [name]: value }));

    if (name === 'newPassword') {
      setPasswordStrength(evaluateStrength(value));
    }

    const nextPassword = name === 'newPassword' ? value : formData.newPassword;
    const nextConfirmPassword = name === 'confirmPassword' ? value : formData.confirmPassword;
    setPasswordError(nextPassword && nextConfirmPassword && nextPassword !== nextConfirmPassword ? 'Passwords do not match' : '');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.newPassword || !formData.confirmPassword) {
      setPasswordError('Please fill in all fields');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    navigate('/login');
  };

  const strengthColor = {
    weak: 'rgba(255, 88, 88, 0.8)',
    medium: 'rgba(255, 183, 0, 0.82)',
    strong: 'rgba(10, 180, 110, 0.84)',
  };

  return (
    <AuthLayout
      heroTitle="Create a strong new password"
      heroCopy="Complete recovery by setting a password that meets the platform's security requirements."
      heroStats={[
        { label: 'Checks', value: '4' },
        { label: 'Minimum Length', value: '8' },
        { label: 'Security Level', value: 'High' },
      ]}
    >
      <div className="auth-heading">
        <h2>Reset Password</h2>
        <p>Create a new password for your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="section-grid">
        <div className="field">
          <label className="field-label" htmlFor="newPassword">New Password</label>
          <Input id="newPassword" name="newPassword" type="password" icon={Lock} placeholder="Enter a strong password" value={formData.newPassword} onChange={handleChange} />

          {formData.newPassword ? (
            <div style={{ marginTop: '0.6rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem' }}>
                <span style={{ height: '0.35rem', borderRadius: '999px', background: strengthColor[passwordStrength] }} />
                <span style={{ height: '0.35rem', borderRadius: '999px', background: ['medium', 'strong'].includes(passwordStrength) ? strengthColor[passwordStrength] : 'rgba(143, 168, 198, 0.2)' }} />
                <span style={{ height: '0.35rem', borderRadius: '999px', background: passwordStrength === 'strong' ? strengthColor[passwordStrength] : 'rgba(143, 168, 198, 0.2)' }} />
              </div>
              <p className="help-text" style={{ fontSize: '0.82rem', marginTop: '0.5rem' }}>Password strength: <strong>{passwordStrength}</strong></p>
            </div>
          ) : null}

          <div className="help-text" style={{ fontSize: '0.82rem' }}>
            Password should contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="confirmPassword">Confirm Password</label>
          <Input id="confirmPassword" name="confirmPassword" type="password" icon={Lock} placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
          {passwordError ? <div className="field-error">{passwordError}</div> : null}
        </div>

        <Button type="submit">RESET PASSWORD</Button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <ul className="help-text" style={{ paddingLeft: '1.15rem', lineHeight: 1.7 }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Check size={14} /> At least 8 characters</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Check size={14} /> One uppercase letter</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Check size={14} /> One lowercase letter</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Check size={14} /> One number</li>
        </ul>
      </div>

      <div className="auth-split" />

      <p style={{ textAlign: 'center', fontSize: '0.95rem' }} className="help-text">
        Remember your password? <Link to="/login" style={{ color: 'hsl(var(--libsmart-blue))', fontWeight: 700 }}>Sign in</Link>
      </p>
    </AuthLayout>
  );
}
