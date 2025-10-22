const User = require("../models/Users.js");

const index = async (req, res) => {
  try {
    const users = await User.find({}, "username");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user.pantry);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pantry" });
  }
};

module.exports = { index, show };
