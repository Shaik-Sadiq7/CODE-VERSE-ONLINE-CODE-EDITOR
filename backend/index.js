const express = require("express");
const connectDB = require("./db");
require("dotenv").config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use("/api/signup", require("./routes/api/signup"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
