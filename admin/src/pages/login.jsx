import React, { useContext, useState } from "react";
import AdminContext from "../context/adminContext";
import { DoctorContext } from "../context/doctorContext";
import axios from "axios";
import Notification from "../components/notification.jsx";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState(null);

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const showError = (msg) => {
    setNotify({ type: "error", message: msg });
  };

  const showSuccess = (msg) => {
    setNotify({ type: "success", message: msg });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return showError("Please fill all fields!");
    }

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
          showSuccess("Admin login successful!");
        } else {
          showError(data.message || "Incorrect password!");
        }
      }

      if (state === "Doctor") {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          showSuccess("Doctor login successful!");
        } else {
          showError(data.message || "Incorrect password!");
        }
      }
    } catch (err) {
      console.error(err);
      showError("Server error! Try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-[#eef1ff] to-white px-4">
      {notify && (
        <Notification
          type={notify.type}
          message={notify.message}
          onClose={() => setNotify(null)}
        />
      )}

      <form
        onSubmit={onSubmitHandler}
        className="
          w-full max-w-md bg-white/80 backdrop-blur-xl 
          border border-gray-200 shadow-xl rounded-2xl 
          p-10 animate-fadeIn
        "
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#5F6FFF] to-[#8A92FF]">
            {state}
          </span>{" "}
          Login
        </h1>

        {/* Email */}
        <div className="mb-5">
          <p className="text-gray-700 mb-1">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="Enter your email"
            className="
              w-full px-4 py-3 rounded-xl border 
              border-gray-300 focus:ring-2 focus:ring-[#5F6FFF] 
              outline-none transition
            "
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <p className="text-gray-700 mb-1">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            placeholder="Enter password"
            className="
              w-full px-4 py-3 rounded-xl border 
              border-gray-300 focus:ring-2 focus:ring-[#5F6FFF]
              outline-none transition
            "
          />
        </div>

        {/* Login Button */}
        <button
          className="
            w-full bg-[#5F6FFF] text-white py-3 rounded-xl 
            font-semibold hover:bg-[#4e5fe8] shadow-md transition
          "
        >
          Login
        </button>

        {/* Toggle Admin / Doctor */}
        <p className="text-center text-gray-600 mt-5">
          Login as{" "}
          <span
            className="text-[#5F6FFF] cursor-pointer font-medium"
            onClick={() => setState(state === "Admin" ? "Doctor" : "Admin")}
          >
            {state === "Admin" ? "Doctor" : "Admin"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
