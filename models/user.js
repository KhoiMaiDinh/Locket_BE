const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: [true, "A email with the same name has already exists"],
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email");
                }
            },
        },
        name: {
            type: String,
            required: [true, "User's name is missing"],
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minLength: [8, "password must have 8 or more characters"],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
