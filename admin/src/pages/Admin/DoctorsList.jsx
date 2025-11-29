import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../context/adminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  // 🔥 Clean formatted address
  const formatAddress = (address) => {
    if (!address) return "Address not available";

    // Handle string addresses
    if (typeof address === "string") {
      return address.trim() || "Address not available";
    }

    // Handle object addresses - support multiple formats
    const parts = [
      address.line1,
      address.line2,
      address.address1,
      address.address2,
      address.hospital,
      address.area,
      address.city,
      address.state,
      address.pincode,
    ].filter((item) => item && String(item).trim() !== "");

    if (parts.length === 0) return "Address not available";

    return parts.join(", ");
  };

  return (
    <>
      {/* ------------ Doctors List ------------ */}
      <div className="space-y-10">
        {(doctors ?? []).map((doc) => (
          <div
            key={doc._id}
            className="
              pb-8 border-b border-gray-200 flex gap-6 
              hover:bg-gray-50 transition-all duration-300 rounded-xl p-4
            "
          >
            {/* Doctor Image */}
            <div>
              <img
                src={doc.image}
                alt={doc.name}
                className="w-28 h-28 rounded-full object-cover border shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1 flex flex-col gap-2">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {doc.name}
                </h2>
                <p className="text-sm text-gray-600">{doc.speciality}</p>
              </div>

              <p className="text-sm text-gray-700">
                🎓 {doc.degree} • {doc.experience}
              </p>

              <p className="text-sm text-gray-700">
                💰 Consultation Fee:
                <span className="font-semibold"> ₹{doc.fees}</span>
              </p>

              {/* Dynamic Address */}
              {doc.address && (
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  📍 {formatAddress(doc.address)}
                </p>
              )}

              <p className="text-gray-500 text-sm line-clamp-2">{doc.about}</p>

              <button
                onClick={() => setSelectedDoctor(doc)}
                className="text-indigo-600 underline text-sm font-medium w-fit hover:text-indigo-800"
              >
                Read bio
              </button>

              <div className="mt-1 flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={doc.available}
                    onChange={() => changeAvailability(doc._id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
                <span className="text-sm font-medium text-gray-700">
                  {doc.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>

            {/* Appointment Slots */}
            <div className="flex flex-col gap-2 min-w-[150px]">
              <div className="grid grid-cols-1 gap-2">
                {Object.keys(doc.slot_booked || {})
                  .slice(0, 3)
                  .map((dateKey, idx) => (
                    <div
                      key={idx}
                      className="
                        px-4 py-3 text-center rounded-xl border text-sm
                        bg-indigo-100 border-indigo-300 text-indigo-800 
                        shadow-sm hover:shadow-md hover:scale-[1.02]
                        transition-all
                      "
                    >
                      <p className="font-medium">
                        {new Date(dateKey).toDateString()}
                      </p>
                      <p className="text-xs">
                        {doc.slot_booked[dateKey].length} appts
                      </p>
                    </div>
                  ))}

                {Object.keys(doc.slot_booked || {}).length > 3 && (
                  <button
                    className="
                      px-4 py-3 text-center rounded-xl border border-gray-300 
                      text-gray-700 bg-white hover:bg-gray-100 text-sm
                      transition-all
                    "
                  >
                    More
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ------------ BIO MODAL ------------ */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden animate-[fadeIn_0.25s_ease]">
            {/* Header */}
            <div className="flex gap-6 p-6 border-b">
              <img
                src={selectedDoctor.image}
                alt={selectedDoctor.name}
                className="w-32 h-32 rounded-2xl object-cover shadow-md"
              />

              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-3xl font-semibold text-gray-900">
                  {selectedDoctor.name}
                </h2>

                <p className="text-lg text-indigo-600 font-medium">
                  {selectedDoctor.speciality}
                </p>

                <p className="text-sm text-gray-700 mt-2">
                  🎓 {selectedDoctor.degree}
                </p>

                <p className="text-sm text-gray-700">
                  ⭐ Experience: {selectedDoctor.experience}
                </p>

                <p className="text-sm text-gray-700 mt-1">
                  💰 Consultation Fee: <b>₹{selectedDoctor.fees}</b>
                </p>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                About the Doctor
              </h3>

              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedDoctor.about}
              </p>

              {/* Cleaned Address */}
              <div className="mt-4 bg-gray-50 p-4 rounded-xl shadow-inner">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  Clinic Address
                </h4>
                <p className="text-gray-700">
                  {formatAddress(selectedDoctor.address)}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex justify-end">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorsList;
