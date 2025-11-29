import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { assets } from "../../assets/assets"; // Assuming assets contains 'tick_icon' and 'cancel_icon'

const DoctorAppointments = () => {
  const {
    appointments,
    getAppointments,
    dToken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken, getAppointments]);

  // Enhanced date formatting
  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr) return { date: "N/A", time: "" };
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return { date: dateStr, time: timeStr || "" };
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return { date: formattedDate, time: timeStr || "" };
    } catch {
      return { date: dateStr, time: timeStr || "" };
    }
  };

  // Helper component for the action column
  const ActionButtons = ({ item }) => {
    if (item.cancelled) {
      return (
        <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
          Cancelled
        </span>
      );
    }
    if (item.isCompleted) {
      return (
        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          Completed
        </span>
      );
    }
    return (
      <div className="flex gap-2 justify-center">
        {/* Complete Button */}
        <button
          onClick={() => completeAppointment(item._id)}
          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-lg transition-colors duration-200 shadow-md"
          title="Mark as Completed"
        >
          {/* Using a cleaner icon presentation, assuming assets.tick_icon is available */}
          <img src={assets.tick_icon} alt="Complete" className="w-4 h-4 mr-1" />
          Done
        </button>
        {/* Cancel Button */}
        <button
          onClick={() => cancelAppointment(item._id)}
          className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-lg transition-colors duration-200 shadow-md"
          title="Cancel Appointment"
        >
          {/* Using a cleaner icon presentation, assuming assets.cancel_icon is available */}
          <img src={assets.cancel_icon} alt="Cancel" className="w-4 h-4 mr-1" />
          Cancel
        </button>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Your <span style={{ color: "#5F6FFF" }}>Upcoming Appointments</span>
      </h2>

      {/* Modern Card Styling */}
      <div className="bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
        {/* Enforce max height and make scrollable */}
        <div className="max-h-[85vh] overflow-y-auto">
          {/* Table Header - Sticky, Darker, bold, capitalized */}
          <div className="hidden sm:grid sticky top-0 z-10 bg-gray-50 grid-cols-[0.5fr_3fr_1.5fr_3fr_1fr_2fr] grid-flow-col py-4 px-6 border-b text-xs font-bold uppercase text-gray-600 tracking-wider">
            <p className="flex items-center">#</p>
            <p className="flex items-center">Patient</p>
            <p className="flex items-center">Payment</p>
            <p className="flex items-center">Date & Time</p>
            <p className="flex items-center">Fee</p>
            <p className="flex items-center justify-center">Actions</p>
          </div>

          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => {
              const { date, time } = formatDateTime(
                item.slotDate,
                item.slotTime
              );
              return (
                <div
                  className="flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1.5fr_3fr_1fr_2fr] items-center text-gray-700 py-4 px-6 border-b last:border-b-0 transition-all duration-150 hover:bg-blue-50/50 text-sm"
                  key={item._id || index}
                >
                  {/* # */}
                  <p className="hidden sm:block font-medium">{index + 1}</p>

                  {/* Patient */}
                  <div className="flex items-center gap-3 w-full sm:w-auto mb-2 sm:mb-0">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      src={item.userData.image}
                      alt={item.userData.name}
                    />
                    <p className="font-medium text-gray-800">
                      {item.userData.name}
                    </p>
                  </div>

                  {/* Payment Status Badge */}
                  <div className="w-full sm:w-auto text-left mb-2 sm:mb-0">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        item.payment
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.payment ? "Paid" : "Pending"}
                    </span>
                  </div>

                  {/* Date & Time */}
                  <div className="text-left w-full sm:w-auto mb-2 sm:mb-0">
                    <p className="font-semibold">{date}</p>
                    <p className="text-xs text-gray-500">{time}</p>
                  </div>

                  {/* Fees */}
                  <p className="font-semibold text-center text-blue-600 mb-2 sm:mb-0">
                    ₹{item.amount}
                  </p>

                  {/* Action Buttons/Status */}
                  <div className="w-full sm:w-auto flex justify-center">
                    <ActionButtons item={item} />
                  </div>
                </div>
              );
            })
          ) : (
            // Empty state
            <div className="flex justify-center items-center h-[50vh] flex-col">
              <svg
                className="w-16 h-16 text-gray-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="text-gray-500 text-lg font-medium">
                No active appointments scheduled.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Please check back later or refresh the list.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
