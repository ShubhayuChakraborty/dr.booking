import jwt from "jsonwebtoken";

// doctor auth middleware
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Login again." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not set in environment");
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    let decoded;
    try {
      decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Login again." });
    }

    req.doctorId = decoded.id;
    return next();
  } catch (error) {
    console.error("Error in authDoctor middleware:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export default authDoctor;
