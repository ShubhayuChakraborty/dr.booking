import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextValue";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  // 🔥 Compute filtered doctors WITHOUT setState or useEffect
  const relDoc = useMemo(() => {
    if (!doctors || doctors.length === 0 || !speciality) return [];
    return doctors.filter(
      (doc) => doc.speciality === speciality && doc._id !== docId
    );
  }, [doctors, speciality, docId]);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
        Top Doctors To Book
      </h1>

      <p className="text-gray-600 text-center max-w-xl mx-auto mt-2 mb-12">
        Simply browse through our top-rated doctors and book your appointment
        with ease.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="
              cursor-pointer bg-white rounded-2xl shadow-sm 
              border border-gray-200 transition-all duration-300
              hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]
              p-5 flex flex-col gap-4
            "
          >
            {/* Image */}
            <div className="w-full h-44 rounded-xl overflow-hidden bg-[#5F6FFF]/15 flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-full object-contain"
              />
            </div>

            {/* Name & Details */}
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-600">
                {item.speciality}
              </p>
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>

              {item.available ? (
                <span className="mt-1 w-fit text-xs px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                  Available
                </span>
              ) : (
                <span className="mt-1 w-fit text-xs px-3 py-1 bg-red-100 text-red-700 rounded-full font-semibold">
                  Not Available
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* More button */}
      <div className="w-full flex justify-center mt-14">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="px-8 py-3 rounded-xl bg-[#5F6FFF] text-white font-semibold hover:bg-[#4B57D1] transition-all duration-300"
        >
          More
        </button>
      </div>
    </div>
  );
};

export default RelatedDoctors;
