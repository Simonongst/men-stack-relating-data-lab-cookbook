const jwt = require("jsonwebtoken");

const isSignedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

    req.user = decoded.payload;

    next();
  } catch (error) {
    return res.status(401).json({ error: "not authorised" });
  }
};

module.exports = isSignedIn;
