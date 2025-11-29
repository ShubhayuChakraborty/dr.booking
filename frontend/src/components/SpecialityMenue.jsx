import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="w-full max-w-6xl mx-auto px-6 py-20">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Find Speciality
      </h1>

      <p className="text-gray-600 text-center max-w-xl mx-auto mt-2 mb-12">
        Simply browse through our extensive list of trusted doctors and book your appointment with ease.
      </p>

      {/* HORIZONTAL SCROLL ROW */}
      <div
        className="
          flex gap-8 overflow-x-auto py-3
          scroll-smooth no-scrollbar
        "
      >
        {specialityData.map((item, index) => (
          <Link
           onClick={()=>scrollTo(0,0)}
            to={`/doctors/${item.speciality}`}
            key={index}
            className="
              group flex flex-col items-center gap-4
              w-40 h-40 min-w-40
              rounded-2xl
              bg-white/80 backdrop-blur-md
              border border-gray-200
              shadow-sm
              transition-all duration-300 ease-out
              hover:shadow-lg hover:-translate-y-2 hover:scale-[1.05]
              hover:border-indigo-500/70
            "
          >
            {/* Icon */}
            <div
              className="
                w-16 h-16 rounded-xl
                bg-indigo-50 flex items-center justify-center
                transition-all duration-300
                group-hover:bg-indigo-100 group-hover:scale-110
              "
            >
              <img
                src={item.image}
                alt={item.speciality}
                className="w-10 h-10"
              />
            </div>

            {/* Text */}
            <p
              className="
                text-gray-700 text-sm font-semibold
                group-hover:text-indigo-600 transition-all
              "
            >
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
