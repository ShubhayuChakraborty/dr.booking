import jwt from "jsonwebtoken";

// admin auth middleware

const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
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
      decoded = jwt.verify(atoken, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // Expect the token to contain { email }
    if (!decoded || decoded.email !== process.env.ADMIN_EMAIL) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Login again." });
    }

    // attach admin info to request if needed
    req.admin = { email: decoded.email };

    return next();
  } catch (error) {
    console.error("Error in authAdmin middleware:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export default authAdmin;
