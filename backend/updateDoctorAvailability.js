import mongoose from "mongoose";
import doctorModel from "./models/doctorModel.js";
import "dotenv/config";

const updateDoctorAvailability = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Update the specific doctor
    const result = await doctorModel.updateOne(
      { _id: "69231fb0bd45da9640a527f7" },
      { $set: { available: true } }
    );

    console.log(`Updated ${result.modifiedCount} doctor(s)`);
    console.log("Doctor is now available for appointments");

    // Optionally, update all doctors to be available
    // const allResult = await doctorModel.updateMany({}, { $set: { available: true } });
    // console.log(`Updated ${allResult.modifiedCount} doctor(s) in total`);

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error updating doctor:", error);
    process.exit(1);
  }
};

updateDoctorAvailability();
