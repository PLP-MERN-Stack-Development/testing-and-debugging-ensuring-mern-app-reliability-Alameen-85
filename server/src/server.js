const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes Import
const bugRoutes = require("../routes/bugRoutes");

// Use Routes
app.use("/api/bugs", bugRoutes);

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("🔥 MongoDB Atlas Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
};

// Only connect to DB and start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    });
}

// Export app for testing
module.exports = app;