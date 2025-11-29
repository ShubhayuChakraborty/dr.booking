import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Calendar,
  Pencil,
  Save,
} from "lucide-react";

const MyProfile = () => {
  const { userData, setUserData, getUserProfile, updateUserProfile, token } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
    if (token && !userData) {
      getUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleSave = async () => {
    const result = await updateUserProfile(
      {
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        dob: userData.dob,
        gender: userData.gender,
      },
      image
    );

    if (result.success) {
      setIsEdit(false);
      setImage(null);
    }
  };

  if (!userData) {
    return (
      <div className="max-w-4xl mx-auto mt-16 p-6 text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8">
        {/* Header: Image + Name */}
        <div className="flex gap-6 items-center">
          <div className="relative">
            <img
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-[#5F6FFF] object-cover shadow-md"
            />
            {isEdit && (
              <label
                htmlFor="image"
                className="absolute bottom-0 right-0 bg-[#5F6FFF] text-white p-2 rounded-full cursor-pointer hover:bg-[#4C5DE0] transition"
              >
                <Pencil size={16} />
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  hidden
                  accept="image/*"
                />
              </label>
            )}
          </div>

          <div>
            {/* Name */}
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="text-2xl font-semibold border px-3 py-2 rounded-lg w-full"
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-900">
                {userData.name}
              </h2>
            )}

            <p className="text-gray-500 mt-1">User Profile</p>
          </div>
        </div>

        <hr className="my-6" />

        {/* CONTACT INFORMATION */}
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Phone className="w-5" /> Contact Information
        </h3>

        <div className="mt-4 space-y-4">
          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="text-[#5F6FFF]" />
            <p className="font-medium w-32">Email:</p>
            <p className="text-gray-700">{userData.email}</p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="text-[#5F6FFF]" />
            <p className="font-medium w-32">Phone:</p>

            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="border px-3 py-2 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{userData.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="text-[#5F6FFF] mt-1" />
            <p className="font-medium w-32">Address:</p>

            {isEdit ? (
              <div className="space-y-2 w-full">
                <input
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  className="border px-3 py-2 rounded-lg w-full"
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  className="border px-3 py-2 rounded-lg w-full"
                />
              </div>
            ) : (
              <p className="text-gray-700">
                {userData.address.line1} <br /> {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        <hr className="my-6" />

        {/* BASIC INFORMATION */}
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <User className="w-5" /> Basic Information
        </h3>

        <div className="mt-4 space-y-4">
          {/* Gender */}
          <div className="flex items-center gap-3">
            <User className="text-[#5F6FFF]" />
            <p className="font-medium w-32">Gender:</p>

            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border px-3 py-2 rounded-lg"
              >
                <option value="NOT SELECTED">Not Selected</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData.gender}</p>
            )}
          </div>

          {/* DOB */}
          <div className="flex items-center gap-3">
            <Calendar className="text-[#5F6FFF]" />
            <p className="font-medium w-32">Date of Birth:</p>

            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border px-3 py-2 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">{userData.dob}</p>
            )}
          </div>
        </div>

        {/* EDIT / SAVE BUTTON */}
        <div className="mt-8 flex justify-end">
          {isEdit ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#5F6FFF] text-white px-6 py-3 rounded-xl hover:bg-[#4C5DE0] transition shadow-md"
            >
              <Save size={18} /> Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="flex items-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition shadow-sm"
            >
              <Pencil size={18} /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
