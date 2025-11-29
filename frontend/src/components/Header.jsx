import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

      {/* LEFT SIDE */}
      <div className="flex flex-col gap-6 animate-fadeIn">

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#5F6FFF] to-[#3A3DF4]">
            BOOK APPOINTMENT
          </span>
          <br />
          WITH TRUSTED DOCTORS
        </h1>

        <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/40 max-w-md">
          <img
            src={assets.group_profiles}
            alt="doctors"
            className="w-16 h-16 rounded-full object-cover"
          />
          <p className="text-gray-600 font-medium text-sm">
            Simply browse through our extensive list of trusted doctors and book your appointment with ease.
          </p>
        </div>

        {/* CTA BUTTON */}
        <a
          href="#speciality"
          className="group inline-flex items-center gap-3 bg-[#5F6FFF] text-white px-7 py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-xl transition-all hover:scale-105 w-fit"
        >
          Book Appointment
          <img
            src={assets.arrow_icon}
            alt="arrow"
            className="w-6 group-hover:translate-x-1 transition-transform"
          />
        </a>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex justify-center md:justify-end animate-slideUp">

        {/* GLOW BEHIND IMAGE */}
        <div className="absolute w-72 h-72 bg-[#5F6FFF] blur-[120px] opacity-30 rounded-full -z-10"></div>

        <img
          src={assets.header_img}
          alt=""
          className="w-[85%] md:w-[90%] drop-shadow-2xl rounded-xl"
        />
      </div>
    </div>
  );
};

export default Header;
