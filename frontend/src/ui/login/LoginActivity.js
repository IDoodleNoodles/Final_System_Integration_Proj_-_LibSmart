import React from "react";

import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginPresenter } from "./LoginPresenter";

const LoginActivity = () => {
  const navigate = useNavigate();
  const { viewModel, actions } = LoginPresenter(navigate);

  return (
    <AuthLayout
      leftContent={
        <>
          <h2>Welcome Back !!</h2>
          <Input
            placeholder="Username"
            value={viewModel.username}
            onChange={(e) => actions.setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={viewModel.password}
            onChange={(e) => actions.setPassword(e.target.value)}
          />
          {viewModel.error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{viewModel.error}</div>}
          <Link to="/forgot">Forgot password?</Link>
          <Button text={viewModel.loading ? "SIGNING IN..." : "SIGN IN"} onClick={actions.submitLogin} disabled={viewModel.loading} />
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

export default LoginActivity;
