import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import AdminContext from "../../context/adminContext";
import axios from "axios";
import Notification from "../../components/notification.jsx";

const AddDoctor = () => {
  const { aToken, backendUrl } = useContext(AdminContext);

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Years");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [notify, setNotify] = useState(null);

  const handleImagePreview = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreviewImage(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !name ||
        !email ||
        !password ||
        !speciality ||
        !degree ||
        !experience ||
        !about ||
        !fees ||
        (!address1 && !address2)
      ) {
        setNotify({
          type: "error",
          message: "Please fill all required fields",
        });
        return;
      }
      if (!file) {
        setNotify({ type: "error", message: "Please upload doctor's image" });
        return;
      }

      if (!aToken) {
        setNotify({
          type: "error",
          message:
            "You must be logged in as admin to add a doctor. Please login.",
        });
        return;
      }

      setSubmitting(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("fees", Number(fees));
      // send address as JSON string
      formData.append("address", JSON.stringify({ address1, address2 }));
      formData.append("image", file);

      // backend routes are mounted under /api/admin (see backend/server.js)
      const url = `${backendUrl.replace(/\/$/, "")}/api/admin/add-doctor`;

      const res = await axios.post(url, formData, {
        headers: {
          atoken: aToken || "",
        },
      });

      if (res?.data?.success) {
        // show popup notification
        setNotify({ type: "success", message: "Doctor added successfully" });
        // reset form
        setName("");
        setPassword("");
        setExperience("1 Years");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setFile(null);
        setPreviewImage(null);
      } else {
        setNotify({
          type: "error",
          message: res?.data?.message || "Failed to add doctor",
        });
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Server error";
      setNotify({ type: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      className="w-full flex justify-center pt-10 px-4"
      onSubmit={handleSubmit}
    >
      {notify && (
        <Notification
          type={notify.type}
          message={notify.message}
          onClose={() => setNotify(null)}
        />
      )}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] w-full max-w-5xl p-10 transition-all">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-10 tracking-tight">
          Add Doctor
        </h2>

        {/* Layout */}
        <div className="grid grid-cols-3 gap-10">
          {/* LEFT — Upload */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="doctor-img"
              className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer relative overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all"
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src={assets.upload_area} className="w-10 opacity-60" />
              )}
            </label>

            <input
              type="file"
              id="doctor-img"
              hidden
              onChange={handleImagePreview}
            />

            <p className="text-sm text-gray-600 mt-3 text-center leading-tight">
              Upload doctor <br /> picture
            </p>
          </div>

          {/* RIGHT — Fields */}
          <div className="col-span-2 grid grid-cols-2 gap-6">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="peer w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
              <label
                className={`absolute left-3 pointer-events-none transition-all ${
                  name
                    ? "top-0 text-xs text-indigo-500"
                    : "top-3 text-sm text-gray-500"
                } peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-500`}
              >
                Doctor name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
              <label
                className={`absolute left-3 pointer-events-none transition-all ${
                  email
                    ? "top-0 text-xs text-indigo-500"
                    : "top-3 text-sm text-gray-500"
                } peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-500`}
              >
                Doctor Email
              </label>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
              <label
                className={`absolute left-3 pointer-events-none transition-all ${
                  password
                    ? "top-0 text-xs text-indigo-500"
                    : "top-3 text-sm text-gray-500"
                } peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-500`}
              >
                Doctor Password
              </label>
            </div>

            {/* Fees */}
            <div className="relative">
              <input
                type="number"
                placeholder=" "
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="peer w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400 outline-none transition"
              />
              <label
                className={`absolute left-3 pointer-events-none transition-all ${
                  fees
                    ? "top-0 text-xs text-indigo-500"
                    : "top-3 text-sm text-gray-500"
                } peer-focus:top-0 peer-focus:text-xs peer-focus:text-indigo-500`}
              >
                Fees
              </label>
            </div>

            {/* Speciality */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Speciality
              </label>
              <select
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white cursor-pointer focus:ring-2 focus:ring-indigo-400"
              >
                <option>General physician</option>
                <option>Dermatologist</option>
                <option>Neurologist</option>
                <option>Pediatrician</option>
                <option>Gynecologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>

            {/* Education */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Education
              </label>
              <input
                type="text"
                placeholder="Education"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Address
              </label>
              <input
                type="text"
                placeholder="Address 1"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white mb-2 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <input
                type="text"
                placeholder="Address 2"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Experience
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl bg-white cursor-pointer focus:ring-2 focus:ring-indigo-400"
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i}>{i} Years</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div className="mt-10">
          <p className="text-sm font-medium text-gray-700 mb-2">About Doctor</p>
          <textarea
            rows={4}
            placeholder="Write something about the doctor..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl bg-white resize-none outline-none focus:ring-2 focus:ring-indigo-400"
          ></textarea>
        </div>

        {/* BUTTON */}
        <div className="mt-8">
          <button
            type="submit"
            disabled={submitting}
            className={`px-8 py-3 text-white rounded-xl shadow transition-all ${
              submitting
                ? "bg-gray-400"
                : "bg-indigo-500 hover:bg-indigo-600 hover:shadow-md"
            }`}
          >
            {submitting ? "Adding..." : "Add Doctor"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
