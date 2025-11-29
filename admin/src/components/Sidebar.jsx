import React, { useContext } from "react";
import AdminContext from "../context/adminContext";
import { DoctorContext } from "../context/doctorContext";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (!aToken && !dToken) return null;

  return (
    <div
      className="
      h-screen w-64 bg-white shadow-xl border-r border-gray-200 
      fixed left-0 top-0 pt-24 px-4 z-30
    "
    >
      <ul className="flex flex-col gap-2">
        {aToken && (
          <>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                  isActive
                    ? "bg-[#5F6FFF] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#5F6FFF]/10 hover:text-[#5F6FFF]"
                }`
              }
            >
              <img src={assets.home_icon} className="w-5 opacity-80" alt="" />
              Dashboard
            </NavLink>

            <NavLink
              to="/appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                  isActive
                    ? "bg-[#5F6FFF] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#5F6FFF]/10 hover:text-[#5F6FFF]"
                }`
              }
            >
              <img
                src={assets.appointment_icon}
                className="w-5 opacity-80"
                alt=""
              />
              Appointments
            </NavLink>

            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                  isActive
                    ? "bg-[#5F6FFF] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#5F6FFF]/10 hover:text-[#5F6FFF]"
                }`
              }
            >
              <img src={assets.add_icon} className="w-5 opacity-80" alt="" />
              Add Doctor
            </NavLink>

            <NavLink
              to="/doctors-list"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                  isActive
                    ? "bg-[#5F6FFF] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#5F6FFF]/10 hover:text-[#5F6FFF]"
                }`
              }
            >
              <img src={assets.people_icon} className="w-5 opacity-80" alt="" />
              Doctors List
            </NavLink>
          </>
        )}

        {dToken && (
          <>
            <NavLink
              to="/doctor-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                  isActive
                    ? "bg-[#5F6FFF] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#5F6FFF]/10 hover:text-[#5F6FFF]"
                }`
              }
            >
              <img src={assets.home_icon} className="w-5 opacity-80" alt="" />
              Dashboard
            </NavLink>

            <NavLink
              to="/doctor-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                  isActive
                    ? "bg-[#5F6FFF] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#5F6FFF]/10 hover:text-[#5F6FFF]"
                }`
              }
            >
              <img
                src={assets.appointment_icon}
                className="w-5 opacity-80"
                alt=""
              />
              Appointments
            </NavLink>

            <NavLink
              to="/doctor-profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition ${
                  isActive
                    ? "bg-[#5F6FFF] text-white shadow-md"
                    : "text-gray-700 hover:bg-[#5F6FFF]/10 hover:text-[#5F6FFF]"
                }`
              }
            >
              <img src={assets.people_icon} className="w-5 opacity-80" alt="" />
              Profile
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
