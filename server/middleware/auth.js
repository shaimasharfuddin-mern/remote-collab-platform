const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const header = req.header("Authorization");

    if (!header) {
      return res.status(401).json({ message: "No token" });
    }

    const token = header.replace("Bearer ", "");

    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // 🔥 this is important

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;