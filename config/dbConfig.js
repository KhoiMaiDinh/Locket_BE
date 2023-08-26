const mongoose = require("mongoose");

// database connection
const connectDB = async () => {
    const dbUri = process.env.DATABASE_URI;
    mongoose
        .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((result) => console.log("Connection established"))
        .catch((err) => console.log("Connection failed:", err.message));
};

module.exports = connectDB;
