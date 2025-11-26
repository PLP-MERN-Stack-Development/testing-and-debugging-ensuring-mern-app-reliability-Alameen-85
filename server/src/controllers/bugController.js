const Bug = require('../models/Bug');

// Get all bugs
exports.getAllBugs = async (req, res, next) => {
    try {
        const { status, priority } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        const bugs = await Bug.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bugs.length,
            data: bugs
        });
    } catch (error) {
        next(error);
    }
};

// Get single bug
exports.getBugById = async (req, res, next) => {
    try {
        const bug = await Bug.findById(req.params.id);

        if (!bug) {
            return res.status(404).json({
                success: false,
                message: 'Bug not found'
            });
        }

        res.status(200).json({
            success: true,
            data: bug
        });
    } catch (error) {
        next(error);
    }
};

// Create new bug
exports.createBug = async (req, res, next) => {
    try {
        const bug = await Bug.create(req.body);

        res.status(201).json({
            success: true,
            data: bug
        });
    } catch (error) {
        next(error);
    }
};

// Update bug
exports.updateBug = async (req, res, next) => {
    try {
        const bug = await Bug.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!bug) {
            return res.status(404).json({
                success: false,
                message: 'Bug not found'
            });
        }

        res.status(200).json({
            success: true,
            data: bug
        });
    } catch (error) {
        next(error);
    }
};

// Delete bug
exports.deleteBug = async (req, res, next) => {
    try {
        const bug = await Bug.findByIdAndDelete(req.params.id);

        if (!bug) {
            return res.status(404).json({
                success: false,
                message: 'Bug not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Bug deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};