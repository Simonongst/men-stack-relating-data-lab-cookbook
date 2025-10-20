const jwt = require("jsonwebtoken");

const isSignedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Not authorised - no token provided" });
    }
    const decoded = jwt.verify(token, ACCESS_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ error: "not authorised" });
  }
};

module.exports = isSignedIn;
