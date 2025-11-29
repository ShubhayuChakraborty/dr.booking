import React, { useContext, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { specialityData } from "../assets/assets";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  // 🔥 Filtered doctors computed without setState or useEffect
  const filteredDoctors = useMemo(() => {
    if (!speciality) return doctors;
    return doctors.filter((doc) => doc.speciality === speciality);
  }, [doctors, speciality]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-6 md:px-12 lg:px-20 py-12">
      <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Browse Through the <span className="text-[#5964FF]">Doctors</span>
      </p>

      {/* CATEGORY FILTER (click to navigate and filter) */}
      <div className="flex gap-4 flex-wrap mb-10">
        {specialityData.map((item, i) => {
          const isActive =
            (speciality || "").toString().toLowerCase() ===
            (item.speciality || "").toString().toLowerCase();

          return (
            <p
              key={i}
              onClick={() => navigate(`/doctors/${item.speciality}`)}
              className={
                `px-5 py-2 shadow-sm border rounded-full text-sm font-medium cursor-pointer transition-all duration-300 ` +
                (isActive
                  ? "bg-[#5964FF] text-white border-[#5964FF]"
                  : "bg-white border border-gray-200 hover:bg-[#5964FF] hover:text-white")
              }
            >
              {item.speciality}
            </p>
          );
        })}
      </div>

      {/* DOCTOR GRID */}
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-8
        "
      >
        {filteredDoctors.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="
              cursor-pointer
              bg-white/90 backdrop-blur-sm
              rounded-2xl shadow-sm border border-gray-200
              transition-all duration-300
              hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]
              p-5 flex flex-col gap-4
            "
          >
            {/* IMAGE */}
            <div
              className="
                w-full h-44 rounded-xl overflow-hidden
                bg-[#5F6FFF]/15
                flex items-center justify-center
              "
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-full object-contain"
              />
            </div>

            {/* DETAILS */}
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-600">
                {item.speciality}
              </p>

              <p className="text-lg font-semibold text-gray-900">{item.name}</p>

              {item.available ? (
                <span
                  className="
                    mt-1 w-fit text-xs px-3 py-1 bg-green-100 text-green-700
                    rounded-full font-semibold
                  "
                >
                  Available
                </span>
              ) : (
                <span
                  className="
                    mt-1 w-fit text-xs px-3 py-1 bg-red-100 text-red-700
                    rounded-full font-semibold
                  "
                >
                  Not Available
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
