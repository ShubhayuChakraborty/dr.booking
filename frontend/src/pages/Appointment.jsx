import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextValue";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Get doctor
  const docInfo =
    !doctors || !docId ? null : doctors.find((d) => d._id === docId) || null;

  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  }, []);

  // Book appointment function
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }

    if (!slotTime) {
      toast.warn("Please select a time slot");
      return;
    }

    try {
      const selectedSlot = docSlots[slotIndex]?.[0];
      if (!selectedSlot) {
        toast.error("Invalid slot selected");
        return;
      }

      const slotDate = selectedSlot.date.toLocaleDateString("en-CA"); // YYYY-MM-DD format

      console.log("Booking appointment with:", {
        docId,
        slotDate,
        slotTime,
        backendUrl,
        hasToken: !!token,
      });

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        {
          docId,
          slotDate,
          slotTime,
        },
        {
          headers: { token },
        }
      );

      console.log("Booking response:", data);

      if (data.success) {
        toast.success(data.message);
        getDoctorsData(); // Refresh doctor data to update available slots
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      console.error("Error response:", error.response?.data);
      toast.error(
        error.response?.data?.message || "Failed to book appointment"
      );
    }
  };

  // Generate slots
  const getDocSlots = () => {
    if (!docInfo) return [];

    const all = [];
    const today = new Date();
    const bookedSlots = docInfo.slot_booked || {}; // Get booked slots from doctor data

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const start = new Date(date);
      const end = new Date(date);

      end.setHours(21, 0);

      if (i === 0) {
        start.setHours(Math.max(start.getHours(), 10));
        start.setMinutes(start.getMinutes() > 30 ? 30 : 0);
      } else {
        start.setHours(10, 0);
      }

      const slots = [];
      const cursor = new Date(start);
      const dateKey = date.toLocaleDateString("en-CA"); // YYYY-MM-DD format
      const bookedTimesForDate = bookedSlots[dateKey] || []; // Get booked times for this date

      while (cursor < end) {
        const formatted = cursor.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Only add slot if it's not booked
        if (!bookedTimesForDate.includes(formatted)) {
          slots.push({ date: new Date(cursor), time: formatted });
        }

        cursor.setMinutes(cursor.getMinutes() + 30);
      }

      all.push(slots);
    }

    return all;
  };

  const docSlots = getDocSlots();

  if (!docInfo) return null;

  return (
    <div className="px-6 md:px-10 lg:px-20 py-10 bg-white">
      {/* TOP DOCTOR CARD (MATCHED EXACTLY) */}
      <div className="max-w-5xl mx-auto border border-gray-300 rounded-xl p-8 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-60 h-60 rounded-lg overflow-hidden bg-[#5F6FFF]/10">
          <img
            src={docInfo.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {docInfo.name}
            <img src={assets.verified_icon} className="w-5 h-5" />
          </h2>

          <p className="text-gray-600 text-sm">
            {docInfo.degree} – {docInfo.speciality} • {docInfo.experience}
          </p>

          <p className="font-semibold text-gray-900 flex items-center gap-1 mt-2">
            About <img src={assets.info_icon} className="w-4 h-4 opacity-70" />
          </p>

          <p className="text-gray-700 text-sm leading-relaxed">
            {docInfo.about}
          </p>

          <p className="mt-3">
            <span className="font-semibold">Appointment fee:</span>{" "}
            <span className="font-bold text-gray-800">₹{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* BOOKING SLOTS SECTION */}
      <div className="max-w-5xl mx-auto mt-10">
        <p className="font-medium text-gray-700 text-lg mb-4">Booking slots</p>

        {/* DATE SELECTOR – EXACT UI */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {docSlots.map((slots, i) => {
            const date = slots[0]?.date;
            if (!date) return null;
            const dayName = days[date.getDay()];
            const dayNum = date.getDate();

            return (
              <div
                key={i}
                onClick={() => {
                  setSlotIndex(i);
                  setSlotTime("");
                }}
                className={`
                  min-w-20 text-center py-4 px-4 rounded-full cursor-pointer 
                  transition-all border flex flex-col items-center
                  ${
                    slotIndex === i
                      ? "bg-[#5F6FFF] border-[#5F6FFF] text-white font-semibold shadow"
                      : "bg-white border-gray-300 text-gray-800"
                  }
                `}
              >
                <p className="text-xs">{dayName}</p>
                <p className="text-lg font-bold">{dayNum}</p>
              </div>
            );
          })}
        </div>

        {/* TIME SELECTOR */}
        <div className="flex gap-4 overflow-x-auto mt-6 no-scrollbar">
          {docSlots[slotIndex]?.map((item, idx) => (
            <p
              key={idx}
              onClick={() => setSlotTime(item.time)}
              className={`
                px-6 py-2 rounded-full cursor-pointer text-sm border
                transition-all
                ${
                  slotTime === item.time
                    ? "bg-[#5F6FFF] text-white border-[#5F6FFF]"
                    : "bg-white text-gray-700 border-gray-300"
                }
              `}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        {/* BUTTON – EXACT SAME STYLE */}
        <button
          onClick={bookAppointment}
          className="
            mt-8 w-full md:w-auto 
            bg-[#5F6FFF] text-white font-semibold 
            px-8 py-3 rounded-full shadow 
            hover:bg-[#4d58e8] transition
          "
        >
          Book an appointment
        </button>
      </div>
      {/* RELATED DOCTORS */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
