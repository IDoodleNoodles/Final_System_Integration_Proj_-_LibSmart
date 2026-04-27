import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { DashboardPresenter } from "./DashboardPresenter";

const DashboardActivity = () => {
  const navigate = useNavigate();
  const { viewModel } = DashboardPresenter(navigate);

  if (viewModel.loading) {
    return (
      <DashboardLayout>
        <div>Loading dashboard...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2>Welcome Back, {viewModel.profile?.username || "User"}!</h2>
      <div className="quote-box">
        <p>
          "Embarking on the journey of reading fosters personal growth,
          nurturing a path towards excellence and the refinement of character."
        </p>
      </div>
      {viewModel.error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{viewModel.error}</div>}
    </DashboardLayout>
  );
};

export default DashboardActivity;
