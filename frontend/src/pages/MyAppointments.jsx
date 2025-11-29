import React, { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../context/AppContextValue";
import { Calendar, Clock, MapPin, WalletCards, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = useCallback(async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl, token]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments(); // Refresh appointments list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to cancel appointment");
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getUserAppointments();
            toast.success("Payment successful!");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Payment failed");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchAppointments = async () => {
      if (!isMounted) return;
      await getUserAppointments();
    };

    fetchAppointments();

    return () => {
      isMounted = false;
    };
  }, [getUserAppointments]);
  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 mt-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        My <span className="text-[#5F6FFF]">Appointments</span>
      </h1>

      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No appointments booked yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {appointments.map((appointment, i) => (
            <div
              key={appointment._id || i}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6
                          transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* IMAGE */}
                <div className="w-32 h-32 rounded-xl overflow-hidden bg-[#E7EAFF] flex items-center justify-center border mx-auto md:mx-0">
                  <img
                    src={appointment.docData?.image}
                    alt={appointment.docData?.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1 space-y-2">
                  <p className="text-xl font-semibold text-gray-900">
                    {appointment.docData?.name}
                  </p>
                  <p className="text-gray-600">
                    {appointment.docData?.speciality || "Specialist"}
                  </p>

                  {/* ADDRESS */}
                  <div className="flex items-start gap-2 text-gray-700 mt-2">
                    <MapPin className="text-[#5F6FFF] w-5 h-5 shrink-0" />
                    <p className="text-sm">
                      {(() => {
                        const address = appointment.docData?.address;

                        // If address is a string, display it directly
                        if (typeof address === "string") {
                          return address;
                        }

                        // If address is an object, check for different property names
                        if (address && typeof address === "object") {
                          // Check for line1/line2 format
                          const line1 = address.line1 && address.line1.trim();
                          const line2 = address.line2 && address.line2.trim();

                          // Check for address1/address2 format
                          const address1 =
                            address.address1 && address.address1.trim();
                          const address2 =
                            address.address2 && address.address2.trim();

                          const firstLine = line1 || address1;
                          const secondLine = line2 || address2;

                          if (firstLine || secondLine) {
                            return (
                              <>
                                {firstLine && (
                                  <>
                                    {firstLine}
                                    {secondLine && <br />}
                                  </>
                                )}
                                {secondLine && secondLine}
                              </>
                            );
                          }
                        }

                        return "Address unavailable";
                      })()}
                    </p>
                  </div>

                  {/* DATE + TIME */}
                  <div className="flex gap-6 mt-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 text-[#5F6FFF]" />
                      <span>{appointment.slotDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-4 text-[#5F6FFF]" />
                      <span>{appointment.slotTime}</span>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col justify-between gap-3">
                  {!appointment.cancelled && !appointment.payment && (
                    <button
                      onClick={() => appointmentRazorpay(appointment._id)}
                      className="flex items-center gap-2 justify-center px-5 py-2 bg-[#5F6FFF] text-white rounded-xl hover:bg-[#4e5fe8] transition"
                    >
                      <WalletCards size={17} /> Pay Online
                    </button>
                  )}

                  {!appointment.cancelled && !appointment.payment && (
                    <button
                      onClick={() => cancelAppointment(appointment._id)}
                      className="flex items-center gap-2 justify-center px-5 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition"
                    >
                      <XCircle size={17} /> Cancel
                    </button>
                  )}

                  {appointment.cancelled && (
                    <div className="px-5 py-2 bg-red-100 text-red-600 rounded-xl text-center">
                      Cancelled
                    </div>
                  )}

                  {appointment.payment && !appointment.cancelled && (
                    <div className="px-5 py-2 bg-green-100 text-green-600 rounded-xl text-center">
                      Paid
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
