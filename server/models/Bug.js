const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        status: {
            type: String,
            enum: ["open", "in-progress", "resolved"],
            default: "open",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Bug", bugSchema);
