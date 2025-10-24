const User = require("../models/Users.js");

const index = async (req, res) => {
  try {
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.pantry);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pantry items", details: err.message });
  }
};

const create = async (req, res) => {
  try {
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!req.body.name) {
      return res.status(400).json({ error: "Item name is required" });
    }

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.pantry.push(req.body);
    await user.save();
    
    res.status(201).json({ 
      message: "Item added to pantry", 
      pantry: user.pantry 
    });
  } catch (err) {
    res.status(500).json({ 
      error: "Failed to add item", 
      details: err.message 
    });
  }
};

const show = async (req, res) => {
  try {
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const item = user.pantry.id(req.params.itemId);
    
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ 
      error: "Failed to fetch item", 
      details: err.message 
    });
  }
};

const update = async (req, res) => {
  try {
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const item = user.pantry.id(req.params.itemId);
    
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    item.set(req.body);
    await user.save();
    
    res.json({ message: "Item updated", item });
  } catch (err) {
    res.status(500).json({ 
      error: "Failed to update item", 
      details: err.message 
    });
  }
};

const remove = async (req, res) => {
  try {
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const item = user.pantry.id(req.params.itemId);
    
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
    
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ 
      error: "Failed to delete item", 
      details: err.message 
    });
  }
};

module.exports = { index, create, show, update, remove };