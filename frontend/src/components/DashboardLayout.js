import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/auth.css";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3>BookWorm</h3>
        <ul>
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile">My Profile</Link>
          </li>
          <li>Your Borrowed Book List</li>
          <li>Your Returned Book List</li>
          <li>Browse Inventory</li>
        </ul>
        <Link to="/reset">
          <button className="outline-btn" style={{ marginTop: "12px" }}>
            CHANGE PASSWORD
          </button>
        </Link>
        <button className="outline-btn" style={{ marginTop: "12px" }} onClick={handleLogout}>
          LOG OUT
        </button>
      </div>

      <div className="dashboard-content">{children}</div>
    </div>
  );
};

export default DashboardLayout;
