import { useEffect, useState } from "react";
import { getProfile, getProfilePhoto, updateProfile, uploadPhoto } from "../../data/repositories/UserRepository";
import { ProfileContract } from "./ProfileContract";

const getPhotoCacheKey = (username) => {
  if (!username) return ProfileContract.DEFAULT_PHOTO_CACHE_KEY;
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

export const ProfilePresenter = (navigate) => {
  const initial = ProfileContract.createInitialViewModel();
  const [profile, setProfile] = useState(initial.profile);
  const [form, setForm] = useState(initial.form);
  const [loading, setLoading] = useState(initial.loading);
  const [saving, setSaving] = useState(initial.saving);
  const [uploading, setUploading] = useState(initial.uploading);
  const [message, setMessage] = useState(initial.message);
  const [error, setError] = useState(initial.error);
  const [photoPreview, setPhotoPreview] = useState(initial.photoPreview);

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
        setError(result.message || result.error || ProfileContract.LOGIN_REQUIRED_MESSAGE);
        setLoading(false);
        navigate(ProfileContract.LOGIN_ROUTE);
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

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const refreshProfile = async () => {
    const refreshed = await getProfile();
    if (refreshed.success) {
      const data = refreshed.data || {};
      setProfile(data);
      await refreshPhotoPreview(data);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    const result = await updateProfile(form);
    setSaving(false);

    if (result.success) {
      setMessage(result.message || "Profile updated successfully");
      await refreshProfile();
      return;
    }

    setError(result.message || result.error || ProfileContract.UPDATE_FAILED_MESSAGE);
  };

  const uploadProfilePhoto = async (e) => {
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
      setError(result.message || result.error || ProfileContract.UPLOAD_FAILED_MESSAGE);
    }

    e.target.value = "";
  };

  return {
    viewModel: {
      profile,
      form,
      loading,
      saving,
      uploading,
      message,
      error,
      photoPreview,
    },
    actions: {
      updateField,
      saveProfile,
      uploadProfilePhoto,
    },
  };
};
