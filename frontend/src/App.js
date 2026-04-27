import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginActivity from "./ui/login/LoginActivity";
import RegisterActivity from "./ui/register/RegisterActivity";
import ForgotPasswordActivity from "./ui/forgot-password/ForgotPasswordActivity";
import OTPActivity from "./ui/otp/OTPActivity";
import ResetPasswordActivity from "./ui/reset-password/ResetPasswordActivity";
import DashboardActivity from "./ui/dashboard/DashboardActivity";
import ProfileActivity from "./ui/profile/ProfileActivity";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginActivity />} />
        <Route path="/signup" element={<RegisterActivity />} />
        <Route path="/forgot" element={<ForgotPasswordActivity />} />
        <Route path="/otp" element={<OTPActivity />} />
        <Route path="/reset" element={<ResetPasswordActivity />} />
        <Route path="/dashboard" element={<DashboardActivity />} />
        <Route path="/profile" element={<ProfileActivity />} />
      </Routes>
    </Router>
  );
}

export default App;