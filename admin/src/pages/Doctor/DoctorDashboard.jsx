import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/doctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const {
    dashData,
    getDashData,
    dToken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  const formatDateTime = (dateStr, timeStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}, ${timeStr || ""}`;
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Doctor <span style={{ color: "#5F6FFF" }}>Dashboard</span></h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Doctor</p>
      </div>

      {dashData && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {/* Earnings Card */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-green-500 text-xs font-semibold uppercase tracking-wider">
                    Earnings
                  </p>
                  <div className="bg-green-100 p-3 rounded-full">
                    <img src={assets.earning_icon} alt="" className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-green-600 mb-1">
                    ₹{dashData.earnings}
                  </h2>
                  <p className="text-gray-400 text-xs">Total earnings</p>
                </div>
              </div>
            </div>

            {/* Appointments Card */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[#5F6FFF] text-xs font-semibold uppercase tracking-wider">
                    Appointments
                  </p>
                  <div className="bg-[#5F6FFF]/10 p-3 rounded-full">
                    <img
                      src={assets.appointments_icon}
                      alt=""
                      className="w-6 h-6"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-[#5F6FFF] mb-1">
                    {dashData.appointments}
                  </h2>
                  <p className="text-gray-400 text-xs">Total appointments</p>
                </div>
              </div>
            </div>

            {/* Patients Card */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-purple-500 text-xs font-semibold uppercase tracking-wider">
                    Patients
                  </p>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <img
                      src={assets.patients_icon}
                      alt=""
                      className="w-6 h-6"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-purple-600 mb-1">
                    {dashData.patients}
                  </h2>
                  <p className="text-gray-400 text-xs">Unique patients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Appointments */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Latest Appointments
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider py-3 px-4">
                      Patient
                    </th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider py-3 px-4">
                      Date & Time
                    </th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider py-3 px-4">
                      Fees
                    </th>
                    <th className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider py-3 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dashData.latestAppointments.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-8 rounded-full"
                            src={item.userData.image}
                            alt=""
                          />
                          <p className="text-sm font-medium text-gray-700">
                            {item.userData.name}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDateTime(item.slotDate, item.slotTime)}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-700">
                        ₹{item.amount}
                      </td>
                      <td className="py-3 px-4">
                        {item.cancelled ? (
                          <p className="text-red-400 text-xs font-medium">
                            Cancelled
                          </p>
                        ) : item.isCompleted ? (
                          <p className="text-green-500 text-xs font-medium">
                            Completed
                          </p>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => completeAppointment(item._id)}
                              className="px-3 py-1 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition"
                            >
                              Complete
                            </button>
                            <button
                              onClick={() => cancelAppointment(item._id)}
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DoctorDashboard;
