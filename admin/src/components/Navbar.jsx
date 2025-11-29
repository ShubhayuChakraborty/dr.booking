import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import AdminContext from "../context/adminContext";
import { DoctorContext } from "../context/doctorContext";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };
  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <img
            src={assets.admin_logo}
            alt="Admin Logo"
            className="w-40 h-10 object-contain" // Increased size
          />

          <p className="text-2xl font-semibold text-gray-800">
            <span
              className="
                      text-xs font-semibold 
                      px-3 py-1 rounded-full 
                      bg-linear-to-r from-[#5F6FFF] to-[#8A92FF] 
                      text-white shadow-sm"
            >
              {aToken ? "Admin Panel" : "Doctor Panel"}
            </span>
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-5">
          {/* Profile role box */}
          <div className="flex items-center gap-2 bg-[#5F6FFF]/10 px-4 py-2 rounded-xl">
            <User className="w-5 h-5 text-[#5F6FFF]" />
            <span className="text-gray-700 font-medium">
              {aToken ? "Admin" : "Doctor"}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="
              flex items-center gap-2
              bg-red-500 text-white px-4 py-2 rounded-xl 
              hover:bg-red-600 transition shadow-sm
            "
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
