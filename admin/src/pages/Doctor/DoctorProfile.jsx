import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { profileData, getProfileData, dToken, backendUrl, setProfileData } =
    useContext(DoctorContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const updateAvailability = async (newAvailability) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        { available: newAvailability },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(
          newAvailability ? "You are now available" : "You are now unavailable"
        );
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error(error.message);
    }
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("about", profileData.about);
      formData.append("degree", profileData.degree);
      formData.append("experience", profileData.experience);
      formData.append("speciality", profileData.speciality);
      formData.append("fees", profileData.fees);
      formData.append("address", JSON.stringify(profileData.address));
      formData.append("available", String(profileData.available));

      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        formData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setImage(null);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.message);
    }
  };

  return (
    profileData && (
      <div className="w-full max-w-4xl m-5">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Doctor <span style={{ color: "#5F6FFF" }}>Profile</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your profile information
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Profile Image */}
            <div className="shrink-0">
              <div className="relative">
                <img
                  className="w-40 h-40 rounded-2xl object-cover border-4 border-[#5F6FFF]/20"
                  src={image ? URL.createObjectURL(image) : profileData.image}
                  alt="Doctor"
                />
                {isEdit && (
                  <label className="absolute bottom-2 right-2 bg-[#5F6FFF] text-white p-2 rounded-full cursor-pointer hover:bg-[#4e5fe8] transition shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-6">
              {/* Name */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Name
                </label>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {profileData.name}
                </p>
              </div>

              {/* About */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  About
                </label>
                {isEdit ? (
                  <textarea
                    rows="4"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF]"
                    value={profileData.about}
                    onChange={(e) =>
                      setProfileData({ ...profileData, about: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-gray-600 mt-1 leading-relaxed">
                    {profileData.about}
                  </p>
                )}
              </div>

              {/* Education & Experience */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Education
                  </label>
                  {isEdit ? (
                    <input
                      type="text"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF]"
                      value={profileData.degree}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          degree: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="text-gray-600 mt-1">{profileData.degree}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Experience
                  </label>
                  {isEdit ? (
                    <input
                      type="text"
                      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF]"
                      value={profileData.experience}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          experience: e.target.value,
                        })
                      }
                      placeholder="e.g., 5 Years"
                    />
                  ) : (
                    <p className="text-gray-600 mt-1">
                      {profileData.experience}
                    </p>
                  )}
                </div>
              </div>

              {/* Speciality */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Speciality
                </label>
                {isEdit ? (
                  <input
                    type="text"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF]"
                    value={profileData.speciality}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        speciality: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p className="text-gray-600 mt-1">{profileData.speciality}</p>
                )}
              </div>

              {/* Fees */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Consultation Fees
                </label>
                {isEdit ? (
                  <input
                    type="number"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF]"
                    value={profileData.fees}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        fees: Number(e.target.value),
                      })
                    }
                  />
                ) : (
                  <p className="text-2xl font-bold text-[#5F6FFF] mt-1">
                    ₹{profileData.fees}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Address
                </label>
                {isEdit ? (
                  <div className="space-y-2 mt-1">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF]"
                      value={profileData.address?.line1 || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: {
                            ...profileData.address,
                            line1: e.target.value,
                          },
                        })
                      }
                      placeholder="Address Line 1"
                    />
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5F6FFF]"
                      value={profileData.address?.line2 || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          address: {
                            ...profileData.address,
                            line2: e.target.value,
                          },
                        })
                      }
                      placeholder="Address Line 2"
                    />
                  </div>
                ) : (
                  <div className="text-gray-600 mt-1">
                    <p>{profileData.address?.line1}</p>
                    <p>{profileData.address?.line2}</p>
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer"
                  checked={profileData.available}
                  onChange={(e) => {
                    const newValue = e.target.checked;
                    setProfileData({
                      ...profileData,
                      available: newValue,
                    });
                    updateAvailability(newValue);
                  }}
                />
                <label className="text-sm font-semibold text-gray-700">
                  Available for appointments
                </label>
              </div>

              {/* Edit/Save Button */}
              <div className="pt-4">
                {isEdit ? (
                  <div className="flex gap-3">
                    <button
                      onClick={updateProfile}
                      className="px-6 py-2 bg-[#5F6FFF] text-white rounded-lg hover:bg-[#4e5fe8] transition font-medium"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEdit(false);
                        getProfileData();
                      }}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
