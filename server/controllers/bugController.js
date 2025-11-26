const Bug = require("../models/Bug");

// Create a new bug
exports.createBug = async (req, res) => {
    try {
        const bug = await Bug.create(req.body);
        res.status(201).json(bug);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all bugs
exports.getBugs = async (req, res) => {
    try {
        const bugs = await Bug.find();
        res.status(200).json(bugs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a bug by ID
exports.updateBug = async (req, res) => {
    try {
        const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!bug) return res.status(404).json({ message: "Bug not found" });
        res.status(200).json(bug);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a bug by ID
exports.deleteBug = async (req, res) => {
    try {
        const bug = await Bug.findByIdAndDelete(req.params.id);
        if (!bug) return res.status(404).json({ message: "Bug not found" });
        res.status(200).json({ message: "Bug deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
