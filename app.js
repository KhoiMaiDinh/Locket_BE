require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");
const rootRoutes = require("./routes/index");

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
mongoose.set("strictQuery", false);
connectDB();
mongoose.connection.once("open", () => {
    app.listen(port, (req, res) => {
        console.log("Server running on port", port);
    });
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", rootRoutes);
