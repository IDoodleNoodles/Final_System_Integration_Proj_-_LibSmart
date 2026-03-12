import React from "react";
import "../styles/auth.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h3>BookWorm</h3>
        <ul>
          <li>Your Borrowed Book List</li>
          <li>Your Returned Book List</li>
          <li>Browse Inventory</li>
        </ul>
      </div>

      <div className="dashboard-content">
        <h2>Welcome Back, User 👋</h2>
        <div className="quote-box">
          <p>
            "Embarking on the journey of reading fosters personal growth,
            nurturing a path towards excellence and the refinement of character."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;