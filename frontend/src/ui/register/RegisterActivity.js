import React from "react";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { RegisterPresenter } from "./RegisterPresenter";

const RegisterActivity = () => {
  const navigate = useNavigate();
  const { viewModel, actions } = RegisterPresenter(navigate);

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
            value={viewModel.username}
            onChange={(e) => actions.setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={viewModel.email}
            onChange={(e) => actions.setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={viewModel.password}
            onChange={(e) => actions.setPassword(e.target.value)}
          />
          {viewModel.error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{viewModel.error}</div>}
          <Button text={viewModel.loading ? "SIGNING UP..." : "SIGN UP"} onClick={actions.submitRegister} disabled={viewModel.loading} />
        </>
      }
    />
  );
};

export default RegisterActivity;
