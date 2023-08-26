const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");
const { BadRequestError } = require("../errors");

// init password validator
let passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(100) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .not()
    .spaces(); // Should not have spaces

module.exports.registerUser = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        // validate password
        const validateResult = passwordSchema.validate(password, {
            details: true,
        });
        if (validateResult.length != 0) {
            throw new BadRequestError(validateResult);
        }
        // new user create
        const newUser = new UserModel({
            email,
            password,
            name,
        });
        // // generate verification otp
        // const OTP = generateOTP();
        // const newVerificationToken = new VerificationToken({
        //     owner: newUser._id,
        //     token: OTP
        // });
        // // save the otp and user to db
        // const verificationToken = await newVerificationToken.save();
        const user = await newUser.save();

        // // send a mail that contain otp to the user's email
        // mailTransport().sendMail({
        //     from: 'fashionapp5@gmail.com',
        //     to: newUser.email,
        //     subject: 'Verify your email account',
        //         html: OtpTemplate(OTP),
        // });

        res.status(201).json({
            success: true,
            message: `New user ${user} created!`,
        });
    } catch (err) {
        if (err.code === 11000)
            throw new BadRequestError({
                message: "This email has already been registered",
            });
        throw err;
    }
};
