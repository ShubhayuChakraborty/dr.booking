import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://imgs.search.brave.com/eNX7ObdfOBoLj6vdo6cjBBTdHCBcbSam9BCGKaaVIug/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/dXNlci1jaXJjbGVz/LXNldF83ODM3MC00/NzA0LmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDAmcT04MA",
  },
  address: {
    type: Object,
    default: { line1: " ", line2: " " },
  },
  gender: {
    type: String,
    default: "NOT SELECTED",
  },
  DOB: {
    type: String,
    default: "NOT SELECTED",
  },
  phone: {
    type: String,
    default: "000000000000",
  },
});

const User = mongoose.models.user || mongoose.model("User", userSchema);
export default User;
