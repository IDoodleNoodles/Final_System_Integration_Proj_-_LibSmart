import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Books from './pages/Books';
import Branches from './pages/Branches';
import Catalog from './pages/Catalog';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Placeholder from './pages/Placeholder';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Users from './pages/Users';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Navigate to="/register" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot" element={<Navigate to="/forgot-password" replace />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset" element={<Navigate to="/reset-password" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/books" element={<Books />} />
        <Route path="/users" element={<Users />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/profile" element={<Placeholder />} />
        <Route path="/otp" element={<Placeholder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;