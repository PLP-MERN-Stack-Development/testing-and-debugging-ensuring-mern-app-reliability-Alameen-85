const Bug = require("../models/Bug");

// CREATE a bug
exports.createBug = async (req, res) => {
    try {
        const bug = await Bug.create(req.body);
        res.status(201).json(bug);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET all bugs
exports.getBugs = async (req, res) => {
    try {
        const bugs = await Bug.find();
        res.status(200).json(bugs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE bug
exports.updateBug = async (req, res) => {
    try {
        const updated = await Bug.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE bug
exports.deleteBug = async (req, res) => {
    try {
        await Bug.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Bug deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
