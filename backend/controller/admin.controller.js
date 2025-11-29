import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
// Add Doctor Controller
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    // Email format validation (FIXED: your original condition was reversed)
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Upload doctor image
    // ensure image present
    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Image file is required" });
    }

    // Check if email already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // handle address: accept plain string or JSON string/object
    let addressData = address;
    if (typeof address === "string") {
      const trimmed = address.trim();
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
          addressData = JSON.parse(address);
        } catch (err) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid address format" });
        }
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: addressData,
      available: true,
      date: Date.now(),
    };

    // Insert into database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    return res.status(201).json({
      success: true,
      message: "Doctor added successfully.",
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    // Handle Mongo duplicate key error (email unique index)
    if (error && error.code === 11000) {
      const dupField = error.keyValue && Object.keys(error.keyValue)[0];
      const message = dupField
        ? `${dupField} already exists`
        : "Duplicate key error";
      return res.status(400).json({ success: false, message });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

//API FOR ADMIN LOGIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ success: true, token });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error sign in Admin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

//API TO GET ALL DOCTOR LIST FOR THE ADMIN PANEL
const allDoctors = async (req, res) => {
  try {
    const doctor = await doctorModel.find({}).select("-password");
    res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.error("Error sign in Admin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

//API TO GET ALL APPOINTMENTS LIST
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//API TO CANCEL APPOINTMENT
const Appointmentcancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Update appointment status to cancelled
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //releasing doctor slot
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

//API TO GET DASHBOARD ANALYTICS
const getDashboardAnalytics = async (req, res) => {
  try {
    // 1. Total Appointments
    const totalAppointments = await appointmentModel.countDocuments();

    // 2. Today's Appointments (excluding cancelled)
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const endOfToday = new Date(today.setHours(23, 59, 59, 999));

    const todaysAppointments = await appointmentModel.countDocuments({
      date: { $gte: startOfToday.getTime(), $lte: endOfToday.getTime() },
      cancelled: false,
    });

    // 3. Total Doctors
    const totalDoctors = await doctorModel.countDocuments();

    // 4. Total Patients
    const totalPatients = await userModel.countDocuments();

    // 5. Total Revenue (from paid appointments)
    const revenueData = await appointmentModel.aggregate([
      { $match: { payment: true } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    // 6. Last 7 Days Appointments
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const last7DaysData = await appointmentModel.aggregate([
      { $match: { date: { $gte: sevenDaysAgo.getTime() } } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: { $toDate: "$date" },
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const last7DaysAppointments = last7DaysData.map((item) => ({
      date: item._id,
      count: item.count,
    }));

    // 6. Status Distribution
    const statusData = await appointmentModel.aggregate([
      {
        $group: {
          _id: null,
          pending: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$cancelled", false] },
                    { $eq: ["$isCompleted", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          completed: {
            $sum: { $cond: [{ $eq: ["$isCompleted", true] }, 1, 0] },
          },
          cancelled: {
            $sum: { $cond: [{ $eq: ["$cancelled", true] }, 1, 0] },
          },
        },
      },
    ]);

    const statusDistribution =
      statusData.length > 0
        ? {
            pending: statusData[0].pending,
            completed: statusData[0].completed,
            cancelled: statusData[0].cancelled,
          }
        : { pending: 0, completed: 0, cancelled: 0 };

    // 7. Recent Appointments (last 6)
    const recentAppointmentsData = await appointmentModel
      .find()
      .sort({ date: -1 })
      .limit(6);

    const recentAppointments = recentAppointmentsData.map((apt) => ({
      patientName: apt.userData.name,
      doctorName: apt.docData.name,
      date: apt.slotDate,
      time: apt.slotTime,
      status: apt.cancelled
        ? "Cancelled"
        : apt.isCompleted
        ? "Completed"
        : "Pending",
    }));

    // 8. Top Doctors (by appointment count)
    const topDoctorsData = await appointmentModel.aggregate([
      { $match: { cancelled: false } },
      {
        $group: {
          _id: "$docId",
          appointmentsCount: { $sum: 1 },
          doctorData: { $first: "$docData" },
        },
      },
      { $sort: { appointmentsCount: -1 } },
      { $limit: 5 },
    ]);

    const topDoctors = topDoctorsData.map((doc) => ({
      doctorName: doc.doctorData.name,
      specialization: doc.doctorData.speciality,
      appointmentsCount: doc.appointmentsCount,
      image: doc.doctorData.image,
    }));

    return res.json({
      success: true,
      data: {
        totalAppointments,
        todaysAppointments,
        totalDoctors,
        totalPatients,
        totalRevenue,
        last7DaysAppointments,
        statusDistribution,
        recentAppointments,
        topDoctors,
      },
    });
  } catch (error) {
    console.error("Dashboard Analytics Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch analytics",
    });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  Appointmentcancel,
  getDashboardAnalytics,
};
