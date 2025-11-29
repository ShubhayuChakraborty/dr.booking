import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate()
  return (
    <div
      className="
        flex items-center justify-between flex-col md:flex-row
        bg-linear-to-r from-[#EEF2FF] to-[#F7F9FF]
        rounded-2xl p-8 md:p-12 lg:p-14
        shadow-[0_8px_24px_rgba(0,0,0,0.08)]
        my-16 md:mx-10 gap-10 md:gap-0
        animate-fadeIn
      "
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 max-w-lg">
        <p className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          Book an Appointment
        </p>

        <p className="text-gray-600 text-lg md:text-xl">
          With{" "}
          <span className="text-[#5964FF] font-semibold">
            100+ Trusted Doctors
          </span>{" "}
          always ready to help you.
        </p>

        <button
        onClick={()=>{; navigate("/login"); scrollTo(0,0);}}
          className="
            mt-4 px-8 py-3 w-fit
            text-white font-semibold
            bg-[#5964FF]
            rounded-xl
            hover:bg-[#4654e8]
            transition-all duration-300
            shadow-md hover:shadow-xl
            active:scale-95
          "
        >
          Create Account
        </button>
      </div>

      {/* RIGHT SIDE → Card style container */}
      <div
        className="
          rounded-2xl p-4 md:p-5
          
         
        "
      >
        <img
          src={assets.appointment_img}
          alt="appointment"
          className="w-64 md:w-80 lg:w-96 rounded-xl"
        />
      </div>
    </div>
  );
};

export default Banner;
