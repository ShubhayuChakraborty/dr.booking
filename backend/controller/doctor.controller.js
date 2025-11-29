import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from "cloudinary";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ sucess: true, message: "Availability Changed" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error changing availability", success: false });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ success: true, token });
  } catch (error) {
    console.error("Error in doctor login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// API to get doctor appointments
const doctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req;
    const appointments = await appointmentModel.find({ docId: doctorId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to mark appointment complete
const appointmentComplete = async (req, res) => {
  try {
    const { doctorId } = req;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.docId !== doctorId) {
      return res.json({ success: false, message: "Not authorized" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      isCompleted: true,
    });
    return res.json({
      success: true,
      message: "Appointment completed successfully",
    });
  } catch (error) {
    console.error("Complete Appointment Error:", error);
    return res.json({
      success: false,
      message: error.message || "Failed to complete appointment",
    });
  }
};

// API to cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { doctorId } = req;
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    if (appointment.docId !== doctorId) {
      return res.json({ success: false, message: "Not authorized" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Release doctor slot
    const { docId, slotDate, slotTime } = appointment;
    const docData = await doctorModel.findById(docId);
    let slots_booked = docData.slot_booked || {};

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(
        (e) => e !== slotTime
      );
    }

    await doctorModel.findByIdAndUpdate(docId, { slot_booked: slots_booked });

    return res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel Appointment Error:", error);
    return res.json({
      success: false,
      message: error.message || "Failed to cancel appointment",
    });
  }
};

// API to get doctor dashboard data
const doctorDashboard = async (req, res) => {
  try {
    const { doctorId } = req;

    const appointments = await appointmentModel.find({ docId: doctorId });

    let earnings = 0;
    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];
    appointments.forEach((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to get doctor profile
const doctorProfile = async (req, res) => {
  try {
    const { doctorId } = req;
    const profileData = await doctorModel
      .findById(doctorId)
      .select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to update doctor profile
const updateDoctorProfile = async (req, res) => {
  try {
    const { doctorId } = req;
    const { about, degree, experience, speciality, fees, available } = req.body;
    let address = req.body.address;

    // Parse address if it's a JSON string
    if (typeof address === "string") {
      try {
        address = JSON.parse(address);
      } catch (e) {
        // Address parsing failed, keep as string
      }
    }

    const updateData = {
      about,
      degree,
      experience,
      speciality,
      fees,
      address,
      available: available === "true" || available === true,
    };

    // Handle image upload if present
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    await doctorModel.findByIdAndUpdate(doctorId, updateData);
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  doctorAppointments,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};
