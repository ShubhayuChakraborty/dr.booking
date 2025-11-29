import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="w-full mt-20 pt-14 pb-8 px-6">
      {/* 🔹 TOP DIVIDER LINE */}
      <div className="max-w-6xl mx-auto mb-10">
        <hr className="border-gray-300" />
      </div>

      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* LEFT SECTION */}
        <div className="flex flex-col gap-4 max-w-sm">
          <img src={assets.logo} alt="Logo" className="w-36" />
          <p className="text-gray-600 leading-relaxed text-sm">
            Prescripto is a trusted doctor appointment booking platform. Easily
            book appointments with verified specialists and experience
            hassle-free healthcare at your convenience.
          </p>
        </div>

        {/* CENTER SECTION */}
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold text-gray-800">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <NavLink to="/" className="hover:text-[#5F6FFF] cursor-pointer">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="hover:text-[#5F6FFF] cursor-pointer"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="hover:text-[#5F6FFF] cursor-pointer"
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy"
                className="hover:text-[#5F6FFF] cursor-pointer"
              >
                Privacy Policy
              </NavLink>
            </li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold text-gray-800">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm">
            <li className="hover:text-[#5F6FFF] cursor-pointer">
              +1-123-456-7890
            </li>
            <li className="hover:text-[#5F6FFF] cursor-pointer">
              info@prescripto.com
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM DIVIDER */}
      <div className="max-w-6xl mx-auto mt-10">
        <hr className="border-gray-300" />
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm mt-6">
        &copy; 2025 Prescripto. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
