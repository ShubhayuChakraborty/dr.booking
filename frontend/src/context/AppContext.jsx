import React, { useEffect, useState, useCallback } from "react";
import { AppContext } from "./AppContextValue";
import { toast } from "react-toastify";
// Re-export AppContext for backward compatibility with imports that reference
// `../context/AppContext` as a named export.
export { AppContext } from "./AppContextValue";

import axios from "axios";
const AppContextProvider = (props) => {
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [doctors, setDoctors] = useState([]);

  // tokenpersisted in localStorage for simple demo auth
  const [token, setTokenState] = useState(() => {
    try {
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    } catch {
      // ignore
    }
  }, [token]);

  const setToken = (value) => {
    setTokenState(value);
  };
  const [userData, setUserData] = useState(false);

  const getDoctorsData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching doctors data:", error);
      toast.error("Failed to fetch doctors data");
    }
  }, [backendUrl]);

  const loadUserProfileData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: {
          token: token,
        },
      });
      if (data.success) {
        // Normalize DOB to dob for frontend consistency
        const normalizedData = {
          ...data.userData,
          dob: data.userData.DOB || data.userData.dob,
        };
        setUserData(normalizedData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile data");
    }
  }, [backendUrl, token]);

  // Get User Profile
  const getUserProfile = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: {
          token: token,
        },
      });

      if (data.success) {
        // Normalize DOB to dob for frontend consistency
        const normalizedData = {
          ...data.userData,
          dob: data.userData.DOB || data.userData.dob,
        };
        setUserData(normalizedData);
        return { success: true, userData: normalizedData };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to fetch profile data");
      return { success: false, message: "Failed to fetch profile" };
    }
  };

  // Update User Profile
  const updateUserProfile = async (profileData, image) => {
    try {
      const formData = new FormData();

      formData.append("name", profileData.name);
      formData.append("phone", profileData.phone);
      formData.append("address", JSON.stringify(profileData.address));
      formData.append("dob", profileData.dob);
      formData.append("gender", profileData.gender);

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            token: token,
          },
        }
      );
      if (data.success) {
        toast.success("Profile updated successfully!");
        await getUserProfile(); // Reload profile data
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
      return { success: false, message: "Failed to update profile" };
    }
  };
  // Register User
  const registerUser = async (name, email, password) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        toast.success("Account created successfully!");
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
      return { success: false, message: "Registration failed" };
    }
  };

  // Login User
  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        toast.success("Login successful!");
        return { success: true };
      } else {
        toast.error(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false, message: "Login failed" };
    }
  };

  // Logout User
  const logout = () => {
    setToken(null);
    toast.info("Logged out successfully");
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getDoctorsData();
  }, [getDoctorsData]);

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token, loadUserProfileData]);

  const value = {
    doctors,
    token,
    setToken,
    backendUrl,
    registerUser,
    loginUser,
    logout,
    userData,
    setUserData,
    getUserProfile,
    updateUserProfile,
    getDoctorsData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
