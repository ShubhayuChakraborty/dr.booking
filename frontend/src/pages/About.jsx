import React, { useEffect } from "react";
import { assets } from "../assets/assets";

const About = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen pt-20 pb-32">
      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 text-center relative">
        {/* Floating Glow */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-[#5F6FFF]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#A8B2FF]/20 rounded-full blur-3xl animate-ping"></div>

        <p className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          About{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#5F6FFF] to-[#8A92FF]">
            Us
          </span>
        </p>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          We are dedicated to simplifying healthcare access with technology,
          ensuring everyone gets the care they deserve.
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-20 px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="rounded-3xl overflow-hidden shadow-xl bg-white p-4">
            <img
              src={assets.about_image}
              alt="About Us"
              className="rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Welcome to <span className="text-[#5F6FFF]">Prescreptio</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Prescreptio is your trusted digital companion for connecting with
            top doctors across multiple specialities. With an easy-to-use
            interface, reliable information, and a mission to improve healthcare
            accessibility—we make healthcare simple.
          </p>

          <div className="bg-[#5F6FFF]/10 border border-[#5F6FFF]/20 rounded-xl p-5">
            <p className="text-gray-700">
              We bridge the gap between patients and doctors, ensuring expert
              medical guidance is always one click away.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-6xl mx-auto mt-24 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Why Choose <span className="text-[#5F6FFF]">Prescreptio?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-full bg-[#5F6FFF]/10 flex items-center justify-center mb-4">
              <img
                src={assets.verified_icon}
                alt=""
                className="w-7 opacity-80"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              100% Verified Doctors
            </h3>
            <p className="text-gray-600">
              We list only verified professionals with years of trusted medical
              experience.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-full bg-[#5F6FFF]/10 flex items-center justify-center mb-4">
              <img src={assets.clock_icon} alt="" className="w-7 opacity-80" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Instant Appointments
            </h3>
            <p className="text-gray-600">
              Book appointments with ease and avoid long waiting queues forever.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-full bg-[#5F6FFF]/10 flex items-center justify-center mb-4">
              <img
                src={assets.security_icon}
                alt=""
                className="w-7 opacity-80"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600">
              Your health data stays encrypted and safe — privacy is our
              priority.
            </p>
          </div>
        </div>
      </div>

      {/* OUR MISSION */}
      <div className="max-w-6xl mx-auto mt-24 px-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-10 shadow-md">
          <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            To redefine healthcare accessibility by empowering patients with
            fast, reliable, and transparent appointment booking services. Our
            mission is to bring trust and convenience to millions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
