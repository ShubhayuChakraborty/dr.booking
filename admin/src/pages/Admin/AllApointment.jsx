import React, { useContext, useEffect } from "react";
import AdminContext from "../../context/adminContext";
import { assets } from "../../assets/assets";

const AllApointment = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  const calculateAge = (dob) => {
    if (!dob || dob === "NOT SELECTED") return "N/A";
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return "N/A";

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Format date to "22 Aug 2024, 10:00 AM"
  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr) return "N/A";

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}, ${timeStr || ""}`;
  };

  // Format currency helper
  const currencySymbol = "₹";

  return (
    <div className="w-full max-w-6xl m-5">
      {/* Header Section */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800">  <span style={{ color: "#5F6FFF" }}>All</span> Appointments</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage all your patient appointments here.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-4 px-6 bg-gray-50 border-b border-gray-200 items-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            id
          </p>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Patient
          </p>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Age
          </p>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Date & Time
          </p>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Doctor
          </p>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Fees
          </p>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Status
          </p>
        </div>

        {/* Scrollable List */}
        <div className="max-h-[70vh] min-h-[50vh] overflow-y-auto custom-scrollbar">
          {appointments && appointments.length > 0 ? (
            // Using [...appointments] to avoid mutating the original state array
            [...appointments].reverse().map((item, index) => (
              <div
                className="flex flex-wrap justify-between max-sm:gap-5 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-700 py-4 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                key={index}
              >
                {/* Index */}
                <p className="max-sm:hidden font-medium text-gray-600">
                  {index + 1}
                </p>

                {/* Patient Info */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                    src={item.userData.image}
                    alt="patient"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.userData.name}
                    </p>
                    {/* Only show email on mobile if needed, usually cleaner hidden */}
                  </div>
                </div>

                {/* Age */}
                <p className="max-sm:hidden text-gray-600 font-medium">
                  {calculateAge(item.userData.DOB)}
                </p>

                {/* Date & Time */}
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700">
                    {formatDateTime(item.slotDate, item.slotTime)}
                  </span>
                </div>

                {/* Doctor Info */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-10 h-10 rounded-full object-cover bg-gray-100 border border-gray-200"
                    src={item.docData.image}
                    alt="doctor"
                  />
                  <div className="flex flex-col">
                    <p className="font-medium text-gray-800 text-sm truncate">
                      {item.docData.name}
                    </p>
                  </div>
                </div>

                {/* Fees */}
                <p className="font-semibold text-gray-600">
                  {currencySymbol}
                  {item.amount}
                </p>

                {/* Action / Status */}
                <div className="flex items-center">
                  {item.cancelled ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-600 border border-red-200">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 border border-green-200">
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="group p-2 rounded-full hover:bg-red-50 transition-all duration-300"
                      title="Cancel Appointment"
                    >
                      <img
                        className="w-8 h-8 opacity-90 group-hover:opacity-100 transition-opacity"
                        src={assets.cancel_icon}
                        alt="cancel"
                      />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            // Empty State
            <div className="flex flex-col justify-center items-center h-[50vh] text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 mb-4 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              <p className="text-lg font-medium">No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllApointment;
