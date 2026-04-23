import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import DashboardLayout from "../components/DashboardLayout";
import { getProfile, getProfilePhoto, updateProfile, uploadPhoto } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const DEFAULT_PHOTO_CACHE_KEY = "profilePhoto:current";

const getPhotoCacheKey = (username) => {
  if (!username) return DEFAULT_PHOTO_CACHE_KEY;
  return `profilePhoto:${username}`;
};

const readCachedPhoto = (cacheKey) => {
  try {
    return localStorage.getItem(cacheKey) || "";
  } catch (e) {
    return "";
  }
};

const cachePhoto = (cacheKey, photoDataUrl) => {
  try {
    if (!photoDataUrl) {
      localStorage.removeItem(cacheKey);
      return;
    }
    localStorage.setItem(cacheKey, photoDataUrl);
  } catch (e) {
    // Ignore storage quota and privacy mode errors.
  }
};

const fileToDataUrl = (fileOrBlob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(fileOrBlob);
  });

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    username: "",
    email: "",
    fullName: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const navigate = useNavigate();

  const refreshPhotoPreview = async (userData) => {
    const cacheKey = getPhotoCacheKey(userData?.username);

    if (!userData?.photoReference) {
      setPhotoPreview("");
      cachePhoto(cacheKey, "");
      return;
    }

    const cached = readCachedPhoto(cacheKey);
    if (cached) {
      setPhotoPreview(cached);
    }

    const photoResult = await getProfilePhoto();
    if (!photoResult.success || !photoResult.blob) {
      return;
    }

    try {
      const latestPhoto = await fileToDataUrl(photoResult.blob);
      if (typeof latestPhoto === "string") {
        setPhotoPreview(latestPhoto);
        cachePhoto(cacheKey, latestPhoto);
      }
    } catch (e) {
      // Keep cached preview if conversion fails.
    }
  };

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
      setForm({
        username: data.username || "",
        email: data.email || "",
        fullName: data.fullName || "",
        phone: data.phone || "",
        address: data.address || "",
      });
      await refreshPhotoPreview(data);
      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const refreshProfile = async () => {
    const refreshed = await getProfile();
    if (refreshed.success) {
      const data = refreshed.data || {};
      setProfile(data);
      await refreshPhotoPreview(data);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    const result = await updateProfile(form);
    setSaving(false);

    if (result.success) {
      setMessage(result.message || "Profile updated successfully");
      await refreshProfile();
    } else {
      setError(result.message || result.error || "Failed to update profile");
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previousPreview = photoPreview;
    try {
      const localPreview = await fileToDataUrl(file);
      if (typeof localPreview === "string") {
        setPhotoPreview(localPreview);
      }
    } catch (err) {
      // Continue upload even if local preview generation fails.
    }

    setUploading(true);
    setMessage("");
    setError("");

    const result = await uploadPhoto(file);
    setUploading(false);

    if (result.success) {
      setMessage(result.message || "Photo uploaded successfully");
      await refreshProfile();
    } else {
      setPhotoPreview(previousPreview);
      setError(result.message || result.error || "Photo upload failed");
    }

    e.target.value = "";
  };

  if (loading) {
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
        <Input placeholder="Username" value={form.username} onChange={handleChange("username")} />
        <Input placeholder="Email" type="email" value={form.email} onChange={handleChange("email")} />
        <Input placeholder="Full Name" value={form.fullName} onChange={handleChange("fullName")} />
        <Input placeholder="Phone" value={form.phone} onChange={handleChange("phone")} />
        <Input placeholder="Address" value={form.address} onChange={handleChange("address")} />

        {photoPreview && (
          <div style={{ marginTop: "12px" }}>
            <div style={{ fontSize: "12px", marginBottom: "6px" }}>Photo Preview</div>
            <img
              src={photoPreview}
              alt="Profile preview"
              style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px", border: "1px solid #ddd" }}
            />
          </div>
        )}

        <div style={{ marginTop: "10px" }}>
          <label htmlFor="photoUpload">Upload Photo (.jpg, .png)</label>
          <input id="photoUpload" type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" onChange={handlePhotoUpload} />
        </div>

        {profile?.photoReference && (
          <p style={{ fontSize: "12px" }}>
            Photo saved in DB. Reference: {profile.photoReference}
          </p>
        )}

        {error && <div style={{ color: "red", fontSize: "12px", marginTop: "8px" }}>{error}</div>}
        {message && <div style={{ color: "green", fontSize: "12px", marginTop: "8px" }}>{message}</div>}

        <Button
          text={saving ? "SAVING..." : uploading ? "UPLOADING..." : "SAVE PROFILE"}
          onClick={handleSaveProfile}
          disabled={saving || uploading}
        />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
