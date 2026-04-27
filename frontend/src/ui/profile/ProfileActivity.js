import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import DashboardLayout from "../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { ProfilePresenter } from "./ProfilePresenter";

const ProfileActivity = () => {
  const navigate = useNavigate();
  const { viewModel, actions } = ProfilePresenter(navigate);

  if (viewModel.loading) {
    return (
      <DashboardLayout>
        <div>Loading profile...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2>My Profile</h2>
      <div className="quote-box" style={{ marginTop: "16px" }}>
        <Input placeholder="Username" value={viewModel.form.username} onChange={(e) => actions.updateField("username", e.target.value)} />
        <Input placeholder="Email" type="email" value={viewModel.form.email} onChange={(e) => actions.updateField("email", e.target.value)} />
        <Input placeholder="Full Name" value={viewModel.form.fullName} onChange={(e) => actions.updateField("fullName", e.target.value)} />
        <Input placeholder="Phone" value={viewModel.form.phone} onChange={(e) => actions.updateField("phone", e.target.value)} />
        <Input placeholder="Address" value={viewModel.form.address} onChange={(e) => actions.updateField("address", e.target.value)} />

        {viewModel.photoPreview && (
          <div style={{ marginTop: "12px" }}>
            <div style={{ fontSize: "12px", marginBottom: "6px" }}>Photo Preview</div>
            <img
              src={viewModel.photoPreview}
              alt="Profile preview"
              style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px", border: "1px solid #ddd" }}
            />
          </div>
        )}

        <div style={{ marginTop: "10px" }}>
          <label htmlFor="photoUpload">Upload Photo (.jpg, .png)</label>
          <input id="photoUpload" type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" onChange={actions.uploadProfilePhoto} />
        </div>

        {viewModel.profile?.photoReference && (
          <p style={{ fontSize: "12px" }}>
            Photo saved in DB. Reference: {viewModel.profile.photoReference}
          </p>
        )}

        {viewModel.error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{viewModel.error}</div>}
        {viewModel.message && <div style={{ color: "green", fontSize: "12px", marginTop: "8px" }}>{viewModel.message}</div>}

        <Button
          text={viewModel.saving ? "SAVING..." : viewModel.uploading ? "UPLOADING..." : "SAVE PROFILE"}
          onClick={actions.saveProfile}
          disabled={viewModel.saving || viewModel.uploading}
        />
      </div>
    </DashboardLayout>
  );
};

export default ProfileActivity;
