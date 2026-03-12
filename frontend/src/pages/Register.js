import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/apiService";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const result = await register(username, email, password);
    setLoading(false);

    if (result.success) {
      // Redirect to login page
      navigate("/");
    } else {
      setError(result.message || result.error || "Registration failed");
    }
  };

  return (
    <AuthLayout
      leftContent={
        <>
          <h1 className="logo">BookWorm</h1>
          <p>Already have an account? Sign in now.</p>
          <Link to="/">
            <button className="outline-btn">SIGN IN</button>
          </Link>
        </>
      }
      rightContent={
        <>
          <h2>Sign Up</h2>
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{error}</div>}
          <Button text={loading ? "SIGNING UP..." : "SIGN UP"} onClick={handleRegister} disabled={loading} />
        </>
      }
    />
  );
};

export default SignUp;