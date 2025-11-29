import React, { useEffect } from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen  py-20 px-6">
      {/* HERO SECTION */}
      <div className="max-w-5xl mx-auto text-center relative">
        {/* Floating effects */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#5F6FFF]/15 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#7F8CFF]/15 blur-3xl rounded-full animate-ping"></div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
          CONTACT{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#5F6FFF] to-[#8A92FF]">
            US
          </span>
        </h1>

        <p className="text-gray-600 mt-4 text-lg max-w-xl mx-auto">
          We're here to help! Whether you need assistance or have an inquiry,
          the Prescreptio team is always ready to support you.
        </p>
      </div>

      {/* MAIN CONTACT CONTENT */}
      <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* LEFT IMAGE */}
        <div className="flex justify-center">
          <div className="rounded-3xl overflow-hidden bg-white shadow-xl p-4">
            <img
              src={assets.contact_image} // Replace with your actual image
              alt="Contact Us"
              className="rounded-2xl object-cover w-full"
            />
          </div>
        </div>

        {/* RIGHT CONTACT FORM */}
        <div className="bg-white border border-gray-200 shadow-md rounded-3xl p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Get in Touch
          </h2>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5F6FFF] outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5F6FFF] outline-none"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#5F6FFF] outline-none resize-none"
            ></textarea>

            <button className="w-full bg-[#5F6FFF] text-white py-3 rounded-xl font-semibold hover:bg-[#4d5fe8] transition">
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* CAREERS SECTION */}
      <div className="max-w-5xl mx-auto mt-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Join <span className="text-[#5F6FFF]">Prescreptio</span>
        </h2>

        <p className="text-gray-600 mt-3 text-lg max-w-2xl mx-auto">
          Interested in building the future of healthcare with us? Explore
          exciting career opportunities and become a part of our growing team!
        </p>

        <button
          className="
            mt-8 px-10 py-3 rounded-full 
            bg-[#5F6FFF] text-white font-semibold shadow-md
            hover:bg-[#4d5dea] transition
          "
        >
          Search Jobs
        </button>
      </div>
    </div>
  );
};

export default Contact;
