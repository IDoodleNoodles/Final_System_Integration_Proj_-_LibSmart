import { useEffect, useState } from "react";
import { getProfile } from "../../data/repositories/UserRepository";
import { DashboardContract } from "./DashboardContract";

export const DashboardPresenter = (navigate) => {
  const initial = DashboardContract.createInitialViewModel();
  const [profile, setProfile] = useState(initial.profile);
  const [loading, setLoading] = useState(initial.loading);
  const [error, setError] = useState(initial.error);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError("");

      const result = await getProfile();
      if (!result.success) {
        setError(result.message || result.error || DashboardContract.LOGIN_REQUIRED_MESSAGE);
        setLoading(false);
        navigate(DashboardContract.LOGIN_ROUTE);
        return;
      }

      setProfile(result.data || {});
      setLoading(false);
    };

    loadProfile();
  }, [navigate]);

  return {
    viewModel: {
      profile,
      loading,
      error,
    },
  };
};
