import jwt from "jsonwebtoken";

// User auth middleware

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
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
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // Expect the token to contain user id
    if (!decoded || !decoded.id) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Login again." });
    }

    // Attach user id to request for use in controllers
    // Initialize req.body if it doesn't exist (for GET requests)
    if (!req.body) {
      req.body = {};
    }
    req.body.userId = decoded.id;

    return next();
  } catch (error) {
    console.error("Error in authUser middleware:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export default authUser;
