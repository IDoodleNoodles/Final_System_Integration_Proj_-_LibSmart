import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { getProfile } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError("");

      const result = await getProfile();
      if (!result.success) {
        setError(result.message || result.error || "Please login again");
        setLoading(false);
        navigate("/");
        return;
      }

      const data = result.data || {};
      setProfile(data);
      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  if (loading) {
    return (
      <DashboardLayout>
        <div>Loading dashboard...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2>Welcome Back, {profile?.username || "User"}!</h2>
      <div className="quote-box">
        <p>
          "Embarking on the journey of reading fosters personal growth,
          nurturing a path towards excellence and the refinement of character."
        </p>
      </div>
      {error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{error}</div>}
    </DashboardLayout>
  );
};

export default Dashboard;