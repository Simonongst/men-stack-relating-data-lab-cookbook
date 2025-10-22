const User = require("../models/Users.js");

const index = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.pantry);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pantry items" });
  }
};

const create = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.pantry.push(req.body);
    await user.save();
    res.json({ message: "Item added to pantry", pantry: user.pantry });
  } catch (err) {
    res.status(500).json({ error: "Failed to add item" });
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const item = user.pantry.id(req.params.itemId);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch item" });
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const item = user.pantry.id(req.params.itemId);
    item.set(req.body);
    await user.save();
    res.json({ message: "Item updated", item });
  } catch (err) {
    res.status(500).json({ error: "Failed to update item" });
  }
};

const remove = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};

module.exports = { index, create, show, update, remove };