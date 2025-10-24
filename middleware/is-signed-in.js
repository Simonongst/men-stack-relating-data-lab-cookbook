const jwt = require("jsonwebtoken");

const isSignedIn = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "not authorised" });
  }
};

module.exports = isSignedIn;
