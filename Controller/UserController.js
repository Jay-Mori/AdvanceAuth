const userRoute = require('../Routes/UserRoutes');
const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendOTP = require('../utils/Mail');

const userController = {


    test: (req, res) => {
        res.send("test route");
    },

    register: async (req, res) => {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }

        try {

            const isExistUser = await User.findOne({ email: req.body.email });
            if (isExistUser) {
                return res.status(400).send({ message: "User already exists" });
            }

            const hash = await bcrypt.hash(req.body.password, 10);
            if (!hash) {
                return res.status(500).send({ message: "Error in hashing password" });
            }

            const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

            const user = new User({ name, email, password: hash, otp });
            await user.save();

            console.log("Sending OTP to:", email);
            await sendOTP(email, otp);


         res.status(201).send({ message: "User registered successfully", user });

        } catch (error) {
            res.status(500).send({ message: "Internal server error" });
        }
    }

    ,
    verifyOTP: async (req, res) => {

      const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).send({ message: "Email and OTP are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        if (user.otp !== Number(otp)) {
            return res.status(400).send({ message: "Invalid OTP" });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).send({ message: "OTP expired" });
        }

        // OTP verified — update user
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        res.status(200).send({ message: "OTP verified successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
}

    
};

module.exports = userController;