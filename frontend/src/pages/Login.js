import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/apiService";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setError("Username and password are required");
      setLoading(false);
      return;
    }

    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      // Store token or user info if needed
      localStorage.setItem("user", username);
      navigate("/dashboard");
    } else {
      setError(result.message || result.error || "Login failed");
    }
  };

  return (
    <AuthLayout
      leftContent={
        <>
          <h2>Welcome Back !!</h2>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{error}</div>}
          <Link to="/forgot">Forgot password?</Link>
          <Button text={loading ? "SIGNING IN..." : "SIGN IN"} onClick={handleLogin} disabled={loading} />
        </>
      }
      rightContent={
        <>
          <h1 className="logo">BookWorm</h1>
          <p>Your premier digital library for borrowing and reading books.</p>
          <Link to="/signup">
            <button className="outline-btn">SIGN UP</button>
          </Link>
        </>
      }
    />
  );
};

export default SignIn;